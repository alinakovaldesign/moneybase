# Execution layer (Layer 3) — deterministic, testable, repeatable

If a step is mechanical, it lives here — not in the agent's judgment loop.

| Script | Status | Does |
|---|---|---|
| `commit-msg` + `install-hooks.sh` | ✅ ready | Rejects any commit not referencing WALLET-/DESIGN-/CONTENT-NNN — the traceability guarantee |
| `generate-tokens` | planned (WALLET-001) | Style Dictionary: `tokens.json` → CSS vars, `Tokens.swift`, Compose `tokens.xml` |
| `screenshot-matrix` | planned (WALLET-008) | storycap/Playwright: every Storybook story + flow state × 3 platform themes → `evidence/screens/` |
| `a11y-check` | planned (WALLET-008) | axe run over Storybook stories; fails on violations |
| `blast-radius` | planned (WALLET-010, optional) | token → semantic aliases → components → screens → platforms, emitted as markdown |
| PostToolUse hook (`.claude/`) | planned (WALLET-000) | Auto-appends every agent file-write to `docs/build-log.md` |

Conventions: scripts are idempotent, take no interactive input, print what they did, and never touch `evidence/` except their designated output folder.
