import './SelectField.css';

function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  error,
  helpText,
  required = false,
  disabled = false,
}) {
  const errorId = error ? `${id}-error` : undefined;
  const helpId = helpText ? `${id}-help` : undefined;
  const describedBy = [errorId, helpId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={`select-field${error ? ' select-field--error' : ''}`}>
      <label className="select-field__label" htmlFor={id}>
        {label}
        {required && <span className="select-field__required" aria-hidden="true"> *</span>}
      </label>

      <div className="select-field__wrapper">
        <select
          id={id}
          className="select-field__select"
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {helpText && !error && (
        <p className="select-field__help" id={helpId}>
          {helpText}
        </p>
      )}

      {error && (
        <p className="select-field__error" id={errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default SelectField;
