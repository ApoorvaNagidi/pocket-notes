// components/GroupList/GroupList.jsx
import React, { useState } from "react";
import { useNotes } from "../../context/NotesContext";
import GroupItem from "../GroupItem/GroupItem";
import CreateGroupPopup from "../CreateGroupPopup/CreateGroupPopup";
import styles from "./GroupList.module.css";

const GroupList = () => {
  const { groups } = useNotes();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className={styles.groupListContainer}>
      {/* --- Header Section --- */}
      <h1 className={styles.header}>Pocket Notes</h1>

      {/* --- Group Items --- */}
      <div className={styles.groupScroller}>
        {groups.map((group) => (
          <GroupItem key={group.id} group={group} />
        ))}
      </div>

      {/* --- Add Button Section --- */}
      <button
        className={styles.addButton}
        onClick={() => setIsPopupOpen(true)}
        aria-label="Create new notes group"
      >
        <span className={styles.plusIcon}>+</span>
      </button>

      {/* --- Group Creation Modal --- */}
      {isPopupOpen && (
        <CreateGroupPopup onClose={() => setIsPopupOpen(false)} />
      )}
    </div>
  );
};

export default GroupList;
