import { useEffect, useState } from 'react';
import { walletService } from '../../services/walletService';
import type { Currency } from '../../services/types';
import { errors, loading, wizard } from '../../content/copy';
import { TextField } from '../../design-system/components/TextField';
import { Flag } from '../../design-system/components/Flag';
import { Skeleton } from '../../design-system/components/Skeleton';

export interface Step1Value {
  name: string;
  baseCurrency: string;
  nameValid: boolean;
}

/** WALLET-004 — name + base currency; duplicate caught on blur AND submit, kindly. */
export function Step1Name({ value, onChange }: { value: Step1Value; onChange: (v: Step1Value) => void }) {
  const [currencies, setCurrencies] = useState<Currency[] | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [checking, setChecking] = useState(false);
  const [dupError, setDupError] = useState<{ name: string; suggestion: string } | null>(null);

  useEffect(() => {
    let alive = true;
    walletService.listCurrencies().then((c) => alive && setCurrencies(c));
    return () => {
      alive = false;
    };
  }, []);

  async function validateName(name: string) {
    if (!name.trim()) {
      onChange({ ...value, name, nameValid: false });
      return;
    }
    setChecking(true);
    const res = await walletService.checkName(name);
    setChecking(false);
    if (!res.available) {
      setDupError({ name: name.trim(), suggestion: res.suggestion ?? '' });
      onChange({ ...value, name, nameValid: false });
    } else {
      setDupError(null);
      onChange({ ...value, name, nameValid: true });
    }
  }

  const selectable = (currencies ?? []).filter((c) => !c.unsupportedReason);
  const selected = selectable.find((c) => c.code === value.baseCurrency);

  return (
    <>
      <TextField
        label={wizard.nameLabel}
        value={value.name}
        onChange={(e) => {
          setDupError(null);
          onChange({ ...value, name: e.target.value, nameValid: false });
        }}
        onBlur={(e) => validateName(e.target.value)}
        error={
          dupError ? (
            <>
              {errors.duplicateName(dupError.name, dupError.suggestion).text}
              <button
                type="button"
                className="mb-field__suggestion"
                onClick={() => {
                  setDupError(null);
                  validateName(dupError.suggestion);
                  onChange({ ...value, name: dupError.suggestion, nameValid: false });
                }}
              >
                ‘{dupError.suggestion}’
              </button>
              {errors.duplicateName(dupError.name, dupError.suggestion).tail}
            </>
          ) : undefined
        }
      />
      {checking && <div className="mb-loading-line">{loading.nameCheck}</div>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
        <span style={{ fontSize: 'var(--type-body-sm-size)', fontWeight: 600, color: 'var(--text-label)' }}>
          {wizard.baseCurrencyLabel}
        </span>
        <button type="button" className="mb-pick" aria-expanded={pickerOpen} onClick={() => setPickerOpen((o) => !o)}>
          {selected ? (
            <>
              <Flag code={selected.code} />
              <span className="mb-pick__code">{selected.code}</span>
              <span className="mb-pick__name">{selected.name}</span>
            </>
          ) : (
            <span className="mb-pick__name">Select base currency</span>
          )}
          <svg className="mb-pick__check" width="8" height="14" viewBox="0 0 8 14" aria-hidden="true">
            <path d="M1 1l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {pickerOpen &&
          (currencies === null ? (
            <Skeleton height="var(--size-control-h)" />
          ) : (
            <div role="listbox" aria-label={wizard.baseCurrencyLabel} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {[...selectable].sort((a, b) => Number(b.common) - Number(a.common)).map((c) => (
                <button
                  key={c.code}
                  type="button"
                  role="option"
                  aria-selected={c.code === value.baseCurrency}
                  className="mb-pick"
                  data-selected={c.code === value.baseCurrency || undefined}
                  onClick={() => {
                    onChange({ ...value, baseCurrency: c.code });
                    setPickerOpen(false);
                  }}
                >
                  <Flag code={c.code} />
                  <span className="mb-pick__code">{c.code}</span>
                  <span className="mb-pick__name">{c.name}</span>
                </button>
              ))}
            </div>
          ))}
        <span style={{ fontSize: 'var(--type-caption-size)', color: 'var(--text-secondary)' }}>{wizard.baseCurrencyHelper}</span>
      </div>
    </>
  );
}
