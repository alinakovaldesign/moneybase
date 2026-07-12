# Tool registry — what each tool is for, and which layer it belongs to

| Tool | Layer | Role in this workspace | Evidence it produces |
|---|---|---|---|
| **Claude Code** | 2 — orchestration | System of record: reads directives, builds tokens/components/flow, runs subagents, opens PRs | session files → `evidence/sessions/`, commit trail |
| **Claude Design** | 2 — orchestration (canvas) | System of exploration: DESIGN-001 directions, DESIGN-003 round-trip refinement | prompts + exports → `evidence/design-sessions/` |
| **Mobbin** (MCP) | 3 — execution | Pattern research for DESIGN-000 (Wise/Revolut/Airwallex business wallets) | citations in `01-research/outputs/research.md` |
| **Web fetch** | 3 — execution | Brand cue extraction from public Moneybase surfaces (DESIGN-000) | cue sheet with sources |
| **Git + commit-msg hook** | 3 — execution | Enforced directive→commit traceability; never bypassed | the commit history itself |
| **GitHub** (`alinakovaldesign/moneybase`) | 3 — execution | Remote history + the design-carrying PR, visible to the panel | repo + PR |
| **Storybook** | 3 — execution | Component workbench: every DS component × states × 3 platform themes; a11y addon; the living Area-4 artifact | stories + static build, screenshot source |
| **Style Dictionary** | 3 — execution | `tokens.json` → CSS vars + `Tokens.swift` + Compose XML (one source, three platforms, real files) | generated token files, committed |
| **Playwright / storycap** | 3 — execution | Screenshot matrix: every state × 3 skins, for the design PR visual diff + demo insurance | `evidence/screens/` |
| **Reviewer subagents** (`design-critic`, `a11y-auditor`) | 2 — orchestration (delegated) | Directed review vs HIG/M3/WCAG; human accepts/rejects findings | findings + decisions in build log |
| **Notion** (MCP) | 3 — execution | Case documentation front door (panel + portfolio): problem, flow, decisions, links | Notion page (content approved by human before publish) |
| **Claude Code hooks** (PostToolUse) | 3 — execution | Machine-generated build log of every agent file-write | `docs/build-log.md` entries |

Rule of thumb: if a step is deterministic and repeatable, push it down to layer 3 (a script or integration). The agent's judgment budget is spent on design decisions, not mechanics.
