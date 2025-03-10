import React from "react";
import styles from "./Button.module.scss";
import { CircularProgress } from "@mui/material";

export default function GlobalButton({
  isLoading = false,
  text = "Submit",
  hoverEffect = false,
  onClick,
  icon,
  RightSideicon,
  iconButton,
  type,
  name = "",
  theme = "default",
  height = "56px",
  fontSize = "1rem",
  width = "100%",
  fontWeight = "normal",
  ref,
  isDisabled = false,
}) {
  const themeClass =
    theme === "outline"
      ? styles.cancelButton
      : hoverEffect
      ? styles.Hoverbutton
      : styles.button;
  return (
    <button
      type={type}
      ref={ref || null}
      className={`
    ${themeClass}
     ${isLoading && styles.buttonDisabled}`}
      disabled={isDisabled}
      onClick={isLoading || isDisabled ? (e) => e.stopPropagation() : onClick}
      style={{
        height: height,
        width: width,
        fontSize: fontSize,
        fontWeight: fontWeight,
        cursor: isLoading || isDisabled ? "not-allowed" : "pointer",
        opacity: isLoading || isDisabled ? 0.5 : 1,
      }}
      name={name}
    >
      {isLoading && <CircularProgress size={"20px"} color="inherit" />}{" "}
      {icon && icon} {!iconButton && text}
      {RightSideicon && RightSideicon}
    </button>
  );
}
