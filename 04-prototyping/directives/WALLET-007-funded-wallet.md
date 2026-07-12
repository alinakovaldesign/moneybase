# WALLET-007 — Success + funded wallet state

**Goal**: Land the client on the new wallet with the linked card visible and manageable.
**Surface(s)**: all three skins.
**Inputs**: tokens, service, everything prior.
**Output**: `WalletDetail` screen + success transition.

## Acceptance
- [ ] Success moment: confirmation state holds ~1.2s (respecting reduced-motion) before landing on the wallet — no abrupt jump
- [ ] Wallet detail: name, currencies with zero balances, linked card block (masked PAN, network, "funding card" label)
- [ ] Card manageable: view details, rename label; unlink present but disabled with tooltip "an active wallet needs a funding card — link a replacement first" (B2B permissions story, documented as DDR)
- [ ] New wallet also now appears on WalletHome
- [ ] Deep-linkable route (shareable demo URL for the walkthrough)

## Out of scope
- Funding/top-up transactions. Statements.
