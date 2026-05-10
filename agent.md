# agent.md

## Operating manual for AI agents working on this site

**Read this before you write a single line of code, copy, or markup.**

This file is binding creative direction. If something you are about to do conflicts with anything below, you are doing the wrong thing. Stop and re-read.

---

## 1. What this site is — and what it is not

**This is the digital experience of an estate.** A private château in Durbuy, Belgium, that happens to brew beer on the grounds. The brewery is a tenant of the place, not its identity.

The site exists to:
- Express the *atmosphere* of the domain.
- Honour the heritage of the château and the rhythm of the seasons.
- Allow a small number of visitors to request access to the grounds, the brewery, and four bottles of beer that exist because the place exists.

The site does **not** exist to:
- Sell beer online.
- Convert clicks.
- Demonstrate craft-brewery credibility.
- Showcase your front-end skills.
- Win design awards from the SaaS-template community.

If at any moment the page begins to feel like a craft-brewery website with luxury styling on top, **you have failed**. Roll back.

### What this site is currently missing

A candid running list — so a future agent reads the doc and understands *the shape of "next"*, not only what is already in place:

- **Dark / cinematic register is underrepresented.** The moodboard called for both light editorial *and* dark cinematic atmosphere. The current build delivers the light editorial cleanly; only the brewery slab carries the dark register. There is room for at least one more atmospheric chapter (twilight grounds, candle-lit interior, copper-closeup) to honour the second half of the brief.
- **No second page.** Heritage is currently implied through three short paragraphs in Le Lieu. A real luxury estate site has at minimum a Le Domaine page (heritage essay + 8–12 photographs).
- **Reservation flow is still `mailto:`.** A small four-field form (name, email, dates, party size) posting to `brasseurduchateau@gmail.com` is the minimum upgrade.
- **No English version.** A Belgian estate that wants international visitors needs a `FR / EN` toggle.
- **Tablet (768–1024px) tuning is absent.** Tablet portrait currently falls into the mobile bucket; the design jumps from full desktop to stacked-mobile with no in-between.

These are not invitations to drift. They are the named work that closes the gap between "approaching estate-grade" and "world-class". Tackle them deliberately, in order, against the rules below.

---

## 2. Reference standards

The standards below are non-negotiable. If you have not internalised these examples, walk through each one before you build:

- **Aman Resorts** (aman.com) — cinematic pacing, vertical breathing, restraint as a luxury signal, "Inquire" as a CTA register.
- **Château Margaux** (chateau-margaux.com) — heritage typography, calm navigation, terroir before product, visual silence, copper hairlines.
- **Six Senses** — atmospheric photography, editorial cadence.
- **Audemars Piguet editorial pieces** — long-form storytelling within a brand frame.
- **Luxury wine estates** generally — domain first, cellar second, bottle third.

The standards we are explicitly **not** modelling on:
- Mailchimp / Notion marketing pages (too playful).
- Vercel / Linear (too tech-coded).
- Shopify product templates (too commercial).
- Startup landing pages (too persuasive).
- Tourism brochures (too active).

---

## 3. Positioning hierarchy (and why it matters)

When you choose a section, a heading, a photo, or a sentence, this hierarchy decides which one wins:

1. **The estate** — the château, the grounds, the river, the silence.
2. **The heritage** — that this is private, ancestral, time-bound.
3. **The brewery as craft** — small, considered, in the rhythm of the place.
4. **The product (the four beers)** — never first. Always last.
5. **Visiting** — restrained, by request, never urgent.

If a layout, headline, or asset puts the bottle before the place, **you have inverted the hierarchy**. Fix it.

---

## 4. Brand voice

The brand speaks with **the calm of a person who does not need to convince you of anything.**

- French first. Belgian-French phrasing where it differs (e.g. "septante" only if appropriate).
- Short sentences, often nominal phrases ("Avant le brassin, le lieu.").
- Punctuation as rhythm: full stops where you'd expect commas, em-dashes for pause.
- One adjective per sentence, never two stacked.
- **Verbs of restraint** — *suit, accompagne, n'altère pas, se contente* — over verbs of action.
- **No marketing comparatives.** Never "the finest", "the best", "exceptional", "premium".
- **No process buzzwords.** Never "savoir-faire" used as a noun-shield. Never "passion". Never "authentique".
- **No tourism vocabulary.** Never "découvrez", "venez", "n'hésitez pas", "venez profiter".
- **No call-to-action urgency.** Never "réservez maintenant", "places limitées", "ne tardez pas".
- **No exclamation marks. Ever.**

