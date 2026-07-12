/** Small card-network badge (navy block like the canvas VISA chip). */
export function CardBadge({ network }: { network: 'visa' | 'mastercard' }) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: 'calc(var(--space-8) + var(--space-3))',
        height: 'calc(var(--space-6) + var(--space-1))',
        borderRadius: 'calc(var(--radius-checkbox) - 1px)',
        background: 'var(--text-heading)',
        color: 'var(--text-inverse)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'calc(var(--type-badge-size) - 1px)',
        fontWeight: 700,
        fontStyle: 'italic',
        letterSpacing: '0.06em',
        flexShrink: 0,
        fontFamily: 'var(--font-body)',
      }}
    >
      {network === 'visa' ? 'VISA' : 'MC'}
    </span>
  );
}
