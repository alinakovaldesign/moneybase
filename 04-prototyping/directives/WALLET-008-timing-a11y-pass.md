# WALLET-008 — Timing, loading/success realism + a11y pass

**Goal**: Every async moment feels like a real regulated product; the whole flow passes WCAG 2.1 AA basics.
**Surface(s)**: all three skins.
**Inputs**: complete flow (003–007); run `design-critic` and `a11y-auditor` subagents first, fix approved findings only.
**Output**: fixes across flow + findings/accept-reject table in build log.

## Acceptance
- [ ] Skeletons for list loads, inline progress for submissions, success holds before advancing, no spinner >400ms without context text
- [ ] No optimistic UI anywhere in the money path
- [ ] `prefers-reduced-motion`: animations reduced to fades/instant
- [ ] Focus management through wizard (step change → heading), errors announced, aria-describedby wired
- [ ] All 4 required edge states re-verified per skin via failure flags; results table in build log

## Out of scope
- New features, copy rewrites beyond a11y needs.