Voice cadence reference (this is the register — match it):

> Avant le brassin, le lieu.
> Les pierres. La rivière. Les anciennes écuries du château.
> Un domaine qui impose son tempo. La brasserie le suit, sans l'altérer.

---

## 5. Visual principles

### 5.1 Photography

- **Real photographs only.** Never AI-generated imagery.
- **Atmospheric, slightly graded.** A unified subtle grade across all imagery: brightness 0.92–0.96, contrast 1.04–1.06, saturation 0.94–0.96. No more.
- **No `mix-blend-mode` on photos.** Ever. Photos render as photos.
- **No grain overlays.** If you reach for grain, your photography isn't strong enough — find better photography or restage.
- **No duotone treatments.** No black-and-white conversions. No Instagram-style filters.
- **Architecture before people.** Faces appear rarely if at all, and never as the subject.
- **No staged "lifestyle" shots** of friends drinking beer. Ever.

### 5.2 Image-to-section relationship

- Images are the **architecture** of a section, not its decoration.
- Default to **full-bleed half-section** (image fills one half of the viewport at full section height, copy fills the other half).
- For landscape sections (the brewery), **edge-to-edge full-width** at 70–80vh.
- For product (bottles), the photograph is centred, the typography aligns column-by-column **under** the bottles.
- **Never** put a 4:5 framed image with copy floating beside it. That is the "plopped image" failure mode. Burn it.

### 5.3 Crest

- One emblem: the existing line illustration of the château with circular wordmark, processed to a transparent PNG (`src/assets/logo-crest.png`).
- Never crop the crest into a circular avatar.
- On dark sections, recolor via CSS filter: `invert(0.94) sepia(0.06) saturate(0.7) brightness(1.04)`. Do not maintain two PNG files.
- Used at three sizes only: 36px (nav), 84px (footer), ~120px (hero).

---

## 6. Typography rules

### 6.1 Type pair

- Display: **Cormorant Garamond** (Google Fonts) — production swap target is **Canela** (Commercial Type).
- Sans: **Inter** (Google Fonts) — production swap target is **Suisse Int'l** (Swiss Typefaces).

**Never use system serif fallbacks (Georgia, Times New Roman) as primary type.** That is the "unfinished website" tell.

### 6.2 Tracking

- Display headings: **neutral or slightly positive** (`letter-spacing: 0.005em` to `0.01em`).
- **Never negative tracking on display serifs.** Negative tracking is editorial-tech (Klim, Pangram Pangram), not heritage hospitality.
- Eyebrows / micro-typography: `0.22em` to `0.24em` letter-spacing, uppercase, Inter at 400 weight.
- Body: 0 letter-spacing, Inter at 300/400, line-height 1.6–1.7.

### 6.3 Italic as voice

- Use italic Cormorant for **secondary editorial moments**: the middle line of the hero title (`du Château`), chapter marks (`— Chapitre I —`), the transition line (`Le domaine continue après le brassage.`), the hero subtitle.
- Italic should feel like a different *speaker* — quieter, more reflective.
- Never italicise body paragraphs.

---

## 7. Layout rules

### 7.1 Spacing

- One section spacing token: `--section-y: clamp(7rem, 13vw, 13rem)`.
- Tight variant only when two adjacent sections are intentionally pulled close.
- **Symmetrical breathing.** Never `padding-top: X; padding-bottom: 0;` to fake an asymmetry. If the section needs to feel asymmetric, make the *content* asymmetric.

### 7.2 Hairlines

- Hairlines (`1px solid rgba(14,12,10,0.16)` on cream, `rgba(242,235,221,0.16)` on dark) are the structural rhythm.
- Use them to separate beer rows, frame the private note, top the feature row, divide the footer.
- **Never use thicker borders.** No `2px`, no `4px`. Hairlines or nothing.

### 7.3 Negative space

- Negative space is the protagonist. If a section feels "designed", you've added too much.
- A copper hairline + an italic phrase + 8rem of cream is a complete editorial breath. Trust it.

---

## 8. Motion rules

