#!/usr/bin/env bash
# post-article.sh — Quick curl-based draft poster.
#
# Usage:
#   export SANITY_PROJECT_ID="abc123xyz"
#   export SANITY_TOKEN="sk..."
#   ./post-article.sh "Le titre" "2026-05-11" "Le chapeau (lede)" "Le corps. Paragraphe 1.||Paragraphe 2.||Paragraphe 3."
#
# Body uses "||" as paragraph separator (since bash arguments can't easily
# carry newlines). For more complex articles, use post-article.py instead.

set -e

if [ -z "$SANITY_PROJECT_ID" ] || [ -z "$SANITY_TOKEN" ]; then
  echo "Error: SANITY_PROJECT_ID and SANITY_TOKEN must be set in environment." >&2
  exit 1
fi

TITLE="${1:?Usage: $0 \"Title\" \"YYYY-MM-DD\" \"Lede\" \"Body para 1||Body para 2\"}"
DATE="${2:?Date required}"
LEDE="${3:-}"
BODY_RAW="${4:?Body required}"
LANG="${5:-fr}"

# Slugify the title (basic — strips accents and non-alphanum)
SLUG=$(echo "$TITLE" | iconv -f UTF-8 -t ASCII//TRANSLIT 2>/dev/null | tr '[:upper:]' '[:lower:]' | tr -cs 'a-z0-9' '-' | sed 's/^-//;s/-$//' | cut -c1-80)
DRAFT_ID="drafts.${SLUG}-${DATE}"

# Build the body JSON — split on "||" into paragraphs
BODY_JSON="["
IFS='|' read -ra PARAGRAPHS <<< "${BODY_RAW//||/$'\x01'}"
FIRST=true
while IFS= read -r PARA; do
  PARA_TRIMMED=$(echo "$PARA" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')
  [ -z "$PARA_TRIMMED" ] && continue
  KEY=$(openssl rand -hex 4 2>/dev/null || echo "k$(date +%s%N | cut -c1-8)")
  SKEY=$(openssl rand -hex 4 2>/dev/null || echo "s$(date +%s%N | cut -c2-9)")
  [ "$FIRST" = true ] && FIRST=false || BODY_JSON="${BODY_JSON},"
  # Escape quotes and newlines in the paragraph text for JSON
  PARA_ESCAPED=$(printf '%s' "$PARA_TRIMMED" | python3 -c 'import sys,json; print(json.dumps(sys.stdin.read())[1:-1])')
  BODY_JSON="${BODY_JSON}{\"_type\":\"block\",\"_key\":\"${KEY}\",\"style\":\"normal\",\"children\":[{\"_type\":\"span\",\"_key\":\"${SKEY}\",\"text\":\"${PARA_ESCAPED}\"}]}"
done < <(printf '%s\n' "$BODY_RAW" | tr '\x01' '\n' 2>/dev/null || printf '%s' "$BODY_RAW")
BODY_JSON="${BODY_JSON}]"

# Escape title, lede for JSON
TITLE_J=$(printf '%s' "$TITLE" | python3 -c 'import sys,json; print(json.dumps(sys.stdin.read())[1:-1])')
LEDE_J=$(printf '%s' "$LEDE" | python3 -c 'import sys,json; print(json.dumps(sys.stdin.read())[1:-1])')

# Build the mutation
PAYLOAD=$(cat <<EOF
{
  "mutations": [
    {
      "create": {
        "_id": "${DRAFT_ID}",
        "_type": "article",
        "title": "${TITLE_J}",
        "date": "${DATE}",
        "language": "${LANG}",
        "slug": { "_type": "slug", "current": "${SLUG}" },
        "lede": "${LEDE_J}",
        "author": "Lars Kristel",
        "body": ${BODY_JSON}
      }
    }
  ]
}
EOF
)

URL="https://${SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/production"

curl -sS -X POST "$URL" \
  -H "Authorization: Bearer ${SANITY_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD" \
  | python3 -m json.tool

echo
echo "✓ Draft created. Log in to Sanity Studio to review and publish." >&2
