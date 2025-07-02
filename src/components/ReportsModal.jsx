import { useState, useEffect } from 'react';
import client from '../api/client';

export default function ReportsModal() {
  const [show, setShow] = useState(false);
  const [reports, setReports] = useState([]);

  const open = async () => {
    try {
      const res = await client.get('/reports');
      setReports(res.data);
      setShow(true);
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || err.message || 'Unknown error';
      alert(`Failed to load reports: ${msg}`);
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

  const columns = reports.length > 0 ? Object.keys(reports[0]) : [];

  return (
    <>
      <button onClick={open} className="p-2">Reports</button>
      {show && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center"
          onClick={onBackdrop}
        >
          <div className="bg-white p-4 rounded space-y-4 max-h-[80vh] overflow-auto">
            <table className="border-collapse w-full">
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th key={col} className="border px-2 py-1 text-left">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reports.map((r, i) => (
                  <tr key={r.id || i}>
                    {columns.map((col) => (
                      <td key={col} className="border px-2 py-1">
                        {String(r[col])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={close} className="p-2">Close</button>
          </div>
        </div>
      )}
    </>
  );
}
