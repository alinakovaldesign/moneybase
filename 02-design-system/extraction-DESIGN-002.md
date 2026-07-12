# DESIGN-002 — Token extraction table (canvas → tokens)

Source: `evidence/design-sessions/DESIGN-001/Moneybase Wallet Flows.dc.html` (frozen snapshot, byte-verified).
Every semantic token in `tokens/tokens.seed.json` traces to a canvas value below, or is marked **[system default]**.

## Color

| Canvas value | Where on canvas | Token |
|---|---|---|
| `#16A0F6` | primary CTAs, links, active step bar, circular actions, checkbox ticked | `action.primary-bg`, `text.link`, `border.focus` |
| `#0F86D2` | hover states | `action.primary-bg-hover` |
| `#16325C` | headings, key figures, chip text, VISA block, dark flag base | `text.heading`, `action.accent-text` |
| `#FFBD00` / `#F0B200` | "New wallet" CTA + hover (the single amber conversion moment) | `action.accent-bg` / `-hover` |
| `#DEEEFD` | icon chips, Decline button, inactive step bars, BASE badge | `surface.tint`, `action.secondary-bg` |
| `#CFE5FB` | Decline hover | `surface.tint-hover` |
| `#AFD6F9` | "+ Add currency" dashed border | `border.dashed-accent` |
| `#F1F6FC` | explainer chips | `surface.chip` |
| `#EAF4FE` | dashed-chip hover | `surface.chip-hover` |
| `#F4F6F9` | screen background | `surface.page` |
| `#F7F9FC` | wizard sheet background | `surface.sheet` |
| `#FFFFFF` | cards, inputs | `surface.raised` |
| `#E4EAF1` + `#E7ECF2` | disabled button bg + disabled icon circles — **normalized: merged** (ΔE tiny, same meaning) | `surface.disabled` = `#E4EAF1` |
| `#93A6BC` | dimmed backdrop behind sheet | `surface.scrim` |
| `#2C3E52` | consent body text | `text.primary` |
| `#42536A` | form labels | `text.label` |
| `#5A6B7E` + `#6B7A8C` | secondary/caption text — **normalized: merged** (near-duplicates used interchangeably) | `text.secondary` = `#5A6B7E` |
| `#7E8CA0` | de-emphasized balance decimals | `text.muted` |
| `#9FACBC` | disabled button text | `text.disabled` |
| `#A9B6C6` | chevrons, disabled icons, unticked checkbox border | `icon.tertiary` |
| `#C0392B` | duplicate-name error text + input border | `feedback.error` |
| `#1E8E5A` / `#E2F2EA` | success check / its tint circle | `feedback.success` / `feedback.success-bg` |
| `#E1E8F0` | card & chip borders | `border.default` |
| `#D8E2EC` | input borders | `border.input` |
| `#EAF0F6` | row dividers | `border.divider` |
| `rgba(22,50,92,0.06)` 0 1px 3px | card shadow | `shadow.card` |
| `rgba(22,160,246,0.35)` 0 2px 6px | primary circular action glow | `shadow.action` |
| `rgba(2,55,120,0.28)` 0 -10px 32px | sheet shadow | `shadow.sheet` |

## Type

| Canvas value | Where | Token |
|---|---|---|
| Nunito 800 (via Google Fonts) | all display: titles, balances | `font.display` — resolves the DESIGN-000 unknown: canvas approximates Moneybase's rounded face with **Nunito** |
| Open Sans 400/600/700 | all UI text | `font.body` (matches product source) |
| 34/800 + decimals 20/700 muted | balance | `type.balance` (split-size money pattern) |
| 30/800 · 24/800 · 22/800 | page title · screen title · sheet title | `type.title-xl/-lg/-md` |
| 16 · 14 · 13 · 12 | body-lg (buttons, inputs) · body · secondary · caption | `type.body-lg/body/body-sm/caption` |
| 10/700 uppercase-ish | BASE badge | `type.badge` |

## Shape & metrics

| Canvas value | Where | Token |
|---|---|---|
| 16 / 14 | wallet card / inner cards | `radius.card` / `radius.card-sm` |
| 12 / 10 | buttons / inputs | `radius.button` / `radius.input` |
| 22 (top) | wizard sheet | `radius.sheet` |
| 999 | chips, pills, badges | `radius.pill` |
| 7 | consent checkbox | `radius.checkbox` |
| 52 / 50–54 | button height / input & picker height — **normalized: inputs 52** | `size.control-h` = 52 |
| 56 | circular action buttons | `size.action-circle` |
| 38–42 | icon chips — **normalized: 40** | `size.icon-chip` |
| 20 / 16 / 12·14 / 8·10 / 6 | screen padding / card padding / block gaps / row gaps / micro gaps | `space` scale 4/8/12/16/20/24 confirmed (canvas values snap to it after normalization) |
| 4px bar | step progress | `size.progress-h` |

## Not derivable from canvas — [system default], flagged for WALLET-001

- Motion durations/easing (canvas static): keep seed defaults 150/250/400ms; realistic-timing rules live in WALLET-008.
- Platform overrides (Android M3 / web): canvas is iOS-only; M3/web resolution stays guideline-driven per the seed's `platforms` block.
- Focus-ring style (web), reduced-motion variants.

## Normalization decisions (judgment, human-reviewable)

1. Merged near-duplicate grays `#5A6B7E`/`#6B7A8C` → one `text.secondary`; canvas used both interchangeably.
2. Merged disabled surfaces `#E4EAF1`/`#E7ECF2` → one `surface.disabled`.
3. Snapped control heights 50/52/54 → single 52 (iOS target ≥44 preserved).
4. Icon chip sizes 38/42 → 40.
These are one-value-one-meaning corrections a design system requires; visual delta is imperceptible.
