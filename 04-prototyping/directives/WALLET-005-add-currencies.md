# WALLET-005 — Wizard step 2: additional currencies

**Goal**: Add one or more currencies beyond base, with unsupported currencies explained rather than hidden.
**Surface(s)**: all three skins.
**Inputs**: tokens, service currency catalog (incl. unsupported flags), wizard shell from WALLET-004.
**Output**: `CreateWalletStep2`.

## Acceptance
- [ ] Multi-select with search; base currency shown as already-included, not re-selectable
- [ ] Unsupported currencies visible but disabled, with the reason from the service ("USD tether pairs not yet available for business accounts" style) — B2B users need to know why, not wonder
- [ ] Selecting zero additional currencies is allowed (base-only wallet) and stated as such
- [ ] Selected set editable (chips/rows with remove) before continuing
- [ ] Announcement of selection count changes for screen readers

## Out of scope
- FX rates, balances.
