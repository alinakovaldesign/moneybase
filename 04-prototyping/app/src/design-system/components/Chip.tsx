import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Chip.css';

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** dashed = the "+ Add currency" affordance from the canvas */
  variant?: 'default' | 'dashed';
  badge?: string;
  children: ReactNode;
}

/** Currency chip (flag + code + optional BASE badge) or dashed add-affordance. */
export function Chip({ variant = 'default', badge, children, ...rest }: ChipProps) {
  return (
    <button type="button" className="mb-chip" data-variant={variant} {...rest}>
      {children}
      {badge && <span className="mb-chip__badge">{badge}</span>}
    </button>
  );
}
