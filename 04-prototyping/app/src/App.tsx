import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PlatformProvider, PlatformSwitcher } from './design-system/PlatformProvider';
import { WalletsHome } from './screens/WalletsHome';
import { CreateWalletWizard } from './screens/CreateWallet';
import { WalletDetail } from './screens/WalletDetail';

/**
 * Prototype shell: one React codebase, three platform skins from one token
 * source. The switcher floats above the flow for demo purposes — it is the
 * design-system mechanism on display, not a product feature.
 */
function App() {
  return (
    <PlatformProvider>
      <BrowserRouter>
        <div
          style={{
            position: 'fixed',
            top: 'var(--space-3)',
            right: 'var(--space-3)',
            zIndex: 10,
          }}
        >
          <PlatformSwitcher />
        </div>
        <Routes>
          <Route path="/" element={<WalletsHome />} />
          <Route path="/create" element={<CreateWalletWizard />} />
          <Route path="/wallet/:id" element={<WalletDetail />} />
        </Routes>
      </BrowserRouter>
    </PlatformProvider>
  );
}

export default App;
