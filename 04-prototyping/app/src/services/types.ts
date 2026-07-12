export type CurrencyCode = string;

export interface Currency {
  code: CurrencyCode;
  name: string;
  symbol: string;
  /** Common B2B currencies sort first in pickers. */
  common: boolean;
  /** When set, the currency is shown disabled with this reason — never hidden (DESIGN-000 adopt/avoid). */
  unsupportedReason?: string;
}

export interface Balance {
  currency: CurrencyCode;
  /** Minor units (cents) — money is never floated. */
  amountMinor: number;
}

export interface Wallet {
  id: string;
  name: string;
  baseCurrency: CurrencyCode;
  balances: Balance[];
  fundingCardId?: string;
  createdAt: string;
}

export interface Card {
  id: string;
  network: 'visa' | 'mastercard';
  /** Masked — only last4 ever exists in the mock (no real PANs anywhere). */
  last4: string;
  label: string;
  expires: string;
}

export interface WalletDraft {
  name: string;
  baseCurrency: CurrencyCode;
  additionalCurrencies: CurrencyCode[];
  cardId?: string;
}

/** Domain errors — every failure the UI must design for, never a generic throw. */
export type WalletErrorCode =
  | 'DUPLICATE_NAME'
  | 'UNSUPPORTED_CURRENCY'
  | 'CARD_LINK_FAILED'
  | 'CONSENT_REQUIRED';

export class WalletError extends Error {
  code: WalletErrorCode;
  /** What the user can do about it — feeds CONTENT-002's "what do I do now". */
  recovery?: string;

  constructor(code: WalletErrorCode, message: string, recovery?: string) {
    super(message);
    this.name = 'WalletError';
    this.code = code;
    this.recovery = recovery;
  }
}
