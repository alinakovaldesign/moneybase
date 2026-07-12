import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { walletService } from '../../services/walletService';
import { WalletError, type Card } from '../../services/types';
import { loading as loadingCopy, success as successCopy, wizard } from '../../content/copy';
import { Button } from '../../design-system/components/Button';
import { Step1Name, type Step1Value } from './Step1Name';
import { Step2Currencies } from './Step2Currencies';
import { Step3Card, type Step3Value } from './Step3Card';
import { Step4Consent } from './Step4Consent';
import '../screens.css';

type Phase = 'wizard' | 'creating' | 'success';
const TOTAL_STEPS = 4;

/** WALLET-004..007 — the create wizard: sheet on iOS, full-screen dialog on Android, modal on web (via CSS presentation overrides). */
export function CreateWalletWizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [phase, setPhase] = useState<Phase>('wizard');
  const [step1, setStep1] = useState<Step1Value>({ name: '', baseCurrency: 'EUR', nameValid: false });
  const [additional, setAdditional] = useState<string[]>([]);
  const [step3, setStep3] = useState<Step3Value>({});
  const [declined, setDeclined] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [linking, setLinking] = useState(false);
  const [linkError, setLinkError] = useState<string | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [createdId, setCreatedId] = useState<string | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    walletService.listCards().then(setCards);
  }, []);

  // Focus management: step change moves focus to the step heading (WALLET-008 a11y).
  useEffect(() => {
    titleRef.current?.focus();
  }, [step]);

  const cardLabel = step3.cardId
    ? `${cards.find((c) => c.id === step3.cardId)?.network === 'mastercard' ? 'Mastercard' : 'Visa'} •• ${cards.find((c) => c.id === step3.cardId)?.last4 ?? ''}`
    : step3.newCard
      ? `Card •• ${step3.newCard.last4}`
      : '';
  const walletName = step1.name.trim() || 'your new wallet';

  const canContinue =
    step === 1 ? step1.nameValid && !!step1.baseCurrency
    : step === 2 ? true // zero additional currencies is allowed (base-only wallet)
    : step === 3 ? !!step3.cardId || !!step3.newCard
    : false;

  async function handleAgree() {
    setLinking(true);
    setLinkError(null);
    try {
      await walletService.linkCard(step3.cardId ?? 'new-card', true);
      setPhase('creating');
      const wallet = await walletService.createWallet({
        name: step1.name,
        baseCurrency: step1.baseCurrency,
        additionalCurrencies: additional,
        cardId: step3.cardId ?? 'new-card',
      });
      setCreatedId(wallet.id);
      setPhase('success');
    } catch (e) {
      if (e instanceof WalletError && e.code === 'CARD_LINK_FAILED') {
        setLinkError(e.message);
      } else if (e instanceof WalletError && e.code === 'DUPLICATE_NAME') {
        // Duplicate slipped through (e.g. ?fail=duplicate at submit time) — back to step 1.
        setPhase('wizard');
        setStep(1);
        setStep1((s) => ({ ...s, nameValid: false }));
      } else {
        setLinkError(e instanceof Error ? e.message : 'Something went wrong.');
      }
      setPhase('wizard');
    } finally {
      setLinking(false);
    }
  }

  // Success: hold, then land on the funded wallet (reduced-motion users still get the hold, minus animation).
  useEffect(() => {
    if (phase === 'success' && createdId) {
      const hold = getComputedStyle(document.documentElement).getPropertyValue('--duration-success-hold');
      const ms = parseInt(hold, 10) || 1200;
      const t = setTimeout(() => navigate(`/wallet/${createdId}`, { replace: true }), ms);
      return () => clearTimeout(t);
    }
  }, [phase, createdId, navigate]);

  if (phase === 'success') {
    return (
      <div className="mb-wizard-backdrop">
        <div className="mb-wizard" role="dialog" aria-label={successCopy.title}>
          <div className="mb-success">
            <span className="mb-success__circle">
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
                <path d="M8 18l6 6L26 11" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <h2 className="mb-wizard__title">{successCopy.title}</h2>
            <p className="mb-screen__subtitle" style={{ maxWidth: 'var(--layout-content-max)' }}>
              {successCopy.body(walletName, cardLabel)}
            </p>
            <div className="mb-card mb-card--sm" style={{ width: 'min(100%, var(--layout-content-max))' }}>
              <div className="mb-kv"><span className="mb-kv__key">Wallet</span><span className="mb-kv__value">{walletName}</span></div>
              <div className="mb-kv"><span className="mb-kv__key">Funding card</span><span className="mb-kv__value">{cardLabel}</span></div>
              <div className="mb-kv"><span className="mb-kv__key">Base currency</span><span className="mb-kv__value">{step1.baseCurrency}</span></div>
            </div>
            <span className="mb-balance__caption">{successCopy.advancing}</span>
            <span className="mb-success__progress" aria-hidden="true"><span className="mb-success__progress-fill" /></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-wizard-backdrop">
      <div className="mb-wizard" role="dialog" aria-modal="true" aria-label={wizard.title}>
        <div className="mb-wizard__grabber" />
        <div className="mb-wizard__bar">
          <button type="button" className="mb-wizard__cancel" onClick={() => setCancelOpen(true)}>
            {wizard.cancelCta}
          </button>
          <span className="mb-wizard__bar-title">New wallet</span>
          <span className="mb-wizard__bar-spacer" />
        </div>

        <div className="mb-wizard__step-label">{wizard.stepIndicator(step, TOTAL_STEPS)}</div>
        <div className="mb-wizard__steps" aria-hidden="true">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => (
            <span key={i} className="mb-wizard__step-seg" data-active={i < step || undefined} />
          ))}
        </div>

        <div className="mb-wizard__body">
          {step === 1 && (
            <>
              <h2 className="mb-wizard__title" tabIndex={-1} ref={titleRef}>{wizard.title}</h2>
              <Step1Name value={step1} onChange={setStep1} />
            </>
          )}
          {step === 2 && (
            <>
              <h2 className="mb-wizard__title" tabIndex={-1} ref={titleRef}>{wizard.step2Title}</h2>
              <Step2Currencies baseCurrency={step1.baseCurrency} selected={additional} onChange={setAdditional} />
            </>
          )}
          {step === 3 && (
            <>
              <h2 className="mb-wizard__title" tabIndex={-1} ref={titleRef}>{wizard.step3Title}</h2>
              <Step3Card value={step3} onChange={(v) => { setStep3(v); setDeclined(false); }} declined={declined} />
            </>
          )}
          {step === 4 && (
            <Step4Consent
              cardLabel={cardLabel}
              walletName={walletName}
              baseCurrency={step1.baseCurrency}
              linking={linking || phase === 'creating'}
              linkError={linkError}
              onAgree={handleAgree}
              onDecline={() => {
                // Consent declined = first-class path: back to card step, draft intact (D1-B/D2-B).
                setDeclined(true);
                setStep(3);
              }}
              onRetry={() => { setLinkError(null); handleAgree(); }}
              onUseDifferentCard={() => { setLinkError(null); setStep3({}); setStep(3); }}
            />
          )}
          {phase === 'creating' && <div className="mb-loading-line">{loadingCopy.createWallet}</div>}
        </div>

        {step < 4 && (
          <div className="mb-wizard__footer">
            <Button variant="primary" fullWidth disabled={!canContinue} onClick={() => setStep((s) => s + 1)}>
              {wizard.continueCta}
            </Button>
            {step > 1 && (
              // Back preserves entered data — state lives in the container.
              <Button variant="secondary" fullWidth onClick={() => setStep((s) => s - 1)}>
                Back
              </Button>
            )}
          </div>
        )}
      </div>

      {cancelOpen && (
        <div className="mb-dialog-backdrop" role="alertdialog" aria-label={wizard.cancelDialog.title}>
          <div className="mb-dialog">
            <h3 className="mb-dialog__title">{wizard.cancelDialog.title}</h3>
            <p className="mb-dialog__body">{wizard.cancelDialog.body}</p>
            <div className="mb-dialog__actions">
              <Button variant="secondary" onClick={() => setCancelOpen(false)}>{wizard.cancelDialog.keepCta}</Button>
              <Button variant="primary" onClick={() => navigate('/')}>{wizard.cancelDialog.discardCta}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
