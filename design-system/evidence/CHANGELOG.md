# Evidence Change Log

Use this log to make portfolio statements traceable. Each entry should link a factual artifact: a dated design audit, source file, test report, PR, release, research note, or adoption record.

## 2026-08-11 — Showcase hardening

- Added generated token and component artifacts with source hashes.
- Added `npm test` verification for token provenance, source-level accessibility contracts, and drift-prone CSS patterns.
- Corrected modal and notification contracts in the shared component source.
- Status: verified by `evidence/verification/latest.json`.

## 2026-08-11 — Dark-mode audit

- Rebuilt dark token propagation for live Web Component demos, including popup, prompt, form and control surfaces.
- Replaced invalid alpha color usage in status badges and selected swatch text by measured contrast rather than luminance alone.
- Browser audit verified dark popups at `rgb(27, 28, 29)`, live control hosts at `27, 28, 29` with `220, 220, 220` text, and the formerly failing mid-teal swatch at 6.36:1.
- Status: verified by browser audit and `npm test`.

## 2026-08-12 — Responsive spacing audit

- Audited all 15 documentation routes at 390px, 768px, and 1440px for overflow, clipping, header/nav collision, and component spacing.
- Collapsed documentation tables to one column on mobile, constrained the largest spacing-scale bar, and removed the 211px/68px internal page overflows.
- Raised checkbox, radio and switch host targets to 24px minimum; component/resource-card links now have 32px targets.
- Final 390px browser scan: 15/15 routes with zero document/page overflow and zero clipped text.

## Evidence Intake Template

| Date       | Change       | Claim affected            | Artifact                                                | Verification                         |
| ---------- | ------------ | ------------------------- | ------------------------------------------------------- | ------------------------------------ |
| YYYY-MM-DD | What changed | Exact portfolio statement | Link/path to audit, PR, screenshot, research or release | Command, reviewer or measured result |

## Claim Rules

- `verified`: traceable to a concrete artifact and reproducible command.
- `planned`: intended work; never present it as delivered.
- `needs-evidence`: may be true, but do not use it in portfolio copy until artifacts are added.
- Avoid invented adoption, time-saved, conversion, accessibility, or defect-reduction metrics.
