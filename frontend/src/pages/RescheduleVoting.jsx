import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, AlertCircle, CheckCircle } from "lucide-react";

const RescheduleVoting = () => {
  const [elections, setElections] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const res = await fetch("/api/elections", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        });
        const data = await res.json();
        if (res.ok) setElections(data.elections || []);
        else setElections([]);
      } catch {
        setElections([]);
      }
    };
    fetchElections();
  }, []);

  useEffect(() => {
    if (selectedId) {
      const sel = elections.find((e) => e.id === selectedId);
      if (sel) {
        setStartTime(sel.startTime.slice(0, 16)); 
        setEndTime(sel.endTime.slice(0, 16));
      }
    } else {
      setStartTime("");
      setEndTime("");
    }
  }, [selectedId, elections]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (new Date(endTime) <= new Date(startTime)) {
      setError("End time must be after start time.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/elections/reschedule/${selectedId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({ startTime, endTime }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Election rescheduled successfully!");
        setTimeout(() => navigate("/vote-status"), 2000);
      } else {
        setError(data.message || "Failed to reschedule.");
      }
    } catch {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <form
        className="w-full max-w-lg bg-white shadow-xl p-8 rounded-2xl animate-fadeIn"
        onSubmit={handleSubmit}
      >
        <div className="text-center mb-8">
          <Calendar className="mx-auto text-indigo-600 mb-3" size={40} />
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Reschedule Voting Event</h2>
          <p className="text-gray-600">Adjust the start and end times for an election</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-center">
            <AlertCircle className="text-red-500 mr-2" size={20} />
            <span className="text-red-700 font-medium">{error}</span>
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg flex items-center">
            <CheckCircle className="text-green-500 mr-2" size={20} />
            <span className="text-green-700 font-medium">{success}</span>
          </div>
        )}

        <div className="mb-6">
          <label htmlFor="election-select" className="block text-sm font-semibold text-gray-700 mb-2">
            Select Election
          </label>
          <div className="relative">
            <select
              id="election-select"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors duration-200 text-lg appearance-none bg-white pr-10"
            >
              <option value="" disabled>
                -- Select an election --
              </option>
              {elections.length > 0 ? (
                elections.map((el) => (
                  <option key={el.id} value={el.id}>
                    {el.title} (
                    {new Date(el.startTime).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    -{" "}
                    {new Date(el.endTime).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    )
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No elections available
                </option>
              )}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z" />
              </svg>
            </div>
          </div>
        </div>

        {selectedId && (
          <>
            <div className="mb-6 grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="start-time" className="block text-sm font-semibold text-gray-700 mb-2">
                  <Clock className="inline mr-1" size={16} />
                  New Start Time
                </label>
                <input
                  id="start-time"
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors duration-200 text-lg"
                />
              </div>
              <div>
                <label htmlFor="end-time" className="block text-sm font-semibold text-gray-700 mb-2">
                  <Clock className="inline mr-1" size={16} />
                  New End Time
                </label>
                <input
                  id="end-time"
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors duration-200 text-lg"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Updating...
                </>
              ) : (
                <>
                  <CheckCircle size={20} />
                  Reschedule Election
                </>
              )}
            </button>
          </>
        )}
      </form>
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

export default RescheduleVoting;