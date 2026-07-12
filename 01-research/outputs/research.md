# DESIGN-000 — Research: Moneybase product UI + B2B multi-currency patterns

Sources: actual product surfaces only — the live web app (`live.moneybase.com`, pre-login), official App Store product screenshots (apps.apple.com/mt/app/moneybase/id1614797633 via iTunes API), Mobbin (Wise, Revolut Business, Airwallex). Marketing landing page deliberately not used as a style source (it differs from the product).

---

## Track A — Brand cue sheet (observed in the real product → token implication)

### Color

| Observed | Where | Token implication |
|---|---|---|
| Bright blue ~`#4A9DF0` (auth bg reads lighter ~`#4A9DF0`, actions ~`#16A0F6`) | primary action buttons, circular action icons, active nav item, links, auth screen background | `action.primary-bg`, `text.link`, `nav.active-bg` |
| Deep navy ~`#16325C`–`#023778` | web sidebar background, headlines, button text on amber | `surface.nav`, `text.heading`, `action.on-accent-text` |
| Amber `#FFBD00` / `#F0C94B` (web CTA) | **Sign Up / Continue buttons on web** (navy text), support illustration | `action.accent-bg` — Moneybase uses amber for high-emphasis conversion CTAs; candidate for final "Create wallet" confirm |
| Near-black dark surface | **app home dashboard is dark-themed** (balance, activity list) | dark theme exists in product; our prototype ships light with dark home noted as divergence-candidate (assumption #3) |
| Pale blue tints `#DEEEFD`, `#AFD6F9`, light-blue promo `~#A8CFF0` | section backgrounds, promo banners, icon chips | `surface.tint`, `surface.promo` |
| Green (positive amounts), red (negative) | activity list +€40.00 green | `feedback.success`, `feedback.error` — amounts are color-coded |
| White cards on light gray page | web content area | `surface.page`, `surface.raised` |

### Type & shape

| Observed | Token implication |
|---|---|
| Body: **Open Sans** (declared in web app HTML); Roboto fallback | `font.body = Open Sans` |
| Display: rounded geometric sans in logo/headlines (bundled custom font, name not extractable from outside) | `font.display` — approximate with a rounded geometric face (e.g. Nunito); **stated assumption** |
| Balance typography: large numerals, decimals smaller + lighter (`€63,481.07`, `€20,354.64`) | money-display component: split-size amount pattern — adopt |
| Buttons: rounded-rect radius ~8–12px full-width (mobile); rounded-full pills (web top bar) | `control.radius` ~10px; pill variant for compact web actions |
| Cards: radius ~12–16px, soft shadows on white | `surface.card-radius` |
| Inputs (web auth): label-above, hairline underline style | web input variant; mobile uses boxed fields |

### Signature UI patterns (the product's fingerprint — reuse these)

1. **Circular icon-buttons with labels below** for primary object actions (Add Funds / Exchange / Details; Statement / Share; View PIN / Freeze) — THE Moneybase action pattern; our wallet screen must use it.
2. **Wallet detail layout** (App Store shot 3): flag roundel → wallet name **with inline rename pencil** → big balance → circular actions → key-value details table (label gray left, value blue right, copy icons). A "EUR Wallet" per-currency wallet already exists in the product — our multi-currency wallet extends a familiar mental model.
3. **Key-value rows** for record details (transaction detail, IBAN details).
4. **Web app shell**: deep navy left sidebar with sectioned nav (Payments → **Wallets** exists today), white top bar with centered search, amber CTA top-right.
5. **Slide-to-confirm** for payments ("Slide to make payment") — deliberate friction for money actions; candidate for card-link consent confirm (adopt-with-care, see patterns).
6. Currency chips with flag + code and dropdown caret.

### What cannot be known from outside (stated assumptions, not guesses)

1. Internal token names/values, grid, spacing scale — approximated from screenshots.
2. Exact display typeface — bundled; approximated with a rounded geometric face.
3. Whether the B2B product skins differ from B2C — assumed same design system, more restrained tone.
4. Dark-vs-light theming policy (home is dark, feature screens light) — our prototype ships light; dark home noted as a follow-up.
5. Native Android treatment (Play Store shots are the same marketing frames) — Material mapping is ours, guideline-driven.

---

## Track B — Pattern research (Wise, Revolut Business, Airwallex via Mobbin)

Key references:
- Wise "Opening a balance": chooser → **searchable currency list with flags** → wallet with **currency chips + "Add currency" chip** ([flow](https://mobbin.com/flows/41bf0ab3-b96a-4fb3-b374-9585808698c1))
- Wise wallet detail: circular Add/Convert/Send/Request actions, **disabled (gray) until funded**, empty-state transactions ([screen](https://mobbin.com/screens/f1c8f9a2-3a9c-48ff-8e2c-51c0d8b03850))
- Airwallex Cash tabs + "only show currencies I transact in" toggle ([screen](https://mobbin.com/screens/01a2d4d3-f142-4815-acf9-bc6e655796d8))
- Airwallex card verification: **"Complete Verification Later"** escape hatch ([flow](https://mobbin.com/flows/b0200a31-f0cb-4add-a076-af57526de115))
- Revolut Business: dark pro density, card sheet with See details/Freeze/Settings + **"No spending limit — Set limit"** nudge ([flow](https://mobbin.com/flows/acda7209-4aa3-467c-a17d-d12bbc6a1f05))

### Adopt (5)

1. **Searchable currency list, flags left, chevron right** (Wise) — for base + additional currency pickers; common currencies first.
2. **Currency chips row on wallet detail with trailing "+ Add currency" chip** (Wise) — makes multi-currency legible at a glance and keeps "add" discoverable post-creation.
3. **Actions visible but disabled until funded** (Wise) — communicates capability before money arrives; pairs with our zero-balance funded-wallet landing.
4. **Escape hatch on verification-ish steps** (Airwallex "Complete Verification Later") — adapted: consent declined keeps the draft and offers a way back (matches our decline-is-first-class rule; note: card itself stays required for funding — explain, don't silently allow skip).
5. **Card management as sheet with circular actions + limit nudge** (Revolut Business) — for the funded wallet's card block (view, rename label, set-limit stub).

### Avoid (3)

1. **Hiding unsupported currencies** (all three just omit them) — B2B operators need to know *why* USD-X is missing; we show disabled + reason. This is our deliberate divergence.
2. **Marketing upsells inside creation flows** (Wise "Earn" banners, Revolut cross-sells) — a B2B ops flow must stay task-pure.
3. **Slide-to-confirm for consent** (Moneybase uses it for payments) — consent needs *informed* agreement (checkbox + summary), not a gesture that can be performed without reading. Keep slide-to-pay out of scope; use explicit checkbox + button.

### Flow implications confirmed by research

- Wallet naming + renaming already exists in Moneybase (pencil affordance) → duplicate-name validation is a natural extension.
- Per-currency "wallets" exist today; our feature introduces *grouping* (one wallet, many currencies) → the explainer must clarify base currency vs additional currencies, since it changes the existing mental model.
- Web nav already has Payments → Wallets → our web surface slots into the existing IA unchanged.

---

---

## Addendum (2026-07-12, human contribution): behind the auth wall

The designer (a real Moneybase account holder) supplied logged-in iOS screenshots that public-surface research could not reach:

1. **The feature already exists as a stub in production.** More → Wallets opens a "**Wallet Manager**" screen (per-currency wallets EUR/GBP/USD, zero balances, flag roundels, white grouped card, chevrons) with a full-width blue "**Create New Wallet**" CTA — tapping it shows a "**Coming soon**" toast. Our assessment feature is the product's next real roadmap item; the entry point ships today.
2. **Naming**: the production screen is "Wallet Manager" (not "Wallets home") — align our screen naming.
3. **Locale formatting**: production shows balances as `0,00 €` (comma decimal, symbol after) — European formatting, not the Anglo `€0.00` used on our canvas. Decision for the code phase: format money via locale-aware formatting matching production (flagged to WALLET-002/003).
4. **Confirmations**: light theme on wallet surfaces (validates DDR-002); flat per-currency wallet model (validates the "grouping is the new mental model" insight); native iOS nav patterns (back-chevron + centered title + HELP bubble).

*Screenshot policy: the Wallet Manager screenshots contain no personal data and may be archived in `refs/`; the More-menu screenshot contains the account holder's name and account ID — per the no-real-customer-data rule it is NOT archived; findings are recorded textually here instead.*

---

*Evidence: App Store screenshots archived in `01-research/outputs/refs/`; web-app observations from live.moneybase.com pre-login session (2026-07-12); logged-in product observations contributed by the account-holding human (addendum above); Mobbin links inline.*
