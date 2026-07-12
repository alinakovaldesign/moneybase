# CONTENT-001 — Consent + card-link explainer deck

> ✅ **APPROVED 2026-07-12** — human: "approve all recommended". Every ★ line is approved for components; non-★ variants are rejected and remain below as evidence. Findings F1/F2 resolved via C3-B and D1-B. Implemented in `app/src/content/copy.ts` (IDs match).

Single copy source for WALLET-006. **No line enters a component until its ✅ is set by the human.**
Variant A = your canvas copy (already designed). Agent adds variants + rationale; recommendation marked ★.
Names are dynamic: `{card}` = "Visa •• 4242", `{wallet}` = wallet name, `{base}` = base currency.

---

## ⚠️ Two consistency findings (agent content-QA, need your ruling)

**F1 — Explainer panel 3 vs consent bullet 3 contradict each other.**
Canvas explainer: "Change or unlink the funding card anytime… **A new card must be linked first.**"
Canvas consent bullet: "You can **unlink this card anytime** in wallet settings." ← states the permission *without* the condition. Honesty rule says conditions visible. Recommendation: align bullet 3 to the conditioned version (see line C3).

**F2 — Decline reassurance describes the wrong destination.**
Canvas: "Declining returns you to **your wallet**." But at consent time the wallet doesn't exist yet — decline returns to card selection with the draft intact (per WALLET-006). Recommendation: line D2-B.

---

## Explainer — "How card funding works" (3 panels)

| # | Line | Rationale | Approve |
|---|---|---|---|
| E1 title | A★: **Your card funds this wallet** | Plain, possessive, matches canvas | ☐ |
| E1 body | A: "{card} feeds {wallet} whenever you add money." | "feeds" is friendly but vague about actor | ☐ |
| | B★: "When you add money, we charge {card} and it lands in {wallet}." | Names the actor ("we charge") — regulated-product precision | ☐ |
| E2 title | A: **Charges are in {base}** | factual | ☐ |
| | B★: **You're charged in {base}** | second person = clearer who pays | ☐ |
| E2 body | A★: "Funding a non-{base} currency converts at the rate shown before you confirm." | canvas line already honest + tight | ☐ |
| | B: "Adding money to USD or GBP? We show the rate and the exact {base} amount before you confirm." | warmer, but assumes example currencies | ☐ |
| E3 title | A★: **You stay in control** | reassurance without promise | ☐ |
| E3 body | A★: "Change or unlink the funding card anytime in wallet settings. A new card must be linked first." | condition stated in the same breath as the permission — keep | ☐ |

## Consent screen

| # | Line | Rationale | Approve |
|---|---|---|---|
| C0 title | A★: **Your consent** + "What you're agreeing to:" | document-like, scannable | ☐ |
| C1 bullet | A★: "Moneybase may charge {card} to fund {wallet} when you add money." | the core authorization, one sentence | ☐ |
| C2 bullet | A★: "The amount, currency and any conversion rate are shown before each charge." | pre-charge transparency promise (service actually enforces it) | ☐ |
| C3 bullet | A: "You can unlink this card anytime in wallet settings." | ⚠️ F1 — permission without condition | ☐ |
| | B★: "You can change the funding card anytime — an active wallet always keeps one linked card." | permission + condition together; consistent with E3 | ☐ |
| C4 checkbox | A★: "I agree Moneybase may charge this card to fund {wallet}" | mirrors C1; explicit, unticked by default | ☐ |
| C5 agree CTA | A★: **Agree and link card** | verb states both things that happen | ☐ |
| C6 decline CTA | A★: **Decline** | one word, equal visual citizenship (design handles weight) | ☐ |

## Decline path

| # | Line | Rationale | Approve |
|---|---|---|---|
| D1 reassurance (below buttons) | A: "Declining returns you to your wallet. Nothing is linked." | ⚠️ F2 — wrong destination pre-creation | ☐ |
| | B★: "Nothing is linked if you decline — you'll go back to card selection and your draft is saved." | correct destination + draft safety, calm | ☐ |
| D2 post-decline state (card step banner) | B★: "You declined card linking. Your draft is saved — choose a card when you're ready, or cancel the wallet." | no guilt, both paths visible | ☐ |

---
**Approval protocol**: tick ✅ per line (or reply "approve all recommended" to accept every ★). Rejected variants stay in this deck as evidence.
