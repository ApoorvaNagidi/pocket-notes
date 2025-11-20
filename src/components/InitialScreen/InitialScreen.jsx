// components/InitialScreen/InitialScreen.jsx
import React from "react";
import styles from "./InitialScreen.module.css";
import image from "../../assets/image1.png";
import lockImage from "../../assets/lock.png";

const InitialScreen = () => {
  return (
    <div className={styles.container}>
      <img
        src={image}
        alt="People writing notes"
        className={styles.illustration}
      />

      <h1 className={styles.header}>Pocket Notes</h1>

      <p className={styles.text}>
        Send and receive messages without keeping your phone online.
        <br />
        Use Pocket Notes on up to 4 linked devices and 1 mobile phone
      </p>

      <div className={styles.encryption}>
        <img src={lockImage} alt="Lock icon" className={styles.lockImage} />
        <span>end-to-end encrypted</span>
      </div>
    </div>
  );
};

export default InitialScreen;
