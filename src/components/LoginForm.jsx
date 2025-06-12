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
    <form onSubmit={handleSubmit} className="space-y-2 max-w-xs mx-auto mt-10">
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
  );
}
