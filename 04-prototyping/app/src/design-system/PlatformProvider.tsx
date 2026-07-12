import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import './generated/tokens.css';

export type Platform = 'ios' | 'android' | 'web';
const STORAGE_KEY = 'mb-platform';

const PlatformContext = createContext<{ platform: Platform; setPlatform: (p: Platform) => void }>({
  platform: 'ios',
  setPlatform: () => {},
});

export function PlatformProvider({ children, initial }: { children: ReactNode; initial?: Platform }) {
  const [platform, setPlatform] = useState<Platform>(() => {
    if (initial) return initial;
    const stored = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    return (stored as Platform) || 'ios';
  });

  useEffect(() => {
    // Components never branch on platform in JS — divergence flows only through
    // the [data-platform] CSS override blocks generated from tokens.seed.json.
    document.documentElement.setAttribute('data-platform', platform);
    localStorage.setItem(STORAGE_KEY, platform);
  }, [platform]);

  return <PlatformContext.Provider value={{ platform, setPlatform }}>{children}</PlatformContext.Provider>;
}

export const usePlatform = () => useContext(PlatformContext);

export function PlatformSwitcher() {
  const { platform, setPlatform } = usePlatform();
  const options: { value: Platform; label: string }[] = [
    { value: 'ios', label: 'iOS' },
    { value: 'android', label: 'Android' },
    { value: 'web', label: 'Web' },
  ];
  return (
    <div role="radiogroup" aria-label="Platform theme" className="mb-platform-switcher">
      {options.map((o) => (
        <button
          key={o.value}
          role="radio"
          aria-checked={platform === o.value}
          className="mb-platform-switcher__option"
          data-active={platform === o.value || undefined}
          onClick={() => setPlatform(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
