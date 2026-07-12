# DDR-003 — Deliberate divergences from the shipped product

**Context**: Logged-in research (human-contributed) revealed how production handles the wallet area today: a "Wallet Manager" screen, zero balances rendered as `0,00 €`, and a stubbed "Create New Wallet" CTA ("Coming soon"). Matching production is the default for coherence — divergence requires recorded reasoning.

**Decisions**:
1. **Screen naming: "Wallets", not "Wallet Manager".** "Manager" is system-centric vocabulary; users think in objects ("my wallets"), not administrative tools. Recommendation extends to renaming the existing production screen. Cost of divergence: one label; benefit: plainer mental model, consistent with our wizard copy.
2. **Money formatting: locale-aware `en-MT` (`€0.00`), not production's `0,00 €`.** Malta's English-language conventions are symbol-first, dot-decimal; production's continental format appears to be a locale mismatch rather than a choice. Implementation: single `Intl.NumberFormat`-based formatter in the mock service (WALLET-002) so all screens inherit it; one-line switch if Moneybase confirms the continental format is intentional.
3. **Zero-balance experience: designed empty state, not a wall of zeros.** Production shows three `0,00` rows with no guidance. Ours: de-emphasized zero decimals (split-size balance token), the primary "Add funds" action visually alive, secondary actions disabled-until-funded WITH an explanation line ("Exchange and Details unlock after the wallet is funded"). An unfunded wallet must read as a beginning, not an absence.
4. **Kept from production**: the entry point location (More → Wallets), flag roundels, white grouped list on light gray, chevron rows, full-width bottom CTA — coherence where production is right.

**Alternatives rejected**:
- Full alignment with production naming/formatting — rejected: reproduces recognized flaws for consistency's sake; the assessment evaluates design judgment.
- Full redesign of the wallet area — rejected: out of scope; divergences are surgical and each carries a rationale a PM could act on.

**Consequences**: Three product recommendations fall out of the feature work for free (rename, locale formatting audit, empty-state pattern) — they go in the stakeholder summary as "what we'd feed back to the core product." Walkthrough framing: respectful ("locale mismatch," not "wrong"), since the panel is the product's team.

**Approval**: proposed by human ("their naming and 0,00 € zeros aren't good — let's do better"), reasoning structured by agent. ☐ Human sign-off with DDR-002.
