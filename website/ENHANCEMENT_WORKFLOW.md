# Enhancement Workflow

This folder is a portfolio case study and a static documentation site. Treat every change as a source change, a generated-artifact update, a verification result, and (when relevant) an evidence update.

## Supported Sources

| Change type                           | Edit this source                                     | Generated/derived files                                |
| ------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------ |
| Token                                 | `tokens/tokens.json`                                 | `tokens/tokens.css`, `js/tokens-runtime.js`            |
| Shared component                      | `../components/components.js`                        | `js/components.js`, root/layout distribution copies    |
| Documentation content, specs, routes  | `js/design-system.js`, `index.html`, `css/main.css`  | none                                                   |
| Docs-only popup/notification behavior | `js/docs-runtime.js`                                 | none                                                   |
| Portfolio claim                       | `evidence/case-study.json` + `evidence/CHANGELOG.md` | `evidence/verification/latest.json` after verification |

Never edit generated files directly. Their first comment identifies the source and source hash.

## Change Loop

1. Describe the user problem and expected outcome in the pull request or evidence log.
2. Make the smallest source-level change.
3. Add or strengthen a check in `scripts/verify-design-system.js` when the change prevents a regression.
4. Run `npm test`.
5. Record the evidence:
   - implementation facts: source path + passing verification result;
   - user/business outcomes: dated research, release, adoption, or measurement artifact.
6. Only promote a case-study statement from `needs-evidence` to `verified` after an artifact exists.

## Verification Contract

`npm test` runs two steps:

- `npm run build:design-system` generates token CSS/runtime and synchronized distribution artifacts from source hashes.
- `npm run verify:design-system` validates source provenance, token wiring, popup/notification accessibility contracts, docs runtime behavior contracts, drift-prone CSS rules, and evidence statuses.

The machine-readable result is written to `evidence/verification/latest.json`. A failed check blocks the change; do not manually edit the report.

## Evidence Standard

Use measured language.

- Good: "26 native custom elements are defined" with source inventory and verification output.
- Good: "The token runtime is generated from tokens.json" with source hash and passing test.
- Not yet publishable without an artifact: "Reduced delivery time", "Improved conversion", "Adopted by N teams", or "Eliminated accessibility defects".

Capture those claims with before/after delivery samples, dated audit boards, accessibility reports, release records, team adoption notes, issue trends, or product analytics.
