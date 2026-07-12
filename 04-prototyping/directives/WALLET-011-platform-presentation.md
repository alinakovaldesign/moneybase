# WALLET-011 — Platform presentation fidelity (human review finding)

**Goal**: Make each platform skin structurally true to its guideline and to the real product — not a token re-theme of the same mobile column.
**Surface(s)**: all three; this is the presentation layer above the token layer.
**Inputs**: DESIGN-000 research (the REAL web shell captured from live.moneybase.com: navy sidebar with Payments → Wallets, white top bar with centered search, content cards on light gray), canvas ios-frame.jsx as reference for device mockups, M3 structure specs.
**Origin**: human intervention 2026-07-12 — "when I switch to Android and Web it works very bad; are we following guidelines? Have you checked the existing web product?" Verdict: correct. The switcher currently proves token resolution (radius/height/motion/dialog form) but NOT platform presentation. Research captured the web shell and it was never applied.

## Acceptance
- [ ] **iOS**: flow renders inside an iPhone device frame (status bar, dynamic island, home indicator — reference: canvas ios-frame); sheet presentation retained; HIG large-title feel on home
- [ ] **Android**: flow renders inside an Android device frame; M3 structure — center-aligned top app bar, full-screen dialogs (already), M3-style list/dividers via tonal surfaces; primary action as M3-conformant button/FAB per research note
- [ ] **Web**: NO phone column. Full-width layout mirroring the real product shell: deep navy left sidebar (Payments → Wallets active), white top bar, content area on light gray with the wallets as cards; wizard as centered modal over the shell; hover states live
- [ ] Switcher swaps presentation shells; flow logic and screens are shared — zero per-screen platform branching in JS (container/frame components only)
- [ ] Each structural divergence commented with its driving guideline (HIG §, M3 component, web convention / observed product)
- [ ] Live verification per skin + screenshots to evidence/screens/

## Out of scope
- Pixel-perfect device chrome; new flow features; the QA pass itself (WALLET-008 follows).

## Learnings
_(appended on completion)_
