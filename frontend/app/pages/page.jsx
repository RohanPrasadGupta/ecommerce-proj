import React from "react";
import Navbar from "../components/navbar/Navbar";

function MainLayout(prop) {
  return (
    <>
      <Navbar />
      <div>{prop.children}</div>
    </>
  );
}

export default MainLayout;