- **One motion language: slow fades on intersection.** Opacity 0 → 1, translateY(1.2rem) → 0, over 1.1s with `cubic-bezier(0.2, 0.8, 0.2, 1)`.
- **No parallax. No spring animations. No GSAP scroll triggers. No marquees. No 3D transforms.**
- **No hover lifts on content cards.** No `translateY(-0.35rem)` on hover.
- Underline-fill on text links: `transform-origin: left; transform: scaleX(0) → scaleX(1)`. That's the *only* hover affordance besides opacity changes on nav.
- **Always honour `prefers-reduced-motion`.** Cancel all reveal animations when it's set.

---

## 9. Navigation rules

- **Fixed nav with a deterministic theme switch by scroll position** (probe at 60px below viewport top, find the section under the nav, set theme).
- **Never use `mix-blend-mode: difference`** on the nav. That's a parlour trick, not navigation.
- One CTA system: bordered ghost button in the nav, line-link in section bodies, underline-link in the footer.
- Reservations is the **only** primary CTA. Never add "Sign up", "Subscribe", "Order online", or "Book now" buttons.
- Mobile menu is a full-viewport overlay with serif typography for nav items. Not a slide-out drawer with sans labels.

---

## 10. Mobile principles

The mobile experience is **not a stacked desktop**.

- Hero must remain centred and full-bleed. The crest stays. The title stays in three lines.
- The image-as-architecture rule still applies — sections that are 50/50 on desktop become **stacked full-bleed image then full-bleed copy** on mobile, never two compressed columns.
- Tappable areas: 44px minimum, 56px preferred.
- Type scale on mobile: H1 between `2.6rem` and `3.6rem`, H2 between `2.2rem` and `2.8rem`. Don't shrink display type below `2.4rem` — it loses authority.
- Reveal animations apply identically on mobile. Don't disable motion just because you're on a phone.

---

## 11. Forbidden patterns (the no-list)

If any of these appears in a PR, reject it:

1. AI-generated imagery (any.)
2. Carousel sliders.
3. Hover lifts (`translateY` on cards).
4. Mouse-trail effects, cursor followers.
5. Parallax scroll layers.
6. `mix-blend-mode: difference` on nav.
7. `mix-blend-mode: multiply` on imagery.
8. Grain overlays.
9. Background gradients on body / sections (only on hero veil and section-blend vignettes).
10. Loading splash screens with the logo zooming in.
11. Cookie banners that take more than 1 line.
12. "Sign up to our newsletter" modals.
13. "Made with ❤️ in Belgium" or any heart-emoji-anywhere.
14. Trustpilot widgets, "as seen in" press logos, social proof bars.
15. Live chat bubbles.
16. WhatsApp / Messenger floating buttons.
17. Scroll progress bars.
18. Animated SVG illustrations of beer bottles.
19. Day/night toggles.
20. Multilingual flag emoji switchers (use `FR / EN / NL` text).

---

## 12. Future-work guardrails

When future agents extend this site (menu page, story page, contact page, English translation), preserve:

- The hero composition.
- The section rhythm (chapter mark → kicker → heading → prose → image).
- The crest as the only consistent identity element.
- The hairline-and-cream visual language.
- The voice cadence (short, nominal, restrained).

When in doubt, the question to ask is **not** "is this beautiful?" but **"is this calm?"**. Calm always wins.

---

## 13. Contact details (canonical)

These are the active contact details for the launch. Do not change them without explicit instruction:

- Email: **brasseurduchateau@gmail.com**
- Address: **Rue du Comte Théodule d'Ursel, 2 — 6940 Durbuy, Belgique**
- Instagram: **https://www.instagram.com/brasserieduchateaudedurbuy**

These appear in the footer, in mailto links, in the meta description, and in the JSON-LD structured data. If you change one, change all.

External links (Instagram, future EN site, future booking domain) must include `target="_blank" rel="noopener noreferrer"` because the demo and any embedded contexts may be sandboxed iframes.

---

## 14. Canonical brand facts (sourced)

The following facts are sourced and may be used in copy, structured data, or design treatments. Each entry names the source so future agents can verify before printing.

### People

- **Comte Jean-Michel d'Ursel** is the current Comte d'Ursel and head of the family branch at Durbuy. He is also **co-founder and co-gérant of "La brasserie du château de Durbuy, srl"** (with Marc Leclercq). He is therefore both the family voice and the brand voice in the same person. Source: Belgian public mandates registry (Cumuleo) and direct testimony.
- **Maître brasseur: Lars Kristel.** Official since **January 2026** (brewery consultant in 2024). Born 11 October 1985 in Naarden, Netherlands. Source: direct testimony from Lars Kristel.

