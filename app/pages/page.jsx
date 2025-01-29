"use client";
import React from "react";
import Navbar from "../components/navbar/Navbar";
import store from "../redux/store/store";
import { Provider } from "react-redux";

function MainLayout({ children }) {
  return (
    <Provider store={store}>
      <Navbar />
      <div>{children}</div>
    </Provider>
  );
}

export default MainLayout;
