import React from "react";
import EmptyData from "../emptyPageData/EmptyData";

export default function ConfirmOrderPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <EmptyData windowHeight="auto" text="No data found." />
    </div>
  );
}
