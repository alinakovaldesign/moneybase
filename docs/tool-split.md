# Claude Code vs Claude Design — the split, from actual use

Final version, written after the pipeline ran end to end (41 commits, 18 directives, one merged design PR). Everything below happened in this repo — nothing is theoretical.

## What each was best at (observed)

| | Claude Code | Claude Design |
|---|---|---|
| **Role** | System of record: tokens, all flow logic, edge states, QA, PRs, evidence machinery | System of exploration: visual direction, screen composition, and post-ship critique |
| **What it actually did here** | Token generator (CSS/Swift/XML from one seed), mock service with failure injection, 4-step wizard with all 4 error states, 3 platform presentations, two reviewer subagents that found 6 blockers, the WALLET-009 PR | DESIGN-001: 6 on-brand screens with toggleable edge-state props; DESIGN-003: took a screenshot of the *shipped* screen and returned a rework (2b) with written rationale that survived review and merged |
| **Observed weakness** | Its own screenshots contained visual bugs it didn't *see* — six rounds of human review caught an iPad-shaped frame, half-width content, overlapping dropdowns | Output isn't versioned or reviewable as code; its numbers needed checking (2b's total was self-corrected once, and still differed by 2 cents of rounding) |

## The pipeline that actually ran

1. **Research** (Code): product cue sheet from real surfaces — because the canvas is only as on-brand as what you feed it.
2. **Explore** (Design): 6 screens on canvas, edge states included, from a prompt pack encoding the cue sheet.
3. **Extract** (Code): the canvas is HTML, so extraction was *deterministic* — every semantic token traces to a canvas value or is flagged `[system default]`. **This table is the exact line where design intent became code.**
4. **Build** (Code): canvas frozen; all iteration in code under directives, with the human reviewing the live product (not mockups).
5. **Round trip** (Design → Code): shipped screenshot back to canvas → delta spec → branch → PR #1 with token diff/blast radius → human merged. Loop closed.

## How drift was actually prevented

- **One direction of truth per phase**: canvas led until extraction; the repo led after. When the human later improved a screen, it re-entered through DESIGN-003 — never by silently editing canvas or code.
- **Handoffs are artifacts, not vibes**: an extraction table on the way in, a delta spec on the way out. Nobody ever "matched the picture."
- **The commit hook enforces provenance**: every change names its directive; both canvas sessions have verbatim prompt logs in `evidence/design-sessions/`.

## What was never fully delegated (and where that proved right)

- **Consent and money copy** — agent drafted, human approved line by line; agent content-QA caught two contradictions in the canvas copy (F1/F2) but the *decisions* were human.
- **Direction choice** — DDR-002 records the human's pick and the killed alternatives.
- **Visual acceptance** — every screen was accepted from the live product by the human; six review rounds produced fixes the agent's own verification had missed.
- **The merge button** — PR #1 was reviewed and merged by the human, not the agent.

## One honest surprise

Static agent review and human visual review caught *disjoint* bug sets: the human saw layout breakage in seconds; the subagents found a broken code path (new-card linking) and a silent submit failure no amount of looking at screens would reveal. The split isn't "agent builds, human approves" — it's two different review instruments, both necessary.
