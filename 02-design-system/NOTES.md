# Design-system notes — one source, three platforms (as built)

Source of truth: `tokens/tokens.seed.json` → `scripts/generate-tokens.mjs` → `tokens.css` (web/runtime) + `Tokens.swift` (SwiftUI) + `tokens.xml` (Compose). Every value the panel sees on any platform traces to one JSON file; the canvas-to-token mapping is in `extraction-DESIGN-002.md`.

## Decision levels (with real examples from this feature)

| Level | Owns | Real examples |
|---|---|---|
| **Token (semantic)** | Meaning, brand, state colors | `action.accent-bg` (amber, one conversion moment per journey); `chart.*` added by PR #1; AA split `blue.700` text-bearing vs `blue.500` graphic (DDR-004) |
| **Component** | Anatomy, behavior, states | Button (5 states, never hidden when disabled); TextField (error inline + aria-live); ConsentCheckbox (never pre-ticked); dropdown recipe (anchor to trigger, scroll-snap rows, contained overscroll, top-reset on open) |
| **Platform (presentation)** | Structure and idiom | PlatformFrame is the ONLY platform branch: iOS device frame + sheet; Android frame + M3 full-screen dialog + top app bar; web = the real product shell (sidebar/topbar/master–detail panels) |

## Three components, one definition, three resolutions

1. **Button** — same component; `[data-platform]` overrides give r12 (HIG), pill (M3), r10 + visible focus ring + hover (web). Heights: 52 base, 44 web; targets ≥44/48 via `--target-min`.
2. **Wizard container (sheet/dialog/modal)** — same steps and state; iOS bottom sheet with grabber + scrim over the whole device, Android M3 full-screen dialog, web centered modal above the shell. Sticky header/footer anatomy shared; only presentation CSS differs.
3. **Currency select** — same listbox; divergence is only metric (row heights, radius) — the interaction recipe (snap, contained scroll) is deliberately unified because it is behavior, not idiom.

## Divergence policy (as enforced)

- **Unified everywhere**: IA, step order, copy (single `copy.ts` from approved decks), error semantics, consent content, token meanings, money formatting (`en-MT`, one formatter).
- **Divergent, guideline-cited**: presentation containers, control metrics, dividers (hairline/elevation/border), motion easing, device chrome. Each override carries its guideline in the generated CSS comment.
- **Test applied**: a divergence must name its guideline or the observed product behavior — otherwise it was unified. The one exception-turned-rule: focus rings stay visible on ALL skins (WCAG 2.4.7 beats platform cosmetics; DDR-004).

## How one flow feels native three ways without three designs

Screens read semantic tokens and never branch on platform in JS; the platform layer re-points a small override set and swaps the outer shell. Proven live: switching iOS ↔ Android mid-wizard re-presents the same step (sheet ⇄ full-screen dialog) with zero state loss.

## Governance notes

- Ignore rules and generated files: `dist/` outputs are committed deliverables, not build noise.
- Pictorial exemption: `Flag.tsx` uses real-world flag colors under a documented `@token-exempt` marker; the no-hex grep excludes only that marker.
- Storybook is the living workbench: components render against the same `[data-platform]` mechanism via the toolbar, with the a11y addon on every story.
