# DESIGN-002 — Direction lock + token extraction (canvas → code handoff)

**Goal**: Choose one direction from DESIGN-001 and extract it into concrete token values — the exact point where design intent becomes code.
**Surface(s)**: canvas → `02-design-system/tokens/tokens.seed.json`.
**Inputs**: DESIGN-001 exports + verdicts.
**Output**: updated `tokens.seed.json`, DDR documenting the choice, frozen canvas snapshot.

## Acceptance
- [ ] Chosen direction recorded as a DDR (`docs/decisions/DDR-00X-visual-direction.md`) with the rejected directions and why
- [ ] Extraction table committed: canvas value → token name (color ramp, type scale, radius, spacing rhythm, motion feel) — every semantic token in the seed traces to the canvas or is explicitly marked "system default, not design-driven"
- [ ] `tokens.seed.json` updated with extracted values; WALLET-001 consumes this, not the original placeholder palette
- [ ] Anti-drift lock applied: final canvas export + share link committed to `evidence/design-sessions/DESIGN-002/`; canvas is now a frozen sketch — any later visual idea re-enters only via a new DESIGN directive
- [ ] If Claude Code's DesignSync / import-from-URL is available, use it for the pull and note it in the build log; otherwise manual extraction is fine — the table is the artifact either way

## Out of scope
- Component code. Platform themes (WALLET-001 owns those).

## Learnings
_(appended on completion)_
