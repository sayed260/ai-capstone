import './FormField.css';

export function FormField({
  id,
  label,
  type = 'text',
  error,
  hint,
  disabled = false,
  autoComplete,
  inputProps = {},
}) {
  const errorId = error ? `${id}-error` : undefined;
  const hintId = hint ? `${id}-hint` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="form-field">
      <label className="form-field__label" htmlFor={id}>
        {label}
      </label>

      <input
        id={id}
        type={type}
        className={`form-field__input${error ? ' form-field__input--error' : ''}`}
        disabled={disabled}
        autoComplete={autoComplete}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={describedBy}
        {...inputProps}
      />

      {hint && (
        <p className="form-field__hint" id={hintId}>
          {hint}
        </p>
      )}

      {error && (
        <p className="form-field__error" id={errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
