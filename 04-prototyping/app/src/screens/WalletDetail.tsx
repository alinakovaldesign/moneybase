import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { walletService } from '../services/walletService';
import type { Card, Wallet } from '../services/types';
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

/** WALLET-007 — funded wallet landing: card visible + manageable; deep-linkable route. */
export function WalletDetail() {
  const { id } = useParams();
  const [wallet, setWallet] = useState<Wallet | null | undefined>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [manageOpen, setManageOpen] = useState(false);
  const [cardLabelDraft, setCardLabelDraft] = useState('');

  useEffect(() => {
    let alive = true;
    Promise.all([walletService.getWallet(id ?? ''), walletService.listCards()]).then(([w, c]) => {
      if (!alive) return;
      setWallet(w);
      setCards(c);
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

  const base = wallet.balances.find((b) => b.currency === wallet.baseCurrency);
  const parts = formatMoneyParts(base?.amountMinor ?? 0, wallet.baseCurrency);
  const funded = wallet.balances.some((b) => b.amountMinor > 0);
  const card = cards.find((c) => c.id === wallet.fundingCardId) ?? (wallet.fundingCardId ? { id: wallet.fundingCardId, network: 'visa' as const, last4: '••••', label: 'Linked card', expires: '' } : undefined);

  return (
    <main className="mb-screen">
      <Link to="/" aria-label="Back to wallets" style={{ color: 'var(--text-label)', display: 'inline-flex' }}>
        <svg width="8" height="14" viewBox="0 0 8 14" aria-hidden="true">
          <path d="M7 1L1 7l6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>

      <div>
        <h1 className="mb-screen__title mb-screen__title--lg" style={{ marginBottom: 'var(--space-1)' }}>{wallet.name}</h1>
        <span className="mb-screen__subtitle">{home.company}</span>
      </div>

      {/* Currency chips + Add currency (dashed) — the Wise-adopted pattern */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        <Chip badge={walletDetail.baseBadge}>
          <Flag code={wallet.baseCurrency} /> {wallet.baseCurrency}
        </Chip>
        {wallet.balances.filter((b) => b.currency !== wallet.baseCurrency).map((b) => (
          <Chip key={b.currency}>
            <Flag code={b.currency} /> {b.currency}
          </Chip>
        ))}
        <Chip variant="dashed" title="Opens the currency picker (post-creation add — stubbed in prototype)">
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

      {/* Circular actions — disabled-until-funded stays VISIBLE with an explanation */}
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

      {/* Funding card block — visible and manageable */}
      {card && (
        <div className="mb-card mb-card--sm" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <CardBadge network={card.network} />
          <span style={{ flex: 1 }}>
            <span className="mb-row__title" style={{ display: 'block' }}>
              {card.network === 'visa' ? 'Visa' : 'Mastercard'} •• {card.last4}
            </span>
            <span className="mb-row__sub">{walletDetail.fundingCardLabel}</span>
          </span>
          <button
            type="button"
            onClick={() => { setManageOpen((o) => !o); setCardLabelDraft(card.label); }}
            style={{ background: 'none', border: 'none', color: 'var(--text-link)', fontWeight: 600, fontSize: 'var(--type-body-size)', cursor: 'pointer', fontFamily: 'var(--font-body)' }}
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
          {/* Unlink present but disabled — B2B invariant, reason visible (S5, DDR) */}
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

      {/* Per-currency balances */}
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
    </main>
  );
}
