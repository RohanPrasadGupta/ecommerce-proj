import React from "react";
import EmptyData from "../emptyPageData/EmptyData";

export default function ConfirmOrderPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <EmptyData windowHeight="50vh" text="No data found." />
    </div>
  );
}
