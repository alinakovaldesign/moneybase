# Descope & next steps (the honest ledger)

Time spent exceeded the 6-hour guide — by design, the extra went into evidence quality and three platforms. Per the brief's rule, here is what was cut or deferred, and what we'd do next.

## Deliberately descoped (with reasons)
- **M3 full-screen-dialog app-bar anatomy** (X-close leading, action trailing) — Android currently reuses the shared header; structural rework queued behind the QA pass.
- **Full focus traps in dialogs** — Escape/initial-focus/restore shipped; a trap utility is the remaining step.
- **Roving tabindex / typeahead** for radio groups and the currency listbox (reachable and operable today).
- **Success auto-advance timing control** (SC 2.2.1) — hold is reduced-motion-aware; a "stay here" affordance is next.
- **Currency-row destinations** — merged-list rows are informational; per-currency statements are a natural next screen.
- **Blast-radius tooling (Area 8)** — method sketched in the directive; not built.

## Next, in order
1. Per-currency detail + Add-funds flow (the two dead-ends users will hit first).
2. The deferred a11y items above; then per-skin screenshot diffing in CI on token changes.
3. Real FX source + rounding policy decision (per-currency-then-sum vs sum-then-round — the 2-cent question from PR #1).
4. Production-palette AA remediation proposal for the core product (DDR-004 evidence attached).
