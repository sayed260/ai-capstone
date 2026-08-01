import { useCallback, useState } from 'react';
import FormField from './FormField';
import SelectField from './SelectField';
import ToggleField from './ToggleField';
import SettingsSection from './SettingsSection';
import './SettingsForm.css';

const THEME_OPTIONS = [
  { value: 'system', label: 'System default' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

const LANGUAGE_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'ar', label: 'Arabic' },
];

const MODEL_OPTIONS = [
  { value: 'gpt-4o', label: 'GPT-4o' },
  { value: 'gpt-4o-mini', label: 'GPT-4o Mini' },
  { value: 'claude-sonnet', label: 'Claude Sonnet' },
];

const RESPONSE_LENGTH_OPTIONS = [
  { value: 'concise', label: 'Concise' },
  { value: 'balanced', label: 'Balanced' },
  { value: 'detailed', label: 'Detailed' },
];

const DEFAULT_SETTINGS = {
  displayName: '',
  email: '',
  theme: 'system',
  language: 'en',
  emailNotifications: true,
  chatReminders: false,
  defaultModel: 'gpt-4o-mini',
  responseLength: 'balanced',
  saveChatHistory: true,
};

function validateSettings(settings) {
  const errors = {};

  if (!settings.displayName.trim()) {
    errors.displayName = 'Display name is required.';
  } else if (settings.displayName.trim().length < 2) {
    errors.displayName = 'Display name must be at least 2 characters.';
  }

  if (!settings.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  return errors;
}

function SettingsForm({ initialSettings = DEFAULT_SETTINGS, onSave }) {
  const [settings, setSettings] = useState(initialSettings);
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const updateField = useCallback((field) => (event) => {
    const value = event.target.value;
    setSettings((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
    setStatusMessage('');
  }, []);

  const updateToggle = useCallback((field) => (value) => {
    setSettings((previous) => ({ ...previous, [field]: value }));
    setStatusMessage('');
  }, []);

  const handleReset = useCallback(() => {
    setSettings(initialSettings);
    setErrors({});
    setStatusMessage('Changes discarded.');
  }, [initialSettings]);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      const validationErrors = validateSettings(settings);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setStatusMessage('');
        return;
      }

      setIsSaving(true);
      setStatusMessage('');

      try {
        if (onSave) {
          await onSave(settings);
        }

        setStatusMessage('Settings saved successfully.');
      } catch {
        setStatusMessage('Something went wrong. Please try again.');
      } finally {
        setIsSaving(false);
      }
    },
    [onSave, settings]
  );

  return (
    <form className="settings-form" onSubmit={handleSubmit} noValidate>
      <SettingsSection
        title="Profile"
        description="Basic information used across the app."
      >
        <FormField
          id="displayName"
          label="Display name"
          value={settings.displayName}
          onChange={updateField('displayName')}
          placeholder="Jane Doe"
          error={errors.displayName}
          helpText="Shown in chat and shared sessions."
          required
          autoComplete="name"
        />

        <FormField
          id="email"
          label="Email"
          type="email"
          value={settings.email}
          onChange={updateField('email')}
          placeholder="jane@example.com"
          error={errors.email}
          helpText="Used for account recovery and notifications."
          required
          autoComplete="email"
        />
      </SettingsSection>

      <SettingsSection
        title="Appearance"
        description="Customize how the app looks and reads."
      >
        <SelectField
          id="theme"
          label="Theme"
          value={settings.theme}
          onChange={updateField('theme')}
          options={THEME_OPTIONS}
          helpText="Choose a color scheme for the interface."
        />

        <SelectField
          id="language"
          label="Language"
          value={settings.language}
          onChange={updateField('language')}
          options={LANGUAGE_OPTIONS}
          helpText="Preferred language for UI labels and messages."
        />
      </SettingsSection>

      <SettingsSection
        title="Notifications"
        description="Control when and how we reach you."
      >
        <div className="settings-section__body settings-section__body--toggles">
          <ToggleField
            id="emailNotifications"
            label="Email notifications"
            description="Receive updates about account activity and new features."
            checked={settings.emailNotifications}
            onChange={updateToggle('emailNotifications')}
          />

          <ToggleField
            id="chatReminders"
            label="Chat reminders"
            description="Get reminded to continue unfinished conversations."
            checked={settings.chatReminders}
            onChange={updateToggle('chatReminders')}
          />
        </div>
      </SettingsSection>

      <SettingsSection
        title="AI preferences"
        description="Defaults applied to new chat sessions."
      >
        <SelectField
          id="defaultModel"
          label="Default model"
          value={settings.defaultModel}
          onChange={updateField('defaultModel')}
          options={MODEL_OPTIONS}
          helpText="The model used when you start a new conversation."
        />

        <SelectField
          id="responseLength"
          label="Response length"
          value={settings.responseLength}
          onChange={updateField('responseLength')}
          options={RESPONSE_LENGTH_OPTIONS}
          helpText="How verbose assistant replies should be by default."
        />

        <div className="settings-section__body settings-section__body--toggles">
          <ToggleField
            id="saveChatHistory"
            label="Save chat history"
            description="Keep past conversations available across devices."
            checked={settings.saveChatHistory}
            onChange={updateToggle('saveChatHistory')}
          />
        </div>
      </SettingsSection>

      {statusMessage && (
        <p
          className={`settings-form__status${
            statusMessage.includes('successfully')
              ? ' settings-form__status--success'
              : statusMessage.includes('wrong')
                ? ' settings-form__status--error'
                : ''
          }`}
          role="status"
          aria-live="polite"
        >
          {statusMessage}
        </p>
      )}

      <div className="settings-form__actions">
        <button
          type="button"
          className="settings-form__button settings-form__button--secondary"
          onClick={handleReset}
          disabled={isSaving}
        >
          Reset
        </button>

        <button
          type="submit"
          className="settings-form__button settings-form__button--primary"
          disabled={isSaving}
        >
          {isSaving ? 'Saving…' : 'Save settings'}
        </button>
      </div>
    </form>
  );
}

export default SettingsForm;
export { DEFAULT_SETTINGS, validateSettings };
