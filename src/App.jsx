import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ChartGenerator from './components/ChartGenerator';
import UploadHistoryPage from './pages/UploadHistoryPage';
import axios from 'axios';

const App = () => {
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState({});

  // Load userId from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser._id) {
      setUserId(storedUser._id);
    }
  }, []);

  // Debug log for userData
  useEffect(() => {
    console.log('📦 userData:', userData);
  }, [userData]);

  // Send userData to backend when it changes
  useEffect(() => {
    if (userId && Object.keys(userData).length > 0) {
      axios.post('http://localhost:4000/api/save-user-data', { userId, userData })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error('❌ Failed to save user data:', error);
        });
    }
  }, [userId, userData]);

  const handleUserDataChange = (newUserData) => {
    setUserData(newUserData);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage userId={userId} handleUserDataChange={handleUserDataChange} />} />
        <Route path="/chart-generator" element={<ChartGenerator userId={userId} handleUserDataChange={handleUserDataChange} />} />
        <Route path="/upload-history" element={<UploadHistoryPage userId={userId} handleUserDataChange={handleUserDataChange} />} />
      </Routes>
    </Router>
  );
};

export default App;