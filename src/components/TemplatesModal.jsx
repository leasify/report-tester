import { useEffect, useState } from 'react';
import { getTemplates } from '../api/templates';

export default function TemplatesModal({ onClose }) {
  const [templates, setTemplates] = useState([]);

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

  const headers = templates.length > 0 ? Object.keys(templates[0]) : [];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow max-h-[80vh] overflow-auto">
        <button onClick={onClose} className="float-right p-1 mb-2">Close</button>
        <table className="table-auto border-collapse w-full text-sm">
          <thead>
            <tr>
              {headers.map((h) => (
                <th key={h} className="border px-2 py-1 text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {templates.map((t, i) => (
              <tr key={i}>
                {headers.map((h) => (
                  <td key={h} className="border px-2 py-1">
                    {String(t[h])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

