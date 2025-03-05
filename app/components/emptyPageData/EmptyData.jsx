import React from "react";
import DataSaverOffOutlinedIcon from "@mui/icons-material/DataSaverOffOutlined";

function EmptyData({ text, windowHeight, setFontSize }) {
  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: windowHeight ? windowHeight : "90vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "10px",
          justifyContent: "center",
          fontSize: setFontSize ? setFontSize : "20px",
          color: "#111827",
          fontWeight: "bold",
        }}
      >
        <DataSaverOffOutlinedIcon
          fontSize={setFontSize ? setFontSize : "20px"}
        />
        {text}
      </div>
    </div>
  );
}

export default EmptyData;
