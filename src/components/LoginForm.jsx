import { useState } from 'react';
import client from '../api/client';

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await client.post('/login', { username, password });
      localStorage.setItem('token', data.token);
      if (onLogin) onLogin();
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <div className="max-w-xs mx-auto mt-10">
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
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          className="border p-2 w-full"
          placeholder="Användarnamn"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="border p-2 w-full"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2 w-full" type="submit">
          Logga in
        </button>
      </form>
    </div>
  );
}
