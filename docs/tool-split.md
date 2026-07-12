# Claude Code vs Claude Design — split for this feature (one-pager skeleton)

Fill final version after DESIGN-003 + WALLET-009, from actual experience — the panel can tell theory from practice.

## What each is best at (for this feature)
| | Claude Code | Claude Design |
|---|---|---|
| Strength | Committed, versioned, hook-enforced artifacts; token pipeline; state logic; edge cases; multi-file refactors; subagent review | Fast visual exploration via chat; layout/composition/tone iteration before structure is locked; judging directions side-by-side; stakeholder-friendly canvas |
| For this task | The system of record: tokens, all flow logic, edge states, PRs, evidence | The system of exploration: visual direction for wallet card, wizard tone, explainer/consent art direction, success moment (DESIGN-001); post-build refinement against real screenshots (DESIGN-003) |
| Weakness | Slow and expensive to "just try" 5 visual directions | Output isn't versioned/reviewable as code; drift risk if treated as a second source of truth |

## Chosen pipeline (the round trip — both handoff directions demonstrated)
1. **Explore** (DESIGN-001, Claude Design): 2–3 directions for the four key moments; prompts logged, exports committed.
2. **Lock + extract** (DESIGN-002): one direction chosen (DDR), translated into token values. **This is the exact line where design intent becomes code.**
3. **Build** (WALLET-001..008, Claude Code): all structure, states, edges, a11y iterated in code only. Canvas is frozen.
4. **Round-trip refine** (DESIGN-003, Claude Design): one shipped screen goes back to canvas as a screenshot; iteration output is expressed only as token/component deltas.
5. **Commit** (WALLET-009, Claude Code): deltas land as the design-carrying PR with per-platform visual evidence.

## Anti-drift rules
- Single direction of truth per phase: before DESIGN-002 the canvas leads; after it, the repo leads — permanently.
- Canvas → code handoff is always a *token extraction table* or *delta spec*, never "match this image."
- Anything worth keeping from a later canvas session re-enters via a new DESIGN directive + PR; the canvas itself is never updated backward to match code.
- Both tools produce evidence the same way: written prompts/directives in, versioned artifacts out.

## Never fully delegated to an agent (and why)
- Consent + explainer copy (regulatory meaning; agent proposes, human owns)
- Error semantics for money actions (what "failed" promises the user)
- The decision of which errors block vs warn
- Direction choice in DESIGN-002 (taste + brand judgment is the human's job; the agent generates options)
- Final acceptance of any screen a client could screenshot in a complaint
