import { useState, useEffect } from 'react';
import { getTemplates } from '../api/templates';
import client from '../api/client';

export default function NewReportModal({ onClose }) {
  const [name, setName] = useState('');
  const [templates, setTemplates] = useState([]);
  const [templateId, setTemplateId] = useState('');
  const [month, setMonth] = useState('');
  const [months, setMonths] = useState('');
  const [language, setLanguage] = useState('');

  useEffect(() => {
    getTemplates()
      .then((res) => setTemplates(res.data))
      .catch((err) => {
        console.error(err);
        alert('Failed to load templates');
      });
  }, []);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const languages = ['en', 'sv'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !templateId || !month || !months || !language) return;

    const [y, m] = month.split('-').map((v) => parseInt(v, 10));
    const lastDay = new Date(y, m, 0).toISOString().split('T')[0];

    try {
      await client.post('/reports', {
        name,
        template_id: templateId,
        date: lastDay,
        months: Number(months),
        language,
      });
      if (onClose) onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to create report');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded space-y-2" onClick={(e) => e.stopPropagation()}>
        <div>
          <label className="block text-sm">Report name</label>
          <input className="border p-1 w-full" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm">Template</label>
          <select className="border p-1 w-full" value={templateId} onChange={(e) => setTemplateId(e.target.value)} required>
            <option value="" disabled>Select template</option>
            {templates.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm">Date</label>
          <input type="month" className="border p-1 w-full" value={month} onChange={(e) => setMonth(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm">Months</label>
          <input type="number" className="border p-1 w-full" value={months} onChange={(e) => setMonths(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm">Language</label>
          <select className="border p-1 w-full" value={language} onChange={(e) => setLanguage(e.target.value)} required>
            <option value="" disabled>Select language</option>
            {languages.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-end space-x-2 pt-2">
          <button type="button" onClick={onClose} className="p-2">Close</button>
          <button type="submit" className="p-2">Create</button>
        </div>
      </form>
    </div>
  );
}
