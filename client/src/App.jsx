import { useCallback } from 'react';
import SettingsForm, { DEFAULT_SETTINGS } from './components/settings/SettingsForm';
import './App.css';

const demoInitialSettings = {
  ...DEFAULT_SETTINGS,
  displayName: 'Jane Doe',
  email: 'jane@example.com',
};

function App() {
  const handleSaveSettings = useCallback(async (settings) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log('Saved settings:', settings);
  }, []);

  return (
    <div className="app">
      <header className="app__header">
        <p className="app__eyebrow">AI Capstone</p>
        <h1 className="app__title">Settings</h1>
        <p className="app__subtitle">
          Manage your profile, preferences, and AI defaults.
        </p>
      </header>

      <main className="app__main">
        <SettingsForm
          initialSettings={demoInitialSettings}
          onSave={handleSaveSettings}
        />
      </main>
    </div>
  );
}

export default App;
