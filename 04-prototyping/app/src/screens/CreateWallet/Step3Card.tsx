import { useEffect, useState } from 'react';
import { walletService } from '../../services/walletService';
import type { Card } from '../../services/types';
import { consent, wizard } from '../../content/copy';
import { TextField } from '../../design-system/components/TextField';
import { Skeleton } from '../../design-system/components/Skeleton';
import { CardBadge } from './CardBadge';

export interface Step3Value {
  cardId?: string;
  /** A locally captured new card lives only in wizard state until consent completes. */
  newCard?: { last4: string; label: string; network: 'visa' | 'mastercard' };
}

/** WALLET-006 (part 1) — select an existing card or link a new one. */
export function Step3Card({
  value,
  onChange,
  declined,
}: {
  value: Step3Value;
  onChange: (v: Step3Value) => void;
  /** Set when the user declined consent — respectful banner, draft intact (D2-B). */
  declined: boolean;
}) {
  const [cards, setCards] = useState<Card[] | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [number, setNumber] = useState('');
  const [label, setLabel] = useState('');
  const [numberError, setNumberError] = useState<string | undefined>();

  useEffect(() => {
    let alive = true;
    walletService.listCards().then((c) => alive && setCards(c));
    return () => {
      alive = false;
    };
  }, []);

  function validateNumber(n: string): boolean {
    const digits = n.replace(/\s/g, '');
    // Test patterns only — never a real PAN. 4242… style numbers expected.
    const ok = /^\d{16}$/.test(digits) && (digits.startsWith('4') || digits.startsWith('5'));
    setNumberError(ok ? undefined : 'Enter a 16-digit test card number (starts with 4 or 5).');
    return ok;
  }

  return (
    <>
      <p className="mb-screen__subtitle" style={{ margin: 0 }}>
        {wizard.step3Subtitle}
      </p>

      {declined && <div className="mb-banner" role="status">{consent.declinedBanner}</div>}

      {cards === null ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <Skeleton height="var(--size-control-h)" />
          <Skeleton height="var(--size-control-h)" />
        </div>
      ) : (
        <div role="radiogroup" aria-label="Funding card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {cards.map((c) => (
            <button
              key={c.id}
              type="button"
              role="radio"
              aria-checked={value.cardId === c.id}
              className="mb-pick"
              data-selected={value.cardId === c.id || undefined}
              onClick={() => onChange({ cardId: c.id, newCard: undefined })}
            >
              <CardBadge network={c.network} />
              <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span className="mb-pick__code">•• {c.last4}</span>
                <span className="mb-pick__name">
                  {c.label} · expires {c.expires}
                </span>
              </span>
              {value.cardId === c.id && (
                <svg className="mb-pick__check" width="16" height="13" viewBox="0 0 13 11" fill="none" aria-hidden="true">
                  <path d="M1.5 5.5l3.5 3.5L11.5 1.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          ))}

        </div>
      )}

      {/* Outside the radiogroup — it is a disclosure, not a radio (ARIA 1.3.1) */}
      {cards !== null && (
        <button
          type="button"
          className="mb-pick"
          aria-expanded={showNewForm}
          data-selected={(!!value.newCard && !value.cardId) || undefined}
          onClick={() => setShowNewForm((s) => !s)}
        >
          <span className="mb-pick__code" style={{ color: 'var(--text-link)' }}>
            + {wizard.linkNewCard}
          </span>
        </button>
      )}

      {showNewForm && (
        <div className="mb-card mb-card--sm" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <TextField
            label="Card number"
            inputMode="numeric"
            placeholder="4242 4242 4242 4242"
            value={number}
            onChange={(e) => {
              setNumber(e.target.value);
              setNumberError(undefined);
            }}
            onBlur={(e) => validateNumber(e.target.value)}
            error={numberError}
            helper="Prototype: test numbers only — no real card data."
          />
          <TextField label="Card label" placeholder="e.g. Travel Visa" value={label} onChange={(e) => setLabel(e.target.value)} />
          <button
            type="button"
            className="mb-pick"
            style={{ justifyContent: 'center' }}
            onClick={() => {
              if (validateNumber(number)) {
                const digits = number.replace(/\s/g, '');
                onChange({
                  cardId: undefined,
                  newCard: { last4: digits.slice(-4), label: label || 'New card', network: digits.startsWith('4') ? 'visa' : 'mastercard' },
                });
                setShowNewForm(false);
              }
            }}
          >
            <span className="mb-pick__code" style={{ color: 'var(--text-link)' }}>Use this card</span>
          </button>
        </div>
      )}

      {value.newCard && !value.cardId && (
        <div className="mb-banner" role="status">
          {wizard.newCardNotice(value.newCard.last4, value.newCard.label)}
        </div>
      )}
    </>
  );
}
