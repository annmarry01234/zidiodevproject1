import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UploadHistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.token) {
          setError('User not authenticated');
          return;
        }

        const res = await axios.get('http://localhost:4000/api/files/history', {
          headers: { Authorization: `Bearer ${user.token}` }
        });

        setHistory(res.data);
      } catch (err) {
        console.error('Error fetching upload history:', err);
        setError('Failed to load upload history');
      }
    };

    fetchHistory();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Upload History</h2>
      {error && <p className="text-red-600">{error}</p>}
      {history.length === 0 && !error && (
        <p>No files uploaded yet.</p>
      )}
      {history.length > 0 && (
        <table border="1" cellPadding="10" style={{ marginTop: '20px', width: '100%' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Filename</th>
              <th>Uploaded At</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry, idx) => (
              <tr key={entry._id}>
                <td>{idx + 1}</td>
                <td>{entry.fileName}</td>
                <td>{new Date(entry.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UploadHistoryPage;
