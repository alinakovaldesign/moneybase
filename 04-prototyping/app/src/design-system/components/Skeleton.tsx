import './Skeleton.css';

/** Loading placeholder — lists skeleton, they never spin (WALLET-008 rule). */
export function Skeleton({ height, width, radius }: { height?: string; width?: string; radius?: string }) {
  return (
    <span
      className="mb-skeleton"
      style={{ height: height ?? 'var(--space-4)', width: width ?? '100%', borderRadius: radius ?? 'var(--radius-input)' }}
      aria-hidden="true"
    />
  );
}
