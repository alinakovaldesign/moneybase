# Design-system notes (Area 4 deliverable — skeleton, fill during Sprint 4)

## Decision levels
| Level | Owns | Examples from this feature |
|---|---|---|
| Token (semantic) | Meaning, brand, state colors | `feedback.error`, `action.primary-bg`, spacing scale |
| Component | Anatomy, behavior, states | CurrencyInput validation display; Sheet close affordances |
| Platform | Presentation idiom | Sheet (iOS) vs full-screen dialog (Android) vs modal (web); control heights; motion curves |

## Three components, one definition, three resolutions
Document each after building: **PrimaryButton**, **CurrencyInput**, **Sheet/Modal** — anatomy + tokens consumed (identical), then a 3-column table of platform resolution with the driving guideline cited per divergence (HIG §, M3 component page, web convention).

## Divergence policy
- **Unified (enforced)**: information architecture, step order, copy, error semantics, consent content, token meanings
- **Divergent (allowed, guideline-driven)**: presentation containers, control metrics, motion, navigation placement
- **Test**: a divergence must be justifiable by a named guideline; otherwise unify.

## How one flow feels native three ways without three designs
Components read semantic tokens only; the platform theme re-points a small override set (heights, radii, elevation vs hairline, motion). The flow is designed once at the semantic level; nativeness is a resolution concern, not a design fork.
