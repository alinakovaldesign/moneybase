# DESIGN-001 — Claude Design prompt pack

Ready-to-paste prompts for the canvas exploration. Grounded in `01-research/outputs/research.md` so output starts on-brand, not generic.

**How to run the session**
1. New Claude Design canvas per moment (or one canvas, four frames-groups). Paste the **Session opener** first, then the moment prompt, then one direction prompt at a time.
2. Log every prompt you actually send (including improvised follow-ups) verbatim into `evidence/design-sessions/DESIGN-001/prompts.md` — copy-paste as you go, not after.
3. Export each direction as PNG → `evidence/design-sessions/DESIGN-001/m<moment>-d<direction>.png` + save the canvas share link.
4. Fill the verdict table (bottom of this file), kill ≥1 direction with a reason, commit everything as `DESIGN-001: canvas exploration — directions + verdicts`.

---

## Session opener (paste once, first)

```
You are designing screens for Moneybase, a regulated Maltese fintech (payments, cards,
investments), for its B2B segment — the user is a business finance operator at a company,
not a consumer. We are designing mobile-first (iOS-size frames, 390x844).

Brand foundation (extracted from the real product — follow it):
- Primary action blue: #16A0F6 (buttons, links, active states)
- Deep navy: #16325C (headlines, nav surfaces; #023778 for darkest)
- Amber accent: #FFBD00 with navy text — reserved for THE single highest-emphasis CTA
- Pale blue tints: #DEEEFD / #AFD6F9 for section backgrounds and icon chips
- Positive amounts green ~#1E8E5A, negative/error red ~#C0392B
- Type: Open Sans for body/UI; headlines may use a slightly rounded geometric sans
- Shape: cards radius 12-16, controls radius ~10, pill chips; light gray page background,
  white raised cards
- Signature Moneybase patterns to respect: circular icon-buttons with small labels
  underneath for object actions; large balance typography with smaller lighter decimals;
  key-value detail rows (gray label left, blue value right); currency chips with flag +
  ISO code
- Tone: plain, calm, honest. No marketing fluff inside task flows. This is money —
  no dark patterns, conditions always visible.

Do not use any other color families. Do not invent playful illustrations inside task
screens. Realistic B2B data: company "Aster Logistics Ltd", wallets like "Operating
Wallet", EUR base, cards ending 4242/8949.
```

---

## Moment 1 — Wallet home (default state + entry point)

**Content requirements (paste with each direction):**
```
Screen: Wallets home for Aster Logistics Ltd. Must show: one existing wallet
("Operating Wallet", base EUR, balances in EUR 24,850.00 / USD 3,120.50 / GBP 890.25),
a clear "New wallet" entry point (add only — no delete affordances anywhere), and
per-currency balance presentation. Header identifies the company account.
```

**Direction A — Product-faithful:** `Design it as today's Moneybase would: light theme, white cards on light gray, blue circular icon-buttons with labels, blue primary CTA. The wallet is a card with the balance large and currency rows inside.`

**Direction B — B2B operator:** `Design it data-forward for a finance professional: denser layout, navy-led header area, tabular currency rows with aligned figures, smaller type scale, one amber "New wallet" CTA as the single accent. Feels like a pro tool, not a consumer app.`

**Direction C — Calm ledger:** `Design it airy and card-led: pale blue tint background, each currency as its own soft chip/card row with flag, generous spacing, large friendly balance typography. Wise-like calm, but strictly in Moneybase colors.`

---

## Moment 2 — Wizard shell (step 1: name + base currency)

**Content requirements:**
```
Screen: step 1 of a 4-step "Create multi-currency wallet" wizard, presented as an
iOS sheet. Must show: step indicator (1 of 4), wallet name field (value "Operating
Wallet" triggering an inline duplicate-name error: "You already have a wallet called
'Operating Wallet'. Try 'Operating — EUR'?"), base currency picker row (EUR selected,
flag + code), one line explaining what base currency means ("Balances and reports
default to this currency"), Continue button (disabled state), Cancel. Show BOTH the
error state and how the disabled Continue reads.
```

