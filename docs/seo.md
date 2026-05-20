# SEO / Visibility Notes

Last updated: 2026-05-20

## Current Decisions

- Canonical public domain: `https://brasseriechateaudurbuy.be/`.
- Temporary preview remains available at `https://larskristel-max.github.io/brasserie-chateau-durbuy-2026/`, but public metadata should point to the permanent domain.
- Public contact email: `info@brasseriechateaudurbuy.be`.
- Instagram: `https://www.instagram.com/brasserieduchateaudedurbuy`.
- No public opening hours are published until access policy is confirmed.
- No `hreflang` is published yet. Add it only after translation review and only for pages with real translated equivalents.
- Journal articles currently publish in their original language only.
- Cloudflare Managed `robots.txt` is currently active on the zone and prepends its own AI-crawler rules. The repo `robots.txt` explicitly allows AI search / assistant retrieval agents while keeping `ai-train=no`.
- Daily SEO / Google / outreach continuity for 20/05/2026 is recorded in `docs/daily-ops-seo-google-outreach-2026-05-20.md`.

## Google / Discovery State - 20/05/2026

- Google Search Console domain property for `brasseriechateaudurbuy.be` was created and verified.
- Correct Google DNS verification record was added in Cloudflare.
- Accidental / wrong Google verification record was removed.
- Sitemap was submitted in Search Console.
- Indexing was requested for the homepage and `/journal/`.
- Sitemap fetching may need time even though the live sitemap works.
- Google Business Profile was created / updated with cautious brewery positioning: microbrasserie, official website, description, social profiles, and relevant attributes.
- Business profile guardrails: no invented opening hours, no menu, no restaurant claims, and no unsupported service claims.

## Metadata Policy

- Homepage canonical, Open Graph, Twitter card, and JSON-LD should use the permanent domain.
- Structured data should stay factual: name, description, address, public email, site URL, logo/image, and Instagram.
- Do not add `openingHours`, reservation URLs, telephone numbers, product offers, beer names, ABVs, tasting notes, or event details until approved for public release.
- Keep `index.html` and `redesign-template.html` byte-identical after metadata edits.
- Keep `robots.txt` aligned with the visibility goal: allow ordinary search, AI search, and assistant retrieval; avoid training permission unless explicitly approved.

## Search Themes

- Brasserie du Château de Durbuy.
- Durbuy.
- Château de Durbuy.
- Domaine du Château de Durbuy.
- Brasserie dans les anciennes écuries du château.
- Histoire brassicole à Durbuy depuis le XVIe siècle.
- Philippe Marckloff, only with careful wording.
- Petites séries and fermentation traditionnelle, without generic craft-beer SEO language.

## Content Principles

- Estate first, brewery second, product last.
- French-first.
- Restrained, factual, and heritage-led.
- No "best brewery", "craft beer destination", "must visit", or tourist-brochure phrasing.
- Avoid unsupported continuity claims such as "brassée au château depuis 1560".

## Local SEO Tasks

- Claim or update Google Business Profile with the exact official name and permanent domain.
- Use a brewery / beer producer category where available; avoid restaurant positioning unless the business model changes.
- Keep appointment-only / private-access status accurate.
- Claim or update Bing Places and Apple Business Connect.
- Align tourism, directory, Untappd, Instagram, and Google naming around `Brasserie du Château de Durbuy`.
- Ask tourism and local partner pages to link to the permanent domain once the listing text is corrected.

## Future Work

- Review FR/NL/EN/DE homepage translations before multilingual SEO.
- Decide whether journal translations remain separate entries or grouped language versions.
- Add sitemap entries for individual article URLs only if the journal gets stable article pages.
- Add a future `Le Domaine` page only after approved editorial direction and source review.
