import { useState } from 'react';
import client from '../api/client';

export default function ReportForm({ onCreated }) {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await client.post('/reports', { content });
      setContent('');
      if (onCreated) onCreated();
    } catch (err) {
      console.error(err);
      alert('Failed to create report');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        className="border p-2 w-full"
        placeholder="Write report..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="p-2" type="submit">
        Send report
      </button>
    </form>
  );
}
