// Unified professional styling across all components including LoginPage, DashboardPage, AdminPanel, ChartGenerator, and more

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser } from '../redux/slices/authSlice';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.auth.users);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      await dispatch(fetchUsers());
      setLoading(false);
    };
    loadUsers();
  }, [dispatch]);

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Admin Panel</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-blue-100 text-left text-blue-800">
                <th className="px-6 py-3 text-sm font-semibold">Username</th>
                <th className="px-6 py-3 text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 border-t border-gray-200">{user.username}</td>
                  <td className="px-6 py-4 border-t border-gray-200">{user.email}</td>
                  <td className="px-6 py-4 border-t border-gray-200">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