**Direction A — Product-faithful:** `Boxed input fields, blue focus states, error in red below the field with suggestion as a tappable chip, blue Continue full-width at bottom.`

**Direction B — B2B operator:** `Denser form, underline-style inputs (like Moneybase web auth), step indicator as compact "1/4" with progress bar, error inline right under the field, navy sheet header, Continue in amber (this direction reserves amber for step-advance).`

**Direction C — Calm ledger:** `One question per screen feel: big friendly heading "Name your wallet", generous whitespace, the currency picker as a large tappable card with flag, error presented gently but unmissably.`

---

## Moment 3 — Card-link explainer + consent (the trust screen)

**Content requirements:**
```
Two connected screens. Screen 1 "How card funding works" — exactly 3 short panels:
(1) "Your card funds this wallet" — Visa •• 4242 feeds Operating Wallet;
(2) "Charges are in EUR" — funding a non-EUR currency converts at the rate shown
before you confirm; (3) "You stay in control" — change or unlink the funding card
anytime in wallet settings (a new card must be linked first).
Screen 2 "Consent" — summary list of what is being agreed (3 bullets max, plain
language), an UNTICKED checkbox "I agree Moneybase may charge this card to fund
Operating Wallet", primary button "Agree and link card" (disabled until ticked),
and a Decline button of EQUAL visual citizenship (not a ghost link). Declining is
respectful — no guilt copy.
```

**Direction A — Product-faithful:** `Explainer as 3 swipeable cards with small blue icon chips; consent as a white sheet, checkbox row, blue Agree, gray-outline Decline of the same size.`

**Direction B — B2B operator:** `Explainer as a single scannable screen, 3 numbered rows (no carousel — operators read); consent framed like a document: navy header "Card funding authorisation", summary as key-value rows, amber Agree, plain Decline button same width.`

**Direction C — Calm ledger:** `Explainer as 3 tall panels with lots of air and one pale-blue illustration zone each (abstract shapes only); consent with the checkbox as a large tappable card that visibly toggles, Agree fills with blue only when ticked.`

---

## Moment 4 — Success + funded wallet landing

**Content requirements:**
```
Two beats. Beat 1 "Success" — confirmation that "Operating FX Wallet" was created and
Visa •• 4242 linked; restrained for B2B (no confetti), progress into Beat 2 after a
moment. Beat 2 "Wallet detail" — wallet name, currency chips row (EUR base badge, USD,
GBP + "+ Add currency" chip), zero balances, linked card block (Visa •• 4242, "Funding
card" label, manage affordance), circular actions row (Add funds / Exchange / Details)
with actions visibly disabled until funded.
```

**Direction A — Product-faithful:** `Success as a blue header state with white check roundel (like Moneybase's processed-payment screen), wallet detail matching the existing EUR Wallet layout but with the currency chips row added.`

**Direction B — B2B operator:** `Success as a compact confirmation banner that slides into the wallet detail (no full-screen moment — operators want to keep moving); card block as a row with a "Set limit" nudge, Revolut-Business-like density.`

**Direction C — Calm ledger:** `Success as a full calm moment: pale blue field, big check, the wallet card assembling; detail screen card-led with the funding card shown as a mini physical card visual.`

---

## Verdict table (fill during the session, commit with exports)

| Moment | Direction | Verdict (keep / kill / merge) | Reason (one line) |
|---|---|---|---|
| 1 | A | | |
| 1 | B | | |
| 1 | C | | |
| 2 | A/B/C | | |
| 3 | A/B/C | | |
| 4 | A/B/C | | |

Rules: ≥1 direction killed overall with a stated reason. The winning direction may merge elements (say which). Verdicts feed DESIGN-002's DDR.
