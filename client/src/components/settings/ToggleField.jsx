import './ToggleField.css';

export function ToggleField({
  id,
  label,
  description,
  checked,
  onChange,
  onBlur,
  name,
  error,
  disabled = false,
}) {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="toggle-field">
      <div className="toggle-field__text">
        <label className="toggle-field__label" htmlFor={id}>
          {label}
        </label>
        {description && (
          <p className="toggle-field__description" id={`${id}-description`}>
            {description}
          </p>
        )}
        {error && (
          <p className="toggle-field__error" id={errorId} role="alert">
            {error}
          </p>
        )}
      </div>

      <span className="toggle-field__switch">
        <input
          id={id}
          name={name}
          type="checkbox"
          role="switch"
          className="toggle-field__input"
          checked={checked}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          aria-checked={checked}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            [description ? `${id}-description` : null, errorId]
              .filter(Boolean)
              .join(' ') || undefined
          }
        />
        <span className="toggle-field__track" aria-hidden="true" />
      </span>
    </div>
  );
}
