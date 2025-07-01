import { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import ReportForm from './components/ReportForm';
import ReportList from './components/ReportList';
import { ping } from './api/auth';
import { setToken } from './api/client';
import WhoAmI from './components/WhoAmI';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const deviceName =
    (import.meta.env && import.meta.env.DEVICE_NAME) ||
    (typeof process !== 'undefined' ? process.env.DEVICE_NAME : undefined) ||
    'ACME';
  const token = localStorage.getItem('token');

  const logout = () => {
    setToken(null);
    setLoggedIn(false);
  };

  useEffect(() => {
    ping().then(() => setLoggedIn(true)).catch(() => setLoggedIn(false));
  }, []);

  const mainContent = loggedIn ? (
    <div className="max-w-3xl mx-auto mt-6 space-y-6 bg-white p-6 rounded shadow">
      <ReportForm onCreated={() => {}} />
      <ReportList />
      <div className="flex space-x-2">
        <WhoAmI />
        <button onClick={logout} className="p-2">Log out</button>
      </div>
    </div>
  ) : (
    <LoginForm onLogin={() => setLoggedIn(true)} />
  );

  return (
    <>
      <header className="bg-brandBlue text-white p-4">
        <h1 className="text-2xl font-bold" data-testid="device-name">
          {deviceName}
        </h1>
      </header>
      {mainContent}
      {loggedIn && (
        <footer className="mt-4 p-2 text-center text-xs text-gray-500">
          bearer={token || ''}
        </footer>
      )}
    </>
  );
}

export default App;
