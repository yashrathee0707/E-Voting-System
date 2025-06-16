import React, { useEffect, useState } from "react";

const VoteStatus = () => {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const res = await fetch("/api/elections", {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("accessToken"),
          },
        });
        if (!res.ok) throw new Error("Failed to fetch elections");
        const data = await res.json();
        setElections(data.elections || []); 
      } catch (err) {
        setElections([]);
      } finally {
        setLoading(false);
      }
    };
    fetchElections();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-blue-800 mb-6">Vote Status</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-blue-100 text-blue-900 text-left">
              <tr>
                <th className="p-3">Sr No</th>
                <th className="p-3">Title</th>
                <th className="p-3">Description</th>
                <th className="p-3">Start Date & Time</th>
                <th className="p-3">End Date & Time</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {elections.length === 0 ? (
                <tr>
                  <td className="p-3 text-center" colSpan={7}>No elections found.</td>
                </tr>
              ) : (
                elections.map((item, idx) => (
                  <tr key={item.id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="p-3">{idx + 1}</td>
                    <td className="p-3">{item.title}</td>
                    <td className="p-3">{item.description || "-"}</td>
                    <td className="p-3">{new Date(item.startTime).toLocaleString()}</td>
                    <td className="p-3">{new Date(item.endTime).toLocaleString()}</td>
                    <td className="p-3">
                      <span className={`font-semibold px-2 py-1 rounded ${item.status === "COMPLETED" ? "bg-green-100 text-green-600" : item.status === "CANCELLED" ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-600"}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3 flex gap-2">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VoteStatus;