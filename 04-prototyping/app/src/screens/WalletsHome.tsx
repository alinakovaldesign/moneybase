import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { walletService } from '../services/walletService';
import type { Card, Wallet } from '../services/types';
import { formatMoney, formatMoneyParts } from '../services/money';
import { home, walletDetail } from '../content/copy';
import { Button } from '../design-system/components/Button';
import { Flag } from '../design-system/components/Flag';
import { Skeleton } from '../design-system/components/Skeleton';
import { CircleAction } from '../design-system/components/CircleAction';
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

/** WALLET-003 — default state: wallets present, add-only entry point.
 *  On web the layout is master–detail (observed on the logged-in product):
 *  the preview pane below exists on all platforms but is CSS-hidden outside web. */
export function WalletsHome() {
  const [wallets, setWallets] = useState<Wallet[] | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    let alive = true;
    walletService.listWallets().then((w) => alive && setWallets(w));
    walletService.listCards().then((c) => alive && setCards(c));
    return () => {
      alive = false;
    };
  }, []);

  const preview = wallets?.[0];
  const previewParts = preview
    ? formatMoneyParts(preview.balances.find((b) => b.currency === preview.baseCurrency)?.amountMinor ?? 0, preview.baseCurrency)
    : null;
  const previewFunded = preview?.balances.some((b) => b.amountMinor > 0) ?? false;
  const previewCard = cards.find((c) => c.id === preview?.fundingCardId);

  return (
    <main className="mb-screen">
      <header style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <span
          aria-hidden="true"
          style={{
            width: 'var(--size-icon-chip)',
            height: 'var(--size-icon-chip)',
            borderRadius: 'var(--radius-pill)',
            background: 'var(--surface-tint)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: 'var(--type-body-size)',
            color: 'var(--text-heading)',
          }}
        >
          AL
        </span>
        <span style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 'var(--type-body-lg-size)', fontWeight: 700, color: 'var(--text-heading)' }}>{home.company}</span>
          <span style={{ fontSize: 'var(--type-caption-size)', color: 'var(--text-secondary)' }}>{home.accountType}</span>
        </span>
      </header>

      <h1 className="mb-screen__title">{home.title}</h1>

      <div className="mb-home">
        <div className="mb-home__list">
      {wallets === null ? (
        <div className="mb-card" aria-label="Loading wallets">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <Skeleton height="var(--space-5)" width="50%" />
            <Skeleton height="var(--space-8)" width="70%" />
            <Skeleton />
            <Skeleton />
          </div>
        </div>
      ) : (
        wallets.map((w) => {
          const base = w.balances.find((b) => b.currency === w.baseCurrency);
          const parts = formatMoneyParts(base?.amountMinor ?? 0, w.baseCurrency);
          const others = w.balances.filter((b) => b.currency !== w.baseCurrency);
          return (
            <Link key={w.id} to={`/wallet/${w.id}`} style={{ textDecoration: 'none' }}>
              <article className="mb-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <div className="mb-row" style={{ padding: 0 }}>
                  <span
                    aria-hidden="true"
                    style={{
                      width: 'var(--size-icon-chip)',
                      height: 'var(--size-icon-chip)',
                      borderRadius: 'var(--radius-input)',
                      background: 'var(--surface-tint)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--icon-primary)',
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="6" width="18" height="13" rx="3" stroke="currentColor" strokeWidth="2" />
                      <circle cx="16.5" cy="12.5" r="1.5" fill="currentColor" />
                    </svg>
                  </span>
                  <span>
                    <span className="mb-row__title" style={{ display: 'block' }}>{w.name}</span>
                    <span className="mb-row__sub">{home.baseCurrencyOf(w.baseCurrency)}</span>
                  </span>
                </div>
                <div>
                  <div className="mb-balance">
                    {parts.main}
                    <span className="mb-balance__decimals">{parts.decimals}</span>
                  </div>
                  <div className="mb-balance__caption">{home.availableIn(w.baseCurrency)}</div>
                </div>
                {others.length > 0 && (
                  <div>
                    {others.map((b) => (
                      <div className="mb-row" key={b.currency}>
                        <Flag code={b.currency} />
                        <span className="mb-row__title">{b.currency}</span>
                        <span className="mb-row__value">{formatMoney(b.amountMinor, b.currency)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            </Link>
          );
        })
      )}

      {/* Add only — no remove/delete affordance anywhere (brief guardrail). */}
      <Button variant="accent" fullWidth onClick={() => navigate('/create')}>
        {home.newWalletCta}
      </Button>
        </div>

        {/* Master–detail preview pane — web only (CSS-hidden elsewhere).
            Mirrors the right panel of the logged-in product's Wallets page. */}
        {preview && previewParts && (
          <aside className="mb-home__preview" aria-label={`${preview.name} preview`}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)', textAlign: 'center' }}>
              <span style={{ transform: 'scale(2)', margin: 'var(--space-3)' }}>
                <Flag code={preview.baseCurrency} />
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--type-title-md-size)', color: 'var(--text-heading)' }}>
                {preview.name}
              </span>
              <div className="mb-balance" style={{ fontSize: 'var(--type-title-lg-size)' }}>
                {previewParts.main}
                <span className="mb-balance__decimals">{previewParts.decimals}</span>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-6)', marginTop: 'var(--space-2)' }}>
                <CircleAction emphasis="primary" icon={PlusIcon} label="Add funds" />
                <CircleAction icon={ExchangeIcon} label="Exchange" disabled={!previewFunded} />
                <CircleAction icon={DetailsIcon} label="Details" disabled={!previewFunded} />
              </div>
              {previewCard && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
                  <CardBadge network={previewCard.network} />
                  <span style={{ fontSize: 'var(--type-body-sm-size)', color: 'var(--text-secondary)' }}>
                    •• {previewCard.last4} · {walletDetail.fundingCardLabel}
                  </span>
                </div>
              )}
              <Link to={`/wallet/${preview.id}`} style={{ color: 'var(--text-link)', fontWeight: 600, fontSize: 'var(--type-body-size)' }}>
                Open wallet
              </Link>
            </div>
          </aside>
        )}
      </div>
    </main>
  );
}
