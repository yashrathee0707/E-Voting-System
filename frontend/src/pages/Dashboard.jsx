import React, { useState } from "react";

export default function Dashboard() {
  // Dummy user data
  const [user] = useState({ name: "Akshat" });

  // Dummy upcoming elections data
  const [elections] = useState([
    {
      id: 1,
      title: "City Council Election 2025",
      endDate: "2025-07-15T23:59:59",
    },
    {
      id: 2,
      title: "School Board Election 2025",
      endDate: "2025-08-01T23:59:59",
    },
  ]);

  // Dummy voting history
  const [votingHistory] = useState([
    {
      electionId: 101,
      electionTitle: "Mayor Election 2024",
      votedAt: "2024-12-12T12:00:00",
    },
    {
      electionId: 102,
      electionTitle: "Library Referendum 2024",
      votedAt: "2024-11-20T15:30:00",
    },
  ]);

  // Helper to format date nicely
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Welcome, {user.name}!</h1>

      {/* Upcoming Elections */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Elections</h2>
        {elections.length === 0 ? (
          <p className="text-gray-600">No active or upcoming elections at the moment.</p>
        ) : (
          <ul className="space-y-4">
            {elections.map(({ id, title, endDate }) => (
              <li
                key={id}
                className="border p-4 rounded-md flex justify-between items-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="text-gray-500 text-sm">Ends on: {formatDate(endDate)}</p>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                  Vote Now
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Voting History */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Your Voting History</h2>
        {votingHistory.length === 0 ? (
          <p className="text-gray-600">You have not voted in any elections yet.</p>
        ) : (
          <ul className="space-y-4">
            {votingHistory.map(({ electionId, electionTitle, votedAt }) => (
              <li
                key={electionId}
                className="border p-4 rounded-md shadow-sm hover:shadow-md transition-shadow"
              >
                <p>
                  <strong>{electionTitle}</strong> — voted on {formatDate(votedAt)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
