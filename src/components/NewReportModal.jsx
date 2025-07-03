import { useState, useEffect } from 'react';
import client from '../api/client';
import { listTemplates } from '../api/templates';

const LANGUAGES = ['sv', 'en'];

export default function NewReportModal({ onCreated }) {
  const [show, setShow] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [name, setName] = useState('');
  const [templateId, setTemplateId] = useState('');
  const [date, setDate] = useState(''); // YYYY-MM
  const [months, setMonths] = useState('');
  const [language, setLanguage] = useState(LANGUAGES[0]);

  const open = async () => {
    try {
      const res = await listTemplates();
      setTemplates(res.data);
      setShow(true);
    } catch (err) {
      console.error(err);
      alert('Failed to load templates');
    }
  };

  const close = () => setShow(false);

  useEffect(() => {
    if (!show) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [show]);

  const onBackdrop = (e) => {
    if (e.target === e.currentTarget) close();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [year, month] = date.split('-').map(Number);
    const lastDay = new Date(year, month, 0)
      .toISOString()
      .slice(0, 10);
    const payload = {
      name,
      template_id: templateId,
      date: lastDay,
      months: Number(months),
      language,
    };
    try {
      await client.post('/reports', payload);
      if (onCreated) onCreated();
      close();
      // reset form
      setName('');
      setTemplateId('');
      setDate('');
      setMonths('');
      setLanguage(LANGUAGES[0]);
    } catch (err) {
      console.error(err);
      alert('Failed to create report');
    }
  };

  return (
    <>
      <button onClick={open} className="p-2">New report</button>
      {show && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center"
          onClick={onBackdrop}
        >
          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded space-y-2"
          >
            <div>
              <label className="block text-sm">Rapportnamn</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border p-2 w-full"
              />
            </div>
            <div>
              <label className="block text-sm">Template</label>
              <select
                value={templateId}
                onChange={(e) => setTemplateId(e.target.value)}
                required
                className="border p-2 w-full"
              >
                <option value="">--</option>
                {templates.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm">Date</label>
              <input
                type="month"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="border p-2 w-full"
              />
            </div>
            <div>
              <label className="block text-sm">Months</label>
              <input
                type="number"
                min="1"
                value={months}
                onChange={(e) => setMonths(e.target.value)}
                required
                className="border p-2 w-full"
              />
            </div>
            <div>
              <label className="block text-sm">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                required
                className="border p-2 w-full"
              >
                {LANGUAGES.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <button type="button" onClick={close} className="p-2">
                Close
              </button>
              <button type="submit" className="p-2">
                Create
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