### Where the brewmaster appears in copy

- **NOT on the homepage.** The place is the protagonist; the brewmaster stays anonymous on the home view.
- **YES on the future Le Domaine sub-page**, as a single restrained line — *"Maître brasseur depuis 2026 : Lars Kristel."* — and nowhere else without explicit creative-director sign-off.

### Production

- **2024 production: 21 brews × 500 L = 10,500 L = 105 hectolitres.** This is genuinely *petites séries* by Belgian brewing standards (≈30% the size of Westvleteren's most restricted Trappist output). The site's claims of *"production limitée"* and *"distribution confidentielle"* are empirically defensible. Source: direct testimony from Lars Kristel.
- **2025 production: not yet confirmed.** Do not invent. If similar to 2024 (≈100 hL), the *"vingt-et-un brassins"* / *"cent hectolitres"* line is robust.
- The four current beers are: **Blonde du Château**, **Bohemian Pilsner**, **IPA** (houblon Sorachi), **Amber Ale**. The Amber Ale is **plausibly the historical Marckloff** (the heritage beer revived by the Trine brothers in 1989) but this identity has not yet been explicitly confirmed by the brewery — see Known Unknowns.

### Heritage anchors (canonical, fully sourced)

These two lines may be printed without further verification. Both are corroborated in multiple secondary sources and in the d'Ursel family's own published château historique (chateaudedurbuy.be):

- **Brewing in Durbuy traces to *circa* 1560**, founded by **Philippe Marckloff** (maître d'hôtel of the seigneurie's governor Antoine de Metz) at *La Ferme au Chesne*. He established the second *brasserie franche* of the medieval town.
- **The d'Ursel/Schetz family has been the seigneurial authority over Durbuy since 30 January 1628**, when Baron Antoine Schetz de Grobendonck took the engagère for 40,000 marks of gold (described in the family's narrative as *"le Marché du siècle"*). The family acquired full ownership in 1756 for 40,000 gold florins. They remain the owners of the château today.

### Approved heritage line for the homepage (subject to Comte's blessing on first use)

> *"Brassée à Durbuy depuis le XVI<sup>e</sup> siècle, sous la garde de la famille d'Ursel depuis 1628."*

This line is the agreed baseline ("Option B" in the heritage findings document). It is fully sourced and does not depend on any contested claim. **Applied to the live site in May 2026 (Chapter II prose).** Subject to Comte Jean-Michel d'Ursel's blessing on first publication.

### Language switcher and translation policy

The live site supports four languages via an in-page JS switcher: **FR · NL · EN · DE**. Position: top-right of the nav (desktop) and at the bottom of the mobile menu overlay. Implementation: `data-i18n="..."` attributes on every translatable element, a `translations` object with all four language sets, `localStorage` persistence, and dynamic update of `<html lang="...">`.

**Translation status: draft, pending native review.** The current FR/NL/EN/DE strings were drafted by the AI agent. They are credible but **must not be considered canonical until reviewed by native speakers** in each target language:

- **FR**: native (Belgian French). This is the original; safe.
- **NL**: leans Flemish (Belgian Dutch). Word choices like *"brouwerij"* / *"het domein"* / *"op afspraak"* should be reviewed by a Flemish-speaking native. The Netherlands-Dutch register would differ.
- **EN**: uses British English conventions appropriate for European luxury hospitality (*"estate"*, *"By appointment"*, *"Please drink responsibly"*). Worth a native sweep but the risk surface is small.
- **DE**: standard German (Hochdeutsch), aimed at both Belgian German-speakers and German tourists. *"In aller Stille"*, *"Im Rhythmus des Ortes"*, *"In Maßen genießen"* — solid but should be checked by a native.

What does NOT translate:

- Brand names (*"Brasserie du Château de Durbuy"*, beer names, *"Marckloff"*).
- Place names (*"Durbuy"*, *"Ourthe"*).
- Historical proper nouns (*"Philippe Marckloff"*, *"Antoine de Metz"*, *"Nicolas de Blier"*, *"d'Ursel"*).
- Address numerals.

The country name **does** translate: *"Belgique"* / *"België"* / *"Belgium"* / *"Belgien"*. The country gets translated; the street and city stay French/local.

