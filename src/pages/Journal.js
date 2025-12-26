import React, { useState, useEffect, useRef } from "react";
import CalmCard from "../components/CalmCard";
import PastelButton from "../components/PastelButton";
import Affirmation from "../components/Affirmation";
import { useNavigate } from "react-router-dom";
import {
  getAllJournals,
  createJournal,
  deleteJournal,
} from "../api/journalApi";

const PASSWORD_KEY = "zensoul_journal_password";

function getPassword() {
  return localStorage.getItem(PASSWORD_KEY);
}
function setPassword(pass) {
  localStorage.setItem(PASSWORD_KEY, pass);
}

function BackgroundDecor() {
  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
        alt=""
        className="fixed inset-0 w-full h-full object-cover opacity-10 pointer-events-none select-none z-0"
      />
      <div className="fixed inset-0 bg-gradient-to-b from-pink-100/20 via-white/10 to-blue-100/20 pointer-events-none z-0" />
    </>
  );
}

export default function Journal() {
  const [entries, setEntries] = useState([]);
  const [input, setInput] = useState("");

  // 🔹 NEW STATES (added safely)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [password, setPasswordState] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [locked, setLocked] = useState(!!getPassword());
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");

  const entriesContainerRef = useRef(null);
  const navigate = useNavigate();

  function handleSetPassword() {
    if (password.length < 3) {
      alert("Password must be at least 3 characters.");
      return;
    }
    setPassword(password);
    setLocked(false);
    setPasswordState("");
  }

  function handleUnlock() {
    if (enteredPassword === getPassword()) {
      setLocked(false);
      setEnteredPassword("");
    } else {
      alert("Incorrect password.");
    }
  }

  function addEntry(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const newEntry = {
      title: "Untitled",
      content: input,
      mood: "neutral",
    };

    createJournal(newEntry)
      .then((saved) => {
        setEntries((prev) => [...prev, saved]);
        setInput("");
        setTimeout(() => {
          if (entriesContainerRef.current) {
            entriesContainerRef.current.scrollTop =
              entriesContainerRef.current.scrollHeight;
          }
        }, 100);
        setSelectedId(saved._id);
      })
      .catch((err) => {
        console.error("Create error:", err);
        alert("Failed to save journal entry.");
      });
  }

  function clearEntries() {
    if (window.confirm("Delete all entries?")) {
      Promise.all(entries.map((entry) => deleteJournal(entry._id)))
        .then(() => {
          setEntries([]);
          setSelectedId(null);
        })
        .catch((err) => console.error("Clear error:", err));
    }
  }

  function handleDelete(id) {
    deleteJournal(id)
      .then(() => {
        const updated = entries.filter((entry) => entry._id !== id);
        setEntries(updated);
        if (selectedId === id) setSelectedId(null);
      })
      .catch((err) => console.error("Delete error:", err));
  }

  // 🔹 UPDATED FETCH (with loading + error)
  useEffect(() => {
    setLoading(true);
    getAllJournals()
      .then((data) => {
        setEntries(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to load journal entries.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        entriesContainerRef.current &&
        !entriesContainerRef.current.contains(event.target)
      ) {
        setSelectedId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredEntries = entries.filter(
    (entry) =>
      entry.content.toLowerCase().includes(search.toLowerCase()) ||
      entry.title.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------- PASSWORD SCREENS (UNCHANGED) ---------- */
  if (!getPassword()) {
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center z-10">
        <BackgroundDecor />
        <CalmCard>
          <h2 className="text-lg font-bold mb-3">
            Set a Password for Your Journal
          </h2>
          <input
            type="password"
            autoFocus
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPasswordState(e.target.value)}
            className="rounded p-2 mb-4 border w-full"
          />
          <PastelButton onClick={handleSetPassword}>
            Set Password
          </PastelButton>
        </CalmCard>
      </div>
    );
  }

  if (locked) {
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center z-10">
        <BackgroundDecor />
        <CalmCard>
          <h2 className="text-lg font-bold mb-3">
            Unlock Your Journal
          </h2>
          <input
            type="password"
            autoFocus
            placeholder="Enter your password"
            value={enteredPassword}
            onChange={(e) => setEnteredPassword(e.target.value)}
            className="rounded p-2 mb-4 border w-full"
          />
          <PastelButton onClick={handleUnlock}>Unlock</PastelButton>
        </CalmCard>
      </div>
    );
  }

  /* ---------- MAIN UI ---------- */
  return (
    <div className="relative min-h-screen flex flex-col items-center pt-8 z-10 w-full">
      <BackgroundDecor />
      <Affirmation />

      {/* 🔹 LOADING + ERROR UI */}
      {loading && (
        <p className="mb-4 text-gray-500">Loading your journals…</p>
      )}
      {error && (
        <p className="mb-4 text-red-500">{error}</p>
      )}

      {/* ---------- ADD ENTRY ---------- */}
      <form onSubmit={addEntry} className="w-full px-8 mb-8">
        <textarea
          placeholder="Write something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full rounded p-4 border min-h-[140px]"
        />
        <div className="flex justify-end mt-2">
          <PastelButton type="submit">Add</PastelButton>
        </div>
      </form>

      {/* ---------- ENTRIES ---------- */}
      <CalmCard className="w-full max-w-3xl">
        <h2 className="text-xl font-bold mb-4">
          Your Journal Entries
        </h2>

        <input
          type="text"
          placeholder="Search your entries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded border p-2 mb-4"
        />

        <div
          className="max-h-[350px] overflow-y-auto"
          ref={entriesContainerRef}
        >
          {filteredEntries.length === 0 && !loading && (
            <p className="text-gray-500">No entries found.</p>
          )}

          {filteredEntries.map((entry) => (
            <div
              key={entry._id}
              className={`p-3 rounded mb-2 border ${
                selectedId === entry._id
                  ? "ring-2 ring-pink-300"
                  : ""
              }`}
              onClick={() => setSelectedId(entry._id)}
            >
              <div className="text-xs text-gray-400">
                {new Date(entry.createdAt).toLocaleString()}
              </div>
              <div className="my-2">{entry.content}</div>

              {selectedId === entry._id && (
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      navigate(`/journal/edit/${entry._id}`)
                    }
                    className="bg-yellow-200 px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(entry._id)}
                    className="bg-red-200 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-4">
          <PastelButton
            onClick={() => {
              setLocked(true);
              setEnteredPassword("");
            }}
          >
            Lock
          </PastelButton>
        </div>
      </CalmCard>
    </div>
  );
}
