# design.md

## Design system & experience philosophy

A working reference for the visual and behavioural rules of the Brasserie du Château de Durbuy site. Pair with `agent.md` (creative direction). This document is the *how*; `agent.md` is the *why*.

---

## 1. Type system

### 1.1 Families

| Role | Family | Production target | Weights used |
|---|---|---|---|
| Display | Cormorant Garamond (Google) | Canela | 300, 400 (italic 300, 400) |
| Sans / micro | Inter (Google) | Suisse Int'l | 300, 400, 500 |

Never include a third family. The system holds two voices: a literary serif and a neutral sans. Anything else is noise.

### 1.2 Scale

CSS tokens, all `clamp()` so they breathe between viewports:

```css
--display-xl: clamp(3.4rem, 7.4vw, 8.6rem);   /* hero H1 */
--display-lg: clamp(2.6rem, 5.4vw, 6rem);     /* section H2s */
--display-md: clamp(1.7rem, 2.6vw, 2.9rem);   /* transition lines */
--body-lg:    clamp(1.12rem, 0.5vw + 1rem, 1.36rem);
--body:       clamp(1rem, 0.32vw + 0.94rem, 1.12rem);
--micro:      0.74rem;
--tiny:       0.62rem;
```

Tier separation matters. Hero must be visibly larger than section H2s at every viewport. If they collapse to similar sizes on tablet, the hierarchy breaks — narrow the clamps.

### 1.3 Tracking

| Style | Letter-spacing | Case |
|---|---|---|
| Display headings | `0.005em` to `0.01em` | Title Case |
| Eyebrow / kicker / nav | `0.22em` to `0.24em` | UPPERCASE |
| Body | 0 | sentence |
| Italic chapter marks | `0.04em` | `— Chapitre I —` |

**Never negative tracking on serifs.** Negative tracking compresses display type into a tech / SaaS register.

### 1.4 Italic as a second voice

Italic Cormorant carries quieter, more reflective copy: the middle line of the hero title, chapter marks, the intro / transition lines, the hero subtitle. Treat italic as if a different person were speaking.

---

## 2. Colour system

```css
--ink:           #0E0C0A;   /* primary text on cream */
--ink-soft:      rgba(14, 12, 10, 0.74);
--ink-fade:      rgba(14, 12, 10, 0.50);

--char:          #1A1612;   /* dark slabs (brewery) */
--char-deep:     #14110D;   /* footer */

--cream:         #F2EBDD;   /* primary paper */
--cream-soft:    #EDE5D2;   /* secondary panel (visite) */
--cream-on-dark: rgba(242, 235, 221, 0.92);
--cream-fade:    rgba(242, 235, 221, 0.62);
--bone:          #D9CDB6;

--copper:        #8C5E33;   /* accent, chapter marks, ABV */
--copper-light:  #A87E4F;   /* on dark sections */

--line:          rgba(14, 12, 10, 0.16);
--line-soft:     rgba(14, 12, 10, 0.10);
--line-dark:     rgba(242, 235, 221, 0.16);
--line-dark-soft:rgba(242, 235, 221, 0.10);
```

**No more colours.** No teal accent, no "secondary brand colour", no holiday palette. Adding a colour is a creative-director decision, not an implementation detail.

**No body-level gradients.** Backgrounds are flat. Gradients are reserved for two specific uses: the hero veil (legibility) and section-blend vignettes (brewery image bleeding into the dark slab).

---

## 3. Spacing & rhythm

### 3.1 Section spacing

```css
--gutter:           clamp(1.4rem, 5vw, 5.5rem);
--section-y:        clamp(7rem, 13vw, 13rem);
--section-y-tight:  clamp(5rem, 9vw, 9rem);
```

One token per role. Sections consume `--section-y` symmetrically. The tight variant exists only for adjacent sections that are intentionally close.

### 3.2 Hairlines as rhythm

