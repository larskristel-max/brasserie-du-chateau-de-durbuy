# Brasserie du Chateau de Durbuy - Project Status

Last updated: 2026-05-20

## Current Live State

- Permanent domain is live: `https://brasseriechateaudurbuy.be/`
- `www.brasseriechateaudurbuy.be` redirects to the apex domain.
- The public site is served through Cloudflare by the Worker route on `brasserie-under-construction`.
- That Worker is no longer an under-construction placeholder. It now proxies the published GitHub Pages build.
- Source of truth remains the GitHub repo: `larskristel-max/brasserie-chateau-durbuy-2026`.
- Temporary GitHub Pages preview remains available at `https://larskristel-max.github.io/brasserie-chateau-durbuy-2026/`.

## Architecture

- Production site remains static-first.
- Root `index.html` is the canonical production homepage.
- `redesign-template.html` must stay byte-identical to `index.html`.
- GitHub Pages deploy workflow now copies:
  - `index.html`
  - `journal/`
  - `admin/`
  - `content/`
  - selected `src/assets` files
- The legacy Vite/React code under `src/` remains reference-only unless the project explicitly migrates back to a build step.

## Cloudflare

- Cloudflare account: `1101e83741ff11d0ad635d83f9822805`
- Zone: `7aa127bbbe46a51a9f9eebf2a581eacb`
- Nameservers:
  - `delilah.ns.cloudflare.com`
  - `ruben.ns.cloudflare.com`
- Custom-domain Worker:
  - Script: `brasserie-under-construction`
  - Routes:
    - `brasseriechateaudurbuy.be/*`
    - `www.brasseriechateaudurbuy.be/*`
  - Current behavior:
    - `www` redirects to apex.
    - Apex proxies the GitHub Pages project path.
    - Placeholder copy and `noindex` behavior have been removed.
- Admin API Worker:
  - Script: `brasserie-admin-api`
  - URL: `https://brasserie-admin-api.brasseurduchateau.workers.dev`
  - Purpose: handle journal admin login and GitHub writes without exposing the GitHub token in the browser.
  - Secrets configured in Cloudflare:
    - `ADMIN_PASSWORD`
    - `ADMIN_SESSION_SECRET`
    - `GITHUB_TOKEN`
  - Public config:
    - `ADMIN_EMAIL = brasseurduchateau@gmail.com`

## Domain And Email

- Public domain: `brasseriechateaudurbuy.be`
- Public contact used on the site: `info@brasseriechateaudurbuy.be`
- Personal/backend Gmail should not appear on public pages.
- Cloudflare Email Routing is enabled.
- Existing public aliases:
  - `info@brasseriechateaudurbuy.be`
  - `reservations@brasseriechateaudurbuy.be`
  - `brasseur@brasseriechateaudurbuy.be`
- Catch-all forwards to the verified Gmail destination.

## Website Changes Completed

- Replaced the temporary Cloudflare placeholder with the full site on the permanent domain.
- Replaced the generic visit image with the uploaded gate image:
  - `src/assets/visite-gate.jpg`
  - `src/assets/visite-gate-720w.jpg`
  - `src/assets/visite-gate-720w.webp`
  - `src/assets/visite-gate-1024w.jpg`
  - `src/assets/visite-gate-1024w.webp`
- Updated La Visite image references and documentation.
- Blurred the beer bottle image as a teaser.
- Replaced visible beer names, ABVs, and tasting notes with a blurred teaser roster.
- Removed unreleased beer names/details from homepage translation objects.
- Added teaser copy for the beer range in FR/NL/EN/DE.
- Converted the reservation modal into a teaser rather than a functioning reservation form.
- Removed public Gmail references from homepage metadata/footer and replaced public contact with `info@brasseriechateaudurbuy.be`.
- Added a restrained `Où trouver nos bières` section with confirmed local sales points only:
  - Établissements Dispas
  - L'Épicerie de Durbuy
- Added an email-based order request teaser for private/professional requests. This is not ecommerce: no prices, payment, stock guarantee, or backend order handling.
- Kept `index.html` and `redesign-template.html` identical after edits.

## Journal And Admin

- Journal feed is stored at `content/journal/articles.json`.
- Journal page now reads from `/content/journal/articles.json`.
- Published journal article date was updated to `2026-05-19`.
- Journal copy was adjusted to avoid naming the beer currently planned for renaming.
- Draft journal entries were sanitized to remove unreleased beer-specific details.
- Admin login was changed from browser-entered GitHub PAT to email/password.
- Admin page now calls the Cloudflare Worker API.
- GitHub token is stored server-side as a Cloudflare secret, not in the browser.
- Live admin URL: `https://brasseriechateaudurbuy.be/admin/`

