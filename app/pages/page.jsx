"use client";
import React from "react";
import Navbar from "../components/navbar/Navbar";
import store from "../redux/store/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
function MainLayout(prop) {
  return (
    <Provider store={store}>
      <Navbar />
      <div>{prop.children}</div>

      <Toaster
        position="right-top"
        gutter={12}
        containerStyle={{ margin: "30px" }}
        toastOptions={{
          success: {
            duration: 5000,
          },
          error: { duration: 5000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </Provider>
  );
}

export default MainLayout;
