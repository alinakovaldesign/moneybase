import type { ReactNode } from 'react';
import { usePlatform } from './PlatformProvider';
import './PlatformFrame.css';

/**
 * WALLET-011 — the presentation layer above the token layer.
 * Screens/flow are 100% shared; ONLY this frame differs per platform:
 *  - iOS: iPhone device frame, sheet presentations (HIG)
 *  - Android: device frame + M3 center-aligned top app bar, tonal surfaces
 *  - Web: NO phone column — the real product shell observed on
 *    live.moneybase.com (DESIGN-000): navy sidebar with Payments → Wallets,
 *    white top bar with centered search, content on light gray.
 * This is the one legitimate platform branch — the frame IS the platform
 * layer (divergence policy: structure lives at the platform level).
 */
export function PlatformFrame({ children }: { children: ReactNode }) {
  const { platform } = usePlatform();

  if (platform === 'web') {
    return (
      <div className="mb-webshell">
        <aside className="mb-webshell__sidebar" aria-label="Main navigation">
          <div className="mb-webshell__logo">
            <span className="mb-webshell__logo-mark" aria-hidden="true">✳</span> moneybase
          </div>
          <nav className="mb-webshell__nav">
            <span className="mb-webshell__nav-item">Home</span>
            <span className="mb-webshell__nav-item">Investments</span>
            <span className="mb-webshell__nav-group">Payments</span>
            {/* Wallets slots into the EXISTING IA — observed on the live product */}
            <span className="mb-webshell__nav-item mb-webshell__nav-item--sub" data-active>Wallets</span>
            <span className="mb-webshell__nav-item mb-webshell__nav-item--sub">Transfer</span>
            <span className="mb-webshell__nav-item mb-webshell__nav-item--sub">FX Exchange</span>
            <span className="mb-webshell__nav-item mb-webshell__nav-item--sub">Beneficiaries</span>
            <span className="mb-webshell__nav-item">Reports</span>
          </nav>
        </aside>
        <div className="mb-webshell__main">
          <header className="mb-webshell__topbar">
            <input className="mb-webshell__search" placeholder="Search here..." aria-label="Search" />
          </header>
          <div className="mb-webshell__content">{children}</div>
        </div>
      </div>
    );
  }

  const isIos = platform === 'ios';
  return (
    <div className="mb-stage">
      <div className={`mb-device ${isIos ? 'mb-device--ios' : 'mb-device--android'}`}>
        {/* status bar */}
        <div className="mb-device__statusbar" aria-hidden="true">
          <span className="mb-device__time">9:41</span>
          {isIos && <span className="mb-device__island" />}
          {!isIos && <span className="mb-device__punchhole" />}
          <span className="mb-device__status-icons">
            <svg width="17" height="11" viewBox="0 0 19 12"><rect x="0" y="7.5" width="3.2" height="4.5" rx="0.7" fill="currentColor"/><rect x="4.8" y="5" width="3.2" height="7" rx="0.7" fill="currentColor"/><rect x="9.6" y="2.5" width="3.2" height="9.5" rx="0.7" fill="currentColor"/><rect x="14.4" y="0" width="3.2" height="12" rx="0.7" fill="currentColor"/></svg>
            <svg width="22" height="11" viewBox="0 0 27 13"><rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke="currentColor" strokeOpacity="0.4" fill="none"/><rect x="2" y="2" width="18" height="9" rx="2" fill="currentColor"/></svg>
          </span>
        </div>
        {/* M3: center-aligned top app bar (Android only) */}
        {!isIos && (
          <div className="mb-device__appbar" aria-hidden="true">
            Moneybase
          </div>
        )}
        <div className="mb-device__screen">{children}</div>
        {/* gesture / home indicator */}
        <div className="mb-device__homebar" aria-hidden="true" />
      </div>
    </div>
  );
}
