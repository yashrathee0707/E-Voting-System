// src/layouts/DashboardLayout.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
  FaVoteYea,
  FaCalendarAlt,
  FaTrashAlt,
  FaCheckCircle,
  FaUserCircle,
  FaBars
} from 'react-icons/fa';

const DashboardLayout = () => {
  const user = {
    name: "Ajay Gupta",
    email: "info@eibcvoting.com",
    ibbi: "IBBI1234567",
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
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

      {/* Topbar and Content */}
      <div className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <div className="text-xl font-semibold text-blue-800">Welcome, {user.name}</div>
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

        {/* Main Content will render here */}
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
