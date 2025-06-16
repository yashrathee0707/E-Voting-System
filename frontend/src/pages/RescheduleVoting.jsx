import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RescheduleVoting = () => {
  const [elections, setElections] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
        alert("Election rescheduled successfully!");
        navigate("/vote-status");
      } else {
        setError(data.message || "Failed to reschedule.");
      }
    } catch {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-indigo-50">
      <form
        className="w-full max-w-lg bg-white shadow-xl p-8 rounded-xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-indigo-700">Reschedule Voting Event</h2>
        {error && <div className="bg-red-200 text-red-800 p-2 rounded mb-4">{error}</div>}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Select Election</label>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          >
            <option value="" disabled>
              -- Select an election --
            </option>
            {elections.map((el) => (
              <option key={el.id} value={el.id}>
                {el.title} ({new Date(el.startTime).toLocaleString()} - {new Date(el.endTime).toLocaleString()})
              </option>
            ))}
          </select>
        </div>
        {selectedId && (
          <>
            <div className="mb-4 flex gap-4">
              <div className="flex-1">
                <label className="block font-semibold mb-1">New Start Time</label>
                <input
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
                />
              </div>
              <div className="flex-1">
                <label className="block font-semibold mb-1">New End Time</label>
                <input
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded font-bold hover:bg-indigo-700 transition"
              disabled={loading}
            >
              {loading ? "Updating..." : "Reschedule Election"}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default RescheduleVoting;