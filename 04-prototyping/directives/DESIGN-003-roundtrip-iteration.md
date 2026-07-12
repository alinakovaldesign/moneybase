# DESIGN-003 — Round-trip: iterate one shipped moment on canvas, land it via PR

**Goal**: Take one built screen back into Claude Design, iterate on it against the real screenshot, and land the accepted change in code through the design-carrying PR — proving the handoff works in BOTH directions without drift.
**Surface(s)**: live app screenshot → Claude Design → token/component deltas → WALLET-009 PR.
**Inputs**: completed flow (WALLET-003..008), a real observation from using it (candidate: consent screen feels too dense / success moment too abrupt / wallet card hierarchy).
**Output**: canvas session evidence + a delta spec that WALLET-009 implements.

## Acceptance
- [ ] Canvas session starts from an actual screenshot of the shipped screen (not a redraw) — committed alongside the iterations
- [ ] Iteration prompts logged verbatim in `evidence/design-sessions/DESIGN-003/prompts.md`
- [ ] Accepted outcome expressed ONLY as token/component deltas (e.g. `semantic.radius.control: 10px → 8px`, consent type scale step) — no "make it look like this picture" handoff
- [ ] Deltas become the input of WALLET-009; the PR references both DESIGN-003 and WALLET-009
- [ ] Rejected canvas ideas listed with reasons (drift prevention is also about what you say no to)

## Out of scope
- Implementing the change here (WALLET-009 owns the code). New features.

## Learnings
_(appended on completion)_
