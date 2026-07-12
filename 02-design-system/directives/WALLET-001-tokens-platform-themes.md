# WALLET-001 — Token layer + three platform themes + Storybook workbench

**Goal**: One token source that resolves to iOS (HIG), Android (Material 3), and web skins, switchable at runtime — with Storybook as the living proof.
**Surface(s)**: all three (this IS the cross-platform mechanism).
**Inputs**: `02-design-system/tokens/tokens.seed.json` **as updated by DESIGN-002** (values extracted from the locked canvas direction), CLAUDE.md design rules.
**Output**: token source + generated platform outputs, `PlatformProvider` + visible switcher, Storybook running with first stories.

## Acceptance
- [ ] Two layers: primitives (raw values) and semantic aliases (`surface.raised`, `action.primary.bg`, `feedback.error`…). Components may only use semantic.
- [ ] Platform overrides limited to: radius scale, type ramp, motion durations/easing, elevation (M3) vs hairline borders (HIG), control heights (44pt / 48dp / 40px)
- [ ] Style Dictionary pipeline: one `tokens.json` → CSS variables + `Tokens.swift` + Compose `tokens.xml` — generated files committed (one source, three real platform artifacts)
- [ ] `PlatformProvider` + switcher persists choice; all three skins render the shell without breakage
- [ ] **Storybook initialized with: platform-theme toolbar (iOS/Android/web), a11y addon, tokens documentation page; Button + shell stories covering all states × 3 themes, a11y clean**
- [ ] Zero hex/px literals outside token files (grep proves it)
- [ ] Short comment per override naming the guideline that motivates it

## Out of scope
- Feature screens; components beyond Button + shell (they arrive with their flow directives, each with stories).

## Learnings
_(appended on completion)_
