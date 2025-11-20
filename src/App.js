// App.jsx
import React from "react";
import { useState, useEffect } from "react";
import { NotesProvider, useNotes } from "./context/NotesContext";
import GroupList from "./components/GroupList/GroupList";
import NoteView from "./components/NoteView/NoteView";
import InitialScreen from "./components/InitialScreen/InitialScreen";
import styles from "./App.module.css";

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};

// --- Layout component that uses Context ---
const Layout = () => {
  const { selectedGroup } = useNotes();
  const isMobile = useIsMobile();

  const renderLeftPanel = !isMobile || !selectedGroup;
  const renderRightPanel = !isMobile || selectedGroup;

  return (
    <div className={styles.appContainer}>
      {renderLeftPanel && (
        <div className={styles.leftPanel}>
          <GroupList isMobile={isMobile} />
        </div>
      )}
      {renderRightPanel && (
        <div className={styles.rightPanel}>
          {selectedGroup ? <NoteView isMobile={isMobile} /> : <InitialScreen />}
        </div>
      )}
    </div>
  );
};

// --- Export the provider wrapped App ---
const App = () => (
  <NotesProvider>
    <Layout />
  </NotesProvider>
);

export default App;
