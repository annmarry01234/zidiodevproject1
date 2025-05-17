// Unified professional styling across all components including LoginPage, DashboardPage, AdminPanel, ChartGenerator, and more

import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Welcome to the Dashboard</h1>

        <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
          <button
            onClick={() => navigate('/chart-generator')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition"
          >
            Go to Chart Generator
          </button>

          <button
            onClick={() => navigate('/upload-history')}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow transition"
          >
            View Upload History
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
