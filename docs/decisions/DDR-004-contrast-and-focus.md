# DDR-004 — AA contrast: text-safe blue split; focus visible on all skins

**Context**: The a11y audit measured white-on-#16A0F6 (primary CTAs) at **2.84:1** and #16A0F6 links at 2.62–2.84:1 — failing WCAG 2.1 AA (4.5:1). The color is inherited from the real Moneybase product, which fails the same check. Separately, iOS/Android skins had `--focus-ring: none`, removing keyboard focus visibility on two of three presentations.

**Decision**:
1. **Token split — graphic blue vs text-bearing blue.** `blue.500 #16A0F6` stays for non-text uses (icons, active nav, progress, tints). New `blue.700 #0074C2` (4.91:1 on white) carries text: `action.primary-bg`, `text.link`, `border.focus`; hover `blue.800 #005FA3`. Amber accent already passes (7.62:1).
2. **Focus rings visible on every skin.** The prototype runs in a browser; keyboard users exist regardless of the simulated platform (WCAG 2.4.7). Platform blocks now emit `visible-ring` universally, with the guideline note updated.

**Alternatives rejected**:
- Keep product blue everywhere + document as known issue — rejected: the assessment's own charter requires the a11y pass to be clean, and the fix is a token-level one-liner precisely because the system was built token-first.
- Darken only button fill, keep light links — rejected: links fail worse (13px), inconsistent blues read as a mistake.

**Consequences**: Primary CTAs and links are a step deeper than the product's blue — visible in side-by-side comparison, imperceptible in isolation. **Product recommendation for Moneybase** (joins DDR-003's list): the production palette fails AA on its primary actions; a text-safe blue tier would fix it product-wide.

**Approval**: agent-implemented per QA mandate. ✅ **Signed off by Alina Koval, 2026-07-13** ("DDRs signed off", session transcript) — the deeper text-safe blue stays.
