# DESIGN-001 — Canvas session prompts (verbatim, human-provided)

**Provenance**: the human ran the session in Claude Design using the session opener and the four
content-requirement blocks from the repo's prompt pack (`04-prototyping/canvas/DESIGN-001-prompt-pack.md`),
pasted as one combined prompt. Provided verbatim by the human on 2026-07-13 for the evidence record.

**Honest note on exploration breadth**: the prompt pack's A/B/C direction variants were NOT run —
the canvas produced one converged direction in a single pass (the 6 screens archived in this folder).
The "≥2 directions per moment, ≥1 killed" acceptance item from the DESIGN-001 directive was therefore
not satisfied in its original form. Where the exploration evidence actually lives instead:
- DDR-002 records the effective direction choice and the rejected alternatives (dense-operator, calm-ledger, dark theme) with reasons;
- DESIGN-003 later produced a genuine 2a-vs-2b comparison on canvas, with one variant (2a, the faithful recreation) explicitly not chosen — a real explored-and-rejected artifact;
- six human review rounds on the live prototype (build log) served as the iterative exploration the canvas pass skipped.

## The prompt (verbatim)

> You are designing screens for Moneybase, a regulated Maltese fintech (payments, cards,
> investments), for its B2B segment — the user is a business finance operator at a company,
> not a consumer. We are designing mobile-first (iOS-size frames, 390x844).
>
> Brand foundation (extracted from the real product — follow it):
> - Primary action blue: #16A0F6 (buttons, links, active states)
> - Deep navy: #16325C (headlines, nav surfaces; #023778 for darkest)
> - Amber accent: #FFBD00 with navy text — reserved for THE single highest-emphasis CTA
> - Pale blue tints: #DEEEFD / #AFD6F9 for section backgrounds and icon chips
> - Positive amounts green ~#1E8E5A, negative/error red ~#C0392B
> - Type: Open Sans for body/UI; headlines may use a slightly rounded geometric sans
> - Shape: cards radius 12-16, controls radius ~10, pill chips; light gray page background,
>   white raised cards
> - Signature Moneybase patterns to respect: circular icon-buttons with small labels
>   underneath for object actions; large balance typography with smaller lighter decimals;
>   key-value detail rows (gray label left, blue value right); currency chips with flag +
>   ISO code
> - Tone: plain, calm, honest. No marketing fluff inside task flows. This is money —
>   no dark patterns, conditions always visible.
>
> Do not use any other color families. Do not invent playful illustrations inside task
> screens. Realistic B2B data: company "Aster Logistics Ltd", wallets like "Operating
> Wallet", EUR base, cards ending 4242/8949.
>
> Screen: Wallets home for Aster Logistics Ltd. Must show: one existing wallet
> ("Operating Wallet", base EUR, balances in EUR 24,850.00 / USD 3,120.50 / GBP 890.25),
> a clear "New wallet" entry point (add only — no delete affordances anywhere), and
> per-currency balance presentation. Header identifies the company account.
>
> Screen: step 1 of a 4-step "Create multi-currency wallet" wizard, presented as an
> iOS sheet. Must show: step indicator (1 of 4), wallet name field (value "Operating
> Wallet" triggering an inline duplicate-name error: "You already have a wallet called
> 'Operating Wallet'. Try 'Operating — EUR'?"), base currency picker row (EUR selected,
> flag + code), one line explaining what base currency means ("Balances and reports
> default to this currency"), Continue button (disabled state), Cancel. Show BOTH the
> error state and how the disabled Continue reads.
>
> Two connected screens. Screen 1 "How card funding works" — exactly 3 short panels:
> (1) "Your card funds this wallet" — Visa •• 4242 feeds Operating Wallet;
> (2) "Charges are in EUR" — funding a non-EUR currency converts at the rate shown
> before you confirm; (3) "You stay in control" — change or unlink the funding card
> anytime in wallet settings (a new card must be linked first).
> Screen 2 "Consent" — summary list of what is being agreed (3 bullets max, plain
> language), an UNTICKED checkbox "I agree Moneybase may charge this card to fund
> Operating Wallet", primary button "Agree and link card" (disabled until ticked),
> and a Decline button of EQUAL visual citizenship (not a ghost link). Declining is
> respectful — no guilt copy.
>
> Two beats. Beat 1 "Success" — confirmation that "Operating FX Wallet" was created and
> Visa •• 4242 linked; restrained for B2B (no confetti), progress into Beat 2 after a
> moment. Beat 2 "Wallet detail" — wallet name, currency chips row (EUR base badge, USD,
> GBP + "+ Add currency" chip), zero balances, linked card block (Visa •• 4242, "Funding
> card" label, manage affordance), circular actions row (Add funds / Exchange / Details)
> with actions visibly disabled until funded.
