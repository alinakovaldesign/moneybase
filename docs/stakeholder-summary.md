# Stakeholder summary — multi-currency wallet + card linking (B2B)

**The problem.** Moneybase B2B clients hold per-currency pockets today; finance operators need one wallet holding several currencies, funded by a company card — without back-office tickets. The entry point already ships in production: the Wallet Manager's "Create New Wallet" button currently shows **"Coming soon."** This prototype is what happens when it stops saying that.

**The flow.** Wallets home → name + base currency (duplicate names caught inline, kindly) → additional currencies (unsupported ones shown and explained, never hidden) → funding card (saved or new) → a 3-panel explainer, then explicit consent (unticked box; **Decline is a first-class path** that preserves the draft) → success → funded wallet with the card visible and manageable (rename, add currency; unlink guarded with the reason). All on one codebase rendering **iOS, Android and web presentations from one token source** — switchable live in the demo.

**Key decisions** (each recorded as a DDR):
1. One token source → three platform presentations; structure diverges only where HIG/M3/web conventions say so.
2. Consent enforced at three layers — approved copy, UI gate, and the mock service itself refuses without consent.
3. Deliberate divergences from production, with rationale: "Wallets" naming, locale-correct `€0.00` formatting, designed empty state, AA-compliant text blue.
4. Post-ship design iteration went **back through the design tool** and landed as a reviewed, merged PR (#1): total-value hero, merged currency list, distribution bar.

**What we'd feed back to the core product** (found while building):
- The production palette fails WCAG AA on primary actions (white on #16A0F6 ≈ 2.8:1); a text-safe blue tier fixes it product-wide.
- "Wallet Manager" naming and the `0,00 €` locale format are worth an audit.
- The zero-balance wall on the current Wallets screen deserves a designed empty state.

**Open questions.** Cardholder-permission model for who may link company cards; base-currency mutability after creation; wallet limits per business tier; FX rate source and rounding rule for multi-currency totals.

**Validate next.** Comprehension test of the consent explainer (5 B2B users: can they say what gets charged, in which currency?); decline-rate and where decliners go; time-to-first-funded-wallet as the activation metric.

**How it was built.** Agent-driven under 18 versioned directives; 40+ commits each naming their directive (enforced by a git hook); two Claude Design sessions with verbatim prompt logs; two AI reviewer audits (6 blockers found and fixed); ~6 human design-review rounds on the live product, all logged. Repo: github.com/alinakovaldesign/moneybase · Design PR: pull/1 · Case documentation: Notion.
