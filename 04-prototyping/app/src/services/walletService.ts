import { WalletError, type Card, type Currency, type Wallet, type WalletDraft } from './types';

/**
 * WALLET-002 — in-memory mock service. No network, ever.
 * - Realistic latency: 400–1400ms per async call.
 * - Failure injection via URL flags: ?fail=duplicate|unsupported|cardlink|consent
 *   Each produces its domain error, not a generic throw.
 */

// ---- failure flags -----------------------------------------------------------
function failFlag(): string | null {
  if (typeof window === 'undefined') return null;
  return new URLSearchParams(window.location.search).get('fail');
}

// ---- latency ------------------------------------------------------------------
const MIN_LATENCY = 400;
const MAX_LATENCY = 1400;
async function delay(): Promise<void> {
  const ms = MIN_LATENCY + Math.random() * (MAX_LATENCY - MIN_LATENCY);
  return new Promise((r) => setTimeout(r, ms));
}

// ---- seed data (mirrors production reality found in DESIGN-000 research) ------
const currencies: Currency[] = [
  { code: 'EUR', name: 'Euro', symbol: '€', common: true },
  { code: 'USD', name: 'US Dollar', symbol: '$', common: true },
  { code: 'GBP', name: 'British Pound', symbol: '£', common: true },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', common: true },
  { code: 'PLN', name: 'Polish Złoty', symbol: 'zł', common: false },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', common: false },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', common: false },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', common: false },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', common: false },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', common: false },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', common: false, unsupportedReason: 'Not yet available for business accounts — request it from your account manager.' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', common: false, unsupportedReason: 'Suspended for business accounts due to volatility controls.' },
];

const cards: Card[] = [
  { id: 'card-1', network: 'visa', last4: '4242', label: 'Corporate Visa', expires: '09/28' },
  { id: 'card-2', network: 'mastercard', last4: '8949', label: 'Company Mastercard', expires: '01/27' },
];

let wallets: Wallet[] = [
  {
    id: 'wallet-1',
    name: 'Operating Wallet',
    baseCurrency: 'EUR',
    balances: [
      { currency: 'EUR', amountMinor: 2485000 },
      { currency: 'USD', amountMinor: 312050 },
      { currency: 'GBP', amountMinor: 89025 },
    ],
    fundingCardId: 'card-1',
    createdAt: '2026-05-02T09:14:00Z',
  },
];

let nextWalletId = 2;

// ---- API ------------------------------------------------------------------------
export const walletService = {
  async listWallets(): Promise<Wallet[]> {
    await delay();
    return structuredClone(wallets);
  },

  async getWallet(id: string): Promise<Wallet | undefined> {
    await delay();
    return structuredClone(wallets.find((w) => w.id === id));
  },

  async listCurrencies(): Promise<Currency[]> {
    await delay();
    const list = structuredClone(currencies);
    // ?fail=unsupported marks an extra, normally-supported currency as unsupported
    // so the edge state is demonstrable on demand.
    if (failFlag() === 'unsupported') {
      const chf = list.find((c) => c.code === 'CHF');
      if (chf) chf.unsupportedReason = 'Temporarily unavailable — provider maintenance until 18:00 CET.';
    }
    return list;
  },

  async listCards(): Promise<Card[]> {
    await delay();
    return structuredClone(cards);
  },

  /** Case- and whitespace-insensitive duplicate check (WALLET-002 acceptance). */
  async checkName(name: string): Promise<{ available: boolean; suggestion?: string }> {
    await delay();
    const normalized = name.trim().toLowerCase().replace(/\s+/g, ' ');
    const duplicate =
      failFlag() === 'duplicate' ||
      wallets.some((w) => w.name.trim().toLowerCase().replace(/\s+/g, ' ') === normalized);
    if (duplicate) {
      return { available: false, suggestion: `${name.trim()} — ${wallets[0]?.baseCurrency ?? 'EUR'}` };
    }
    return { available: true };
  },

  /**
   * Links a card in the context of wallet creation. Consent must be explicit —
   * the service enforces what the UI promises (no consent, no charge authority).
   */
  async linkCard(cardId: string, consentGiven: boolean): Promise<{ cardId: string }> {
    await delay();
    if (!consentGiven || failFlag() === 'consent') {
      throw new WalletError(
        'CONSENT_REQUIRED',
        'Card linking needs your explicit consent.',
        'Review what you are agreeing to and tick the consent box, or decline to go back.',
      );
    }
    if (failFlag() === 'cardlink') {
      throw new WalletError(
        'CARD_LINK_FAILED',
        'Your bank declined the link request for this card.',
        'Retry, or choose a different card. Your wallet draft is safe.',
      );
    }
    if (!cards.some((c) => c.id === cardId)) {
      throw new WalletError('CARD_LINK_FAILED', 'This card is no longer available.', 'Choose a different card.');
    }
    return { cardId };
  },

  async createWallet(draft: WalletDraft): Promise<Wallet> {
    await delay();
    const { available } = await this.checkName(draft.name);
    if (!available) {
      throw new WalletError(
        'DUPLICATE_NAME',
        `You already have a wallet called ‘${draft.name.trim()}’.`,
        'Pick a different name — a suggestion is offered next to the field.',
      );
    }
    for (const code of [draft.baseCurrency, ...draft.additionalCurrencies]) {
      const c = currencies.find((x) => x.code === code);
      if (!c || c.unsupportedReason) {
        throw new WalletError(
          'UNSUPPORTED_CURRENCY',
          `${code} is not available for business wallets.`,
          c?.unsupportedReason ?? 'Choose a supported currency.',
        );
      }
    }
    const wallet: Wallet = {
      id: `wallet-${nextWalletId++}`,
      name: draft.name.trim(),
      baseCurrency: draft.baseCurrency,
      balances: [draft.baseCurrency, ...draft.additionalCurrencies].map((currency) => ({
        currency,
        amountMinor: 0,
      })),
      fundingCardId: draft.cardId,
      createdAt: new Date().toISOString(),
    };
    wallets = [...wallets, wallet];
    return structuredClone(wallet);
  },

  /** Test hook: reset in-memory state (used by future stories/tests). */
  _reset(): void {
    wallets = wallets.slice(0, 1);
    nextWalletId = 2;
  },
};
