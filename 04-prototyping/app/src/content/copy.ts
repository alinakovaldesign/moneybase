/**
 * Single copy source — every string traces to an approved deck line
 * (03-content-creation/outputs/*, approved 2026-07-12 "approve all recommended").
 * Components import from here; no user-facing string is hardcoded in a screen.
 */

export const explainer = {
  title: 'How card funding works',
  panels: [
    {
      // E1 title A / body B
      title: 'Your card funds this wallet',
      body: (card: string, wallet: string) => `When you add money, we charge ${card} and it lands in ${wallet}.`,
    },
    {
      // E2 title B / body A
      title: (base: string) => `You're charged in ${base}`,
      body: (base: string) => `Funding a non-${base} currency converts at the rate shown before you confirm.`,
    },
    {
      // E3 A
      title: 'You stay in control',
      body: 'Change or unlink the funding card anytime in wallet settings. A new card must be linked first.',
    },
  ],
} as const;

export const consent = {
  title: 'Your consent', // C0
  subtitle: "What you're agreeing to:",
  bullets: (card: string, wallet: string) => [
    `Moneybase may charge ${card} to fund ${wallet} when you add money.`, // C1
    'The amount, currency and any conversion rate are shown before each charge.', // C2
    'You can change the funding card anytime — an active wallet always keeps one linked card.', // C3-B (F1 fix)
  ],
  checkbox: (wallet: string) => `I agree Moneybase may charge this card to fund ${wallet}`, // C4
  agreeCta: 'Agree and link card', // C5
  declineCta: 'Decline', // C6
  declineReassurance: "Nothing is linked if you decline — you'll go back to card selection and your draft is saved.", // D1-B (F2 fix)
  declinedBanner: "You declined card linking. Your draft is saved — choose a card when you're ready, or cancel the wallet.", // D2-B
} as const;

export const errors = {
  duplicateName: (name: string, suggestion: string) =>
    ({ text: `You already have a wallet called ‘${name}’. Try `, suggestion, tail: '?' }) as const, // X1
  unsupportedPicked: (code: string) => `${code} isn't available for business wallets yet. Your other selections are kept.`, // X2b
  cardLink: {
    title: "We couldn't link this card", // X3
    safety: 'Your wallet draft is safe.',
    retryCta: 'Try again',
    otherCardCta: 'Use a different card',
  },
} as const;

export const loading = {
  nameCheck: 'Checking name…', // L1
  cardLink: 'Contacting your bank…', // L2
  createWallet: 'Creating your wallet…', // L3
} as const;

export const wizard = {
  stepIndicator: (n: number, of: number) => `Step ${n} of ${of}`, // M1
  title: 'Create multi-currency wallet',
  nameLabel: 'Wallet name',
  baseCurrencyLabel: 'Base currency',
  baseCurrencyHelper: 'Balances and reports default to this currency.', // M2
  step2Title: 'Additional currencies',
  step2Subtitle: 'Add the currencies this wallet will hold. You can add more later.', // M3
  cancelDialog: {
    title: 'Discard this wallet?', // M4
    body: 'Your entries will be lost.',
    keepCta: 'Keep editing',
    discardCta: 'Discard',
  },
  step3Title: 'Funding card',
  step3Subtitle: "Choose the card that funds this wallet. You'll review and consent before anything is linked.", // M5
  linkNewCard: 'Link a new card',
  newCardNotice: (last4: string, label: string) => `New card •• ${last4} (${label}) will be linked after your consent.`, // M8 (deck addendum)
  continueCta: 'Continue',
  backCta: 'Back',
  cancelCta: 'Cancel',
} as const;

export const success = {
  title: 'Wallet created', // S1
  body: (wallet: string, card: string) => `${wallet} is ready, and ${card} is linked as its funding card.`, // S2
  advancing: 'Taking you to your wallet…', // S3
} as const;

export const walletDetail = {
  unfundedHint: 'Exchange and Details unlock after the wallet is funded.', // S4
  unlinkGuard: 'An active wallet needs a funding card — link a replacement first.', // S5
  fundingCardLabel: 'Funding card',
  manageCta: 'Manage',
  addCurrency: '+ Add currency',
  baseBadge: 'BASE',
  renameLabel: 'Wallet name', // M6 (deck addendum)
  renameSave: 'Save',
  renameCancel: 'Cancel',
  addCurrencyTitle: 'Add a currency', // M7 (deck addendum)
  addCurrencyDone: 'Done',
} as const;

export const emptyState = {
  // S7 (deck addendum — screen requested by human 2026-07-12)
  title: 'No wallets yet',
  body: 'Create your first multi-currency wallet to hold, exchange and manage funds across currencies — funded by your company card.',
} as const;

export const home = {
  title: 'Wallets',
  company: 'Aster Logistics Ltd',
  accountType: 'Business account',
  baseCurrencyOf: (code: string) => `Base currency ${code}`,
  availableIn: (code: string) => `Available · ${code}`,
  newWalletCta: 'New wallet',
} as const;
