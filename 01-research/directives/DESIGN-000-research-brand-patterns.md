# DESIGN-000 — Research: existing product style + B2B wallet patterns

**Goal**: Ground the feature in the real Moneybase brand and in proven B2B multi-currency patterns BEFORE any visual exploration — so the prototype reads as a Moneybase feature, not a generic wallet.
**Surface(s)**: research note (no code, no canvas yet).
**Inputs**: public surfaces only — moneybase.com, Moneybase App Store / Play Store listings and screenshots, marketing materials. Mobbin/teardowns for: Wise Business, Revolut Business, Airwallex (multi-currency accounts, card linking, consent flows).
**Output**: `01-research/outputs/research.md` + updated brand inputs for DESIGN-001; extracted brand cues feed the token seed.

## Track A — Brand alignment (make it look like Moneybase)
- [ ] Extract from public surfaces: primary/accent colors (sampled hex), type feel (geometric/humanist, weight usage), density, corner-radius character, how cards/balances/currencies are presented today, tone of voice in UI copy
- [ ] Record as a cue sheet: "observed → token implication" (e.g. observed deep blue #NNN on primary CTAs → candidate `action.primary-bg`)
- [ ] Explicitly list what CANNOT be known from outside (internal tokens, component library, grid) and state the approximation as an assumption in README

## Track B — Pattern research (B2B multi-currency wallet + card linking)
- [ ] For each reference product: how they structure wallet creation (wizard vs single form), how currencies are added, how card linking is explained, what consent looks like, how errors are worded
- [ ] Note 3–5 patterns to adopt and 2–3 to deliberately avoid, one line of reasoning each
- [ ] Flag anything that changes our flow assumptions (e.g. base-currency mutability, wallet limits)

## Evidence
- [ ] All findings in `01-research/outputs/research.md` with source links/screenshots; committed under DESIGN-000
- [ ] Research prompts/queries logged (this is agent-driven research under direction — part of the trail)

## Out of scope
- User interviews / primary research (belongs in "validate next" in the stakeholder summary). Scraping anything non-public. Copying competitor UI verbatim.

## Learnings
_(appended on completion)_
