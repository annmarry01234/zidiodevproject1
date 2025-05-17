// src/components/FileUpload.jsx
import React, { useState } from 'react';
import api from '../api'; // <-- Make sure this file exists as discussed earlier

const FileUpload = ({ userId }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !userId) {
      setMessage('File and user ID are required.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);

    try {
      const res = await api.post('/files/upload', formData);
      setMessage('✅ File uploaded successfully!');
      console.log(res.data);
    } catch (err) {
      console.error('Upload error:', err);
      setMessage('❌ Upload failed.');
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Upload Excel File</h2>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        className="mb-4 block"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Upload
      </button>
      {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default FileUpload;
