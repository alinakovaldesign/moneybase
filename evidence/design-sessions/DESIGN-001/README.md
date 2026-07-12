# DESIGN-001 — Canvas snapshot (verbatim fetch)

- **Source**: Claude Design project "Moneybase B2B Wallet Design", owner Alina
  https://claude.ai/design/p/1ad04ece-20d3-424a-932c-5acf5a27f1c7?file=Moneybase+Wallet+Flows.dc.html
- **Fetched**: 2026-07-12 via DesignSync (`get_file`) — mechanical verbatim copy, not agent-authored content
- **Files**: `Moneybase Wallet Flows.dc.html` (the design), `ios-frame.jsx` (device-frame scaffold used by the canvas). `support.js` is the generic canvas runtime, not design content — omitted.
- **Screens on canvas**: 1a Wallets home · 1b Wizard step 1 (duplicate-name error / ok, via `nameError` prop) · 1c Card-funding explainer (3 panels) · 1d Consent (unticked/ticked via `consentTicked`, Agree disabled, Decline equal citizenship) · 1e Success · 1f Wallet detail (unfunded/funded via `walletFunded`, currency chips + "+ Add currency", actions disabled-until-funded)
- **Status**: this snapshot is the freeze point for DESIGN-002 token extraction. Any later canvas change re-enters only via a new DESIGN directive.
