import React from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import styles from "./backButtonStyle.module.scss";

const BackButton = () => {
  return (
    <div className={styles.backButtonContainer}>
      <button
        onClick={() => window.history.back()}
        className={styles.backButton}
      >
        <KeyboardBackspaceIcon />
        <p>Back</p>
      </button>
    </div>
  );
};

export default BackButton;
