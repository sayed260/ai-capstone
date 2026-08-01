import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from './FormField.jsx';
import { ToggleField } from './ToggleField.jsx';
import { SettingsSection } from './SettingsSection.jsx';
import './SettingsForm.css';

export const settingsFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, 'Full name is required')
    .min(2, 'Full name must be at least 2 characters'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
  darkMode: z.boolean(),
});

const DEFAULT_FORM_VALUES = {
  fullName: '',
  email: '',
  password: '',
  darkMode: false,
};

export function SettingsForm({
  defaultValues = DEFAULT_FORM_VALUES,
  onSubmit,
  submitLabel = 'Save Settings',
}) {
  const [successMessage, setSuccessMessage] = useState('');

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: { ...DEFAULT_FORM_VALUES, ...defaultValues },
    mode: 'onSubmit',
  });

  const handleFormSubmit = async (formValues) => {
    setSuccessMessage('');

    try {
      if (onSubmit) {
        await onSubmit(formValues);
      } else {
        await new Promise((resolve) => {
          setTimeout(resolve, 300);
        });
      }

      reset(formValues);
      setSuccessMessage('Settings saved successfully.');
    } catch (submitError) {
      setSuccessMessage('');
      throw submitError;
    }
  };

  return (
    <form
      className="settings-form"
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
      aria-label="Account settings"
    >
      <div className="settings-form__card">
        <SettingsSection
          title="Account Settings"
          description="Update your profile information and preferences."
        >
          <div className="settings-form__fields">
            <FormField
              id="fullName"
              label="Full Name"
              type="text"
              autoComplete="name"
              error={errors.fullName?.message}
              disabled={isSubmitting}
              inputProps={register('fullName')}
            />

            <FormField
              id="email"
              label="Email"
              type="email"
              autoComplete="email"
              error={errors.email?.message}
              disabled={isSubmitting}
              inputProps={register('email')}
            />

            <FormField
              id="password"
              label="Password"
              type="password"
              autoComplete="new-password"
              hint="Must be at least 8 characters."
              error={errors.password?.message}
              disabled={isSubmitting}
              inputProps={register('password')}
            />

            <Controller
              name="darkMode"
              control={control}
              render={({ field }) => (
                <ToggleField
                  id="darkMode"
                  label="Dark Mode"
                  description="Use a dark color theme across the app."
                  name={field.name}
                  checked={field.value}
                  onChange={(event) => field.onChange(event.target.checked)}
                  onBlur={field.onBlur}
                  disabled={isSubmitting}
                  error={errors.darkMode?.message}
                />
              )}
            />
          </div>
        </SettingsSection>

        <div className="settings-form__actions">
          {successMessage && (
            <p className="settings-form__success" role="status" aria-live="polite">
              {successMessage}
            </p>
          )}

          <button
            type="submit"
            className="settings-form__submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? 'Saving…' : submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}
