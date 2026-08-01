import { SettingsForm } from './components/settings/SettingsForm.jsx';
import './App.css';

function App() {
  return (
    <main className="app">
      <header className="app__header">
        <h1 className="app__title">AI Capstone</h1>
        <p className="app__subtitle">Manage your account settings</p>
      </header>
      <SettingsForm />
    </main>
  );
}

export default App;
