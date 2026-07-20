# Zobrist Key — Services landing page

One-page site for the protective-services practice. Dark cinematic theme,
single accent, shared visual language with the pitch deck.

Built from the design handoff (`SPEC.md`) — static **HTML + CSS + vanilla JS**,
no build step, no dependencies. Single typeface: [Manrope](https://fonts.google.com/specimen/Manrope).

## Structure

```
index.html      — markup (header → hero → problem → approach → services → contact → footer)
styles.css      — design tokens (:root) + component styles
main.js         — reveal-on-scroll, sticky-header compaction, form UI state
assets/
  knight.svg        — knight mark, fill: currentColor
  knight-black.svg  — knight mark, fill #000 (used as CSS mask for tinting)
  favicon.svg       — white knight on black, square browser icon
```

## Run locally

No build needed — open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000   # → http://localhost:8000
```

## Design notes

- **Tokens** live in `:root` in `styles.css` (colors, container width, spacing).
- The **knight mark** is tinted via CSS `mask` (`.kn`) so it takes any color/opacity.
- **Responsive without media queries** — `clamp()` for type/spacing, `flex-wrap`
  and `grid auto-fit` for reflow. No horizontal scroll down to 375px.
- **Reduced motion** respected: reveal elements are shown immediately.
- The contact form is **UI-only** — submit shows the "Request received" state.
  Wire up a backend/endpoint at integration time (see `initForm` in `main.js`).
