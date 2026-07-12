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