When you obtain native translations for any language, update the `translations` object in `redesign-template.html` and republish. The keys are documented inside the translations object (~50 keys).

### Reserved for the future Le Domaine sub-page (do NOT use on the homepage)

- The brewmaster credit (Lars Kristel).
- The four-date heritage timeline (1560 / 1609 / 1628 / 1675 / 1731 / 1989 / 2020 — see Option C in the heritage findings document).
- Any claim about a brewery in the oldest part of the château at the well to the Ourthe (Comte Jean-Michel's oral testimony only — see Known Unknowns).

### Architectural facts

- The **original château was demolished by French troops on 10–12 August 1675** (Sandar de Louvignies, Maastricht campaign), with a coup de grâce on 20 October 1675.
- The **current château is a 1731 rebuild** by the Duke d'Ursel, on the surviving substructure (foundations and cellars from the pre-1675 château).
- **Major neo-gothic modernisation in 1880–1882** by Comtesse Auguste d'Ursel (architect Thirian de Namur, advised by Viollet-le-Duc).
- The current 2020 brasserie occupies the **anciennes écuries** (former stables) of the château — a separate building from the château proper.
- **A historical brewery building** (per Comte Jean-Michel d'Ursel's direct testimony) stands at the **petite anticlinal** at the western end of the domain. It is **the oldest building still standing** on the château grounds, was not transformed in the 1731 rebuild, and contains the **old well descending to the Ourthe**. This claim is family knowledge — not documented in any public source including the d'Ursel family's own published château historique. Treat as Tier-D copy (requires explicit blessing from Jean-Michel to print). See `docs/heritage/research-findings.md` for the full evidence and `docs/heritage/brewing-deep-dive.md` for the architectural and economic context.

### Hero subtitle (canonical, May 2026)

The hero subtitle is now: ***"À son rythme, entre tradition et précision. Sans bruit."***

**Do not restore "Le brassage" at the start.** The earlier version (*"Le brassage a son rythme..."*) opened the brand by naming brewing — which inverted the château-first positioning hierarchy in §3. Removing those two words returns the subtitle to abstract atmosphere with the place itself as the implied subject. This is one of the highest-leverage editorial moves on the site; do not undo it without explicit creative-director sign-off.

Translations in NL / EN / DE are wired through the `data-i18n="hero.subtitle"` mechanism in `index.html`. The OG description (Open Graph share preview) carries the same FR line.

### Le Lieu vs La Visite — the editorial reading rhythm (canonical, May 2026)

The two half-bleed sections of the homepage are **deliberately opposite** in reading order:

- **Le Lieu (Chapter I)** — *text first, image second* (text on the left, image on the right at desktop; stacked text-then-image on mobile). Opens the page after the hero with copy-led reading.
- **La Visite (Chapter IV)** — *image first, text second* (image on the left, text on the right at desktop; stacked image-then-text on mobile). Closes the page with image-led contemplation.

This asymmetry is **the page's editorial rhythm**: page opens reading-led, page closes image-led. Do not unify them under the same column order. The rhythm was established 10 May 2026 after a deliberate side-by-side comparison.

### Photography pipeline (shipped May 2026)

All photography ships as **WebP at multiple resolutions** served via **jsDelivr CDN** in front of the GitHub repo. Full specification in `design.md` §5.5 and §5.6. Key facts for future agents:

- Source PNG masters stay in `src/assets/` for archival.
- WebP variants follow `{name}-{width}w.webp` naming.
- Foreground images use `<picture>` + `<source srcset>` + responsive `sizes`.
- Hero background uses CSS media queries to swap between 720w / 1280w / 2560w.
- URL host: `https://cdn.jsdelivr.net/gh/larskristel-max/brasserie-chateau-durbuy-2026@main/src/assets/{filename}`.
- **Do not switch the URL host back to `raw.githubusercontent.com`** — it is not designed for production traffic and was a 90%+ performance regression.
- When adding any new photograph: follow the 6-step workflow in `design.md` §5.6.

### Research archive

The brand's research lives in the repository at `docs/heritage/`:

- **`docs/heritage/research-findings.md`** — the tiered evidence document. Headline finding, the Comte's testimony, Tier A facts (citable), modern brewery canonical facts, Tier B inferences, Tier C marketing claims, source list, copy proposals A/B/C/D, open questions. **Future agents writing copy should consult this first**, then `agent.md` for the canonical brand voice.
- **`docs/heritage/brewing-deep-dive.md`** — historical context for the maître brasseur: what was brewed in 16th–17th century Wallonia, Marckloff's social position as maître d'hôtel of the governor, the economics of small-town brewing, and the staff-vs-franchise question for castle breweries. Used to ground deep brewing-history claims in the brand's communications.

When new research arrives (Pirotte 1968 finally obtained, Cercle Terre de Durbuy revue 135, family archive access), update these files in the same commit that uses the new findings on the site.

---

## 15. Known unknowns — facts NOT yet verified

This section exists because real-world facts have already been confabulated once in this repository (an early draft asserted *"Cinq cuves"* — there are not five cuves). To prevent recurrence, the following facts are **explicitly unconfirmed**. They must not appear in copy, alt text, structured data, or design treatments until the creative director has verified them.

- **The cuves count.** Unknown. **Do not invent a number.** Write around it (*"Au cœur du domaine. Au rythme du lieu."* rather than *"X cuves, Y bières."*).
- **The brewery in the oldest part of the château, at the old well to the Ourthe.** Per Comte Jean-Michel's direct oral testimony to Lars (May 2026). Architecturally and operationally plausible (the 1675 demolition means "oldest part" = surviving foundations / cellars at the rocky outcrop's base, where the well descends to the Ourthe). **However, this claim is NOT documented in any public source** — including the d'Ursel family's own published château historique on chateaudedurbuy.be. Use Option D copy only with explicit blessing from Jean-Michel d'Ursel. If approved, the line is Option D.3: *"Une brassine occupait jadis la plus ancienne partie du château, au-dessus du vieux puits descendant à l'Ourthe."*
- **The exact location of the well on an aerial map.** To be marked by Lars Kristel and recorded for the Le Domaine sub-page.
- **The Marckloff / Amber Ale identity.** The historical heritage beer "Marckloff" (revived 1989 by the Trine brothers, 6.5% ABV) is plausibly the same beer as the modern bottle line's "Amber Ale" (6.2% ABV, also amber). **This needs explicit confirmation** before the heritage copy can name "Marckloff" on the bottle page.
- **2025 and projected 2026 production volumes.** Awaiting confirmation from Lars Kristel.
- **Pre-1628 vs post-1628 origin of the château brewery.** Was it operating *before* the Schetz/d'Ursel acquisition (under d'Oostfrise / earlier seigneurs as a domanial brewery), or did it begin under the Schetz/d'Ursel administration (1628 onward, before the 1675 demolition)? Open question.
- **Whether the Marckloff family had any direct contact with the d'Ursel/Schetz family.** Possible only in the narrow window 1628–1630 (Schetz arrival → brewery transfer to de Blier). Plausible but not documented.

