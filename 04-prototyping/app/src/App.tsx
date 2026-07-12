import { PlatformProvider, PlatformSwitcher } from './design-system/PlatformProvider';
import { Button } from './design-system/components/Button';

/**
 * Shell only — flow screens arrive with WALLET-003..007.
 * This proves the token pipeline: one source, three platform skins, switchable live.
 */
function App() {
  return (
    <PlatformProvider>
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-6)',
          padding: 'var(--space-8)',
        }}
      >
        <header style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)' }}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'var(--type-title-lg-size)',
              color: 'var(--text-heading)',
              margin: 0,
            }}
          >
            Moneybase — wallet prototype shell
          </h1>
          <PlatformSwitcher />
        </header>
        <main style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', width: 'min(100%, 360px)' }}>
          <Button variant="accent" fullWidth>
            New wallet
          </Button>
          <Button variant="primary" fullWidth>
            Continue
          </Button>
          <Button variant="secondary" fullWidth>
            Decline
          </Button>
          <Button variant="primary" fullWidth disabled>
            Continue
          </Button>
        </main>
      </div>
    </PlatformProvider>
  );
}

export default App;
