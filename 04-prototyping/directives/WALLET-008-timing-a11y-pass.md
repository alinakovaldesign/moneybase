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

## Learnings
- Reviewer subagents caught what six rounds of human visual review could not: a broken code path (new-card linking) invisible unless you type a full card number, and a silent duplicate-at-submit. Static code review and visual review are complementary, not redundant.
- The token-first architecture made the AA contrast fix a three-token change (DDR-004) — the whole point of semantic tokens, demonstrated.
- var(--focus-ring, fallback) fallbacks never fire when the token is explicitly `none` — platform overrides must not weaponize CSS custom-property fallbacks.
- Money-path ordering rule: validate everything cheap BEFORE exercising the consented action; consent maps to exactly one commitment.
