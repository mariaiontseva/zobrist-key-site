# Platform page — design

**Date:** 2026-07-25
**Status:** implemented

## Goal

Add a second page, `platform.html`, presenting the Zobrist Key software
platform — the material the services landing page deliberately left out
(per the original SPEC: "платформа, Protection Index — это отдельная
страница"). Content and screenshots are drawn from the pitch deck's
platform slides.

## Scope

Product only. Intro/thesis + four feature sections + a contact CTA.
The investment / "use of funds" (SEIS/EIS) material from the deck is
**out of scope** — investor-facing, not for the public site.

## Content (from the pitch deck, verbatim)

1. **Intro / thesis** — eyebrow "The platform", H1 "One platform runs it all.",
   lead, and a practice/platform pair:
   - The practice → A vetted senior team in the field.
   - The platform → One Protection Index, trended and accountable.
2. **Overview** — "One live picture. One score." (`overview.webp`)
3. **Residences** — "Every property. One map." (`residences.webp`)
4. **Pattern of life** — "Behaviour, quantified." (`pattern.webp`)
5. **Digital footprint** — "Erase the digital trail." (`digital.webp`)

Each feature: path eyebrow (`Platform · X`), H2, sub-paragraph, 3–4 bullets,
an `app.zobristkey.com/…` URL, and a full-width screenshot in a framed card.

## Design

- Same design system as the landing page — reuses tokens and the header,
  hero, footer, `.eyebrow`, `.h2`, `.lead`, `.btn`, `.kn`, reveal, and
  sticky-header behaviour from `styles.css`. No new dependencies.
- Feature layout: a constrained text head, then the screenshot full container
  width beneath it — chosen over a two-column split because the screenshots
  have varied aspect ratios (one portrait, three landscape) and a stacked
  layout keeps them large and consistent.
- Screenshots sit in a subtle browser-chrome frame (three dots + the app URL
  in mono), echoing the deck.
- CTA band (centred) links to the contact form on the home page.

## Navigation

`Platform` is added to the header nav on **both** pages
(Problem / Approach / Services / Platform / Contact). On the platform page the
section links point back to `index.html#…`; on mobile only the Contact CTA
shows, matching the existing landing-page pattern.

## Assets & performance

- Screenshots exported from `deck-assets/*.png` (≈2078px, up to 700 KB each)
  to **WebP** at 1600px wide, q82 → ~380 KB total for all four.
- Stored in `assets/platform/`. `loading="lazy"`, `decoding="async"`, explicit
  `width`/`height` to avoid layout shift, descriptive `alt` text.

## Routing

Static `platform.html` at the repo root so all asset paths stay relative.
Linked as `platform.html` / `index.html#…`. Served by GitHub Pages on push.
