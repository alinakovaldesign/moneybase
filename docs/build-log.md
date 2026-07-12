# Build log — Moneybase multi-currency wallet

Running record: directive → what the agent produced → interventions → hand-verification. One section per directive, appended during the work, never after.

Format per directive:

## WALLET-NNN — <title>
- **Session**: <date, session file ref in evidence/sessions/>
- **Directive given**: <link to file @ commit>
- **Agent produced**: <bullets, factual>
- **Interventions**: (via /log-intervention — see entries below)
- **Verified by hand before accepting**: <what you actually clicked/checked/read — this is a scored question (4.1)>
- **Accepted / rejected**: <what shipped, what you threw away and why>

---

## WALLET-000 — Bootstrap
- **Session**: 2026-07-12, Claude Code (workspace-creation session; export → evidence/sessions/)
- **Directive given**: 00-meta/directives/WALLET-000-bootstrap.md
- **Agent produced**: git repo (branch `main`), repo-local identity (Alina Koval), commit-msg hook installed, .gitignore, Vite React-TS app + Storybook scaffold (see commits), PostToolUse auto-logging hook
- **Interventions**: none yet
- **Verified by hand before accepting**: commit-msg hook tested — a commit titled "test commit without directive reference" was rejected with exit code 1 and message "✗ Commit rejected: message must reference a directive ID (WALLET-, DESIGN- or CONTENT-NNN)." The failed attempt is preserved here as evidence the trail is enforced, not aspirational.
- **Accepted / rejected**: hook accepted as-is

### Machine log (PostToolUse hook — agent file-writes)

---

## DESIGN-000 — Research: product UI + B2B patterns
- **Session**: 2026-07-12, Claude Code (same workspace session; export → evidence/sessions/)
- **Directive given**: 01-research/directives/DESIGN-000-research-brand-patterns.md (committed in WALLET-000 bootstrap)
- **Agent produced**: 01-research/outputs/research.md — brand cue sheet (color/type/shape/signature patterns with token implications), 5 stated unknowables, 5 adopt / 3 avoid patterns from Wise/Revolut Business/Airwallex, flow implications; 8 App Store product screenshots archived in outputs/refs/
- **Interventions**: 1 (human) — agent initially scraped the marketing landing page (moneybase.com); human redirected: "analyse the product, not the landing page — web app for web, app screens for iOS/Android; use the Chrome extension." Agent switched to: iTunes lookup API for official product screenshots, live.moneybase.com (real web app, pre-login) via the user's Chrome, Mobbin for competitor product screens. **Why it mattered**: marketing surfaces routinely diverge from product UI — and did here (landing is light/illustrative; the actual app home is dark, the web CTA system uses amber, and a "EUR Wallet" screen already exists in-product).
- **Verified by hand before accepting**: viewed all 8 App Store screenshots; navigated live.moneybase.com and confirmed the web shell (navy sidebar with Payments → Wallets nav, amber CTAs, Open Sans in page source); auth wall respected — stopped at the phone-login screen, no credentials touched; Mobbin references opened and visually checked
- **Accepted / rejected**: accepted the cue sheet + patterns; rejected landing-page hex palette as a style source (kept only where it matched the product)

---

## DESIGN-001 / DESIGN-002 — Canvas exploration snapshot + direction lock & token extraction
- **Session**: 2026-07-12, Claude Design (human-driven canvas) + Claude Code (archive, extraction)
- **Directives given**: 04-prototyping/directives/DESIGN-001, 02-design-system/directives/DESIGN-002
- **Human produced (canvas)**: 6 screens in project "Moneybase B2B Wallet Design" — wallets home, wizard step 1 (duplicate-name error), funding explainer, consent (decline first-class), success, wallet detail — with toggleable state props (nameError/consentTicked/walletFunded)
- **Agent produced**: verbatim snapshot archived (DesignSync fetch, later byte-verified against the human's official handoff download); extraction table (02-design-system/extraction-DESIGN-002.md); updated tokens.seed.json (every semantic token traces to a canvas value or is flagged [system default]); DDR-002 direction lock draft
- **Interventions**: 1 (human) — first archived preview didn't render like Claude Design; human redirected with the downloaded handoff bundle. Diagnosis: agent had omitted support.js (canvas runtime). Fix: complete bundle archived, render verified over local HTTP. **Why it mattered**: evidence must look like what the human actually designed.
- **Verified by hand before accepting**: dc.html byte-identity (diff) between DesignSync fetch and human download; render check in browser; extraction values spot-checked against canvas source
- **Accepted / rejected**: 4 normalization merges accepted and documented (near-duplicate grays, disabled fills, control heights, icon-chip sizes); DDR-002 sign-off PENDING human review
- **Open**: DESIGN-001 exploration evidence (killed direction / canvas prompts) still to be added by the human

### Human research contribution — post-DESIGN-002 (2026-07-12)
- **Human provided**: logged-in iOS screenshots (real account) — More→Wallets→"Wallet Manager" list (EUR/GBP/USD at zero) + "Create New Wallet" CTA → **"Coming soon" toast**
- **Why it mattered**: the agent's research explicitly stopped at the auth wall (stated unknowable); this shows the assessment feature is the product's actual next roadmap item, the entry point already ships, the production screen name is "Wallet Manager", and production money formatting is `0,00 €` (locale-aware, not Anglo)
- **Resolution**: research.md addendum; naming + locale-formatting flagged into the code phase (WALLET-002/003); stakeholder-summary hook noted. Personal-data screenshot not archived (no-real-customer-data rule); findings recorded textually.
