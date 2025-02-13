"use client";
import React, { useEffect, useState } from "react";
import store from "../redux/store/store";
import { Provider } from "react-redux";
import Navbar from "../components/navbar/Navbar";

function MainLayout({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Provider store={store}>
      <div>
        <Navbar user={user} setUser={setUser} />
        {children}
      </div>
    </Provider>
  );
}

export default MainLayout;
