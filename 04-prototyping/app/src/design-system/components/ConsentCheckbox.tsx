import { useId } from 'react';
import './ConsentCheckbox.css';

export interface ConsentCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

/**
 * Consent checkbox as a large tappable card (canvas 1d). Always starts unticked —
 * pre-ticked consent is a dark pattern and never acceptable (charter money-UX rule).
 */
export function ConsentCheckbox({ checked, onChange, label }: ConsentCheckboxProps) {
  const id = useId();
  return (
    <label className="mb-consent" htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        className="mb-consent__input"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="mb-consent__box" aria-hidden="true">
        <svg viewBox="0 0 13 11" fill="none" className="mb-consent__tick">
          <path d="M1.5 5.5l3.5 3.5L11.5 1.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="mb-consent__label">{label}</span>
    </label>
  );
}
