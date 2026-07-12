import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PlatformProvider, PlatformSwitcher } from './design-system/PlatformProvider';
import { PlatformFrame } from './design-system/PlatformFrame';
import { WalletsHome } from './screens/WalletsHome';
import { CreateWalletWizard } from './screens/CreateWallet';
import { WalletDetail } from './screens/WalletDetail';

/**
 * Prototype shell: one React codebase, three platform presentations from one
 * token source (WALLET-011): iOS/Android device frames, the real product
 * shell on web. The floating switcher is the demo control, not a product feature.
 */
function App() {
  return (
    <PlatformProvider>
      <BrowserRouter>
        <div
          style={{
            position: 'fixed',
            bottom: 'var(--space-3)', /* bottom-right: never collides with shell top bars */
            right: 'var(--space-3)',
            zIndex: 30, /* demo control stays reachable even over modals */
          }}
        >
          <PlatformSwitcher />
        </div>
        <PlatformFrame>
          <Routes>
            <Route path="/" element={<WalletsHome />} />
            <Route path="/create" element={<CreateWalletWizard />} />
            <Route path="/wallet/:id" element={<WalletDetail />} />
          </Routes>
        </PlatformFrame>
      </BrowserRouter>
    </PlatformProvider>
  );
}

export default App;
