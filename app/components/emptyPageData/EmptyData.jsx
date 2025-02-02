import React from "react";

function EmptyData({ text, windowHeight }) {
  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: windowHeight ? windowHeight : "90vh",
        fontSize: "20px",
      }}
    >
      {text}
    </div>
  );
}

export default EmptyData;
