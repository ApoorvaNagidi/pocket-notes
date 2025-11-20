// context/NotesContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";

const NotesContext = createContext();

const loadFromStorage = (key, defaultValue) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return defaultValue;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Could not load state from storage:", e);
    return defaultValue;
  }
};

const saveToStorage = (key, state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (e) {
    console.error("Could not save state to storage:", e);
  }
};

export const NotesProvider = ({ children }) => {
  const [groups, setGroups] = useState(() =>
    loadFromStorage("pocketNotesGroups", [])
  );
  const [allNotes, setAllNotes] = useState(() =>
    loadFromStorage("pocketNotesAllNotes", [])
  );
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    saveToStorage("pocketNotesGroups", groups);
  }, [groups]);

  useEffect(() => {
    saveToStorage("pocketNotesAllNotes", allNotes);
  }, [allNotes]);

  const addGroup = (newGroup) => {
    const isDuplicate = groups.some(
      (group) => group.name.toLowerCase() === newGroup.name.toLowerCase()
    );
    if (isDuplicate) {
      return false;
    }
    setGroups((prev) => [...prev, newGroup]);
    return true;
  };

  // --- Note Functions ---
  const addNote = (noteContent, groupId) => {
    const now = new Date();
    const newNote = {
      id: Date.now() + Math.random(),
      groupId,
      content: noteContent,
      date: now.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      time: now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      lastUpdated: now.toISOString(),
    };
    setAllNotes((prev) => [...prev, newNote]);
  };

  const getNotesForGroup = (groupId) => {
    return allNotes
      .filter((note) => note.groupId === groupId)
      .sort((a, b) => b.id - a.id);
  };

  return (
    <NotesContext.Provider
      value={{
        groups,
        addGroup,
        selectedGroup,
        setSelectedGroup,
        addNote,
        getNotesForGroup,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
