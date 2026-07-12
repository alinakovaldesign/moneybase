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
