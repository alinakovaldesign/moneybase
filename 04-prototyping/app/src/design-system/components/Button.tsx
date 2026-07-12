import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

export type ButtonVariant = 'primary' | 'accent' | 'secondary';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  loading?: boolean;
  children: ReactNode;
}

/**
 * Design-system Button. Consumes semantic tokens only; platform divergence
 * (radius, height, motion) arrives via [data-platform] CSS overrides.
 * Variants map to the locked direction (DDR-002):
 *  - primary: blue, the default flow action
 *  - accent: amber, ONE conversion moment per journey (DDR-002 scarcity rule)
 *  - secondary: tinted, equal-citizenship alternatives (e.g. consent Decline)
 */
export function Button({ variant = 'primary', fullWidth, loading, disabled, children, ...rest }: ButtonProps) {
  return (
    <button
      className="mb-button"
      data-variant={variant}
      data-full-width={fullWidth || undefined}
      data-loading={loading || undefined}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <span className="mb-button__spinner" aria-hidden="true" />}
      <span className="mb-button__label">{children}</span>
    </button>
  );
}
