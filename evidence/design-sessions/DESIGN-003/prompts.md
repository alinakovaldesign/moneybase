# DESIGN-003 — Round-trip session (verbatim)

- **Canvas**: Claude Design project "Moneybase B2B Wallet Design"
  https://claude.ai/design/p/1ad04ece-20d3-424a-932c-5acf5a27f1c7 (sections 2a/2b; input screenshot at `uploads/Screenshot 2026-07-13 at 20.53.57.png` in the project)
- **Input**: screenshot of the SHIPPED wallet detail screen (http://localhost:5199/wallet/wallet-1) — a real screen back to canvas, per the round-trip rule.

## Human prompt (verbatim)

> this is the implemented wallet detail screen. Recreate it and propose improvements — I want it to feel more ux advanced and scannable

## Claude Design output (rationale, verbatim)

> Added at the top of the canvas: 2a is the faithful recreation; 2b is the proposed rework. What changed in 2b and why:
>
> One currency list, not two. The chips row and the balances card listed the same three currencies — 2b merges them into a single tappable list (with BASE badge and "Add currency" as a row), cutting a full scroll-band of redundancy.
> Hero shows total wallet value (≈ €28,548) across all currencies, not just the EUR pocket — that's the number a finance operator actually wants at a glance. Non-EUR rows carry their ≈ EUR equivalent, with a "Rates as of 09:41" stamp for honesty.
> A thin distribution bar under the total shows currency mix (87/9/4) — instant exposure read, no chart clutter.
> Compact nav header (back + name on one line) buys back ~120px of vertical space, so everything above the funding card fits without scrolling.
> Funding card demoted below balances and annotated "charges in EUR", tying back to the consent copy.
> If the total-value hero is too big a data/backend change, the EUR-equivalent sub-values and merged list are worth doing on their own.
> Fixed: 2b total now reads ≈ €28,748.10 (matching 24,850.00 + 2,870.85 + 1,027.25) and the distribution bar/legend is corrected to 86/10/4.

## Accepted delta spec (feeds WALLET-009)

1. **Merged currency list** — chips row removed; single tappable list with BASE badge on the base row and "Add currency" as the final row.
2. **Total-value hero** — `Total value · EUR` caption, `≈ €28,748.10` (sum of all balances converted at mock rates), decimals de-emphasized; non-EUR rows show `≈ €` equivalents; `Rates as of HH:MM` honesty stamp.
3. **Distribution bar** — 4px segmented bar of currency mix + dot legend (EUR 86% · USD 10% · GBP 4%).
4. **Compact header** — back chevron + wallet name (+ rename pencil) on one line.
5. **Funding card demoted** below balances, subtitle `Funding card · charges in EUR` (ties to consent copy).

Human decision: implement in full (including the hero — mock service takes rates).
