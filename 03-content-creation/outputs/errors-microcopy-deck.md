# CONTENT-002 — Errors + microcopy deck

Single copy source for WALLET-003..007. Every error answers three questions: **what happened · is my money/draft safe · what do I do now.** No blame, no dead ends, no untranslated codes. Variant A = canvas/service where one existed; ★ = recommended.

## The four required errors

| # | Scenario | Line | Approve |
|---|---|---|---|
| X1 | Duplicate wallet name (inline, on blur + submit) | A★: "You already have a wallet called '{name}'. Try **'{suggestion}'**?" (suggestion tappable, fills the field) | ☐ |
| X2 | Unsupported currency (shown disabled in picker, never hidden) | A★ pattern: reason string from service, e.g. "Not yet available for business accounts — request it from your account manager." / "Suspended for business accounts due to volatility controls." | ☐ |
| X2b | Unsupported picked anyway (service-level guard) | B★: "{code} isn't available for business wallets yet. Your other selections are kept." | ☐ |
| X3 | Card-link failure (screen state) | title B★: **We couldn't link this card** · body A★ (service): "Your bank declined the link request for this card." · safety line: "Your wallet draft is safe." · actions: **Try again** / **Use a different card** | ☐ |
| X4 | Consent declined | → CONTENT-001 lines D1-B/D2-B (owned there, listed for completeness) | — |

## Loading states (anything >400ms gets words — WALLET-008 rule)

| # | Moment | Line | Approve |
|---|---|---|---|
| L1 | name check | "Checking name…" | ☐ |
| L2 | card linking | "Contacting your bank…" (more honest than generic "Linking…" — it's why it takes time) | ☐ |
| L3 | wallet creation | "Creating your wallet…" | ☐ |
| L4 | lists | skeletons, no text (design owns it) | ☐ |

## Wizard microcopy

| # | Where | Line | Approve |
|---|---|---|---|
| M1 | step indicator | "Step {n} of 4" | ☐ |
| M2 | base-currency helper | A★ (canvas): "Balances and reports default to this currency." | ☐ |
| M3 | step-2 subtitle | "Add the currencies this wallet will hold. You can add more later." (declares zero-additional is fine) | ☐ |
| M4 | cancel-confirm dialog | title: **Discard this wallet?** · body: "Your entries will be lost." · **Keep editing** / **Discard** (destructive verb on the destructive button, never "OK") | ☐ |
| M5 | card-step subtitle | "Choose the card that funds this wallet. You'll review and consent before anything is linked." (promises the consent step — reduces step-3 anxiety) | ☐ |

## Success + wallet detail

| # | Where | Line | Approve |
|---|---|---|---|
| S1 | success title | A★ (canvas): **Wallet created** | ☐ |
| S2 | success body | A★ (canvas): "{wallet} is ready, and {card} is linked as its funding card." | ☐ |
| S3 | auto-advance hint | A★ (canvas): "Taking you to your wallet…" | ☐ |
| S4 | unfunded hint | A★ (canvas): "Exchange and Details unlock after the wallet is funded." | ☐ |
| S5 | unlink guard (tooltip on disabled Unlink in card manage) | "An active wallet needs a funding card — link a replacement first." (mirrors E3/C3-B condition) | ☐ |
| S6 | zero-balance empty state | design-led (de-emphasized decimals + alive "Add funds"); no extra copy — avoiding production's zero-wall (DDR-003) | ☐ |

---
**Approval protocol**: tick ✅ per line or reply "approve all recommended". Rejected variants remain as evidence.
