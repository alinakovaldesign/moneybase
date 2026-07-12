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

## Learnings
- Money as integer minor units + a single `Intl.NumberFormat('en-MT')` formatter (DDR-003): `formatToParts` gives the split-size balance pattern (big integer, de-emphasized decimals) for free — no string surgery.
- Domain errors carry a `recovery` field — the service layer feeds CONTENT-002's "what do I do now" rule, so error UX honesty is enforced below the UI.
- `linkCard` refuses without explicit consent server-side: the mock enforces what the consent screen promises, which makes the consent-declined path testable end-to-end.
- `?fail=unsupported` flags an extra normally-supported currency (CHF) rather than only using always-unsupported ones — makes the edge state demonstrable on any picker screen live in the walkthrough.
