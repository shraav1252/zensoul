// Get all journals
export async function getAllJournals() {
  const res = await fetch("/api/journal");
  if (!res.ok) throw new Error("Failed to fetch journals");
  return res.json();
}

// Create a new journal entry
export async function createJournal(data) {
  const res = await fetch("/api/journal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create journal");
  return res.json();
}

// Update a journal entry
export async function updateJournal(id, data) {
  const res = await fetch(`/api/journal/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update journal");
  return res.json();
}

// Delete a journal entry
export async function deleteJournal(id) {
  const res = await fetch(`/api/journal/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete journal");
}

// Get journal by ID
export async function getJournalById(id) {
  const res = await fetch(`/api/journal/${id}`);
  if (!res.ok) throw new Error("Failed to fetch journal");
  return res.json();
}
