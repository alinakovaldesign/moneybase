# CONTENT-002 — Error states + microcopy deck

**Goal**: Every word the client reads when something goes wrong or needs explaining — specific, blame-free, always with a next step.
**Surface(s)**: copy deck consumed by WALLET-003..007 (identical across skins).
**Inputs**: DESIGN-000 tone cues, the four required error scenarios from the brief, mock-service error semantics (WALLET-002).
**Output**: `03-content-creation/outputs/errors-microcopy-deck.md`.

## Deck contents
- [ ] Duplicate wallet name: inline error + a suggested variant name ("You already have a wallet called 'Operating'. Try 'Operating — EUR'?")
- [ ] Unsupported currency: the reason string pattern shown next to disabled entries (why + what to do: "not yet available for business accounts — request it")
- [ ] Card-link failure: what failed (specific, not "something went wrong"), retry label, "use a different card" label; states the draft is safe
- [ ] Consent declined: confirmation of no action taken, draft status, path back
- [ ] Microcopy: "base currency" one-line explanation, wizard step labels, cancel-confirm dialog, loading context lines (">400ms needs words"), success message, empty states
- [ ] Every error answers three questions: what happened, is my money/draft safe, what do I do now

## Hard rules
- [ ] No blame ("you entered an invalid…" → "we couldn't…"), no dead ends, no jargon codes without translation
- [ ] Human approval per line recorded in the deck before components consume it

## Out of scope
- Consent/explainer copy (CONTENT-001). Notification/email copy.

## Learnings
_(appended on completion)_
