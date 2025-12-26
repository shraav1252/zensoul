import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const baseUrl = process.env.REACT_APP_API_URL;

export default function JournalEntryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [entry, setEntry] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${baseUrl}/journals/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEntry(data);
        setTitle(data.title);
        setContent(data.content);
        setMood(data.mood || "");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch entry:", err);
        setLoading(false);
      });
  }, [id]);

  function handleSave(e) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("Title and content cannot be empty.");
      return;
    }

    fetch(`${baseUrl}/journals/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, mood }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update");
        return res.json();
      })
      .then(() => {
        navigate("/journal");
      })
      .catch((err) => {
        console.error("Update failed:", err);
        alert("Something went wrong while updating.");
      });
  }

  if (loading) {
    return <div className="p-8 text-gray-700 dark:text-gray-200">Loading...</div>;
  }

  if (!entry) {
    return (
      <div className="p-8">
        <h2 className="font-bold text-xl mb-2 text-gray-800 dark:text-gray-100">Entry Not Found</h2>
        <button onClick={() => navigate("/journal")} className="text-blue-500 underline">
          Back to Journal
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded shadow">
      <h2 className="font-bold text-xl mb-4 text-gray-800 dark:text-gray-100">Edit Entry</h2>
      <form onSubmit={handleSave}>
        <input
          type="text"
          placeholder="Title"
          className="w-full rounded border p-2 mb-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full rounded border p-2 mb-4 min-h-[140px] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          placeholder="Content"
        />
        <input
          type="text"
          placeholder="Mood (optional)"
          className="w-full rounded border p-2 mb-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        />
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-green-200 hover:bg-green-300 px-4 py-2 rounded text-green-900"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => navigate("/journal")}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-gray-800"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
