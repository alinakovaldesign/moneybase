# WALLET-004 — Wizard step 1: name + base currency

**Goal**: Client names the wallet and picks a base currency, with duplicate names caught early and kindly.
**Surface(s)**: all three skins.
**Inputs**: tokens, service (`checkName`, currency catalog), wizard shell (create it here: stepper, back behavior, cancel-with-confirm).
**Output**: `CreateWalletStep1` + wizard container.

## Acceptance
- [ ] Name field validates on blur AND submit; duplicate error inline, next to field, plain language ("You already have a wallet called…"), suggests a variant
- [ ] Base currency picker: searchable, common B2B currencies first; explains what "base currency" means in one line (B2B users still deserve it)
- [ ] Continue disabled until valid; validation errors announced (aria-live)
- [ ] Wizard: step indicator, back preserves entered data, cancel asks before discarding
- [ ] Sheet presentation iOS / full-screen dialog Android / centered modal web

## Out of scope
- Steps 2–4. Additional currencies.
