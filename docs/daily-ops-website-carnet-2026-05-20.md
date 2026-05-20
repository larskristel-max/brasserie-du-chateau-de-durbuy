# Daily Ops Summary - Website / Carnet - 20/05/2026

## Website

- Added a new `Où trouver nos bières` section to the homepage.
- Published confirmed points de vente:
  - Établissements Dispas - Route de Bomal 42/A, 6940 Barvaux-sur-Ourthe.
  - L'Épicerie de Durbuy - Rue du Comte Théodule d'Ursel 39, 6940 Durbuy.
  - Confiturerie Saint-Amour - Rue Alphonse Eloy 7, 6940 Durbuy.
  - La Librairie - Rue du Comte Théodule d'Ursel 20, 6940 Durbuy.
- Added restrained wording:
  - "Une sélection de nos bières est disponible chez plusieurs partenaires locaux, selon arrivage."
- Reworked the `Demande de commande` form so it can submit directly through the existing `brasserie-reservations` Cloudflare Worker.
- The form keeps a `mailto:` fallback if the backend is unavailable.
- The previously configured Resend key was found on `brasserie-reservations`; that Worker is now tracked in the repo as `workers/reservations.js` with `wrangler.reservations.toml`.
- Important: this is not ecommerce:
  - no prices;
  - no payment;
  - no stock guarantee;
  - no backend order handling.
- Backend requirement before direct sending works:
  - deploy updated `brasserie-reservations` Worker;
  - keep `ORDER_TO_EMAIL = info@brasseriechateaudurbuy.be`;
  - keep `ORDER_FROM_EMAIL = reservations@brasseriechateaudurbuy.be`, which is authorized for the existing Resend key.
- Added the section to desktop and mobile navigation.
- Refined the top navigation because the first version wrapped poorly.
- Current FR nav labels:
  - Domaine;
  - La Brasserie;
  - Bières;
  - Vente;
  - Visite;
  - Carnet.
- Adjusted the order request CTA to match the quiet underline-link style of the site.
- Kept `index.html` and `redesign-template.html` identical.
- Published updates to GitHub Pages and the permanent domain.

## Carnet / Journal

- Added and published several French-only Carnet entries:
  - `Avant l'étiquette finale` - 20/05/2026.
  - `Marckloff, et nous` - already live, 19/05/2026.
  - `Les anciennes écuries` - 18/05/2026.
  - `Une bière d'ici` - backdated to 17/05/2026.
- `Une bière d'ici` was originally added on 20/05, then corrected to published date 17/05/2026.
- All new Carnet entries are published in `content/journal/articles.json`.
- Journal remains French-only for now; no translated article workflow has been added yet.

## Commits Published

- `49d252c` - Add sales points and order request teaser.
- `423c064` - Add Saint-Amour to sales points.
- `00a9f49` - Refine sales points navigation and CTA.
- `a361d03` - Tighten top navigation labels.
- `e4dbfdc` - Add local beer journal article.
- `fe06bb2` - Add old stables journal article.
- `5f69c72` - Add label proofing journal article.
- `6e33c81` - Backdate local beer journal article.

## Guardrails Maintained

- No public prices.
- No online shop language.
- No claim that labels are final.
- No public supplier/contact details from label operations.
- No "Brassée au château depuis 1560".
- No public Gmail exposed.
- Public contact remains `info@brasseriechateaudurbuy.be`.

## Still To Do

- Review homepage translations in NL/EN/DE.
- Decide journal translation policy.
- Keep the points-de-vente list current as partners are confirmed or removed.
- Continue checking nav appearance on real desktop/mobile sizes.
- Monitor GitHub Pages / Cloudflare cache after publishes.
- Keep label and beer availability claims cautious until production and labels are validated.
