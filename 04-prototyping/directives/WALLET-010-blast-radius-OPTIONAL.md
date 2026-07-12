# WALLET-010 — OPTIONAL: Blast-radius method (Area 8 — only if 1–7 complete)

**Goal**: A repeatable way to answer "if we change one base element, what breaks or shifts?"
**Surface(s)**: all.
**Inputs**: token layer + component tree.
**Output**: `scripts/blast-radius.ts` + worked example in `docs/blast-radius-example.md`.

## Acceptance
- [ ] Script maps: token → semantic aliases → components consuming them → screens → platform overrides; emits markdown table
- [ ] Worked example: change base `input` radius/height token; list touched components+screens per platform, risk note per platform
- [ ] Note: how this surfaces pre-merge (run in CI on token-file diffs, output posted to PR)
- [ ] Note: cheapest one-platform regression signal = per-skin screenshot diff of the state matrix on token change

## Out of scope
- Full static analysis; grep+import-graph fidelity is fine.
