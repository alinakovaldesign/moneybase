/* @token-exempt: pictorial artwork — these are real-world flag colors, not design values.
   The no-hex acceptance grep excludes files carrying this marker. */
/** Circular currency flag, drawn as inline SVG (no image assets). */
const SIZE = 'var(--space-5)';

export function Flag({ code }: { code: string }) {
  const common: React.CSSProperties = {
    width: SIZE,
    height: SIZE,
    borderRadius: 'var(--radius-pill)',
    flexShrink: 0,
    border: '1px solid var(--border-default)',
    boxSizing: 'border-box',
  };
  switch (code) {
    case 'EUR':
      return (
        <svg viewBox="0 0 20 20" style={common} aria-hidden="true">
          <circle cx="10" cy="10" r="10" fill="#1B4FA0" />
          <g fill="#FFBD00">
            {Array.from({ length: 8 }, (_, i) => {
              const a = (i / 8) * Math.PI * 2;
              return <circle key={i} cx={10 + 5.8 * Math.sin(a)} cy={10 - 5.8 * Math.cos(a)} r="1" />;
            })}
          </g>
        </svg>
      );
    case 'USD':
      return (
        <svg viewBox="0 0 20 20" style={common} aria-hidden="true">
          <defs>
            <clipPath id="mb-flag-usd"><circle cx="10" cy="10" r="10" /></clipPath>
          </defs>
          <g clipPath="url(#mb-flag-usd)">
            <rect width="20" height="20" fill="#FFFFFF" />
            {[0, 4, 8, 12, 16].map((y) => <rect key={y} y={y} width="20" height="2" fill="#C0392B" />)}
            <rect width="10" height="8" fill="#16325C" />
          </g>
        </svg>
      );
    case 'GBP':
      return (
        <svg viewBox="0 0 20 20" style={common} aria-hidden="true">
          <defs>
            <clipPath id="mb-flag-gbp"><circle cx="10" cy="10" r="10" /></clipPath>
          </defs>
          <g clipPath="url(#mb-flag-gbp)">
            <rect width="20" height="20" fill="#16325C" />
            <path d="M0 0l20 20M20 0L0 20" stroke="#FFFFFF" strokeWidth="4" />
            <path d="M10 0v20M0 10h20" stroke="#FFFFFF" strokeWidth="6" />
            <path d="M10 0v20M0 10h20" stroke="#C0392B" strokeWidth="3" />
          </g>
        </svg>
      );
    case 'CHF':
      return (
        <svg viewBox="0 0 20 20" style={common} aria-hidden="true">
          <circle cx="10" cy="10" r="10" fill="#C0392B" />
          <path d="M10 5v10M5 10h10" stroke="#FFFFFF" strokeWidth="3" />
        </svg>
      );
    default:
      return (
        <span
          style={{
            ...common,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--surface-tint)',
            color: 'var(--text-heading)',
            fontSize: 'calc(var(--type-caption-size) * 0.75)',
            fontWeight: 700,
            fontFamily: 'var(--font-body)',
          }}
          aria-hidden="true"
        >
          {code.slice(0, 2)}
        </span>
      );
  }
}
