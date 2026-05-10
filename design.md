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

- 100svh, full-bleed background image (golden-hour château), `object-position: center 58%` to keep the river reflection in frame.
- `filter: brightness(0.74) saturate(0.94) contrast(1.05)` — the *only* photographic grade strong enough to count.
- Two-layer veil: a radial dim (legibility) + a top/bottom gradient (text readability).
- Centred vertical lockup: crest → eyebrow (`Durbuy · Belgique`) → three-line title (middle italic) → italic subtitle → vertical hairline.
- Vertical scroll cue (`Entrer dans le domaine`) at bottom-right, `writing-mode: vertical-rl`, with a 1px rule above.

### 4.2 Le Lieu (Chapter I)

- Two-column grid, **min-height 92vh**, no horizontal padding on the section itself.
- Left column (1.05fr): full-bleed image (`lieu-domaine.png`) at 100% height. Right edge has a soft fade into cream.
- Right column (1fr): copy block, vertically centred, `max-width: 38rem`, internal padding only.

### 4.3 La Brasserie (Chapter II)

- Dark slab (`#1A1612`).
- Heading row: 0.9fr / 1fr split for kicker+heading vs prose.
- Image: **edge-to-edge full width**, 78vh tall. Vignettes top and bottom blend into the dark slab.
- Feature row: 5-column hairline grid below the image.

### 4.4 Les Bières (Chapter III)

- Stacked layout, centred.
- Sequence: heading → bottle photograph (`min(100% - 2*gutter, 1080px)`) → 4-column beer roster aligning under the bottles → italic transition line.
- **The list aligns column-by-column to the bottles in the photo above.** Beer order in the markup matches bottle order in the photo (left to right: Blonde, Bohemian Pilsner, IPA, Amber Ale).

### 4.5 La Visite (Chapter IV)

- Two-column grid, min-height 96vh, identical mechanics to Le Lieu.
- Left column: full-bleed gardens image with the same right-edge cream fade.
- Right column: copy + visit grid (2 columns) + private note + reservation CTA.

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

---

## 6. Motion

| Motion | Where | Curve | Duration |
|---|---|---|---|
| Reveal on scroll | Sections (`[data-reveal]`) | `cubic-bezier(0.2, 0.8, 0.2, 1)` | 1100ms |
| Underline-fill | Nav links | `ease` | 360ms |
| CTA gap grow | Reservations CTA arrow | `ease` | 280ms |
| Nav theme | Background and color change | `ease` | 600–700ms |

That is the entire motion vocabulary.

**`prefers-reduced-motion` is respected.** When set, all reveal animations are cancelled (`opacity: 1; transform: none; transition: none`).

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

---

## 8. Responsive principles

### 8.1 Breakpoints

```
@media (max-width: 920px)   /* nav collapses to hamburger */
@media (max-width: 880px)   /* two-column sections become stacked */
@media (max-width: 540px)   /* feature row and beer roster become single column */
```

### 8.2 Stacked-section rules

When `lieu`, `brasserie-head`, `bieres`, `visite` collapse to a single column on mobile:

- Image gets `min-height: 60vh` (Le Lieu) or `64vh` (Visite).
- The right-edge cream fade is disabled (it doesn't apply to a stacked layout).
- Copy padding remains generous; never reduce internal padding below `clamp(2rem, 6vw, 3rem)`.

### 8.3 Don't mechanically optimise mobile

The mobile experience is the same emotional pace as the desktop. Same crest. Same chapter marks. Same italic register. Same reveal animations.

What changes is composition (stacked vs side-by-side), not voice or hierarchy.

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

## 12. What this document is for

This document is the **technical and aesthetic spine** of the site. It exists so that:

- A future agent can extend the site without drift.
- A new developer can understand the system in 20 minutes.
- A creative director can audit a PR against fixed criteria.

If you change a token, a breakpoint, a motion curve, or a layout rule — update this document in the same PR.

---

*Last revised: 2026-05-10. Implementation lives in `index.html` (current single-file demo) and will migrate to the Vite/React tree under `src/` in a subsequent commit.*
