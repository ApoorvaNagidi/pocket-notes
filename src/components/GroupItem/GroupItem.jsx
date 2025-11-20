// components/GroupItem/GroupItem.jsx
import React from "react";
import { useNotes } from "../../context/NotesContext";
import styles from "./GroupItem.module.css";

const getInitials = (name) => {
  const trimmedName = name.trim();
  const words = trimmedName.split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  } else if (words.length === 1) {
    return words[0][0].toUpperCase();
  }
  return "";
};

const GroupItem = ({ group }) => {
  const { selectedGroup, setSelectedGroup } = useNotes();

  const initials = getInitials(group.name);

  const itemColor = group.color;

  const isSelected = selectedGroup && selectedGroup.id === group.id;

  const handleClick = () => {
    setSelectedGroup(group);
  };

  return (
    <div
      className={`${styles.groupItem} ${isSelected ? styles.selected : ""}`}
      onClick={handleClick}
    >
      <div
        className={styles.displayPicture}
        style={{ backgroundColor: itemColor }}
      >
        {initials}
      </div>
      <div className={styles.groupName}>{group.name}</div>
    </div>
  );
};

export default GroupItem;
