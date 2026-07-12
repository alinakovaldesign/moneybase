import { useId, type InputHTMLAttributes, type ReactNode } from 'react';
import './TextField.css';

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label: string;
  /** Error content — rendered inline next to the field, announced via aria-live. */
  error?: ReactNode;
  helper?: string;
}

export function TextField({ label, error, helper, ...rest }: TextFieldProps) {
  const id = useId();
  const describedBy = error ? `${id}-error` : helper ? `${id}-helper` : undefined;
  return (
    <div className="mb-field">
      <label className="mb-field__label" htmlFor={id}>
        {label}
      </label>
      <input id={id} className="mb-field__input" aria-invalid={!!error} aria-describedby={describedBy} {...rest} />
      {/* aria-live region exists regardless so announcements fire when errors appear */}
      <div id={`${id}-error`} className="mb-field__error" role="alert" aria-live="assertive">
        {error}
      </div>
      {!error && helper && (
        <div id={`${id}-helper`} className="mb-field__helper">
          {helper}
        </div>
      )}
    </div>
  );
}
