import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { walletService } from '../services/walletService';
import { WalletError, type Card, type Currency, type Wallet } from '../services/types';
import { formatMoney, formatMoneyParts } from '../services/money';
import { home, walletDetail } from '../content/copy';
import { Flag } from '../design-system/components/Flag';
import { CircleAction } from '../design-system/components/CircleAction';
import { Skeleton } from '../design-system/components/Skeleton';
import { Button } from '../design-system/components/Button';
import { CardBadge } from './CreateWallet/CardBadge';
import './screens.css';

const PlusIcon = (
  <svg width="20" height="20" viewBox="0 0 18 18" aria-hidden="true">
    <path d="M9 2v14M2 9h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
const ExchangeIcon = (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <path d="M4 8h12M16 8l-3-3M18 14H6M6 14l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const DetailsIcon = (
  <svg width="22" height="6" viewBox="0 0 22 6" aria-hidden="true">
    <circle cx="3" cy="3" r="2.4" fill="currentColor" /><circle cx="11" cy="3" r="2.4" fill="currentColor" /><circle cx="19" cy="3" r="2.4" fill="currentColor" />
  </svg>
);

/** Distribution-bar segment colors, assigned by share order (DESIGN-003 2b). */
const CHART_TOKENS = ['var(--chart-primary)', 'var(--chart-secondary)', 'var(--chart-tertiary)'];

/** WALLET-007 + WALLET-009 rework (DESIGN-003 2b): total-value hero with
 *  distribution bar, ONE merged currency list, funding card demoted.
 *  Web renders two product-style panels; mobile single column. */
export function WalletDetail() {
  const { id } = useParams();
  const [wallet, setWallet] = useState<Wallet | null | undefined>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [rates, setRates] = useState<{ asOf: string; toEUR: Record<string, number> } | null>(null);
  const [manageOpen, setManageOpen] = useState(false);
  const [cardLabelDraft, setCardLabelDraft] = useState('');
  const [renaming, setRenaming] = useState(false);
  const [nameDraft, setNameDraft] = useState('');
  const [renameError, setRenameError] = useState<string | null>(null);
  const [renameBusy, setRenameBusy] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [addBusy, setAddBusy] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    Promise.all([
      walletService.getWallet(id ?? ''),
      walletService.listCards(),
      walletService.listCurrencies(),
      walletService.getRates(),
    ]).then(([w, c, cur, r]) => {
      if (!alive) return;
      setWallet(w);
      setCards(c);
      setCurrencies(cur);
      setRates(r);
    });
    return () => {
      alive = false;
    };
  }, [id]);

  if (wallet === null) {
    return (
      <main className="mb-screen" aria-label="Loading wallet">
        <Skeleton height="var(--space-6)" width="40%" />
        <Skeleton height="var(--space-8)" width="65%" />
        <Skeleton height="var(--size-control-h)" />
        <Skeleton height="var(--size-control-h)" />
      </main>
    );
  }
  if (!wallet) {
    return (
      <main className="mb-screen">
        <h1 className="mb-screen__title mb-screen__title--lg">Wallet not found</h1>
        <Link to="/" style={{ color: 'var(--text-link)' }}>Back to wallets</Link>
      </main>
    );
  }

  const toEUR = (currency: string, amountMinor: number) => Math.round(amountMinor * (rates?.toEUR[currency] ?? 1));
  const totalMinor = wallet.balances.reduce((sum, b) => sum + toEUR(b.currency, b.amountMinor), 0);
  const totalParts = formatMoneyParts(totalMinor, 'EUR');
  const funded = totalMinor > 0;
  const multiCurrency = wallet.balances.length > 1;
  const shares = funded
    ? wallet.balances
        .map((b) => ({ currency: b.currency, share: toEUR(b.currency, b.amountMinor) / totalMinor }))
        .filter((s) => s.share > 0)
        .sort((a, b) => b.share - a.share)
    : [];
  const card = cards.find((c) => c.id === wallet.fundingCardId);
  const addable = currencies.filter((c) => !c.unsupportedReason && !wallet.balances.some((b) => b.currency === c.code));

  async function saveRename() {
    if (!wallet) return;
    setRenameBusy(true);
    setRenameError(null);
    try {
      const updated = await walletService.renameWallet(wallet.id, nameDraft);
      setWallet(updated);
      setRenaming(false);
    } catch (e) {
      setRenameError(e instanceof WalletError ? e.message : 'Could not rename.');
    } finally {
      setRenameBusy(false);
    }
  }

  async function addCurrency(code: string) {
    if (!wallet) return;
    setAddBusy(code);
    try {
      const updated = await walletService.addCurrencies(wallet.id, [code]);
      setWallet(updated);
    } finally {
      setAddBusy(null);
    }
  }

  return (
    <main className="mb-screen mb-detail">
      <div className="mb-detail__grid">
        <section className="mb-detail__main">
          {/* Compact header: back + name + rename on ONE line (2b: buys back ~120px) */}
          {renaming ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', width: '100%' }}>
              <label style={{ fontSize: 'var(--type-body-sm-size)', fontWeight: 600, color: 'var(--text-label)', textAlign: 'left' }}>
                {walletDetail.renameLabel}
                <input
                  className="mb-field__input"
                  style={{ width: '100%', marginTop: 'var(--space-1)' }}
                  value={nameDraft}
                  autoFocus
                  onChange={(e) => { setNameDraft(e.target.value); setRenameError(null); }}
                />
              </label>
              {renameError && <span role="alert" style={{ fontSize: 'var(--type-body-sm-size)', color: 'var(--feedback-error)' }}>{renameError}</span>}
              <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'center' }}>
                <Button variant="primary" loading={renameBusy} onClick={saveRename}>{walletDetail.renameSave}</Button>
                <Button variant="secondary" disabled={renameBusy} onClick={() => setRenaming(false)}>{walletDetail.renameCancel}</Button>
              </div>
            </div>
          ) : (
            <div className="mb-detail__headrow">
              <Link to="/" aria-label="Back to wallets" className="mb-detail__back">
                <svg width="8" height="14" viewBox="0 0 8 14" aria-hidden="true">
                  <path d="M7 1L1 7l6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <span style={{ minWidth: 0 }}>
                <h1 className="mb-screen__title mb-screen__title--lg" style={{ margin: 0, display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  {wallet.name}
                  <button
                    type="button"
                    aria-label="Rename wallet"
                    onClick={() => { setNameDraft(wallet.name); setRenaming(true); }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--icon-primary)', padding: 'var(--space-2)', display: 'inline-flex' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M13.5 3.5l3 3L7 16H4v-3l9.5-9.5z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                    </svg>
                  </button>
                </h1>
                <span className="mb-screen__subtitle" style={{ display: 'block' }}>{home.company}</span>
              </span>
            </div>
          )}

          {/* Total-value hero (2b): the number a finance operator actually wants */}
          <div>
            <div className="mb-balance__caption">{walletDetail.totalValueCaption('EUR')}</div>
            <div className="mb-balance">
              {multiCurrency && <span aria-hidden="true">≈ </span>}
              {totalParts.main}
              <span className="mb-balance__decimals">{totalParts.decimals}</span>
            </div>
          </div>

          {/* Distribution bar + legend (2b): instant exposure read */}
          {funded && shares.length > 1 && (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <div className="mb-distbar" aria-hidden="true">
                {shares.map((s, i) => (
                  <span key={s.currency} style={{ width: `${Math.max(2, Math.round(s.share * 100))}%`, background: CHART_TOKENS[i % CHART_TOKENS.length] }} />
                ))}
              </div>
              <div className="mb-legend">
                {shares.map((s, i) => (
                  <span key={s.currency} className="mb-legend__item">
                    <span className="mb-legend__dot" style={{ background: CHART_TOKENS[i % CHART_TOKENS.length] }} aria-hidden="true" />
                    {s.currency} {Math.round(s.share * 100)}%
                  </span>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-8)' }}>
            <CircleAction emphasis="primary" icon={PlusIcon} label="Add funds" />
            <CircleAction icon={ExchangeIcon} label="Exchange" disabled={!funded} />
            <CircleAction icon={DetailsIcon} label="Details" disabled={!funded} />
          </div>
          {!funded && (
            <p style={{ margin: 0, textAlign: 'center', fontSize: 'var(--type-caption-size)', color: 'var(--text-secondary)' }}>
              {walletDetail.unfundedHint}
            </p>
          )}
        </section>

        <aside className="mb-detail__side">
          {/* ONE merged currency list (2b): BASE badge inline, Add currency as a row */}
          <div className="mb-detail__balances-head">
            <span style={{ fontSize: 'var(--type-body-sm-size)', fontWeight: 600, color: 'var(--text-label)' }}>{walletDetail.balancesHeader}</span>
            {rates && <span style={{ fontSize: 'var(--type-caption-size)', color: 'var(--text-secondary)' }}>{walletDetail.ratesAsOf(rates.asOf)}</span>}
          </div>
          <div className="mb-card mb-card--sm">
            {wallet.balances.map((b) => {
              const currency = currencies.find((c) => c.code === b.currency);
              const isBase = b.currency === wallet.baseCurrency;
              return (
                <div className="mb-row" key={b.currency}>
                  <Flag code={b.currency} />
                  <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                    <span className="mb-row__title" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                      {b.currency}
                      {isBase && <span className="mb-badge">{walletDetail.baseBadge}</span>}
                    </span>
                    <span className="mb-row__sub">{currency?.name ?? b.currency}</span>
                  </span>
                  <span style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <span className={`mb-row__value${b.amountMinor === 0 ? ' mb-row__value--muted' : ''}`} style={{ marginLeft: 0 }}>
                      {formatMoney(b.amountMinor, b.currency)}
                    </span>
                    {!isBase && b.amountMinor > 0 && (
                      <span style={{ fontSize: 'var(--type-caption-size)', color: 'var(--text-muted)' }}>
                        ≈ {formatMoney(toEUR(b.currency, b.amountMinor), 'EUR')}
                      </span>
                    )}
                  </span>
                </div>
              );
            })}
            {/* Add currency as the list's final row (2b) */}
            <button type="button" className="mb-row mb-detail__addrow" onClick={() => setAddOpen(true)} aria-haspopup="dialog">
              <span className="mb-detail__addicon" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 18 18">
                  <path d="M9 2v14M2 9h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
              </span>
              <span style={{ color: 'var(--text-link)', fontWeight: 600, fontSize: 'var(--type-body-size)' }}>{walletDetail.addCurrencyRow}</span>
            </button>
          </div>

          {/* Funding card demoted below balances, tied to consent copy (2b) */}
          {card && (
            <div className="mb-card mb-card--sm" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <CardBadge network={card.network} />
              <span style={{ flex: 1, minWidth: 0 }}>
                <span className="mb-row__title" style={{ display: 'block' }}>
                  {card.network === 'visa' ? 'Visa' : 'Mastercard'} •• {card.last4}
                </span>
                <span className="mb-row__sub">{walletDetail.fundingCardCharges(wallet.baseCurrency)}</span>
              </span>
              <button
                type="button"
                onClick={() => { setManageOpen((o) => !o); setCardLabelDraft(card.label); }}
                style={{ background: 'none', border: 'none', color: 'var(--text-link)', fontWeight: 600, fontSize: 'var(--type-body-size)', cursor: 'pointer', fontFamily: 'var(--font-body)', flexShrink: 0, padding: 'var(--space-3)', margin: 'calc(var(--space-3) * -1) calc(var(--space-2) * -1)', minHeight: 'var(--target-min, 44px)' }}
              >
                {walletDetail.manageCta}
              </button>
            </div>
          )}

          {manageOpen && card && (
            <div className="mb-card mb-card--sm" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div className="mb-kv"><span className="mb-kv__key">Card</span><span className="mb-kv__value">•• {card.last4}{card.expires ? ` · expires ${card.expires}` : ''}</span></div>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', fontSize: 'var(--type-body-sm-size)', fontWeight: 600, color: 'var(--text-label)' }}>
                Card label
                <input className="mb-field__input" value={cardLabelDraft} onChange={(e) => setCardLabelDraft(e.target.value)} />
              </label>
              <span title={walletDetail.unlinkGuard}>
                <Button variant="secondary" fullWidth disabled aria-describedby="unlink-guard">
                  Unlink card
                </Button>
              </span>
              <p id="unlink-guard" style={{ margin: 0, fontSize: 'var(--type-caption-size)', color: 'var(--text-secondary)' }}>
                {walletDetail.unlinkGuard}
              </p>
            </div>
          )}
        </aside>
      </div>

      {addOpen && (
        <div className="mb-dialog-backdrop" role="dialog" aria-modal="true" aria-label={walletDetail.addCurrencyTitle} onKeyDown={(e) => e.key === 'Escape' && setAddOpen(false)}>
          <div className="mb-dialog">
            <h3 className="mb-dialog__title">{walletDetail.addCurrencyTitle}</h3>
            {addable.length === 0 ? (
              <p className="mb-dialog__body">All supported currencies are already in this wallet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', maxHeight: 'calc(var(--size-control-h) * 4.5)', overflowY: 'auto' }}>
                {addable.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    className="mb-select__option"
                    disabled={addBusy !== null}
                    onClick={() => addCurrency(c.code)}
                  >
                    <Flag code={c.code} />
                    <span className="mb-pick__code">{c.code}</span>
                    <span className="mb-pick__name">{c.name}</span>
                    {addBusy === c.code && <span className="mb-loading-line" role="status" style={{ marginLeft: 'auto' }}>Adding…</span>}
                  </button>
                ))}
              </div>
            )}
            <div className="mb-dialog__actions">
              <Button variant="primary" autoFocus onClick={() => setAddOpen(false)}>{walletDetail.addCurrencyDone}</Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
