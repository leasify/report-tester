import { useState } from 'react';
import { login } from '../api/auth';

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const deviceName =
    import.meta?.env?.DEVICE_NAME ||
    (typeof process !== 'undefined' ? process.env.DEVICE_NAME : undefined);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(email, password);
      localStorage.setItem('token', data.token);
      if (onLogin) onLogin();
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || err.message || 'Unknown error';
      alert(`Login failed: ${msg}`);
    }
  };

  return (
    <div className="max-w-xs mx-auto mt-10 bg-white p-6 rounded shadow">
      <div className="flex flex-col items-center mb-6">
        <svg
          className="w-16 h-16 text-green-600"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="4" />
          <text
            x="50%"
            y="65%"
            textAnchor="middle"
            fontSize="56"
            fill="currentColor"
          >
            $
          </text>
        </svg>
        <span className="mt-2 text-3xl font-bold">ACME</span>
      </div>
      <p className="mb-4 text-center text-sm text-gray-700">
        This demo application uses Leasify to retrieve reports for IFRS&nbsp;16
        accounting.
      </p>
      {deviceName && (
        <p className="mb-4 text-center text-xs text-gray-500">
          device_name={deviceName}
        </p>
      )}
      <form onSubmit={handleSubmit} autoComplete="on" className="space-y-2">
        <input
          type="email"
          name="email"
          autoComplete="username"
          className="border p-2 w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          className="border p-2 w-full"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="p-2 w-full" type="submit">
          Log in
        </button>
      </form>
    </div>
  );
}
