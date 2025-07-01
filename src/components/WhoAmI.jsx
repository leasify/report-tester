import { useState, useEffect } from 'react';
import { whoami } from '../api/auth';

export default function WhoAmI() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);

  const open = async () => {
    try {
      const res = await whoami();
      setData(res.data);
      setShow(true);
    } catch (err) {
      console.error(err);
      alert('Failed to load info');
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

  return (
    <>
      <button onClick={open} className="p-2">Who am I?</button>
      {show && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center"
          onClick={onBackdrop}
        >
          <div className="bg-white p-4 rounded space-y-4">
            <table className="border-collapse w-full">
              <tbody>
                {data &&
                  Object.entries(data).map(([key, value]) => (
                    <tr key={key}>
                      <th className="border px-2 py-1 text-left">{key}</th>
                      <td className="border px-2 py-1">{String(value)}</td>
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
