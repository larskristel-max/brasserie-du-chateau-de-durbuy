#!/usr/bin/env python3
"""
post-article.py — Post a draft article to the Carnet du brasseur.

Usage from the command line:
    export SANITY_PROJECT_ID="abc123xyz"
    export SANITY_TOKEN="sk..."
    python3 post-article.py --title "Le premier brassin de mai" \\
        --date 2026-05-11 \\
        --lang fr \\
        --lede "Trois jours après la mise en cuve. La fermentation se calme." \\
        --body-file article-body.txt

Usage from Codex / a wrapper:
    Codex can call this as a CLI tool or import post_draft() and call it
    programmatically. See the function signature below.

The article is created as a DRAFT in Sanity (visible only in Sanity Studio).
Lars reviews and publishes manually.
"""

import os
import sys
import json
import uuid
import argparse
import datetime
import urllib.request
import urllib.error


# ─────────────────────────────────────────────────────────────────────────────
# The function — call this directly from Codex / Python scripts
# ─────────────────────────────────────────────────────────────────────────────

def post_draft(
    title: str,
    date: str,                   # "YYYY-MM-DD"
    body_paragraphs: list,       # list of strings, one per paragraph
    *,
    language: str = "fr",
    lede: str | None = None,
    author: str = "Lars Kristel",
    tags: list | None = None,
    project_id: str | None = None,
    dataset: str = "production",
    token: str | None = None,
) -> dict:
    """
    Create a draft article in the Sanity Carnet.

    Returns the Sanity API response (transactionId + results array with the
    created document's _id).

    Raises ValueError on validation failure, RuntimeError on API failure.
    """
    # Resolve credentials
    project_id = project_id or os.environ.get("SANITY_PROJECT_ID")
    token = token or os.environ.get("SANITY_TOKEN")
    if not project_id:
        raise ValueError("project_id is required (set SANITY_PROJECT_ID env var or pass project_id=)")
    if not token:
        raise ValueError("token is required (set SANITY_TOKEN env var or pass token=)")

    # Validate inputs
    if not title or len(title) < 2 or len(title) > 120:
        raise ValueError("title must be 2-120 chars")
    if not date:
        raise ValueError("date is required (YYYY-MM-DD)")
    try:
        datetime.date.fromisoformat(date)
    except ValueError:
        raise ValueError(f"date '{date}' is not valid ISO YYYY-MM-DD")
    if language not in {"fr", "nl", "en", "de"}:
        raise ValueError(f"language must be one of fr/nl/en/de, got '{language}'")
    if not body_paragraphs or len(body_paragraphs) == 0:
        raise ValueError("body_paragraphs must contain at least one paragraph")

    # Build the slug from the title (simple slugify)
    slug = _slugify(title)
    draft_id = f"drafts.{slug}-{date}"

    # Build the portable-text body
    body_blocks = []
    for paragraph in body_paragraphs:
        if not paragraph.strip():
            continue
        body_blocks.append({
            "_type": "block",
            "_key": _short_key(),
            "style": "normal",
            "children": [
                {
                    "_type": "span",
                    "_key": _short_key(),
                    "text": paragraph.strip(),
                }
            ],
        })

    # Build the create mutation
    create_doc = {
        "_id": draft_id,
        "_type": "article",
        "title": title,
        "date": date,
        "language": language,
        "slug": {"_type": "slug", "current": slug},
        "body": body_blocks,
        "author": author,
    }
    if lede:
        create_doc["lede"] = lede
    if tags:
        create_doc["tags"] = tags

    mutations = {"mutations": [{"create": create_doc}]}
    url = f"https://{project_id}.api.sanity.io/v2024-01-01/data/mutate/{dataset}"

    # POST it
    req = urllib.request.Request(
        url,
        data=json.dumps(mutations).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            response_body = resp.read().decode("utf-8")
            return json.loads(response_body)
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"Sanity API returned {e.code}: {body}")
    except urllib.error.URLError as e:
        raise RuntimeError(f"Network error: {e.reason}")


# ─────────────────────────────────────────────────────────────────────────────
# Helpers
# ─────────────────────────────────────────────────────────────────────────────

def _slugify(text: str) -> str:
    """Simple French-aware slugify."""
    text = text.lower()
    replacements = {
        "à": "a", "á": "a", "â": "a", "ä": "a", "ã": "a", "å": "a",
        "è": "e", "é": "e", "ê": "e", "ë": "e",
        "ì": "i", "í": "i", "î": "i", "ï": "i",
        "ò": "o", "ó": "o", "ô": "o", "ö": "o", "õ": "o",
        "ù": "u", "ú": "u", "û": "u", "ü": "u",
        "ç": "c", "ñ": "n",
    }
    for accented, plain in replacements.items():
        text = text.replace(accented, plain)
    # Replace anything non-alphanumeric with dashes
    result = []
    for c in text:
        if c.isalnum():
            result.append(c)
        elif c in " -_'\"":
            result.append("-")
    slug = "".join(result)
    # Collapse multiple dashes, strip leading/trailing
    while "--" in slug:
        slug = slug.replace("--", "-")
    return slug.strip("-")[:80]


def _short_key() -> str:
    """Generate a short unique key for Sanity portable-text blocks."""
    return uuid.uuid4().hex[:8]


# ─────────────────────────────────────────────────────────────────────────────
# CLI entrypoint
# ─────────────────────────────────────────────────────────────────────────────

def _main():
    parser = argparse.ArgumentParser(description="Post a draft article to the Carnet du brasseur")
    parser.add_argument("--title", required=True)
    parser.add_argument("--date", default=datetime.date.today().isoformat(), help="YYYY-MM-DD, default today")
    parser.add_argument("--lang", default="fr", choices=["fr", "nl", "en", "de"])
    parser.add_argument("--lede", default=None, help="Optional 1-2 sentence intro")
    parser.add_argument("--body-file", default=None, help="Path to a file with the article body (paragraphs separated by blank lines)")
    parser.add_argument("--body", default=None, help="Article body as a single string (paragraphs separated by \\n\\n)")
    parser.add_argument("--author", default="Lars Kristel")
    parser.add_argument("--tags", default=None, help="Comma-separated tags")
    args = parser.parse_args()

    # Get the body
    if args.body_file:
        with open(args.body_file, "r", encoding="utf-8") as f:
            body_text = f.read()
    elif args.body:
        body_text = args.body
    else:
        sys.stderr.write("Error: provide either --body or --body-file\n")
        sys.exit(1)

    paragraphs = [p.strip() for p in body_text.split("\n\n") if p.strip()]
    if not paragraphs:
        sys.stderr.write("Error: body is empty after splitting on blank lines\n")
        sys.exit(1)

    tags = [t.strip() for t in args.tags.split(",")] if args.tags else None

    try:
        result = post_draft(
            title=args.title,
            date=args.date,
            language=args.lang,
            lede=args.lede,
            body_paragraphs=paragraphs,
            author=args.author,
            tags=tags,
        )
        print(json.dumps(result, indent=2, ensure_ascii=False))
        print("\n✓ Draft created. Log in to Sanity Studio to review and publish.", file=sys.stderr)
    except (ValueError, RuntimeError) as e:
        sys.stderr.write(f"Error: {e}\n")
        sys.exit(1)


if __name__ == "__main__":
    _main()
