# CLAUDE.md — Moneybase Agentic Product Design Workspace (charter)

Feature under build: **create a multi-currency wallet and link a card to it** (B2B, Moneybase assessment).
One React codebase, three platform skins (iOS/HIG, Android/M3, web) from one token source. Storybook is the component workbench; the app is the flow prototype.

## Workspace map (work happens in the area that owns it)
| Area | Owns |
|---|---|
| `00-meta/` | Global context: plan, environment map, tool registry, templates, bootstrap directive |
| `01-research/` | Product discovery: brand cue sheet from public Moneybase surfaces, competitor patterns, UX audit inputs |
| `02-design-system/` | Tokens, platform themes, component definitions, governance, design-system notes, the design-carrying PR |
| `03-content-creation/` | UX copy: consent/explainer language, error messages, microcopy — proposed by agents, owned by the human |
| `04-prototyping/` | Concept exploration (canvas), user flows, the app, Storybook stories, handoff, QA |
| `docs/` | Build log, decision records (DDRs), stakeholder summary, tool-split |
| `evidence/` | Raw agent sessions, Claude Design exports, screenshot matrices — human-curated proof |
| `scripts/` | Execution layer: deterministic, testable, repeatable |

## The 3-layer architecture (why the system is reliable)
- **Layer 1 — Directives (what to do).** Plain-language SOPs in each area's `directives/` folder: goal, inputs, tools, acceptance, edge cases, out-of-scope. ID streams: `WALLET-NNN` (code), `DESIGN-NNN` (research + canvas), `CONTENT-NNN` (copy). You never start work without one.
- **Layer 2 — Orchestration (judgment).** You, the agent: read the directive, sequence the work, call tools, handle errors, synthesize, and ASK when ambiguous. Creative and copy decisions are proposed, never silently applied.
- **Layer 3 — Execution (mechanical work).** `scripts/` + tool integrations: git hooks, token transforms (Style Dictionary), Storybook builds, screenshot matrices, a11y checks, blast radius, Notion writes. If a step is deterministic, it belongs here — not in your judgment loop.

## Hard rules (evidence integrity — the assessment grades the trail, not just the output)
1. Every commit message MUST reference a directive ID (`WALLET-NNN`, `DESIGN-NNN`, `CONTENT-NNN`). The commit-msg hook enforces this. Never bypass with `--no-verify`.
2. Never squash, rebase, or amend pushed history. Mistakes stay visible; fixes are new commits.
3. Commit the directive file BEFORE committing work produced from it.
4. When the human redirects you, they log it via `/log-intervention` — remind them if a redirect happens and no log entry follows.
5. Mock data only. Test-pattern PANs (4242 4242 4242 4242), fictional company ("Aster Logistics Ltd"), no credentials, no API keys, no live endpoints.
6. Claude Design sessions are part of the trail: every canvas session has a DESIGN-NNN directive, prompts logged verbatim, exports + share links committed to `evidence/design-sessions/DESIGN-NNN/`. After DESIGN-002's direction lock, the canvas is a frozen sketch — visual ideas re-enter only via a new DESIGN directive.

## Design rules
- No hardcoded design values in components. Everything resolves through the semantic token layer in `02-design-system/tokens/`. If a value has no token, propose the token first.
- Platform divergence lives in the platform theme layer only; components never branch on platform except through the provider.
- **Every design-system component ships with Storybook stories covering all its states × all three platform themes.** A component without stories is incomplete. Storybook has a platform-theme toolbar; the a11y addon must report clean on every story.
- Edge states are mandatory scope: loading, success, duplicate-name, unsupported-currency, card-link-failure, consent-declined.
- Money UX: no optimistic UI, explicit confirmation before anything that reads as commitment, honest framing in consent/explainer copy (no implied guarantees; conditions visible).
- Copy comes from `03-content-creation/` decks (CONTENT directives). Placeholder copy in components is marked `/* COPY:pending CONTENT-NNN */` until the human approves the deck.
- Realistic timing: async 400–1400ms via the mock service; success states hold before advancing; respect `prefers-reduced-motion`.

## Working loop
1. Read the directive. Restate goal + acceptance in one line. Flag ambiguities BEFORE building.
2. Build the smallest reviewable slice. Present it. Wait for approval before the next slice.
3. On failure: read the error, fix, verify, note the lesson in the directive's "Learnings" section.
4. Verify behavior, not pixels: click through the flow, check Storybook stories and the console before claiming done.
5. Decisions with alternatives → propose a DDR (`docs/decisions/DDR-NNN-slug.md`).

## Out of bounds
- Do not touch `evidence/` (human-curated proof).
- Do not edit past directives except appending to "Learnings".
- Do not install a UI component library (MUI etc.) — the design system is the deliverable. Storybook + testing/build tooling are fine.
