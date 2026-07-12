/**
 * Locale-aware money formatting (DDR-003): Malta's English conventions are
 * symbol-first, dot-decimal (€0.00) — production's continental "0,00 €" looks
 * like a locale mismatch, so we format via Intl with en-MT. One formatter,
 * every screen inherits it; one-line switch if Moneybase confirms otherwise.
 */
const LOCALE = 'en-MT';

const formatters = new Map<string, Intl.NumberFormat>();

function formatterFor(currency: string): Intl.NumberFormat {
  let f = formatters.get(currency);
  if (!f) {
    f = new Intl.NumberFormat(LOCALE, { style: 'currency', currency });
    formatters.set(currency, f);
  }
  return f;
}

export function formatMoney(amountMinor: number, currency: string): string {
  return formatterFor(currency).format(amountMinor / 100);
}

/**
 * Split-size balance pattern from the canvas (integer large, decimals de-emphasized).
 * Returns parts so components can style them with type.balance tokens.
 */
export function formatMoneyParts(amountMinor: number, currency: string): { main: string; decimals: string } {
  const parts = formatterFor(currency).formatToParts(amountMinor / 100);
  const decimalIdx = parts.findIndex((p) => p.type === 'decimal');
  if (decimalIdx === -1) return { main: parts.map((p) => p.value).join(''), decimals: '' };
  return {
    main: parts.slice(0, decimalIdx).map((p) => p.value).join(''),
    decimals: parts.slice(decimalIdx).map((p) => p.value).join(''),
  };
}
