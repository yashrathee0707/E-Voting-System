import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaVoteYea,
  FaCalendarAlt,
  FaTrashAlt,
  FaCheckCircle,
  FaUserCircle,
  FaBars
} from 'react-icons/fa';

const Dashboard = () => {
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

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Topbar */}
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

        {/* Profile Summary */}
        <section className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-blue-700 mb-2">Your Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
            <div><strong>Name:</strong> {user.name}</div>
            <div><strong>Email:</strong> {user.email}</div>
            <div><strong>IBBI No:</strong> {user.ibbi}</div>
          </div>
        </section>

        {/* Action Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/create-voting"
            className="bg-blue-100 hover:bg-blue-200 p-6 rounded-lg shadow transition transform hover:-translate-y-1"
          >
            <FaVoteYea className="text-3xl text-blue-700 mb-2" />
            <h3 className="font-bold text-lg text-blue-800">New Voting Event</h3>
            <p className="text-sm text-gray-600 mt-1">Start a new voting event securely.</p>
          </Link>

          <Link
            to="/reschedule-voting"
            className="bg-blue-100 hover:bg-blue-200 p-6 rounded-lg shadow transition transform hover:-translate-y-1"
          >
            <FaCalendarAlt className="text-3xl text-blue-700 mb-2" />
            <h3 className="font-bold text-lg text-blue-800">Reschedule Voting</h3>
            <p className="text-sm text-gray-600 mt-1">Change voting event date/time.</p>
          </Link>

          <Link
            to="/cancel-voting"
            className="bg-blue-100 hover:bg-blue-200 p-6 rounded-lg shadow transition transform hover:-translate-y-1"
          >
            <FaTrashAlt className="text-3xl text-blue-700 mb-2" />
            <h3 className="font-bold text-lg text-blue-800">Cancel Voting</h3>
            <p className="text-sm text-gray-600 mt-1">Cancel an upcoming voting session.</p>
          </Link>

          <Link
            to="/vote-status"
            className="bg-blue-100 hover:bg-blue-200 p-6 rounded-lg shadow transition transform hover:-translate-y-1"
          >
            <FaCheckCircle className="text-3xl text-blue-700 mb-2" />
            <h3 className="font-bold text-lg text-blue-800">Voting Status</h3>
            <p className="text-sm text-gray-600 mt-1">Track voting progress and results.</p>
          </Link>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;