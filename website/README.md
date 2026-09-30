# Sairaj Mote — UI/UX Design & Development Portfolio

An interactive portfolio and design-system case study showing how I bring UX, interface design and frontend implementation together. It documents the RanchiMall Design System, which I designed and developed while working at RanchiMall and which is currently in use there.

## What's inside

| Path | Purpose |
| --- | --- |
| `index.html` | Portfolio and documentation site with hash-based navigation |
| `css/main.css` | Portfolio and documentation styles |
| `js/design-system.js` | Page renderers, component data and navigation |
| `js/docs-runtime.js` | Documentation popup, prompt and notification runtime |
| `js/tokens-runtime.js` | Generated runtime token data |
| `js/components.js` | Generated copy of the Web Components library |
| `tokens/tokens.json` | Source of truth for design tokens |
| `tokens/tokens.css` | Generated CSS custom properties |
| `evidence/` | Case-study claim ledger and verification reports |

## What the portfolio demonstrates

- Product thinking and user-centered interaction design
- Design foundations, tokens and a reusable component system
- Responsive interface patterns and accessibility considerations
- Frontend implementation with native Web Components

The project documents implementation details that can be verified in this repository. It does not claim measured business impact without supporting project evidence.

## Run it

Open `index.html` directly, or serve the repository root:

```sh
python -m http.server 8080
```

Then visit `http://localhost:8080/website/`.

## Build and verify

```sh
npm test
```

This regenerates token and component artifacts and checks source hashes, token wiring and selected accessibility contracts.
