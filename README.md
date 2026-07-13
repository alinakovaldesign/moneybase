# Moneybase — Multi-currency wallet + card linking (B2B)

**Live prototype**: https://alinakovaldesign.github.io/moneybase/ · **Storybook**: https://alinakovaldesign.github.io/moneybase/storybook/ · **Design PR**: https://github.com/alinakovaldesign/moneybase/pull/1

An **agentic product design workspace** for the Moneybase design-engineer assessment: the full end-to-end workflow — research → design system → content → prototyping — run by directing AI agents, with every decision traceable from written directive → agent session → commit → PR.

## How it is built: the 3-layer architecture
- **Layer 1 — Directives (what to do).** Plain-language SOPs in each area's `directives/` folder: goal, inputs, tools, acceptance, edge cases. Streams: `WALLET-NNN` (code), `DESIGN-NNN` (research + canvas), `CONTENT-NNN` (copy).
- **Layer 2 — Orchestration (judgment).** The agents — Claude Code (system of record) and Claude Design (system of exploration) — sequence work, call tools, synthesize, and ask when ambiguous. The human owns direction choices, copy approval, and final acceptance.
- **Layer 3 — Execution (mechanical work).** Deterministic scripts and integrations: git hooks, Style Dictionary token transforms, Storybook builds, screenshot matrices, a11y checks, Notion writes. See `scripts/README.md` and `00-meta/tool-registry.md`.

## Workspace
| Area | Owns |
|---|---|
| `00-meta/` | Plan, environment map, tool registry, templates, operating logic |
| `01-research/` | Brand cue sheet (public Moneybase surfaces), competitor patterns, insights |
| `02-design-system/` | Tokens → three platform themes, components, governance, Storybook, the design PR |
| `03-content-creation/` | Consent/explainer copy, error messages, microcopy — human-approved decks |
| `04-prototyping/` | Canvas exploration, user flow, the app, stories, QA, handoff |
| `docs/`, `evidence/`, `scripts/` | Logs + decisions, human-curated proof, deterministic execution |

## Stated assumptions (the brief rewards stated assumptions)
1. **Surface**: one React codebase rendering three platform skins — iOS (HIG), Android (Material 3), web — from a single token source, switchable at runtime. Trade-off chosen deliberately: demonstrable cross-platform token resolution + a shareable link over native fidelity.
2. **Segment**: B2B — a business finance operator at fictional "Aster Logistics Ltd"; consent copy reflects company cardholder authority.
3. **Data**: fully mocked; latency 400–1400ms; failure injection via `?fail=duplicate|unsupported|cardlink|consent`; test-pattern PANs only.
4. **Brand**: approximated from public Moneybase surfaces (see `01-research/`); internal tokens/components are unknowable from outside and are stated as assumptions, not guessed silently.

## Where the evidence lives
| Proof | Location |
|---|---|
| Directives (committed before their outputs) | `*/directives/` |
| Directive → commit traceability | `scripts/commit-msg` hook (rejects unreferenced commits) |
| Build log (agent writes + human interventions) | `docs/build-log.md` |
| Raw agent sessions / annotated copy | `evidence/sessions/` |
| Claude Design prompts + exports | `evidence/design-sessions/` |
| Component states × platforms | Storybook + `evidence/screens/` |
| Decisions | `docs/decisions/` |

## Run it (after Phase 3)
```
cd 04-prototyping/app && npm install && npm run dev       # the flow prototype
npm run storybook                                          # the design-system workbench
```