When an unknown is verified, **move the entry from this section into Section 14 (Canonical brand facts) with the source cited**. Do not delete the historical record of the unknown — it is a useful audit trail.

### Resolved (audit trail)

These were previously in the Known Unknowns and are now resolved. The text below is preserved so the audit trail is visible:

- ~~The 16th-century brewing claim~~ — RESOLVED. Brewing in Durbuy is documented from *circa* 1560 (Marckloff at Ferme au Chesne). See Section 14.
- ~~The d'Ursel family's exact acquisition date~~ — RESOLVED. **30 January 1628** (engagère, 40,000 marks of gold), full ownership 1756. The earlier "1726/1756" framing was wrong — 1726 is internal family inheritance from the senior Schetz line to the d'Ursel branch, within the same family.
- ~~The number of beers brewed~~ — RESOLVED. Four (Blonde du Château, Bohemian Pilsner, IPA, Amber Ale).
- ~~The construction date of the "anciennes écuries"~~ — partially resolved. The stables are part of the château complex; the current château dates from 1731 (rebuild on pre-1675 substructure), modernised 1880–1882. Specific dating of the stables themselves is still open but the broader timeframe is now sourced.
- ~~Modern production volume~~ — RESOLVED. 105 hL in 2024.

---

*Last revised: 2026-05-10 (third revision — added Section 14 Canonical brand facts with sourced production, brewmaster, and heritage anchors; renumbered Known Unknowns to Section 15; resolved several previously-open facts and preserved the audit trail). Any divergence from this document requires explicit creative-director sign-off.*