## Important Translation Status

- Homepage static text has FR/NL/EN/DE translation entries.
- These translations still need a dedicated review pass for tone, accuracy, and consistency with the approved brand voice.
- The journal is not currently translated.
- `content/journal/articles.json` currently stores article language per article, but there is no automatic translation workflow and no UI for linked translated versions of the same article.
- Before launching a multilingual journal experience, decide whether each article should:
  - remain in its original language only,
  - be manually translated as separate entries,
  - or be grouped as one article with multiple language versions.

## Current Known Risks

- The permanent domain is a Cloudflare Worker proxy to GitHub Pages, not a native Cloudflare Pages deployment.
- The custom-domain Worker rewrites requests to the GitHub Pages project path. If the GitHub Pages project path changes, update the Worker.
- Admin publishing depends on:
  - the Cloudflare Worker remaining deployed,
  - `GITHUB_TOKEN` staying valid,
  - the GitHub token retaining `Contents: Read and write` on the repo.
- The admin password currently exists as a Cloudflare secret. Rotate it if it has been shared too broadly.
- The admin API uses a simple email/password login. For stronger protection, consider Cloudflare Access.
- Web analytics/RUM status still needs to be reviewed in Cloudflare.

## To Do

- Use `docs/website-thread-handoff-boss-requests-2026-05-20.md` as the current handoff for Jean-Michel's latest website requests: points de vente first, open brasserie later, no public ecommerce/prices yet.
- Confirm whether Saint-Amour and the librairie should be added later to `Où trouver nos bières`, including exact public names and stocking locations.
- Review all homepage translations in NL/EN/DE, especially tone and heritage phrasing.
- Decide and document the journal translation policy.
- Add manual translation support to journal content if multilingual journal publishing is required.
- Test the full admin article lifecycle from the live domain:
  - login,
  - create draft,
  - upload image,
  - publish,
  - verify GitHub Pages deployment,
  - verify public journal page.
- Consider adding a small admin status panel showing whether the GitHub write API is connected.
- Rotate the temporary/simple admin password to a stronger password before broader use.
- Confirm Cloudflare Web Analytics is enabled and document where visitor stats are read.
- Add basic SEO infrastructure:
  - `robots.txt`,
  - `sitemap.xml`,
  - canonical URL metadata for the permanent domain,
  - Open Graph/Twitter metadata using permanent-domain assets,
  - clean structured data for the business/address/contact.
- Do a local SEO pass:
  - create or claim Google Business Profile,
  - keep appointment-only status accurate,
  - keep naming consistent across site, Instagram, Google, and domain.
- Build a restrained content SEO plan around defensible themes:
  - Brasserie du Château de Durbuy,
  - Durbuy,
  - Château de Durbuy,
  - brewing heritage since the 16th century,
  - former stables of the château,
  - journal articles on estate and brewing notes.
- Add multilingual SEO only after translation review:
  - review FR/NL/EN/DE homepage translations,
  - decide journal translation policy,
  - add `hreflang` only for pages that actually have translated equivalents.
- Review mobile layouts on the permanent domain after real-world browser caching settles.
- Consider renaming the custom-domain Worker from `brasserie-under-construction` to a production name such as `brasserie-site-proxy`.
- Consider moving from GitHub Pages proxying to Cloudflare Pages later if the project needs tighter Cloudflare integration.
- Continue reviewing public copy for any premature product, beer-name, ABV, label, opening-hours, or reservation claims.

## SEO Pass Completed - 2026-05-19

- Added homepage canonical metadata for `https://brasseriechateaudurbuy.be/`.
- Updated Open Graph and Twitter metadata to use permanent-domain URLs.
- Cleaned homepage JSON-LD to use factual business/address/contact/social data only.
- Added `robots.txt` with `/admin/` disallowed and sitemap discovery.
- Added explicit `robots.txt` allowances for AI search / assistant retrieval agents while keeping training opt-out.
- Added `sitemap.xml` for the homepage and journal index.
- Updated the GitHub Pages deploy workflow to copy `robots.txt` and `sitemap.xml`.
- Added `docs/seo.md` with metadata decisions, search themes, content principles, and local SEO tasks.
- Kept `index.html` and `redesign-template.html` in sync after metadata changes.
