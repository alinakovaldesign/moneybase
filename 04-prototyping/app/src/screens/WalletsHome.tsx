import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { walletService } from '../services/walletService';
import type { Wallet } from '../services/types';
import { formatMoney, formatMoneyParts } from '../services/money';
import { home } from '../content/copy';
import { Button } from '../design-system/components/Button';
import { Flag } from '../design-system/components/Flag';
import { Skeleton } from '../design-system/components/Skeleton';
import './screens.css';

/** WALLET-003 — default state: wallets present, add-only entry point. */
export function WalletsHome() {
  const [wallets, setWallets] = useState<Wallet[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let alive = true;
    walletService.listWallets().then((w) => alive && setWallets(w));
    return () => {
      alive = false;
    };
  }, []);

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
    </main>
  );
}
