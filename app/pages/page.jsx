"use client";
import React, { useEffect, useState } from "react";
import store from "../redux/store/store";
import { Provider } from "react-redux";
import Navbar from "../components/navbar/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function MainLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient());
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <div>
          <Navbar user={user} setUser={setUser} />
          {children}
        </div>
      </Provider>
    </QueryClientProvider>
  );
}

export default MainLayout;
