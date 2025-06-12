import { useEffect, useState } from 'react';
import client from '../api/client';

export default function ReportList() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    client
      .get('/reports')
      .then((res) => setReports(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <ul className="space-y-2">
      {reports.map((r) => (
        <li key={r.id} className="border p-2">
          {r.content}
        </li>
      ))}
    </ul>
  );
}
