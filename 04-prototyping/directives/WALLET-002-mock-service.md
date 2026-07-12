# WALLET-002 — Mock service layer with latency + failure injection

**Goal**: A single in-memory data layer all screens read/mutate, with realistic timing and controllable failures.
**Surface(s)**: shared.
**Inputs**: none external. Mock data only — test-pattern PANs (4242…), fictional company "Aster Logistics Ltd".
**Output**: `app/src/services/walletService.ts` + seed data.

## Acceptance
- [ ] Seeded state: 1 default wallet (EUR base, "Operating Wallet"), 2 saved cards (one corporate Visa, one Mastercard), currency catalog with ≥10 currencies of which 2 flagged unsupported (with reason strings)
- [ ] All async calls resolve in 400–1400ms (randomized), typed responses
- [ ] Failure injection via URL flags: `?fail=duplicate`, `?fail=unsupported`, `?fail=cardlink`, `?fail=consent` — each produces the domain error, not a generic throw
- [ ] Duplicate wallet-name check is case/whitespace-insensitive
- [ ] No network calls anywhere

## Out of scope
- UI. Persistence beyond memory.
