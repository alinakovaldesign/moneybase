import { useEffect, useRef, useState } from 'react';
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
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let alive = true;
    walletService.listCurrencies().then((c) => alive && setCurrencies(c));
    return () => {
      alive = false;
    };
  }, []);

  // Dropdown closes on outside click — behaves like a real select.
  useEffect(() => {
    if (!pickerOpen) return;
    const close = (e: MouseEvent) => {
      if (!pickerRef.current?.contains(e.target as Node)) setPickerOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [pickerOpen]);

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

      <div className="mb-select" ref={pickerRef}>
        <span style={{ fontSize: 'var(--type-body-sm-size)', fontWeight: 600, color: 'var(--text-label)' }}>
          {wizard.baseCurrencyLabel}
        </span>
        <button
          type="button"
          className="mb-pick"
          aria-haspopup="listbox"
          aria-expanded={pickerOpen}
          onClick={() => setPickerOpen((o) => !o)}
        >
          {selected ? (
            <>
              <Flag code={selected.code} />
              <span className="mb-pick__code">{selected.code}</span>
              <span className="mb-pick__name">{selected.name}</span>
            </>
          ) : (
            <span className="mb-pick__name">Select base currency</span>
          )}
          {/* chevron points DOWN and rotates open — a select, not a navigation row */}
          <svg className="mb-select__chevron" data-open={pickerOpen || undefined} width="14" height="8" viewBox="0 0 14 8" aria-hidden="true">
            <path d="M1 1l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {pickerOpen &&
          (currencies === null ? (
            <Skeleton height="var(--size-control-h)" />
          ) : (
            <div role="listbox" aria-label={wizard.baseCurrencyLabel} className="mb-select__panel">
              {[...selectable].sort((a, b) => Number(b.common) - Number(a.common)).map((c) => (
                <button
                  key={c.code}
                  type="button"
                  role="option"
                  aria-selected={c.code === value.baseCurrency}
                  className="mb-select__option"
                  data-selected={c.code === value.baseCurrency || undefined}
                  onClick={() => {
                    onChange({ ...value, baseCurrency: c.code });
                    setPickerOpen(false);
                  }}
                >
                  <Flag code={c.code} />
                  <span className="mb-pick__code">{c.code}</span>
                  <span className="mb-pick__name">{c.name}</span>
                  {c.code === value.baseCurrency && (
                    <svg className="mb-pick__check" width="14" height="11" viewBox="0 0 13 11" fill="none" aria-hidden="true">
                      <path d="M1.5 5.5l3.5 3.5L11.5 1.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          ))}
        <span style={{ fontSize: 'var(--type-caption-size)', color: 'var(--text-secondary)' }}>{wizard.baseCurrencyHelper}</span>
      </div>
    </>
  );
}
