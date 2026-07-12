import { useEffect, useState } from 'react';
import { walletService } from '../../services/walletService';
import type { Currency } from '../../services/types';
import { wizard, walletDetail } from '../../content/copy';
import { Flag } from '../../design-system/components/Flag';
import { Chip } from '../../design-system/components/Chip';
import { Skeleton } from '../../design-system/components/Skeleton';

/** WALLET-005 — additional currencies; unsupported shown-but-disabled with reasons. */
export function Step2Currencies({
  baseCurrency,
  selected,
  onChange,
}: {
  baseCurrency: string;
  selected: string[];
  onChange: (codes: string[]) => void;
}) {
  const [currencies, setCurrencies] = useState<Currency[] | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let alive = true;
    walletService.listCurrencies().then((c) => alive && setCurrencies(c));
    return () => {
      alive = false;
    };
  }, []);

  function toggle(code: string) {
    onChange(selected.includes(code) ? selected.filter((c) => c !== code) : [...selected, code]);
  }

  const list = (currencies ?? [])
    .filter((c) => c.code !== baseCurrency)
    .filter((c) => `${c.code} ${c.name}`.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => Number(!!a.unsupportedReason) - Number(!!b.unsupportedReason) || Number(b.common) - Number(a.common));

  return (
    <>
      <p className="mb-screen__subtitle" style={{ margin: 0 }}>
        {wizard.step2Subtitle}
      </p>

      {/* Selected set as chips — editable before continuing */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        <Chip badge={walletDetail.baseBadge}>
          <Flag code={baseCurrency} /> {baseCurrency}
        </Chip>
        {selected.map((code) => (
          <Chip key={code} onClick={() => toggle(code)} aria-label={`Remove ${code}`} style={{ cursor: 'pointer' }}>
            <Flag code={code} /> {code} ×
          </Chip>
        ))}
      </div>
      {/* Selection count announced for screen readers */}
      <span aria-live="polite" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clipPath: 'inset(50%)' }}>
        {selected.length} additional currencies selected
      </span>

      <input
        className="mb-field__input"
        placeholder="Search currencies"
        aria-label="Search currencies"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: '100%' }}
      />

      {currencies === null ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <Skeleton height="var(--size-control-h)" />
          <Skeleton height="var(--size-control-h)" />
          <Skeleton height="var(--size-control-h)" />
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {list.map((c) => {
            const isSelected = selected.includes(c.code);
            const disabled = !!c.unsupportedReason;
            return (
              <button
                key={c.code}
                type="button"
                className="mb-pick"
                disabled={disabled}
                data-selected={isSelected || undefined}
                aria-pressed={isSelected}
                onClick={() => toggle(c.code)}
              >
                <Flag code={c.code} />
                <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'calc(var(--space-1) / 2)' }}>
                  <span>
                    <span className="mb-pick__code">{c.code}</span>{' '}
                    <span className="mb-pick__name">{c.name}</span>
                  </span>
                  {/* Unsupported: visible with the reason — B2B users need to know WHY (DESIGN-000) */}
                  {disabled && <span className="mb-pick__reason">{c.unsupportedReason}</span>}
                </span>
                {isSelected && (
                  <svg className="mb-pick__check" width="16" height="13" viewBox="0 0 13 11" fill="none" aria-hidden="true">
                    <path d="M1.5 5.5l3.5 3.5L11.5 1.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
