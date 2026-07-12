# WALLET-000 — Bootstrap the agentic workspace

**Goal**: Stand up the repo so every later action is traceable: hooks, charter, evidence machinery, app + Storybook scaffold.
**Surface(s)**: repo-level.
**Inputs**: this workspace.
**Output**: initialized repo, first commits, remote connected, Vite React-TS app + Storybook in `04-prototyping/app/`.

## Acceptance
- [ ] `git init` + repo-local identity (Alina Koval / alina.koval.design@gmail.com)
- [ ] `commit-msg` hook installed and demonstrably rejects a commit without a directive reference (test it; keep the failed attempt in the terminal log as evidence)
- [ ] PostToolUse hook configured: every agent file-write auto-appended to `docs/build-log.md`
- [ ] First commit `WALLET-000: bootstrap agentic design workspace`; remote `github.com/alinakovaldesign/moneybase.git` connected and pushed
- [ ] `04-prototyping/app/` scaffolded (Vite React-TS), runs, committed
- [ ] Storybook initialized in the app: platform-theme toolbar placeholder + a11y addon installed
- [ ] README assumptions verified current; receipt of brief confirmed with assumptions stated

## Out of scope
- Any feature UI, any tokens (WALLET-001), any research (DESIGN-000).

## Learnings
- Hook test first, commit second: proving the commit-msg hook rejects untagged commits BEFORE the first real commit puts the enforcement evidence at the very start of the trail (see build-log WALLET-000).
- Storybook 10 ships the a11y addon by default via `init`; the platform toolbar is declared in `preview.tsx` `globalTypes` as a placeholder — WALLET-001 must connect it to the real PlatformProvider, not duplicate it.
- `npx storybook init` leaves demo stories in `src/stories/` — keep until WALLET-001 replaces them with token-driven components, then delete in the same commit.
- Push worked against an existing empty GitHub repo with stored credentials; no PAT setup was needed.
