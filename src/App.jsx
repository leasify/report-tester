import { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import ReportForm from './components/ReportForm';
import ReportList from './components/ReportList';
import { ping } from './api/auth';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    ping().then(() => setLoggedIn(true)).catch(() => setLoggedIn(false));
  }, []);

  if (!loggedIn) return <LoginForm onLogin={() => setLoggedIn(true)} />;

  return (
    <div className="max-w-3xl mx-auto mt-6 space-y-6 bg-white p-6 rounded shadow">
      <ReportForm onCreated={() => {}} />
      <ReportList />
    </div>
  );
}

export default App;
