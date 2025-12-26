// src/api/journalApi.js

const API_BASE = "/api/journals";

// Get all journals
export async function getAllJournals() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error("Failed to fetch journals");
  return res.json();
}

// Create a new journal entry
export async function createJournal(data) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create journal");
  return res.json();
}

// Update a journal entry
export async function updateJournal(id, data) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update journal");
  return res.json();
}

// Delete a journal entry
export async function deleteJournal(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete journal");
}

// Get journal by ID
export async function getJournalById(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch journal");
  return res.json();
}
