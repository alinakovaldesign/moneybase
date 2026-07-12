# DESIGN-001 — Canvas snapshot (official handoff bundle)

- **Source**: Claude Design project "Moneybase B2B Wallet Design", owner Alina
  https://claude.ai/design/p/1ad04ece-20d3-424a-932c-5acf5a27f1c7?file=Moneybase+Wallet+Flows.dc.html
- **Provenance**: two independent copies, verified identical —
  1. 2026-07-12, agent fetch via DesignSync (`get_file`)
  2. 2026-07-12, human download of the official Claude Design handoff bundle
  `Moneybase Wallet Flows.dc.html` is **byte-identical** between the two (checked with `diff`) — the snapshot is faithful to the canvas.
- **Files**: `Moneybase Wallet Flows.dc.html` (the design) · `ios-frame.jsx` (device-frame component) · `support.js` (canvas runtime — required to render the file as it appears in Claude Design) · `.thumbnail` · `HANDOFF-README.md` (Claude Design's own handoff instructions)
- **To view as designed**: serve the folder over HTTP (e.g. `python3 -m http.server`) and open the `.dc.html` — opening via `file://` may not render the runtime correctly.
- **Screens on canvas**: 1a Wallets home · 1b Wizard step 1 (duplicate-name error / ok via `nameError`) · 1c Card-funding explainer (3 panels) · 1d Consent (unticked/ticked via `consentTicked`, Agree disabled, Decline equal citizenship) · 1e Success · 1f Wallet detail (unfunded/funded via `walletFunded`, currency chips + "+ Add currency", actions disabled-until-funded)
- **Status**: freeze point for DESIGN-002 token extraction. Any later canvas change re-enters only via a new DESIGN directive.
