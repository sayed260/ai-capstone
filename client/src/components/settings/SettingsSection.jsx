import './SettingsSection.css';

export function SettingsSection({ title, description, children }) {
  return (
    <section className="settings-section" aria-labelledby="settings-section-title">
      <header className="settings-section__header">
        <h2 className="settings-section__title" id="settings-section-title">
          {title}
        </h2>
        {description && (
          <p className="settings-section__description">{description}</p>
        )}
      </header>
      <div className="settings-section__body">{children}</div>
    </section>
  );
}
