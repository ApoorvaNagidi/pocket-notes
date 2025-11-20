// components/CreateGroupPopup/CreateGroupPopup.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNotes } from "../../context/NotesContext";
import styles from "./CreateGroupPopup.module.css";

const colorOptions = [
  "#B38BFA",
  "#FF79F2",
  "#43E6FC",
  "#F19576",
  "#0047FF",
  "#6691FF",
];

// Utility function to get the first two letters for the display picture
const getInitials = (name) => {
  const trimmedName = name.trim();
  const words = trimmedName.split(/\s+/).filter(Boolean); // Split by whitespace and filter empty strings

  if (words.length >= 2) {
    // Two or more words: first letter of the first two words
    return (words[0][0] + words[1][0]).toUpperCase();
  } else if (words.length === 1) {
    // One word: only the first letter
    return words[0][0].toUpperCase();
  }

  return "";
};

const CreateGroupPopup = ({ onClose }) => {
  const { addGroup } = useNotes();
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [error, setError] = useState("");

  // Ref to the modal content area
  const modalRef = useRef(null);

  // --- Logic to close popup when clicking outside ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the click is outside the modal content, call onClose
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const trimmedName = groupName.trim();
    if (!trimmedName) {
      setError("Group name cannot be empty.");
      return;
    }
    if (trimmedName.length > 2) {
      setError("Group name must be at most 2 characters.");
      return;
    }

    const newGroup = {
      id: Date.now(),
      name: trimmedName,
      initials: getInitials(trimmedName),
      color: selectedColor,
    };

    const success = addGroup(newGroup);

    if (success) {
      onClose();
    } else {
      setError(`Group "${trimmedName}" already exists.`);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} ref={modalRef}>
        <h2 className={styles.modalHeader}>Create New Group</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="groupName" className={styles.label}>
              Group Name
            </label>
            <input
              id="groupName"
              type="text"
              className={styles.input}
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>

          {/* Color Picker */}
          <div className={styles.colorGroup}>
            <label className={styles.label}>Choose colour</label>
            <div className={styles.colorOptions}>
              {colorOptions.map((color) => (
                <div
                  key={color}
                  className={`${styles.colorCircle} ${
                    selectedColor === color ? styles.selected : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                ></div>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && <p className={styles.error}>{error}</p>}

          {/* Create Button */}
          <button type="submit" className={styles.createButton}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupPopup;