Hairlines (1px solid `var(--line)` or `var(--line-dark)`) carry the structural cadence:

- Above the intro / transition lines.
- Top of the feature row.
- Above and below the private note.
- Between beer rows.
- Across the footer's bottom.

If a section feels under-structured, add a hairline before adding a border, a card, or a fill.

### 3.3 The "calm test"

If a section feels designed, you've added too much. Remove the most assertive element and look again. Repeat until calm.

---

## 4. Layout — section by section

### 4.1 Hero

- 100svh, full-bleed CSS-`background-image` (the hero is not an `<img>` — it's a div with `background-image`). Golden-hour château, `object-position: center 58%` to keep the river reflection in frame.
- **Responsive backgrounds** via CSS media queries (since CSS background-image doesn't support `srcset`): `hero-chateau-720w.webp` on phones (≤720px), `1280w.webp` as the default, `2560w.webp` for desktops ≥1281px or retina (`min-resolution: 1.5dppx`). All served via jsDelivr.
- `filter: brightness(0.74) saturate(0.94) contrast(1.05)` — the *only* photographic grade strong enough to count.
- **First-paint zoom-out (shipped May 2026):** `.hero-image` animates from `scale(1.04)` to `scale(1)` over 1600ms with `cubic-bezier(0.2, 0.8, 0.2, 1)`, `transform-origin` matching the background-position (`center 58%`). `will-change: transform` is set. Wrapped in `@media (prefers-reduced-motion: reduce) { .hero-image { animation: none; } }`. The settle is barely perceptible but registers in the body as "this site is calm". Do not tune it faster than 1.4s or steeper than 1.05× — the goal is *settle*, not *push-in*.
- Two-layer veil: a radial dim (legibility) + a top/bottom gradient (text readability).
- Centred vertical lockup: crest → eyebrow (`Durbuy · Belgique`) → three-line title (middle italic) → italic subtitle → vertical hairline.
- **Crest vignette (shipped May 2026):** `.hero-crest` carries a `::before` radial-gradient at `inset: -55%`: `rgba(14,12,10,0.22)` at 0% → `rgba(14,12,10,0.12)` at 35% → transparent at 65%, `z-index: -1`, `pointer-events: none`. Lifts the crest line-work off bright skies. Tunable — increase the centre alpha to `0.28` if the hero image gets even brighter, but do not exceed `0.32` (the vignette becomes visible as a halo).
- **Hero subtitle (canonical, FR)**: *"À son rythme, entre tradition et précision. Sans bruit."* — translated into NL / EN / DE via the `data-i18n="hero.subtitle"` mechanism. **Do not restore "Le brassage" at the start of the line** — its removal was a deliberate château-first move (the prior subtitle led with brewing, which inverted the brand's positioning hierarchy).
- Vertical scroll cue (`Entrer dans le domaine`) at bottom-right, `writing-mode: vertical-rl`, with a 1px rule above.

### 4.2 Le Lieu (Chapter I)

- Two-column grid, **min-height 92vh**, no horizontal padding on the section itself.
- **Left column (1fr): copy block**, vertically centred, `max-width: 38rem`, `margin-left: auto` so the text sits toward the right edge of its column near the image. Internal padding only.
- **Right column (1.05fr): full-bleed image** (`lieu-domaine`) at 100% height. **Left edge** has a soft cream fade where the image meets the copy panel.
- **Reading order: text first, then image** — eye lands on the copy on the left, then visual closure on the right.
- On mobile, the grid collapses to a single column with **the text appearing first** in the stack, then the image below. This is the deliberate flow that matches Le Lieu's role as the editorial opening of the page after the hero.

### 4.3 La Brasserie (Chapter II)

- Dark slab (`#1A1612`).
- Heading row: 0.9fr / 1fr split for kicker+heading vs prose.
- Image: **edge-to-edge full width**, 78vh tall. Vignettes top and bottom blend into the dark slab.
- Below the image, a single centred italic line in copper-light: *"Au cœur du domaine. Au rythme du lieu."* (replaces the earlier 5-item hairline feature row, which read as a checklist after the cinematic image).
- **Pending — to apply when the polish pass resumes:** cap the brewery image height on mobile (`@media (max-width: 880px) { .brasserie-image { height: clamp(48vh, 60vh, 28rem); min-height: 0; } }`) — currently 78vh on mobile crushes the phone screen. The 5-item feature row CSS may still be present in the stylesheet if not yet stripped — remove `.feature-row` rules in the same pass.

### 4.4 Les Bières (Chapter III)

- Stacked layout, centred.
- Sequence: heading → teaser bottle photograph (`min(100% - 2*gutter, 1080px)`) → blurred 4-column teaser roster → italic transition line.
- **Until public announcement, the labels and roster stay unreadable.** Do not print beer names, ABVs, or tasting notes in the visible markup or translations object until launch approval.
- Bottle photograph uses `filter: brightness(0.93) contrast(1.05) saturate(0.93)` to belong to the unified atmospheric world.
- **Kicker copy (shipped May 2026):** "Quatre. Brassées au château." in FR / "Vier. In het kasteel gebrouwen." in NL / "Four. Brewed at the château." in EN / "Vier. Im Schloss gebraut." in DE. The previous "Bières du domaine" was rejected because it echoed the "Les Bières" heading directly below it — a kicker's job is to *introduce a fact the heading doesn't*, not to paraphrase.
- **Lead copy (shipped May 2026):** "Chacune dans son propre tempo. Petites séries, fermentation traditionnelle." The brewing fact moved from the kicker (which now states the count + architectural fact) down to the lead, where it can breathe.
- **Tasting-note voice (canonical after public reveal):** Sense-based, domain-anchored sensory metaphor. Each note should be *flavour signal + atmospheric moment*. Do not regress to abstract descriptors ("ronde et lumineuse", "amertume délicate") — they are correct in a sommelier checklist and wrong here.
- **Ultrawide widening (shipped May 2026):** at `min-width: 1600px`, both `.bieres-image` and `.beer-list` widen from `min(100% - 2*gutter, 1080px)` to `min(100% - 2*gutter, 1280px)`, and `.beer-list` gap increases to `clamp(1.8rem, 2.4vw, 3rem)`. Brings Les Bières into the same horizontal envelope as the hero on 27"+ displays.
- Mobile: single-column beer list at 880px (skipping the 2-column intermediate). Name and ABV on the same baseline at the top of each row, notes underneath. The bottle-to-list column rhyme is lost on mobile anyway as soon as the layout stacks, so a 2-column intermediate would be a false economy.

### 4.5 La Visite (Chapter IV)

- Two-column grid, min-height 96vh — same dimensions as Le Lieu, but **deliberately opposite reading order**.
- **Left column: full-bleed domaine/château image** with the right-edge cream fade where it meets the copy panel.
- **Right column: copy** + visit grid (2 columns) + private note + reservation CTA.
- **Reading order: image first, then text** — opposite of Le Lieu. This is intentional: at the end of the page the eye is winding down, and leading with the gardens photograph creates a slower, more contemplative entry into the final section. The functional content (what to book, what's private, what's offered) sits after the photograph rather than competing with it.
- The asymmetry between Le Lieu (text→image, opening) and La Visite (image→text, closing) is **the page's editorial rhythm**: the page opens reading-led and closes image-led. Do not unify them.
- Mobile: image first, then text (stacks naturally in HTML order).

### 4.6 Footer

- Dark near-black slab.
- 4-column grid: crest + wordmark / address / reservations email / single social link.
- Hairline rule between the columns and the fine-print row.

---

## 5. Imagery

### 5.1 Source rules

- **Real photographs only.** All imagery comes from `src/assets/`.
- No AI-generated imagery, no stock photography, no royalty-free editorial substitutes.

### 5.2 Grading (single unified pass)

```css
filter: brightness(0.92–0.96) contrast(1.04–1.06) saturate(0.94–0.96);
```

The hero gets a slightly stronger treatment (`brightness(0.74)`) because text overlays it. Every other image stays close to the photographer's intent.

### 5.3 Crops

- Hero: `object-position: center 58%` (keeps river reflection visible).
- Brewery image: `object-position: center 52%`.
- All others: `center` (default).

### 5.4 Overlays

- Hero veil only.
- Brewery image vignette top/bottom (12% / 14% gradient steps to `var(--char)`).
- Right-edge cream fade on Le Lieu and La Visite where image meets cream copy panel.

**No other overlays.** No grain, no noise, no duotone, no scrim across an entire image.

### 5.5 Format, resolutions, and CDN (shipped May 2026)

**Format**: WebP for all photography. PNG masters retained in `src/assets/` for archival; WebP variants are what the site actually serves.

**Resolution policy per photograph**:

| Image | Variants | Why |
|---|---|---|
| `hero-chateau` | 720w / 1280w / 2560w | Full-bleed background — needs 3 sizes for mobile / desktop / retina |
| `brasserie-production` | 720w / 1920w | Edge-to-edge in dark slab; one large + one mobile |
| `bieres-bouteilles` | 720w / 1280w (q=80) | Centred max 1080px; quality bumped to 80 to preserve label detail |
| `lieu-domaine` | 720w / 1024w | Portrait, half-bleed; two sizes cover the responsive range |
| `visite-gate` | 720w / 1024w | Domaine/château gate image for La Visite |

**Quality**: 75 for the 720w mobile variants, 78 for desktop, 80 only for the bottle photo. Generated via Pillow with `method=6` (max compression effort).

**Naming convention**: `{name}-{width}w.webp` (e.g. `hero-chateau-1280w.webp`). The width suffix is the actual pixel width; some files are capped at the original resolution if the source is smaller than the target.

**Host**: **jsDelivr CDN** in front of the GitHub repo, no separate hosting required. URL pattern:

```
https://cdn.jsdelivr.net/gh/larskristel-max/brasserie-chateau-durbuy-2026@main/src/assets/{filename}
```

jsDelivr handles edge caching, geographic distribution, and `Cache-Control: public, max-age=604800` automatically. To bust the cache for a new version of a file, push a new commit (jsDelivr re-fetches after the cache TTL or via the `@{commit-sha}` URL pattern).

**HTML implementation**: `<picture>` element with `<source type="image/webp" srcset="... 720w, ... 1024w" sizes="(max-width: 880px) 100vw, 50vw">` and a fallback `<img>` pointing at the largest WebP. For the hero background (a CSS background-image, not an `<img>`), we use CSS media queries to swap between 720w / 1280w / 2560w by viewport width + DPR.

**Result**: total photography weight dropped from ~12 MB (PNG) to ~1 MB across all variants (90.8% reduction). Mobile loads ~500 KB of photography; desktop loads ~1.5 MB; Retina/4K loads ~2 MB.

### 5.6 When adding new photography

The workflow for adding a new photograph to the site:

1. **Source**: a high-resolution real photograph in `src/assets/` as PNG or JPEG. Master file kept for the archive.
2. **Variants**: generate WebP at appropriate widths (mobile + desktop minimum, plus retina for hero-equivalent images). Use Pillow with `method=6` and the quality presets above.
3. **Naming**: `{descriptive-name}-{width}w.webp`.
4. **Commit**: master + all WebP variants in the same commit.
5. **HTML**: use `<picture>` with `<source srcset>` and explicit `width`/`height` on the fallback `<img>` to prevent CLS. Always `loading="lazy"` and `decoding="async"` for below-fold images.
6. **Update this document** with the new image's resolution entry in §5.5.

---

## 6. Motion

| Motion | Where | Curve | Duration |
|---|---|---|---|
| Reveal on scroll | Sections (`[data-reveal]`) | `cubic-bezier(0.2, 0.8, 0.2, 1)` | 1100ms |
| Hero zoom-out (first paint) | `.hero-image` `transform: scale(1.04→1)` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | 1600ms |
| Underline-fill | Nav links | `ease` | 360ms |
| Nav CTA underline-shrink | `.nav-cta::after` scaleX(1→0.55) on hover | `cubic-bezier(0.2, 0.8, 0.2, 1)` | 380ms |
| CTA gap grow | Reservations CTA arrow | `ease` | 280ms |
| Nav theme | Background and color change | `ease` | 600–700ms |

That is the entire motion vocabulary.

**`prefers-reduced-motion` is respected.** When set, all reveal animations are cancelled (`opacity: 1; transform: none; transition: none`) and the hero zoom-out is cancelled (`.hero-image { animation: none; }`).

No parallax. No GSAP. No spring physics. No marquee. No scroll-bound 3D.

---

## 7. Navigation behaviour

### 7.1 Theme switching

- Fixed nav.
- Scroll listener probes a section at `60px` below viewport top.
- If that section is `data-theme="dark"`, nav is cream. Otherwise nav is ink.
- Backplate (`backdrop-filter: blur(12px)`) appears once `scrollY > 24`.

This is **deterministic by design.** IntersectionObserver was tried and rejected — it raced with overlapping fades.

### 7.2 Mobile menu

- Hamburger toggle replaces nav links below 920px.
- Full-viewport overlay (`rgba(14,12,10,0.98)`).
- Nav items in serif Cormorant at 1.4–2.4rem.
- Reservations CTA at the bottom of the overlay, bordered.
- `Escape` closes; tapping any nav link closes.

### 7.3 Desktop nav CTA (shipped May 2026 — Aman-style register)

- `.nav-cta` carries **no border, no background**. The underline (`::after`, `height: 1px`, `background: currentColor`) is the entire affordance.
- **Default state:** underline `scaleX(1)` from `transform-origin: left center`. The underline is always visible.
- **Hover/focus state:** underline `scaleX(0.55)` — *shrinks* from the right edge inward. 380ms `cubic-bezier(0.2, 0.8, 0.2, 1)`. This reads as confident invitation, not a clickable button.
- The previous bordered button was correct in principle but felt CMS-template; the underline register is the Aman / Six Senses / Château Margaux norm.
- **Mobile CTA inside the hamburger overlay is unchanged** — `.mobile-menu .mobile-cta` keeps the centred bordered button. In the mobile overlay context, a clear tappable target is the right call; an underline-only CTA in a vertical-stacked menu reads as a regular link.

---

## 8. Responsive principles

### 8.1 Breakpoints

```
@media (max-width: 920px)   /* nav collapses to hamburger */
@media (max-width: 880px)   /* two-column sections become stacked */
@media (max-width: 540px)   /* feature row and beer roster become single column */
@media (min-width: 920px) and (max-width: 1100px)   /* tablet portrait bridge — keeps side-by-side */
@media (min-width: 1100px) and (max-width: 1440px)  /* laptop bridge — softens type and section heights */
@media (min-width: 1600px) /* ultrawide widening — Les Bières widens to 1280px */
```

### 8.2 Stacked-section rules

When `lieu`, `brasserie-head`, `bieres`, `visite` collapse to a single column on mobile:

- Image gets `min-height: 60vh` (Le Lieu) or `64vh` (Visite).
- The right-edge cream fade is disabled (it doesn't apply to a stacked layout).
- Copy padding remains generous; never reduce internal padding below `clamp(2rem, 6vw, 3rem)`.

### 8.3 Don't mechanically optimise mobile

The mobile experience is the same emotional pace as the desktop. Same crest. Same chapter marks. Same italic register. Same reveal animations.

What changes is composition (stacked vs side-by-side), not voice or hierarchy.

### 8.4 Tablet (920–1100px) — bridge breakpoint (shipped May 2026)

Tablet portrait used to fall into the mobile bucket. **Now** a `@media (min-width: 920px) and (max-width: 1100px)` rule:

- Tightens `--display-xl` to `clamp(2.6rem, 5vw, 4.4rem)` and `--display-lg` to `clamp(2.2rem, 4vw, 3.8rem)` so the headlines don't dominate at tablet width.
- Sets `.lieu` and `.lieu-image` to `min-height: 78vh`, `.visite` and `.visite-image` to `min-height: 82vh` (down from the desktop 92/96vh) — the column heights would otherwise feel tall on tablet.
- Caps `.brasserie-image` at `clamp(54vh, 64vh, 36rem)` so the dark slab doesn't crush the screen.
- Tightens hero spacing: `.hero-stage { gap: clamp(1.2rem, 2vw, 1.8rem); }` and shrinks the crest to `clamp(72px, 8vw, 96px)`.

Verify on a real iPad / Pixel Tablet before changing these values further. The side-by-side layouts of Le Lieu and La Visite are *preserved* through this range, which was the entire point — tablets have horizontal real estate, and the editorial reading rhythm depends on the two-column composition.

### 8.5 Laptop (1100–1440px) — bridge breakpoint (shipped May 2026)

The default `clamp()` ceilings on typography and section min-heights are sized for **ultrawide monitors (1920px+)**. At typical laptop CSS widths (1280–1440px), the `vw` formulas compute values too aggressive for the visible viewport — hero title overflows below the fold, Le Lieu prose gets cropped against tall section min-heights, image columns extend visually past their text counterparts. A `@media (min-width: 1100px) and (max-width: 1440px)` rule fixes this:

- Tightens `--display-xl` to `clamp(2.8rem, 4.6vw, 4.6rem)` (down from `clamp(3.4rem, 7.4vw, 8.6rem)`) so the hero title fits comfortably inside `100svh` on laptop screens.
- Tightens `--display-lg` to `clamp(2.4rem, 4vw, 4rem)` so section headings (Le Lieu, La Brasserie, etc.) read elegant rather than dominant.
- Tightens `--section-y` to `clamp(5rem, 9vw, 9rem)` so vertical rhythm between sections feels balanced.
- Reduces `.hero` padding from `6rem var(--gutter) 5rem` to `4rem var(--gutter) 3.5rem`, freeing more vertical room for content.
- Reduces `.hero-stage` gap to `clamp(1.2rem, 1.8vw, 1.8rem)` and crest to `clamp(78px, 7vw, 100px)`.
- Reduces `.lieu` / `.lieu-image` to `min-height: 80vh` and `.visite` / `.visite-image` to `min-height: 84vh` (down from 92/96vh) so columns balance.
- Reduces `.brasserie-image` to `clamp(58vh, 68vh, 38rem)`.

This range sits cleanly between the tablet bridge (920–1100px) and the ultrawide widening (1600px+) — graceful continuity with no overlap.

### 8.6 Ultrawide (≥1600px) — widening (shipped May 2026)

At desktop widths above ~1600px, `min(100% - 2*gutter, 1080px)` constraints make the design feel small and float-y on 27"+ monitors. The shipped rule:

```
@media (min-width: 1600px) {
  .bieres-image, .beer-list { width: min(100% - 2*gutter, 1280px); }
  .beer-list { gap: clamp(1.8rem, 2.4vw, 3rem); }
}
```

This widens **only** Les Bières — the full-bleed sections (Hero, La Brasserie, Le Lieu, La Visite) already scale naturally because they fill `100vw`. Les Bières is the one centred constrained section, so it's the one that benefits.

A future widening pass could similarly tune the footer columns and the hero typography clamp ceilings — but only if the design proves to feel cramped on ultrawide after this baseline ships. Don't anticipate.

---

## 9. Editorial composition rules

### 9.1 Section structure

Every section follows this five-beat structure (skip beats only with intent):

1. **Chapter mark** — `— Chapitre N —`, italic Cormorant, copper, micro.
2. **Kicker** — uppercase Inter, copper, tiny, tight.
3. **Heading** — Cormorant, large, neutral tracking.
4. **Prose / lead** — body or body-large, ink-soft.
5. **Image** — half-bleed, full-bleed, or stacked depending on section type.

### 9.2 Asymmetry

- Asymmetry comes from *content*, not from arbitrary offsets.
- Side-by-side sections use `1.05fr 1fr` or `1fr 1fr`. No `2fr 1fr`. The page is never lopsided.
- Centred sections (Les Bières) are centred *symmetrically* — the bottle photo and beer columns share a single horizontal axis.

### 9.3 Visual silence

A section can be:
- Italic line + 1px rule + 13rem of cream. That is enough.
- A photograph + nothing. That is also enough.
- A chapter mark + a kicker + 30rem of prose. That is enough.

Three is not the magic number of elements. One is, when one is right.

---

## 10. Implementation constraints

### 10.1 HTML

- Single `index.html` for now (page is currently a one-page experience).
- Semantic markup: `<header>`, `<main>`, `<section>`, `<footer>`, `<figure>`, `<nav>`, `<ul>`, `<li>`.
- ARIA labelling on all `<nav>`, `<button>`, and the mobile menu.

### 10.2 CSS

- All styles inline in a `<style>` tag while the site lives as a single HTML artifact.
- When ported back into the Vite/React stack: tokens become a CSS variables module, sections become components, the type pair is loaded once at the app root.
- **No Tailwind. No utility classes.** This is a typographic site; class names should describe sections (`.lieu-image`, `.brasserie-head`), not utilities (`.mx-8`).

### 10.3 JS

- Vanilla. Less than 100 lines of JS in total.
- Three concerns only: reveal observer, nav theme switch on scroll, mobile menu open/close.
- No frameworks for this layer. No hydration. The site is functional without JS — JS only enhances animation.

### 10.4 Performance budgets

- HTML: ≤ 50KB.
- Total page weight on first load: ≤ 4MB (driven by photography).
- Photography in production: WebP at 1× and 2×, served via CDN with `srcset` / `sizes`.
- Lighthouse Performance: ≥ 90 mobile, ≥ 95 desktop.
- Lighthouse Accessibility: ≥ 95.

### 10.5 Accessibility

- All images have descriptive `alt` text in French.
- Color contrast meets WCAG AA at minimum: body text on cream is `#0E0C0A` on `#F2EBDD` (passes AAA); cream on `#1A1612` is the inverse (passes AAA).
- All interactive elements have visible `:focus-visible` styles.
- `prefers-reduced-motion` cancels all transitions.
- The mobile menu has proper focus trap and `Escape` handling.

---

## 11. SEO & metadata

### 11.1 Required meta

```html
<title>Brasserie du Château de Durbuy</title>
<meta name="description" content="Domaine du Château de Durbuy. Brasserie de fermentation traditionnelle, en petites séries. Jardins et dégustations sur réservation. Rue du Comte Théodule d'Ursel, 2 — 6940 Durbuy, Belgique." />
<meta property="og:title" content="Brasserie du Château de Durbuy" />
<meta property="og:description" content="Le brassage a son rythme, entre tradition et précision. Sans bruit." />
<meta property="og:type" content="website" />
<meta property="og:locale" content="fr_BE" />
<meta property="og:image" content="…/hero-chateau.png" />
```

### 11.2 Structured data

JSON-LD `FoodEstablishment` with the canonical address and email. (See `index.html`.)

---

## 12. Document maintenance

This document is the **technical and aesthetic spine** of the site. It exists so that:

- A future agent can extend the site without drift.
- A new developer can understand the system in 20 minutes.
- A creative director can audit a PR against fixed criteria.

**Maintenance rule, no exceptions:**

If a PR touches *any* of the following, it must update this document in the same PR — not the next one, not "later":

- A CSS variable in the token system (any `--*`).
- A breakpoint value.
- A motion curve, duration, or distance.
- A layout rule (column ratio, min-height, padding token).
- A photographic grade, crop, or overlay.
- A heading level used in copy markup.

If a PR ships without the matching doc update, the doc is now lying about the system, which means the next agent will trust a stale source and re-introduce the very drift this document was written to prevent. **Reject the PR until the doc is updated.**

When a *Pending* note in this document is implemented (e.g. the brewery feature row replacement, the bottle photo grade, the mobile beer list collapse), the implementing PR must:

1. Apply the change to the markup / styles.
2. Remove the *Pending* note from this document.
3. Move the new behaviour into the body of the section it belongs to.

The audit trail of what was pending and when it landed lives in the git log of this file.

---

## 13. Deploy architecture (shipped May 2026)

**The canonical production site is the single static `index.html` at the repo root.** The GitHub Actions workflow (`.github/workflows/deploy.yml`) is a no-build static publish: it copies `index.html` to `dist/` and uploads it to GitHub Pages. End-to-end deploy time is **~26 seconds**.

The Vite/React tree under `src/` is **legacy reference code only**. It is not built, not deployed, and not used in production. It remains in the repo as historical artifact:
- `src/main.tsx` — earlier React component tree (no language switcher, old subtitle, old kicker, PNG imports). Frozen.
- `src/styles.css` — earlier CSS. Frozen.
- `src/scripts.js` — earlier scroll-reveal init. Frozen.
- `package.json`, `package-lock.json`, `vite.config.ts` — Vite/npm scaffolding. Not invoked by the workflow.

When making changes:
- Edit `redesign-template.html` (the workspace demo) and `index.html` (the production source) together — they should remain byte-identical. The simplest pattern: edit `redesign-template.html`, then `cp redesign-template.html index.html` before committing.
- **Do not touch `src/`** unless you're explicitly migrating back to a build step. The React tree is out of sync with the canonical site and any change to it that isn't a full rewrite will widen the gap.

**Why static-first**: The redesign is a small (~63 KB) single-file site with inline CSS/JS and all images served via the jsDelivr CDN. Vite added no value — it was bundling a React app that wasn't shipping. A no-build static publish is faster (~30s vs ~2 min), simpler (no node_modules, no transitive vulnerabilities), and more reliable (no build to break).

If a future agent decides to migrate to a real build step (e.g. for code-splitting, type-checking, or a multi-page site), the path forward is to:
1. Rebuild the production source in `src/` to match `redesign-template.html` (this is the work that was deferred in May 2026).
2. Restore the original `deploy.yml` (with `npm ci` + `npm run build`).
3. Update this section to reflect the new architecture.

Until that work lands, **do not run `npm install` or `npm run build` against this repo**. The lockfile and config are stale; rebuilding them is its own project.

---

*Last revised: 2026-05-10 (fourth revision — May 2026 polish pass and deploy architecture change: documented hero zoom-out animation (§4.1, §6), hero crest vignette (§4.1), Aman-style underline-only nav CTA (§7.3, §6), Les Bières kicker/lead/tasting-note rewrites (§4.4), ultrawide widening at 1600px (§4.4, §8.5), tablet 920–1100px bridge breakpoint promoted from §8.4 open-gap to §8.4 shipped feature, and the new no-build static deploy architecture in §13). Implementation lives in `index.html` at the repo root (canonical) and `redesign-template.html` in workspace/repo root (workspace demo, byte-identical to `index.html`).*
