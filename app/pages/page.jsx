"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Provider } from "react-redux";
import store from "../redux/store/store";
import Navbar from "../components/navbar/Navbar";

export default function Layout({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Navbar />
        {children}
      </Provider>
    </QueryClientProvider>
  );
}
