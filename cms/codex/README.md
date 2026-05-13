# Codex / scripts — posting to the Carnet du brasseur

Two ready-to-use scripts for posting draft articles to the brewery's journal
programmatically. Useful for Codex workflows, cron jobs, voice-memo
transcription pipelines, or any non-ChatGPT writer client.

Both scripts post articles as **drafts** — they appear in Sanity Studio for
Lars to review and publish manually. The scripts never publish directly.

## Files

| File | Use it when... |
|---|---|
| `post-article.py` | Long-form articles, articles with multiple paragraphs, anything that needs structure. **Recommended.** |
| `post-article.sh` | Quick one-line posts from a terminal. Limited to simple body formatting. |

## Prerequisites

- Sanity project ID
- Sanity API token with write permission (Editor role)
- Python 3.9+ (for the Python script) or bash + curl + openssl (for the shell script)

## Environment variables

Both scripts read credentials from environment variables:

```bash
export SANITY_PROJECT_ID="abc123xyz"
export SANITY_TOKEN="sk..."
```

For persistent setup, add these to `~/.bashrc` or `~/.zshrc`. For session-only,
just set them in your shell before running.

**Never** commit these to git. The `.gitignore` of any wrapper repo should
include `.env`.

## Python: complete usage

### From the command line:

```bash
python3 post-article.py \
  --title "Le premier brassin de mai" \
  --date 2026-05-11 \
  --lang fr \
  --lede "Trois jours après la mise en cuve. La fermentation se calme." \
  --body-file article.txt
```

The `article.txt` file is plain text with paragraphs separated by blank lines:

```
Trois jours après la mise en cuve. La fermentation se calme; le krausen retombe lentement.

Ce matin la lumière entrait par l'oculus à l'est. J'étais venu mesurer la densité — 1.014, comme prévu.

Il y a quelque chose de profondément rassurant dans le retour de ce rythme.
```

### From Python code (Codex):

```python
from post_article import post_draft

result = post_draft(
    title="Le premier brassin de mai",
    date="2026-05-11",
    language="fr",
    lede="Trois jours après la mise en cuve. La fermentation se calme.",
    body_paragraphs=[
        "Trois jours après la mise en cuve...",
        "Ce matin la lumière entrait...",
        "Il y a quelque chose de profondément rassurant...",
    ],
)
print(result["results"][0]["id"])  # the draft document id
```

## Bash: quick usage

```bash
./post-article.sh \
  "Le premier brassin de mai" \
  "2026-05-11" \
  "Trois jours après la mise en cuve. La fermentation se calme." \
  "Paragraphe un...||Paragraphe deux...||Paragraphe trois."
```

The body uses `||` as paragraph separator (bash arguments can't carry
multiline strings cleanly). For longer or more complex articles use the
Python script instead.

## After posting

The script returns a JSON response from Sanity. The important field is
`results[0].id` — the draft document's ID. Example:

```json
{
  "transactionId": "abc...",
  "results": [
    { "id": "drafts.le-premier-brassin-de-mai-2026-05-11", "operation": "create" }
  ]
}
```

Lars logs in to **sanity.studio/PROJECT_ID** (or wherever the Studio is
deployed), navigates to **Drafts**, reviews the article, edits if needed,
clicks **Publish**. The article appears on **brasseriechateaudurbuy.be/journal**.

## Codex / agent workflows

Some example use cases this enables:

### Voice-memo → draft article

```bash
# Pseudo-flow
1. Lars records a voice memo on his phone (transcribed via Whisper or similar)
2. The transcript hits an automation (Zapier, cron, etc.)
3. The automation calls Codex/ChatGPT with the transcript
4. Codex polishes the text into a journal entry
5. Codex calls post-article.py with the polished text
6. Lars reviews in Sanity Studio
```

### Scheduled "seasonal observations"

```bash
# crontab entry
0 9 * * 1   /path/to/seasonal-note.sh   # every Monday at 9am
```

Where `seasonal-note.sh` checks the weather/season, generates a brief
observation via an LLM, and posts as draft.

### Codex-as-editor

```python
# Codex reads brewing log files, summarises weekly progress, posts a draft
import json
from post_article import post_draft

log = parse_brewing_log()
summary = ask_llm("Summarise this week's brewing in Lars's voice", log)

post_draft(
    title=summary["title"],
    date=summary["week_end"],
    body_paragraphs=summary["paragraphs"],
)
```

## Security

- The `SANITY_TOKEN` is sensitive. Anyone with it can create/edit/delete any document in the brewery's CMS.
- Use a separate token for scripts vs ChatGPT — easier to audit and revoke.
- Periodically check Sanity dashboard → API → Tokens for "Last used" timestamps.
- If a token leaks: revoke immediately in Sanity dashboard and rotate.

## Troubleshooting

| Error message | Fix |
|---|---|
| `SANITY_PROJECT_ID is required` | `export SANITY_PROJECT_ID="..."` before running |
| `Sanity API returned 401` | Token wrong or revoked. Re-create in Sanity dashboard. |
| `Sanity API returned 400` | Schema validation: check that title is 2-120 chars, date is YYYY-MM-DD, language is fr/nl/en/de |
| `date '...' is not valid ISO YYYY-MM-DD` | Use the format 2026-05-11, not 11/05/2026 or May 11 |
| Draft created but doesn't appear in Studio | Refresh Studio page; or wrong dataset name (default is `production`) |
