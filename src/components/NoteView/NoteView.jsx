// components/NoteView/NoteView.jsx
import React, { useState, useEffect } from "react";
import { useNotes } from "../../context/NotesContext";
import styles from "./NoteView.module.css";
import { FaArrowLeft } from "react-icons/fa";

const NoteView = ({ isMobile }) => {
  const { selectedGroup, getNotesForGroup, addNote, setSelectedGroup } =
    useNotes();
  const [currentNotes, setCurrentNotes] = useState([]);
  const [noteInput, setNoteInput] = useState("");

  useEffect(() => {
    if (selectedGroup) {
      const notes = getNotesForGroup(selectedGroup.id);
      setCurrentNotes(notes);
    }
  }, [selectedGroup, getNotesForGroup]);

  const getInitials = (name) => name.trim().slice(0, 2).toUpperCase();

  const handleSaveNote = () => {
    const trimmedInput = noteInput.trim();
    if (!trimmedInput || !selectedGroup) {
      return;
    }

    addNote(trimmedInput, selectedGroup.id);
    setNoteInput("");

    const notes = getNotesForGroup(selectedGroup.id);
    setCurrentNotes(notes);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSaveNote();
    }
  };

  const isSendActive = noteInput.trim().length > 0;
  const initials = selectedGroup ? getInitials(selectedGroup.name) : "";
  const groupColor = selectedGroup ? selectedGroup.color : "#000";

  return (
    <div className={styles.noteViewContainer}>
      {/* --- Header --- */}
      <div className={styles.header}>
        {isMobile && (
          <button
            className={styles.backButton}
            onClick={() => setSelectedGroup(null)}
            aria-label="Back to groupslist"
          >
            <FaArrowLeft />
          </button>
        )}
        <div
          className={styles.displayPicture}
          style={{ backgroundColor: groupColor }}
        >
          {initials}
        </div>
        <h2 className={styles.groupName}>{selectedGroup?.name}</h2>
      </div>

      {/* --- Notes Area --- */}
      <div className={styles.notesList}>
        {currentNotes.map((note) => (
          <div key={note.id} className={styles.noteItem}>
            <p className={styles.noteContent}>{note.content}</p>
            <div className={styles.noteMeta}>
              <span className={styles.time}>{note.time}</span>
              <span className={styles.separator}>•</span>
              <span className={styles.date}>{note.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* --- Input Area --- */}
      <div className={styles.inputBar}>
        <div className={styles.inputWrapper}>
          <textarea
            className={styles.input}
            placeholder={`Enter your note here...`}
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />

          <button
            className={`${styles.sendButton} ${
              isSendActive ? styles.active : ""
            }`}
            onClick={handleSaveNote}
            disabled={!isSendActive}
          >
            <svg
              className={styles.sendIcon}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteView;
