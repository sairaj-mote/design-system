# RanchiMall Design System — Documentation Site

A portfolio-ready design-system documentation site that showcases how the
RanchiMall Design System was designed **from scratch** — foundations, components,
patterns, accessibility and guidelines — built on top of the Standard UI library.

## What's inside

| Path                   | Purpose                                                   |
| ---------------------- | --------------------------------------------------------- |
| `index.html`           | The documentation site (15 pages, hash-routed)            |
| `css/main.css`         | Styles — Standard UI visual language + token-demo styles  |
| `js/design-system.js`  | Documentation renderers + navigation                      |
| `js/docs-runtime.js`   | Documentation-only popup, prompt and notification runtime |
| `js/tokens-runtime.js` | Generated runtime token data                              |
| `js/components.js`     | Generated copy of the Standard UI Web Components library  |
| `tokens/tokens.json`   | **Single source of truth** — all design tokens            |
| `tokens/tokens.css`    | Generated CSS custom properties                           |
| `evidence/`            | Evidence ledger and generated verification report         |

## Pages

- **Getting started** — Overview, Design principles, Process (how it was built)
- **Foundations** — Color, Typography, Spacing & layout, Radius & elevation, Motion, Iconography
- **Library** — Components (26, filterable), Patterns (with live demos)
- **Guidelines** — Accessibility, Do's & don'ts
- **Resources** — Token exports, links to the full Standard UI repo

## Run it

Just open `index.html` in a browser, or serve the folder:

```bash
# from the repo root
python -m http.server 8080
# then open http://localhost:8080/design-system/
```

## Build and Verify

```bash
npm test
```

This regenerates the token/component artifacts, verifies source hashes, checks token wiring and key accessibility
contracts, and writes a factual report to `evidence/verification/latest.json`.

Portfolio impact claims are tracked in `evidence/case-study.json`. Only claims marked `verified` should be used as
delivered outcomes; claims marked `needs-evidence` intentionally require dated source artifacts before publication.
See `ENHANCEMENT_WORKFLOW.md` for the source-to-artifact workflow and evidence standard for future work.

## Notes

- The color page computes **live WCAG contrast ratios against the active page surface** for every swatch.
- The patterns page renders **real live components** (form, popups, notifications,
  switch, radio, spinner, copy) — no screenshots.
- Light/dark theme toggle ships with the site and respects `prefers-color-scheme`.
- Generated artifacts are intentionally checked in for static hosting. Re-run `npm test` after changing
  `tokens/tokens.json` or `components/components.js`.
