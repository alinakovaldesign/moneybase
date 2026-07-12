# WALLET-006 — Wizard steps 3+4: funding card + explainer + consent

**Goal**: Client selects an existing card or links a new one, understands exactly what linking means, and gives (or declines) explicit consent.
**Surface(s)**: all three skins. **The highest-judgment directive — expect interventions; copy is proposed, never final without human approval.**
**Inputs**: tokens, service (saved cards, `linkCard`), wizard shell, **approved copy decks from CONTENT-001/002** (`03-content-creation/outputs/`) — no consent/explainer/error line enters a component before its deck line is human-approved.
**Output**: `CreateWalletStep3` (card), `CardLinkExplainer`, `ConsentScreen`.

## Acceptance
- [ ] Existing cards listed (masked PAN, network, label); "link a new card" opens minimal form — test numbers only, inline validation, never logs full PAN even in mock
- [ ] Explainer before consent, ≤3 short panels: (1) this card funds this wallet, (2) which currency is charged + FX conversion happens when funding a non-base currency, (3) what the client can change later. Honest framing: no implied guarantees, conditions visible
- [ ] Consent: explicit unticked checkbox + summary of what is being agreed; **Decline is a first-class button** — declining returns to step 3 with wallet draft intact and a neutral "you can link a card later? No — card required for funding; explain that" message (decide + document in a DDR)
- [ ] Card-link failure (`?fail=cardlink`): specific message, retry, "use a different card"; draft never lost
- [ ] Confirmation step before final submit: wallet name, currencies, card — editable via back

## Out of scope
- 3DS/KYC simulation. Real card validation beyond Luhn.
