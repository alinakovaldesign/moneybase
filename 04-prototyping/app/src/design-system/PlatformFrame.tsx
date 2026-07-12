import type { ReactNode } from 'react';
import { usePlatform } from './PlatformProvider';
import './PlatformFrame.css';

/**
 * WALLET-011 — the presentation layer above the token layer.
 * Screens/flow are 100% shared; ONLY this frame differs per platform:
 *  - iOS: iPhone device frame, sheet presentations (HIG)
 *  - Android: device frame + M3 center-aligned top app bar, tonal surfaces
 *  - Web: the real product shell observed on live.moneybase.com (DESIGN-000
 *    + logged-in addendum 2): navy sidebar with icons and Payments → Wallets
 *    active, top bar with centered search + bell/settings/account cluster.
 * This is the one legitimate platform branch — the frame IS the platform layer.
 */

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
const NavIcons = {
  home: <svg width="16" height="16" viewBox="0 0 20 20"><path {...stroke} d="M3 9.5L10 3l7 6.5V17h-4.5v-4h-5v4H3V9.5z" /></svg>,
  invest: <svg width="16" height="16" viewBox="0 0 20 20"><path {...stroke} d="M3 17V8M8 17V4M13 17v-6M18 17V7" /></svg>,
  wallet: <svg width="16" height="16" viewBox="0 0 20 20"><rect {...stroke} x="2.5" y="5" width="15" height="11" rx="2.5" /><circle cx="14" cy="10.5" r="1.2" fill="currentColor" stroke="none" /></svg>,
  transfer: <svg width="16" height="16" viewBox="0 0 20 20"><path {...stroke} d="M4 7h11M15 7l-3-3M16 13H5M5 13l3 3" /></svg>,
  fx: <svg width="16" height="16" viewBox="0 0 20 20"><circle {...stroke} cx="10" cy="10" r="7" /><path {...stroke} d="M7.5 8h5M7.5 12h5M9 5.5v9" /></svg>,
  bank: <svg width="16" height="16" viewBox="0 0 20 20"><path {...stroke} d="M3 8l7-4.5L17 8M4 8v7M8 8v7M12 8v7M16 8v7M3 15.5h14" /></svg>,
  report: <svg width="16" height="16" viewBox="0 0 20 20"><path {...stroke} d="M5 3h7l3 3v11H5V3zM12 3v3h3" /></svg>,
};

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
            <span className="mb-webshell__nav-item">{NavIcons.home} Home</span>
            <span className="mb-webshell__nav-item">{NavIcons.invest} Investments</span>
            <span className="mb-webshell__nav-group">Payments</span>
            {/* Wallets slots into the EXISTING IA — observed on the live product */}
            <span className="mb-webshell__nav-item mb-webshell__nav-item--sub" data-active>{NavIcons.wallet} Wallets</span>
            <span className="mb-webshell__nav-item mb-webshell__nav-item--sub">{NavIcons.transfer} Transfer</span>
            <span className="mb-webshell__nav-item mb-webshell__nav-item--sub">{NavIcons.fx} FX Exchange</span>
            <span className="mb-webshell__nav-item mb-webshell__nav-item--sub">{NavIcons.bank} Beneficiaries</span>
            <span className="mb-webshell__nav-item">{NavIcons.report} Reports</span>
          </nav>
        </aside>
        <div className="mb-webshell__main">
          <header className="mb-webshell__topbar">
            <input className="mb-webshell__search" placeholder="Search here..." aria-label="Search" />
            {/* Right cluster observed on the logged-in product: bell · settings · account id */}
            <span className="mb-webshell__topbar-cluster">
              <button type="button" className="mb-webshell__iconbtn" aria-label="Notifications">
                <svg width="18" height="18" viewBox="0 0 20 20"><path {...stroke} d="M10 3a4.5 4.5 0 00-4.5 4.5c0 4-1.5 5-1.5 5h12s-1.5-1-1.5-5A4.5 4.5 0 0010 3zM8.5 15.5a1.6 1.6 0 003 0" /></svg>
              </button>
              <button type="button" className="mb-webshell__iconbtn" aria-label="Settings">
                <svg width="18" height="18" viewBox="0 0 20 20"><circle {...stroke} cx="10" cy="10" r="2.6" /><path {...stroke} d="M10 3v2M10 15v2M3 10h2M15 10h2M5 5l1.4 1.4M13.6 13.6L15 15M15 5l-1.4 1.4M6.4 13.6L5 15" /></svg>
              </button>
              <span className="mb-webshell__account">AST40012</span>
            </span>
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
