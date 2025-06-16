import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateVoting = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    candidates: [""],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCandidateChange = (idx, value) => {
    const updated = [...form.candidates];
    updated[idx] = value;
    setForm({ ...form, candidates: updated });
  };

  const addCandidate = () => {
    setForm({ ...form, candidates: [...form.candidates, ""] });
  };

  const removeCandidate = (idx) => {
    const updated = form.candidates.filter((_, i) => i !== idx);
    setForm({ ...form, candidates: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const validCandidates = form.candidates.map(c => c.trim()).filter(Boolean);
    if (validCandidates.length < 2) {
      setError("Please enter at least two candidate names.");
      setLoading(false);
      return;
    }
    if (form.endTime <= form.startTime) {
      setError("End time must be after start time.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/elections/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          startTime: form.startTime,
          endTime: form.endTime,
          candidates: validCandidates,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Election created successfully!");
        navigate("/vote-status");
      } else {
        setError(data.message || "Failed to create election.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  const getNowLocal = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-indigo-50">
      <form
        className="w-full max-w-2xl bg-white shadow-xl p-10 rounded-xl"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <h2 className="text-2xl font-bold mb-6 text-indigo-700 text-center">
          Create New Voting Event
        </h2>
        {error && (
          <div className="bg-red-200 text-red-800 p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="title" className="block font-semibold mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            autoFocus
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-semibold mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            rows={2}
          />
        </div>
        <div className="mb-4 flex flex-col gap-4 sm:flex-row">
          <div className="flex-1 min-w-0">
            <label htmlFor="startTime" className="block font-semibold mb-1">
              Start Time
            </label>
            <input
              id="startTime"
              type="datetime-local"
              name="startTime"
              value={form.startTime}
              onChange={handleChange}
              required
              min={getNowLocal()}
              className="w-full min-w-0 px-3 py-2 border rounded focus:outline-none focus:ring text-base"
              style={{ fontSize: "1.1rem", height: "48px" }}
              placeholder="YYYY-MM-DDThh:mm"
            />
          </div>
          <div className="flex-1 min-w-0">
            <label htmlFor="endTime" className="block font-semibold mb-1">
              End Time
            </label>
            <input
              id="endTime"
              type="datetime-local"
              name="endTime"
              value={form.endTime}
              onChange={handleChange}
              required
              min={form.startTime || getNowLocal()}
              className="w-full min-w-0 px-3 py-2 border rounded focus:outline-none focus:ring text-base"
              style={{ fontSize: "1.1rem", height: "48px" }}
              placeholder="YYYY-MM-DDThh:mm"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Candidates</label>
          {form.candidates.map((candidate, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                value={candidate}
                onChange={(e) => handleCandidateChange(idx, e.target.value)}
                required
                className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring"
                placeholder={`Candidate ${idx + 1}`}
              />
              {form.candidates.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeCandidate(idx)}
                  className="bg-red-500 text-white px-3 rounded"
                  title="Remove"
                  aria-label="Remove candidate"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addCandidate}
            className="mt-2 text-indigo-600 hover:underline text-sm"
          >
            + Add Candidate
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded font-bold hover:bg-indigo-700 transition"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Election"}
        </button>
      </form>
    </div>
  );
};

export default CreateVoting;