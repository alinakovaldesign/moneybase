# DDR-002 — Visual direction lock: "Product-faithful light, amber conversion"

**Context**: DESIGN-001 explored the four key moments on the Claude Design canvas against three candidate directions from the prompt pack (A product-faithful, B dense B2B-operator, C calm ledger). The canvas converged on one coherent system; DESIGN-002 must lock it before tokens exist in code.

**Decision**: Lock the canvas direction — light theme faithful to today's Moneybase feature screens (white cards on `#F4F6F9`, blue `#16A0F6` primary actions, circular icon-buttons, split-size balances), with **amber `#FFBD00` reserved for the single conversion CTA** ("New wallet" — mirroring the web product's Sign Up/Continue), Nunito 800 as the display face, Open Sans for UI. Effectively a merge: direction A's language + direction B's amber emphasis and B2B restraint.

**Alternatives rejected**:
- **B (full dense navy operator)** — killed: diverges from the product B2B users already know (same app serves both segments); density measurably hurts the explainer/consent comprehension this feature depends on.
- **C (calm ledger)** — killed: reads as Wise, not Moneybase; loses brand identity for airiness the flow doesn't need.
- **Dark theme** — deferred, not killed: the real product's home is dark, but every in-product feature screen observed is light; this flow lives in feature-screen territory. Dark variants noted as design-system follow-up.

**Consequences**: Tokens extract deterministically from the canvas (see `02-design-system/extraction-DESIGN-002.md`). Amber's scarcity is now a rule (one accent CTA per journey), enforced at the token level via `action.accent-*` usage guidance. The canvas is frozen; visual iteration re-enters via DESIGN-003 only.

**Approval**: drafted by the agent from the human's canvas decisions; direction choice itself was made by the human on canvas. ✅ **Signed off by Alina Koval, 2026-07-13** ("DDRs signed off", session transcript).
