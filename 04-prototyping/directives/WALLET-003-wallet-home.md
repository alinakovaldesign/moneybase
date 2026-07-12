# WALLET-003 — Wallet home: default state + add-wallet entry

**Goal**: The landing view a B2B client sees: their default wallet, balances per currency, and a clear "New wallet" entry point.
**Surface(s)**: all three skins.
**Inputs**: WALLET-001 tokens, WALLET-002 service.
**Output**: `WalletHome` screen + `WalletCard`, `CurrencyRow` components.

## Acceptance
- [ ] Default wallet rendered from service (never hardcoded); per-currency balances visible
- [ ] Add wallet only — no remove/delete affordance anywhere
- [ ] Loading state: skeleton, not spinner
- [ ] Platform: iOS large-title header / Android M3 top app bar + FAB-style primary / web page header + button — each divergence via tokens/theme, not per-screen branching
- [ ] Empty-currency and single-currency layouts don't break

## Out of scope
- Wallet detail/management actions (WALLET-007). The creation wizard itself.

## Learnings
- Completed 2026-07-12; see build-log Phases 4–5 entry. Copy consumed exclusively from approved CONTENT decks via src/content/copy.ts.
