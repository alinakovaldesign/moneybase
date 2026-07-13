import { useEffect, useRef, useState } from 'react';
import { consent, explainer, errors, loading, wizard } from '../../content/copy';
import { Button } from '../../design-system/components/Button';
import { ConsentCheckbox } from '../../design-system/components/ConsentCheckbox';

/**
 * WALLET-006 (part 2) — explainer BEFORE consent, then explicit consent.
 * Decline is a first-class button of equal width (canvas 1d, DDR entries).
 */
export function Step4Consent({
  cardLabel,
  walletName,
  baseCurrency,
  linking,
  linkError,
  onAgree,
  onDecline,
  onRetry,
  onUseDifferentCard,
}: {
  cardLabel: string;
  walletName: string;
  baseCurrency: string;
  linking: boolean;
  linkError: string | null;
  onAgree: () => void;
  onDecline: () => void;
  onRetry: () => void;
  onUseDifferentCard: () => void;
}) {
  const [phase, setPhase] = useState<'explainer' | 'consent'>('explainer');
  const [ticked, setTicked] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Each sub-screen (explainer → consent → failure) moves focus to its heading,
  // matching the wizard's step-change behavior (WCAG 2.4.3).
  useEffect(() => {
    headingRef.current?.focus();
  }, [phase, linkError]);

  if (linkError) {
    // Card-link failure: specific message, retry, different card — draft never lost.
    return (
      <>
        <h3 className="mb-wizard__title" tabIndex={-1} ref={headingRef}>{errors.cardLink.title}</h3>
        <div className="mb-card mb-card--sm" role="alert">
          <p style={{ margin: 0, fontSize: 'var(--type-body-size)', color: 'var(--text-primary)', lineHeight: 1.55 }}>{linkError}</p>
          <p style={{ margin: 'var(--space-2) 0 0', fontSize: 'var(--type-body-sm-size)', color: 'var(--text-secondary)' }}>
            {errors.cardLink.safety}
          </p>
        </div>
        <div className="mb-wizard__footer" style={{ paddingTop: 'var(--space-3)' }}>
          <Button variant="primary" fullWidth onClick={onRetry}>
            {errors.cardLink.retryCta}
          </Button>
          <Button variant="secondary" fullWidth onClick={onUseDifferentCard}>
            {errors.cardLink.otherCardCta}
          </Button>
        </div>
      </>
    );
  }

  if (phase === 'explainer') {
    return (
      <>
        <h3 className="mb-wizard__title" tabIndex={-1} ref={headingRef}>{explainer.title}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {explainer.panels.map((p, i) => {
            const title = typeof p.title === 'function' ? p.title(baseCurrency) : p.title;
            const body =
              typeof p.body === 'function'
                ? p.body.length === 2
                  ? (p.body as (c: string, w: string) => string)(cardLabel, walletName)
                  : (p.body as (b: string) => string)(baseCurrency)
                : p.body;
            return (
              <div key={i} className="mb-card mb-card--sm" style={{ display: 'flex', gap: 'var(--space-3)' }}>
                <span
                  aria-hidden="true"
                  style={{
                    width: 'var(--size-icon-chip)',
                    height: 'var(--size-icon-chip)',
                    borderRadius: 'var(--radius-pill)',
                    background: 'var(--surface-tint)',
                    color: 'var(--icon-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </span>
                <span>
                  <span style={{ display: 'block', fontSize: 'var(--type-body-size)', fontWeight: 700, color: 'var(--text-heading)' }}>{title}</span>
                  <span style={{ fontSize: 'var(--type-body-sm-size)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{body}</span>
                </span>
              </div>
            );
          })}
        </div>
        <div className="mb-wizard__footer">
          <Button variant="primary" fullWidth onClick={() => setPhase('consent')}>
            {wizard.continueCta}
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <h3 className="mb-wizard__title" tabIndex={-1} ref={headingRef}>{consent.title}</h3>
      <p className="mb-screen__subtitle" style={{ margin: 0 }}>{consent.subtitle}</p>
      <div className="mb-card mb-card--sm">
        {consent.bullets(cardLabel, walletName).map((b, i) => (
          <div className="mb-kv" key={i} style={{ justifyContent: 'flex-start', gap: 'var(--space-3)' }}>
            <span
              aria-hidden="true"
              style={{ width: 'var(--space-2)', height: 'var(--space-2)', borderRadius: 'var(--radius-pill)', background: 'var(--icon-primary)', flexShrink: 0 }}
            />
            <span style={{ fontSize: 'var(--type-body-size)', color: 'var(--text-primary)', lineHeight: 1.55 }}>{b}</span>
          </div>
        ))}
      </div>

      <ConsentCheckbox checked={ticked} onChange={setTicked} label={consent.checkbox(walletName)} />

      {linking && <div className="mb-loading-line" role="status">{loading.cardLink}</div>}

      <div className="mb-wizard__footer">
        {/* Agree stays disabled until the box is ticked — never pre-ticked. */}
        <Button variant="primary" fullWidth disabled={!ticked} loading={linking} onClick={onAgree}>
          {consent.agreeCta}
        </Button>
        {/* Decline: equal width, equal height — a real choice, not a ghost link. */}
        <Button variant="secondary" fullWidth disabled={linking} onClick={onDecline}>
          {consent.declineCta}
        </Button>
        <p style={{ margin: 0, textAlign: 'center', fontSize: 'var(--type-caption-size)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          {consent.declineReassurance}
        </p>
      </div>
    </>
  );
}
