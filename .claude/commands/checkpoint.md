---
description: End-of-sprint evidence checkpoint. Usage: /checkpoint sprint-2
---

Run the evidence checklist for $ARGUMENTS and report pass/fail per line:

1. `git log --oneline -15` — every commit references a WALLET-NNN ID?
2. Directive files for all IDs used this sprint exist in `directives/` and were committed before their code?
3. `docs/build-log.md` has entries for this sprint (auto + interventions)?
4. Any decisions made with rejected alternatives → DDR written in `docs/decisions/`?
5. Remind the human: run `/export` and save the raw session to `evidence/sessions/` (agent must NOT write there).
6. All acceptance checklists for this sprint's directives fully met? List any open items.

Output a short table. Do not fix anything without approval.
