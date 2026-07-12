# Design PR template

**Directive**: WALLET-NNN
**Type**: token change / component change / new pattern

## Motivation
What was observed in the product (not "looked better") — one paragraph.

## Change
| Token / component | Before | After | Level |
|---|---|---|---|
| | | | semantic / primitive / platform |

## Visual evidence
Before/after screenshots, one row per platform skin (iOS / Android / web). A design PR without per-platform visuals is not reviewable.

## Blast radius
Components and screens this propagates to (generated or hand-listed):

## Checks
- [ ] Contrast ratios still pass (list affected pairs)
- [ ] Touch targets unaffected or re-verified
- [ ] No component bypassed the token layer to absorb this change
- [ ] Guideline alignment: which of HIG / M3 / web conventions this touches and how

## How to review with confidence
1. Pull branch, run app, use the platform switcher on screens X, Y.
2. Compare against screenshots above.
3. Check the token diff is the ONLY code change (git diff --stat).
