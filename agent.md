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

## 14. Known unknowns — facts to verify before they appear in copy or markup

This section exists because real-world facts have already been confabulated once in this repository (an early draft asserted "Cinq cuves" — there are not five cuves). To prevent recurrence, the following facts are **explicitly unconfirmed**. They must not appear in copy, alt text, structured data, or design treatments until the creative director has verified them.

- **The cuves count.** Unknown. **Do not invent a number.** If you need a brewing-equipment reference in copy, write around it ("Au cœur du domaine. Au rythme du lieu." rather than "X cuves, Y bières.").
- **The 16th-century brewing claim.** There is anecdotal mention of a brewer and brewery present at the Château de Durbuy in the 16th century. This claim is currently **under research** — a tiered findings document is in progress. Until that document lands and the creative director chooses what to use, **do not echo the claim in copy**, even in soft form ("brassée depuis...", "héritage séculaire...", "depuis le XVIᵉ siècle..."). The temptation to anchor heritage with a century reference is real; resist it until the source is confirmed.
- **Named historical brewers, brewing-master records, specific dates of operation or interruption.** Unknown. Do not invent.
- **The d'Ursel family's exact acquisition date and the construction date of the "anciennes écuries"** the brasserie occupies. Unknown. The street address (`Rue du Comte Théodule d'Ursel`) is a strong hint that the d'Ursels were patrons; that does not authorise printing a date.
- **The number of beers brewed.** Currently **four** (Blonde, Bohemian Pilsner, IPA, Amber Ale). If this changes, every reference to "Quatre" in copy must change with it — including the hero kicker, the visit grid, and the brewery prose.

When an unknown is verified, **move the entry from this section into the body of the relevant section (4, 5, etc.) with the source cited in a comment in the markup**. Do not delete the historical record of the unknown — it is a useful audit trail.

---

*Last revised: 2026-05-10. Any divergence from this document requires explicit creative-director sign-off.*
