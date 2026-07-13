import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { walletService } from '../services/walletService';
import type { Card, Wallet } from '../services/types';
import { formatMoney, formatMoneyParts } from '../services/money';
import { emptyState, home, walletDetail } from '../content/copy';
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

/** First-run empty state (S7): explanation centered, the single CTA full-width
 *  at the bottom of the screen — in the thumb zone (human review). */
function EmptyWallets({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="mb-empty">
      <div className="mb-empty__content">
        <span className="mb-empty__icon" aria-hidden="true">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="6" width="18" height="13" rx="3" stroke="currentColor" strokeWidth="2" />
            <circle cx="16.5" cy="12.5" r="1.5" fill="currentColor" />
          </svg>
        </span>
        <h2 className="mb-empty__title">{emptyState.title}</h2>
        <p className="mb-empty__body">{emptyState.body}</p>
      </div>
      <div className="mb-empty__cta">
        <Button variant="accent" fullWidth onClick={onCreate}>
          {home.newWalletCta}
        </Button>
      </div>
    </div>
  );
}

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
        {/* WEB structure: product-style panel with total + table (CSS-shown on web only) */}
        <section className="mb-home__table mb-panel" aria-label="Wallets table">
          <div style={{ paddingBottom: 'var(--space-3)', borderBottom: '1px solid var(--border-divider)' }}>
            <div style={{ fontSize: 'var(--type-body-sm-size)', color: 'var(--text-secondary)' }}>Total cash balances</div>
            <div className="mb-balance" style={{ fontSize: 'var(--type-title-lg-size)' }}>
              {wallets ? formatMoney(wallets.reduce((sum, w) => sum + (w.baseCurrency === 'EUR' ? (w.balances.find((b) => b.currency === 'EUR')?.amountMinor ?? 0) : 0), 0), 'EUR') : '—'}
            </div>
          </div>
          <div className="mb-home__thead" aria-hidden="true">
            <span>Wallet</span>
            <span>Amount</span>
          </div>
          {wallets === null ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', paddingTop: 'var(--space-3)' }} aria-label="Loading wallets">
              <Skeleton height="var(--size-control-h)" />
              <Skeleton height="var(--size-control-h)" />
              <Skeleton height="var(--size-control-h)" width="60%" />
            </div>
          ) : wallets.length === 0 ? (
            <EmptyWallets onCreate={() => navigate('/create')} />
          ) : (
            <>
              {wallets?.map((w) => {
                const base = w.balances.find((b) => b.currency === w.baseCurrency);
                return (
                  <button key={w.id} type="button" className="mb-home__trow" onClick={() => navigate(`/wallet/${w.id}`)}>
                    <Flag code={w.baseCurrency} />
                    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <span className="mb-row__title">{w.name}</span>
                      <span className="mb-row__sub">{home.baseCurrencyOf(w.baseCurrency)}</span>
                    </span>
                    <span className="mb-row__value">{formatMoney(base?.amountMinor ?? 0, w.baseCurrency)}</span>
                  </button>
                );
              })}
              <div style={{ paddingTop: 'var(--space-4)' }}>
                <Button variant="accent" onClick={() => navigate('/create')}>
                  {home.newWalletCta}
                </Button>
              </div>
            </>
          )}
        </section>

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
      ) : wallets.length === 0 ? (
        <EmptyWallets onCreate={() => navigate('/create')} />
      ) : (
        wallets.map((w) => {
          const base = w.balances.find((b) => b.currency === w.baseCurrency);
          const parts = formatMoneyParts(base?.amountMinor ?? 0, w.baseCurrency);
          const others = w.balances.filter((b) => b.currency !== w.baseCurrency);
          return (
            <Link key={w.id} to={`/wallet/${w.id}`} style={{ textDecoration: 'none' }}>
              <article className="mb-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <div className="mb-row" style={{ padding: 0 }}>
                  {/* Base-currency flag identifies the wallet at a glance (human review nit #2) */}
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
                    }}
                  >
                    <Flag code={w.baseCurrency} />
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
                        {/* zeros de-emphasized (DDR-003 zero-state, human review nit #1) */}
                        <span className={`mb-row__value${b.amountMinor === 0 ? ' mb-row__value--muted' : ''}`}>
                          {formatMoney(b.amountMinor, b.currency)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            </Link>
          );
        })
      )}

      {/* Add only — no remove/delete affordance anywhere (brief guardrail).
          Hidden when the empty state is showing — it carries its own CTA. */}
      {wallets && wallets.length > 0 && (
        <Button variant="accent" fullWidth onClick={() => navigate('/create')}>
          {home.newWalletCta}
        </Button>
      )}
        </div>

        {/* Master–detail preview pane — web only (CSS-hidden elsewhere).
            Mirrors the right panel of the logged-in product's Wallets page. */}
        {preview && previewParts && (
          <aside className="mb-home__preview" aria-label={`${preview.name} preview`}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)', textAlign: 'center' }}>
              <span style={{ transform: 'scale(2)', margin: 'var(--space-3)' }}>
                <Flag code={preview.baseCurrency} />
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--type-title-md-size)', color: 'var(--text-heading)', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                {preview.name}
                <svg width="14" height="14" viewBox="0 0 20 20" aria-hidden="true" style={{ color: 'var(--icon-primary)' }}>
                  <path d="M13.5 3.5l3 3L7 16H4v-3l9.5-9.5z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                </svg>
              </span>
              <div className="mb-balance" style={{ fontSize: 'var(--type-title-lg-size)', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span>
                  {previewParts.main}
                  <span className="mb-balance__decimals">{previewParts.decimals}</span>
                </span>
                <svg width="15" height="15" viewBox="0 0 20 20" aria-hidden="true" style={{ color: 'var(--icon-tertiary)' }}>
                  <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M10 9v5M10 6.2v.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
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
