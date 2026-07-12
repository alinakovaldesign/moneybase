# Moneybase Assessment — Execution Plan (v3, area-based workspace)

A single-feature **agentic product design environment** reflecting the end-to-end workflow: research → design system → content → prototyping, on the 3-layer architecture (directives / orchestration / execution). Every phase produces product output AND assessment evidence.

v3 changes vs v2: workspace reorganized into workflow areas (00-meta … 04-prototyping); **Storybook added as the component workbench** (Area 4's living artifact + screenshot source); **content creation split out** as its own stream (CONTENT-NNN) since copy carries regulatory meaning; directive ID = stream, folder = workflow area.

Time is not the organizing constraint — but track actual spend honestly and report it (the brief scores scope judgement).

---

## 0. Stated assumptions (live in README.md)
- One React codebase, three platform skins (iOS/HIG, Android/M3, web) from one token source, runtime-switchable. Trade-off stated: demonstrable token resolution + shareable link over native fidelity.
- B2B: user = business finance operator, fictional "Aster Logistics Ltd"; consent copy reflects company cardholder authority.
- All data mocked; latency 400–1400ms; failure flags via URL params.
- Stack: Vite + React + TS + CSS variables + Framer Motion + **Storybook** + Style Dictionary + Playwright. No UI component library — the design system is the deliverable.
- Brand approximated from public Moneybase surfaces (DESIGN-000); internal tokens unknowable → stated, not guessed silently.

## 1. Evidence architecture (free once the environment is live)
| Proof | Mechanism |
|---|---|
| Directive → commit traceability | commit-msg hook rejects unreferenced commits; directives committed before their outputs |
| Build log | PostToolUse hook auto-logs agent file-writes + `/log-intervention` for human redirects |
| Raw transcript | session files persist; `/export` per session → `evidence/sessions/` |
| Canvas driving | DESIGN directives + verbatim prompts + exports → `evidence/design-sessions/` |
| Component states | Storybook stories per component × 3 themes → screenshot matrix → `evidence/screens/` |

**Never squash, never rebase, never amend. Messy history is evidence.**

---

## 2. Phases

### Phase 0 — Bootstrap (WALLET-000, area 00-meta)
git init → repo-local identity (Alina Koval) → install + test commit hook (keep the rejection) → first commit → remote `github.com/alinakovaldesign/moneybase.git` + push → scaffold `04-prototyping/app` (Vite React-TS) → **init Storybook with platform-theme toolbar + a11y addon** → confirm receipt of brief with stated assumptions.

### Phase 1 — Research (DESIGN-000, area 01-research)
Track A: brand cue sheet from public Moneybase surfaces (observed → token implication). Track B: Wise/Revolut/Airwallex business-wallet patterns via Mobbin — adopt/avoid list with reasons. Output: `01-research/outputs/research.md`. Primary user research deliberately out of scope → "validate next" in stakeholder summary.

### Phase 2 — Design direction (DESIGN-001 in 04-prototyping, DESIGN-002 in 02-design-system; Claude Design leads)
- DESIGN-001: 2–3 genuinely distinct canvas directions for the four key moments (wallet card, wizard tone, explainer+consent, success), grounded in the cue sheet; ≥1 direction killed with reason; prompts logged.
- DESIGN-002: human picks (DDR with rejected alternatives) → extraction table (canvas value → token name) updates `02-design-system/tokens/`. Canvas freezes. **Design intent becomes code here.**

### Phase 3 — Foundations (WALLET-001 in 02-design-system, WALLET-002 in 04-prototyping)
- WALLET-001: token layer (primitive → semantic → platform overrides) + `PlatformProvider` + switcher; Style Dictionary emits CSS vars + `Tokens.swift` + Compose XML (committed); **first components (Button, shell) with Storybook stories × 3 themes; a11y addon clean**. Zero hex/px literals outside tokens (grep proves it).
- WALLET-002: mock service — seeded default wallet, currency catalog with unsupported entries + reasons, 2 saved cards, latency 400–1400ms, `?fail=duplicate|unsupported|cardlink|consent`.

### Phase 4 — Content (CONTENT-001/002, area 03-content-creation; parallel with Phase 5 start)
- CONTENT-001: consent + card-link explainer deck (the regulated copy) — agent proposes variants w/ rationale, human approves line by line; approved deck is the single copy source for WALLET-006.
- CONTENT-002: error + microcopy deck (duplicate name, unsupported currency, link failure, decline path, empty/loading). Same rule: proposed, human-owned.

### Phase 5 — The flow (WALLET-003..007, area 04-prototyping)
Wallet home → name+base currency (duplicate inline) → additional currencies (unsupported explained) → card select/link + explainer + consent (decline = first-class, draft preserved; failure = retry/other card) → success (holds ~1.2s) → funded wallet, card manageable. Every new component lands with stories; copy pulled from approved decks. Interventions logged — the 4.7 transcript (failure + recovery) comes from here.

### Phase 6 — QA pass (WALLET-008)
Reviewer subagents first (design-critic vs HIG/M3, a11y-auditor vs WCAG 2.1 AA); human accept/reject in build log. Timing realism, reduced-motion, focus order. Screenshot matrix (storycap/Playwright over Storybook + flow states × 3 skins) → `evidence/screens/`. Hand-verify the 4 error states per skin.

### Phase 7 — Round trip + design PR (DESIGN-003 in 04-prototyping → WALLET-009 in 02-design-system)
Shipped screen → canvas as screenshot → iterate → token/component delta spec → the design-carrying PR: motivation, token diff, before/after per platform (from the matrix), blast list, a11y recheck. Handoff proven in both directions.

### Phase 8 — Package & publish
Finalize tool-split (from real experience), NOTES.md, stakeholder summary, annotated transcript, 5–8 DDRs. Deploy prototype + publish Storybook static build (second shareable artifact). Notion case page (problem, flow, decisions, agent-driving story, links) — human approves content before publish. Submit 24h before the session.

### Phase 9 — Optional (WALLET-010): blast-radius script + worked example (token → components → screens → platforms; per-skin screenshot diff as cheapest regression signal).

### Walkthrough (45')
5' problem/assumptions → 5' research + exploration story (incl. killed direction) → 15' live demo: flow + one error path + platform switcher + **Storybook as the design-system artifact** → 10' agent-driving (directive → commits → intervention → round-trip PR) → 10' Q&A.

---

## 3. Cut order (cut from top, say so)
1. WALLET-010 blast radius → 5-bullet method note
2. Playwright/storycap matrix → manual screenshots
3. Android skin → iOS + web, M3 divergence on paper
4. Card manage actions → stubbed controls
5. Style Dictionary native outputs → mapping table in NOTES.md
6. DESIGN-001 breadth → 2 moments × 2 directions

Never cut: 4 error states, consent flow, directive/commit discipline, raw transcript, DESIGN-002 extraction, component stories for shipped components.

## 4. Phase × tech stack map

| Phase | Folder (area) | Directives | Tech stack / tools | Key outputs & evidence |
|---|---|---|---|---|
| **0 Bootstrap** | `00-meta/`, `04-prototyping/app/` | WALLET-000 | git + `commit-msg` hook, GitHub (`alinakovaldesign/moneybase`), Vite + React 18 + TypeScript, Storybook (+ a11y addon), Claude Code PostToolUse hook | repo + remote, app & Storybook scaffold, hook-rejection evidence, auto-logging live |
| **1 Research** | `01-research/` | DESIGN-000 | Claude Code (web fetch of public Moneybase surfaces), Mobbin | `outputs/research.md`: brand cue sheet + pattern adopt/avoid list |
| **2 Direction** | `04-prototyping/`, `02-design-system/` | DESIGN-001, DESIGN-002 | **Claude Design** (canvas), DDR template | canvas exports + verbatim prompts, killed-direction verdicts, extraction table → updated `tokens/tokens.seed.json` |
| **3 Foundations** | `02-design-system/`, `04-prototyping/` | WALLET-001, WALLET-002 | Style Dictionary (→ CSS vars, `Tokens.swift`, Compose `tokens.xml`), CSS custom properties, React Context (`PlatformProvider`), Storybook stories, TS mock service | token pipeline, 3 platform themes + switcher, Button/shell stories × 3 themes, `walletService` with latency + `?fail=` flags |
| **4 Content** | `03-content-creation/` | CONTENT-001, CONTENT-002 | Claude Code (variants + rationale), human line-by-line approval | consent/explainer deck, errors/microcopy deck (approved ✅/rejected ❌ per line) |
| **5 Flow** | `04-prototyping/` | WALLET-003..007 | React Router, Framer Motion (realistic timing, reduced-motion), stories per component, copy from approved decks | wallet home → wizard → consent → funded wallet, all edge states, intervention log |
| **6 QA** | `04-prototyping/`, `scripts/` | WALLET-008 | subagents `design-critic` + `a11y-auditor`, axe via Storybook a11y addon, Playwright/storycap | findings + accept/reject table, screenshot matrix → `evidence/screens/`, per-skin error-state verification |
| **7 Round trip + PR** | `04-prototyping/`, `02-design-system/` | DESIGN-003, WALLET-009 | **Claude Design** (iterate on shipped screenshot) → GitHub PR (design-pr template) | token delta spec, the design-carrying PR with per-platform before/after |
| **8 Package** | `docs/`, `evidence/` | (consumes all) | Vercel/Netlify deploy, Storybook static build, Notion MCP | live prototype + Storybook links, one-pagers, annotated transcript, Notion case page |
| **9 Optional** | `scripts/` | WALLET-010 | node/TS dependency trace (token → component → screen) | blast-radius report + risk note |

**Core stack in one line**: Vite · React 18 · TypeScript · CSS custom properties (tokens) · Style Dictionary · Storybook · Framer Motion · Playwright · git hooks · GitHub · Claude Code + Claude Design · Mobbin · Notion.

## 5. Area → deliverable map
| Brief area | Artifact |
|---|---|
| 1 Prototype + build log | `04-prototyping/app` + `docs/build-log.md` |
| 2 Tool split | `docs/tool-split.md` + DESIGN-000..003 evidence |
| 3 Directives → PR | `*/directives/` + hook + WALLET-009 PR |
| 4 Design system | `02-design-system/` tokens + native outputs + **Storybook** + NOTES.md |
| 5 Stakeholders | walkthrough + `docs/stakeholder-summary.md` + Notion |
| 6 Agent-driving proof | hook-enforced trail + directives + session files + canvas exports |
| 7 Raw session | `evidence/sessions/` raw + annotated |
| 8 (opt) Blast radius | `scripts/blast-radius` + example |
