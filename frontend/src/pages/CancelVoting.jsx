import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CancelVoting = () => {
  const [elections, setElections] = useState([]);
  const [selectedId, setSelectedId] = useState("");
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

  const handleCancel = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/elections/cancel/${selectedId}`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      const data = await res.json();
      if (res.ok) {
        alert("Election cancelled successfully!");
        navigate("/vote-status");
      } else {
        setError(data.message || "Failed to cancel election.");
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
        onSubmit={handleCancel}
      >
        <h2 className="text-2xl font-bold mb-6 text-indigo-700">Cancel Voting Event</h2>
        {error && <div className="bg-red-200 text-red-800 p-2 rounded mb-4">{error}</div>}
        <div className="mb-6">
          <label className="block font-semibold mb-1">Select Election to Cancel</label>
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
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded font-bold hover:bg-red-700 transition"
          disabled={loading || !selectedId}
        >
          {loading ? "Cancelling..." : "Cancel Election"}
        </button>
      </form>
    </div>
  );
};

export default CancelVoting;