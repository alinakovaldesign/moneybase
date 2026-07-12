# Environment map — what lives where, and what flows where

```
moneybase/
├── CLAUDE.md                  charter (loaded by every agent session)
├── .claude/                   orchestration config: /directive, /log-intervention, /checkpoint,
│                              reviewer subagents (design-critic, a11y-auditor)
├── 00-meta/                   plan, this map, tool registry, templates, bootstrap directive
├── 01-research/               DESIGN-000 → outputs/research.md (brand cue sheet + pattern adopt/avoid)
├── 02-design-system/          tokens (source of truth), platform themes, NOTES.md,
│                              DESIGN-002 (extraction), WALLET-001 (tokens+themes+Storybook), WALLET-009 (design PR)
├── 03-content-creation/       CONTENT-001 (consent/explainer deck), CONTENT-002 (errors/microcopy deck)
├── 04-prototyping/            DESIGN-001 (canvas exploration), DESIGN-003 (round trip),
│                              WALLET-002..008 (flow build), WALLET-010 (blast radius) + app/ + storybook
├── docs/                      build-log, decisions/ (DDRs), stakeholder-summary, tool-split
├── evidence/                  sessions/ (raw + annotated), design-sessions/, screens/
└── scripts/                   execution layer (see scripts/README.md)
```

## The flow of an idea through the workspace

```
01-research (cue sheet)
   → 04-prototyping DESIGN-001 (canvas directions)
      → 02-design-system DESIGN-002 (direction locked → token values)   ← design intent becomes code HERE
         → 02-design-system WALLET-001 (tokens + 3 themes + Storybook)
            → 03-content-creation CONTENT-001/002 (copy decks, human-approved)
               → 04-prototyping WALLET-002..007 (flow build, stories per component)
                  → 04-prototyping WALLET-008 (QA: subagents, a11y, timing, screenshot matrix)
                     → 04-prototyping DESIGN-003 (shipped screen → canvas → delta spec)
                        → 02-design-system WALLET-009 (delta lands as the design-carrying PR)
                           → docs + Notion (case documentation)
```

## Evidence flows (automatic once environment is live)
- every commit → hook-checked directive reference → traceability
- every agent file-write → PostToolUse hook → `docs/build-log.md`
- every session end → `/export` → `evidence/sessions/`
- every canvas session → prompts + exports → `evidence/design-sessions/`
- every component → Storybook stories → screenshot matrix → `evidence/screens/`
