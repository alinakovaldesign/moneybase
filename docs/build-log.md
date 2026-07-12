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

## WALLET-003..007 + CONTENT-001/002 — Copy decks + the full flow (Phases 4–5)
- **Session**: 2026-07-12, Claude Code
- **Directives given**: CONTENT-001/002 (03-content-creation), WALLET-003..007 (04-prototyping)
- **Human decisions**: copy decks approved ("approve all recommended") including two agent-found consistency fixes in the canvas copy: F1 (consent bullet stated 'unlink anytime' without the replacement-card condition) and F2 (decline reassurance pointed to a wallet that doesn't exist yet). All strings live in src/content/copy.ts with deck line IDs — no user-facing string is hardcoded in a screen.
- **Agent produced**: WalletsHome, 4-step wizard (name+base / currencies / card / explainer+consent), success, WalletDetail; components TextField, Chip, ConsentCheckbox, CircleAction, Flag, Skeleton, CardBadge + stories; iOS sheet / Android dialog / web modal via CSS presentation overrides only
- **Interventions**: none this stretch; one self-caught fix (money narrowSymbol) during live verification
- **Verified by hand before accepting**: full flow clicked through in a real browser — duplicate-name error + tappable suggestion, unsupported currencies visible with reasons (AED/TRY), consent gate (Agree disabled until ticked), card link with latency, success hold + auto-advance, funded wallet with disabled-until-funded actions; app + Storybook builds clean; hex-grep passes (one documented pictorial exemption: Flag.tsx)
- **Accepted / rejected**: accepted; remaining for WALLET-008: card-link failure + consent-declined paths re-verified per skin via ?fail flags, a11y pass, screenshot matrix

---

## WALLET-001 / WALLET-002 — Token pipeline + mock service (Phase 3)
- **Session**: 2026-07-12, Claude Code
- **Directives given**: 02-design-system/directives/WALLET-001, 04-prototyping/directives/WALLET-002
- **Agent produced**: `scripts/generate-tokens.mjs` (seed → CSS vars + Tokens.swift + tokens.xml); PlatformProvider + switcher; Button (5 states) + Tokens living-doc stories; Storybook toolbar wired to [data-platform]; walletService (latency 400–1400ms, 4 failure flags → typed domain errors with recovery hints, en-MT money formatter, minor-units only); demo scaffolding removed
- **Interventions**: none this stretch (design decisions pre-made by directives/DDRs)
- **Verified by hand before accepting**: app build + Storybook build clean; grep proves zero hex literals outside generated tokens; dev server launched and platform switch exercised in a real browser — iOS r12 buttons → Android pill buttons screenshot-confirmed; formatter output spot-checked (€0.00 style)
- **Accepted / rejected**: accepted with two honest notes — (1) staging mishap folded WALLET-002 files into the WALLET-001 commit (09cf4b6), documented in ee5a2cf, history left unamended; (2) known a11y debt logged: white-on-blue button contrast ~2.7:1, inherited from product palette, deferred to WALLET-008 as an explicit decision
- **Open**: DDR-002/003 human sign-off still pending

### Human research contribution — post-DESIGN-002 (2026-07-12)
- **Human provided**: logged-in iOS screenshots (real account) — More→Wallets→"Wallet Manager" list (EUR/GBP/USD at zero) + "Create New Wallet" CTA → **"Coming soon" toast**
- **Why it mattered**: the agent's research explicitly stopped at the auth wall (stated unknowable); this shows the assessment feature is the product's actual next roadmap item, the entry point already ships, the production screen name is "Wallet Manager", and production money formatting is `0,00 €` (locale-aware, not Anglo)
- **Resolution**: research.md addendum; naming + locale-formatting flagged into the code phase (WALLET-002/003); stakeholder-summary hook noted. Personal-data screenshot not archived (no-real-customer-data rule); findings recorded textually.
