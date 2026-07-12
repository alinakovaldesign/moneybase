# Stakeholder summary — multi-currency wallet + card linking (one page, fill at Sprint 5)

**Problem**: B2B clients need per-purpose currency wallets funded by company cards, without back-office tickets. Today: <assumption>.

**The flow**: Name + base currency → additional currencies → funding card (existing/new) → what-linking-means explainer → explicit consent → funded wallet with manageable card. All edges designed: duplicate name, unsupported currency, link failure, consent declined.

**Key decisions** (each has a DDR):
1. One codebase, three platform skins from one token source — trade-off: demonstrable consistency mechanism over native fidelity
2. Consent declined = first-class path, not error
3. Unsupported currencies shown + explained, not hidden
4. Unlink disabled while wallet active (funding card invariant)
5. <from the build>

**Open questions**
- Card linking vs company cardholder permissions model?
- Base-currency change after creation — allowed?
- Multi-wallet limits per business tier?

**Validate next**
- Comprehension test of the explainer (5 B2B users): can they say what gets charged in which currency?
- Consent decline rate + where decliners go
- Time-to-first-funded-wallet as activation metric

**How it was built**: agent-driven under versioned directives; every commit traceable to a directive; raw sessions in repo. 6h budget, spend: <actual>.
