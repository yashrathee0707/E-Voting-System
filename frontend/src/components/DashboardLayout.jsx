// src/layouts/DashboardLayout.jsx
import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
  FaVoteYea,
  FaCalendarAlt,
  FaTrashAlt,
  FaCheckCircle,
  FaUserCircle,
  FaBars,
  FaTimes
} from 'react-icons/fa';

const DashboardLayout = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) return setError('No token found');

      try {
        const res = await fetch('/api/auth/current-user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!res.ok) throw new Error('Failed to fetch user data');

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
        setError('Error loading user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      {isSidebarOpen && (
        <aside className="w-64 bg-blue-900 text-white flex flex-col">
          <div className="text-center py-6 text-2xl font-bold border-b border-blue-700">
            iBC Voting
          </div>
          <nav className="flex flex-col gap-3 px-4 py-6 text-sm font-medium">
            <Link to="/dashboard" className="hover:bg-blue-800 p-2 rounded-md flex items-center gap-2">
              <FaBars /> Dashboard
            </Link>
            <Link to="/create-voting" className="hover:bg-blue-800 p-2 rounded-md flex items-center gap-2">
              <FaVoteYea /> New Voting Event
            </Link>
            <Link to="/reschedule-voting" className="hover:bg-blue-800 p-2 rounded-md flex items-center gap-2">
              <FaCalendarAlt /> Reschedule Voting
            </Link>
            <Link to="/cancel-voting" className="hover:bg-blue-800 p-2 rounded-md flex items-center gap-2">
              <FaTrashAlt /> Cancel Voting
            </Link>
            <Link to="/vote-status" className="hover:bg-blue-800 p-2 rounded-md flex items-center gap-2">
              <FaCheckCircle /> Status of Voting
            </Link>
          </nav>
        </aside>
      )}

      {/* Topbar and Main Content */}
      <div className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-blue-900 hover:text-blue-700 text-2xl"
              title={isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
            >
              {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
            <div className="text-xl font-semibold text-blue-800">
              Welcome, {user ? `${user.firstname} ${user.lastname}` : '...'}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/profile" className="flex items-center gap-2 text-blue-700 hover:underline">
              <FaUserCircle className="text-2xl" />
              Profile
            </Link>
            <Link to="/logout" className="text-red-600 font-semibold hover:underline">
              Logout
            </Link>
          </div>
        </header>

        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
