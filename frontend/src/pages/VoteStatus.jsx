import React, { useEffect, useState, useCallback } from "react";
import { Clock, CheckCircle, XCircle, Loader, Calendar, Info, AlertCircle } from "lucide-react";

const VoteStatus = () => {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchElections = useCallback(async () => {
    setLoading(true);
    setError("");

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setError("You are not logged in. Please log in to view election status.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/elections", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      if (!res.ok) {
        let errorData = {};
        try {
          errorData = await res.json();
        } catch (e) {
          throw new Error(`Server responded with status ${res.status}: ${res.statusText}`);
        }
        throw new Error(errorData.message || "Failed to fetch elections");
      }
      const data = await res.json();
      setElections(data.elections || []);
    } catch (err) {
      console.error("Error fetching elections:", err);
      setError(err.message || "Could not load elections.");
      setElections([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchElections();

    const interval = setInterval(fetchElections, 60000);

    return () => clearInterval(interval);
  }, [fetchElections]);

  const getElectionStatus = (startTime, endTime, currentStatus) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (currentStatus === "CANCELLED") {
      return { text: "Cancelled", color: "red", icon: XCircle };
    } else if (now < start) {
      return { text: "Scheduled", color: "blue", icon: Calendar };
    } else if (now >= start && now <= end) {
      return { text: "Active", color: "green", icon: Clock };
    } else {
      return { text: "Completed", color: "gray", icon: CheckCircle };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-3">Voting Event Status</h1>
          <p className="text-gray-600 text-lg">Keep track of all your elections: scheduled, active, and completed.</p>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-40">
            <Loader className="animate-spin text-indigo-600" size={36} />
            <p className="ml-3 text-lg text-gray-700">Loading elections...</p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-center justify-center animate-fadeIn">
            <AlertCircle className="text-red-500 mr-3" size={24} />
            <span className="text-red-700 font-medium text-center">{error}</span>
          </div>
        )}

        {!loading && !error && elections.length === 0 && (
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg mt-8 animate-fadeIn">
            <Info className="mx-auto text-blue-500 mb-4" size={48} />
            <p className="text-xl text-gray-700 font-semibold">No voting events found.</p>
            <p className="text-gray-500 mt-2">Start by creating a new election to see its status here!</p>
          </div>
        )}

        {!loading && !error && elections.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {elections.map((item) => {
              const { text: statusText, color: statusColor, icon: StatusIcon } = getElectionStatus(item.startTime, item.endTime, item.status);
              return (
                <div key={item.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
                  <div className={`p-5 border-b-4 border-${statusColor}-500`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-800 truncate pr-4">{item.title}</h3>
                      <div className={`flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-${statusColor}-100 text-${statusColor}-700`}>
                        <StatusIcon size={16} className="mr-1" />
                        {statusText}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description || "No description provided."}</p>

                    <div className="text-gray-500 text-sm space-y-1">
                      <p className="flex items-center">
                        <Calendar size={14} className="mr-2 text-gray-400" />
                        <span className="font-semibold">Start:</span> {new Date(item.startTime).toLocaleString()}
                      </p>
                      <p className="flex items-center">
                        <Clock size={14} className="mr-2 text-gray-400" />
                        <span className="font-semibold">End:</span> {new Date(item.endTime).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="p-5 bg-gray-50 flex justify-end">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 shadow">
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default VoteStatus;