import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { walletService } from '../services/walletService';
import { WalletError, type Card, type Currency, type Wallet } from '../services/types';
import { formatMoney, formatMoneyParts } from '../services/money';
import { home, walletDetail } from '../content/copy';
import { Flag } from '../design-system/components/Flag';
import { Chip } from '../design-system/components/Chip';
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

/** WALLET-007 — funded wallet landing: card visible + manageable; deep-linkable.
 *  Web renders the product's two-panel anatomy (identity panel + table panel);
 *  mobile keeps the canvas 1f single column. Divergence is CSS-only. */
export function WalletDetail() {
  const { id } = useParams();
  const [wallet, setWallet] = useState<Wallet | null | undefined>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
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
    Promise.all([walletService.getWallet(id ?? ''), walletService.listCards(), walletService.listCurrencies()]).then(
      ([w, c, cur]) => {
        if (!alive) return;
        setWallet(w);
        setCards(c);
        setCurrencies(cur);
      },
    );
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

  const base = wallet.balances.find((b) => b.currency === wallet.baseCurrency);
  const parts = formatMoneyParts(base?.amountMinor ?? 0, wallet.baseCurrency);
  const funded = wallet.balances.some((b) => b.amountMinor > 0);
  const card = cards.find((c) => c.id === wallet.fundingCardId) ?? (wallet.fundingCardId ? { id: wallet.fundingCardId, network: 'visa' as const, last4: '••••', label: 'Linked card', expires: '' } : undefined);
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
      <Link to="/" aria-label="Back to wallets" style={{ color: 'var(--text-label)', display: 'inline-flex', padding: 'var(--space-3)', margin: 'calc(var(--space-3) * -1)', minWidth: 'var(--target-min, 44px)', minHeight: 'var(--target-min, 44px)', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="8" height="14" viewBox="0 0 8 14" aria-hidden="true">
          <path d="M7 1L1 7l6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>

      <div className="mb-detail__grid">
        <section className="mb-detail__main">
          <div>
            {renaming ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <label style={{ fontSize: 'var(--type-body-sm-size)', fontWeight: 600, color: 'var(--text-label)' }}>
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
              <h1 className="mb-screen__title mb-screen__title--lg" style={{ marginBottom: 'var(--space-1)', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                {wallet.name}
                {/* Rename — the pencil affordance the product already uses */}
                <button
                  type="button"
                  aria-label="Rename wallet"
                  onClick={() => { setNameDraft(wallet.name); setRenaming(true); }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--icon-primary)', padding: 'var(--space-3)', margin: 'calc(var(--space-2) * -1)', display: 'inline-flex' }}
                >
                  <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M13.5 3.5l3 3L7 16H4v-3l9.5-9.5z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  </svg>
                </button>
              </h1>
            )}
            <span className="mb-screen__subtitle" style={{ display: 'block' }}>{home.company}</span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', justifyContent: 'inherit' }}>
            <Chip badge={walletDetail.baseBadge}>
              <Flag code={wallet.baseCurrency} /> {wallet.baseCurrency}
            </Chip>
            {wallet.balances.filter((b) => b.currency !== wallet.baseCurrency).map((b) => (
              <Chip key={b.currency}>
                <Flag code={b.currency} /> {b.currency}
              </Chip>
            ))}
            <Chip variant="dashed" onClick={() => setAddOpen(true)} aria-haspopup="dialog">
              {walletDetail.addCurrency}
            </Chip>
          </div>

          <div>
            <div className="mb-balance">
              {parts.main}
              <span className="mb-balance__decimals">{parts.decimals}</span>
            </div>
            <div className="mb-balance__caption">{home.availableIn(wallet.baseCurrency)}</div>
          </div>

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
          {card && (
            <div className="mb-card mb-card--sm" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <CardBadge network={card.network} />
              {/* min-width:0 lets this column shrink so Manage always stays inside the card */}
              <span style={{ flex: 1, minWidth: 0 }}>
                <span className="mb-row__title" style={{ display: 'block' }}>
                  {card.network === 'visa' ? 'Visa' : 'Mastercard'} •• {card.last4}
                </span>
                <span className="mb-row__sub">{walletDetail.fundingCardLabel}</span>
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

          <div className="mb-card mb-card--sm">
            {wallet.balances.map((b) => (
              <div className="mb-row" key={b.currency}>
                <Flag code={b.currency} />
                <span className="mb-row__title">{b.currency}</span>
                <span className={`mb-row__value${b.amountMinor === 0 ? ' mb-row__value--muted' : ''}`}>
                  {formatMoney(b.amountMinor, b.currency)}
                </span>
              </div>
            ))}
          </div>
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
