# WALLET-009 — The design-carrying PR

**Goal**: One reviewable design-system change moved through PR like code — the assessment's Area 3 centerpiece.
**Surface(s)**: token layer → all three skins.
**Inputs**: the token/component delta spec produced by DESIGN-003 (a real observation from using the flow, iterated on canvas — e.g. control radius too playful for B2B consent screens; type scale step between explainer body and legal line too small). PR references both DESIGN-003 and WALLET-009.
**Output**: branch + PR using `docs/design-pr-template.md`.

## Acceptance
- [ ] Change is at the SEMANTIC token level (demonstrates one-source-of-truth propagation)
- [ ] PR body: motivation, token diff table, before/after screenshots **per platform skin**, blast list (every component/screen touched), a11y re-check note (contrast/targets unaffected?)
- [ ] Description actionable by a reviewer who didn't build the system
- [ ] Commits reference WALLET-009; directive committed on the branch before the change

## Out of scope
- Merging without human review. Component-level workarounds.

## Learnings
- The round trip validated the whole pipeline: shipped screenshot → canvas critique (2a/2b with rationale) → delta spec → branch → PR with token diff/blast radius → human merge. Canvas proposals arrive with concrete values because the canvas medium is HTML — extraction stayed deterministic.
- New chart.* tokens flowed to CSS/Swift/XML in one generator run — additive design changes are one-commit affairs in a token-first system.
- Financial rounding note: summing per-currency conversions rounded to the cent differs from rounding the sum (±2c vs canvas) — real products must pick a rule; ours: round per currency, then sum.
