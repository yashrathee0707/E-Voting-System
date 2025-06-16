import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaVoteYea,
  FaCalendarAlt,
  FaTrashAlt,
  FaCheckCircle
} from 'react-icons/fa';

const Dashboard = () => {
  const user = {
    name: "Ajay Gupta",
    email: "info@eibcvoting.com",
    ibbi: "IBBI1234567",
  };

  return (
    <>
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
    </>
  );
};

export default Dashboard;
