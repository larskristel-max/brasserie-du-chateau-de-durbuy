# Setting up the "Carnet du brasseur" Custom GPT

Time required: ~15 minutes. Requires a ChatGPT Plus subscription.

## Prerequisites

- Sanity account created, project ID known (e.g. `abc123xyz`)
- Sanity API token with write permission, copied to a password manager
- ChatGPT Plus subscription (Custom GPTs only available on Plus)

## Step 1 — Create the Custom GPT

1. Open ChatGPT → click your profile (top-right) → **My GPTs** → **Create a GPT**
2. In the **Configure** tab:
   - **Name**: `Carnet du brasseur`
   - **Description**: `Writing assistant for the Brasserie du Château de Durbuy journal. Drafts articles in the maître brasseur's voice and posts them as drafts to Sanity.`
   - **Instructions**: paste the entire contents of `system-prompt.md`
   - **Conversation starters** (optional but nice):
     - `Aujourd'hui j'ai brassé...`
     - `Note du jour: fermentation, observations`
     - `Une réflexion sur le houblon de cette année`
     - `Write a journal entry about [topic]`
   - **Knowledge**: skip (no files needed)
   - **Capabilities**: turn OFF Web Browsing, DALL·E, and Code Interpreter (not needed, reduces unpredictability)

## Step 2 — Add the action

Scroll down to **Actions** → **Create new action**:

1. **Authentication**:
   - Type: **API Key**
   - API Key: paste your **Sanity API token** (starts with `sk...`)
   - Auth Type: **Bearer**
   - Custom Header Name: leave blank
2. **Schema**: paste the entire contents of `openapi.yaml` — BUT FIRST, replace `PROJECT_ID` with your real Sanity project ID. So `https://PROJECT_ID.api.sanity.io` becomes `https://abc123xyz.api.sanity.io`.
3. **Privacy policy**: leave blank (this is a private GPT)

ChatGPT will validate the OpenAPI schema. You should see one action listed: `createDraftArticle`.

## Step 3 — Test the action

In the GPT preview panel (right side):

1. Send: `Bonjour. Test ; rédige un brouillon court sur le silence de la salle de brassage ce matin.`
2. The GPT should draft an article in French, in your voice
3. The GPT will ask: "Publier comme brouillon?"
4. Respond: "Oui"
5. The GPT calls `createDraftArticle` — you'll see an "Allow"/"Deny" button (ChatGPT asks the first time)
6. Click **Allow** → ChatGPT calls Sanity → returns success
7. Go to your Sanity Studio → you should see the new draft article in the "Drafts" view

## Step 4 — Save the GPT

- Top-right → **Save**
- Save mode: **Only me** (don't share publicly)
- You'll get a private link/URL for the GPT

Now you can pin the GPT in your ChatGPT sidebar and use it anytime.

## Daily use

Open the Custom GPT. Type your observations:

> "Hier j'ai goûté la IPA — Sorachi est plus floral que d'habitude cette année."

The GPT drafts a journal entry in your voice, asks for confirmation, posts as draft. You log into Sanity Studio, review it (edit if needed), click Publish. Article appears on `/journal/`.

## Iterating on the voice

The system-prompt.md is the source of truth for your "voice". If after using the GPT a few times you notice it drifting (too marketing-y, too short, too long), edit the system prompt. The drift fixes are usually 1–2 sentence additions to the "Voice and register" section.

## Sharing access

If the Comte or Marc Leclercq want to contribute journal entries:
- They each need their own ChatGPT Plus subscription
- Share the GPT with them via the GPT's "Share" option — they can use it from their account
- They use the SAME Sanity API token (in their copy of the GPT) — or you create separate tokens per writer for audit
- All drafts land in the same Sanity inbox; you (or any editor) reviews and publishes

## Security checklist

- The Sanity API token is configured in the GPT action and is visible **only to the GPT's owner** (you). Other users of the GPT don't see the token.
- If you ever share the GPT publicly: revoke the token in Sanity dashboard and create a new one with restricted scope (article create only, no delete).
- Periodically check Sanity dashboard → API → Tokens → "Last used" — if a token shows activity you didn't trigger, revoke it immediately.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| "Authentication failed" | Token has no write permission | Re-create token with "Editor" role |
| "Cannot create document" | `_id` not prefixed with `drafts.` | GPT mis-formatted; remind it in conversation, or edit system prompt |
| "Schema validation failed" | Missing required field (date, language, etc.) | GPT skipped one; ask it to redo |
| GPT calls action but draft doesn't appear | Wrong project ID or dataset name | Check the OpenAPI server URL — should be `https://YOUR_PROJECT_ID.api.sanity.io` |
