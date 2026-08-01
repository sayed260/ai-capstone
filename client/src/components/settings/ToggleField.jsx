import './ToggleField.css';

function ToggleField({
  id,
  label,
  description,
  checked,
  onChange,
  disabled = false,
}) {
  return (
    <div className="toggle-field">
      <div className="toggle-field__content">
        <label className="toggle-field__label" htmlFor={id}>
          {label}
        </label>
        {description && (
          <p className="toggle-field__description" id={`${id}-description`}>
            {description}
          </p>
        )}
      </div>

      <button
        id={id}
        type="button"
        role="switch"
        className={`toggle-field__switch${checked ? ' toggle-field__switch--on' : ''}`}
        aria-checked={checked}
        aria-describedby={description ? `${id}-description` : undefined}
        disabled={disabled}
        onClick={() => onChange(!checked)}
      >
        <span className="toggle-field__thumb" />
      </button>
    </div>
  );
}

export default ToggleField;
