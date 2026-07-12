import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './CircleAction.css';

export interface CircleActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
  /** primary = filled blue (the one alive action on unfunded wallets) */
  emphasis?: 'primary' | 'tint';
}

/**
 * THE Moneybase action pattern (DESIGN-000): circular icon-button with a label
 * underneath. Disabled state stays visible — capability is communicated, not hidden.
 */
export function CircleAction({ icon, label, emphasis = 'tint', disabled, ...rest }: CircleActionProps) {
  return (
    <button type="button" className="mb-circle-action" data-emphasis={emphasis} disabled={disabled} {...rest}>
      <span className="mb-circle-action__circle" aria-hidden="true">
        {icon}
      </span>
      <span className="mb-circle-action__label">{label}</span>
    </button>
  );
}
