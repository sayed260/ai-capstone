import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { SettingsForm } from './SettingsForm.jsx';

describe('SettingsForm', () => {
  it('renders all fields with accessible labels', () => {
    render(<SettingsForm />);

    expect(screen.getByRole('form', { name: 'Account settings' })).toBeInTheDocument();
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('switch', { name: 'Dark Mode' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save Settings' })).toBeInTheDocument();
  });

  it('shows validation errors when required fields are empty', async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.click(screen.getByRole('button', { name: 'Save Settings' }));

    expect(await screen.findByText('Full name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.type(screen.getByLabelText('Full Name'), 'Jane Doe');
    await user.type(screen.getByLabelText('Email'), 'not-an-email');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.click(screen.getByRole('button', { name: 'Save Settings' }));

    expect(
      await screen.findByText('Please enter a valid email address'),
    ).toBeInTheDocument();
  });

  it('shows validation error when password is too short', async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.type(screen.getByLabelText('Full Name'), 'Jane Doe');
    await user.type(screen.getByLabelText('Email'), 'jane@example.com');
    await user.type(screen.getByLabelText('Password'), 'short');
    await user.click(screen.getByRole('button', { name: 'Save Settings' }));

    expect(
      await screen.findByText('Password must be at least 8 characters'),
    ).toBeInTheDocument();
  });

  it('disables submit button while submitting', async () => {
    const user = userEvent.setup();
    let resolveSubmit;

    render(
      <SettingsForm
        onSubmit={() =>
          new Promise((resolve) => {
            resolveSubmit = resolve;
          })
        }
      />,
    );

    await user.type(screen.getByLabelText('Full Name'), 'Jane Doe');
    await user.type(screen.getByLabelText('Email'), 'jane@example.com');
    await user.type(screen.getByLabelText('Password'), 'password123');

    const submitButton = screen.getByRole('button', { name: 'Save Settings' });
    await user.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveAttribute('aria-busy', 'true');
    expect(submitButton).toHaveTextContent('Saving…');

    resolveSubmit();
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it('shows success message after saving valid settings', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn().mockResolvedValue(undefined);

    render(<SettingsForm onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText('Full Name'), 'Jane Doe');
    await user.type(screen.getByLabelText('Email'), 'jane@example.com');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.click(screen.getByRole('switch', { name: 'Dark Mode' }));
    await user.click(screen.getByRole('button', { name: 'Save Settings' }));

    expect(await screen.findByRole('status')).toHaveTextContent(
      'Settings saved successfully.',
    );
    expect(handleSubmit).toHaveBeenCalledWith({
      fullName: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password123',
      darkMode: true,
    });
  });

  it('supports keyboard navigation through fields', async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.tab();
    expect(screen.getByLabelText('Full Name')).toHaveFocus();

    await user.tab();
    expect(screen.getByLabelText('Email')).toHaveFocus();

    await user.tab();
    expect(screen.getByLabelText('Password')).toHaveFocus();

    await user.tab();
    expect(screen.getByRole('switch', { name: 'Dark Mode' })).toHaveFocus();

    await user.tab();
    expect(screen.getByRole('button', { name: 'Save Settings' })).toHaveFocus();
  });

  it('marks invalid fields with aria-invalid after validation', async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.click(screen.getByRole('button', { name: 'Save Settings' }));

    await waitFor(() => {
      expect(screen.getByLabelText('Full Name')).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByLabelText('Password')).toHaveAttribute('aria-invalid', 'true');
    });
  });
});
