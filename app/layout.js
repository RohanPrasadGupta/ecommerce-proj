"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import QueryProvider from "./components/QueryProvider";
import store from "./redux/store/store";
import { Provider } from "react-redux";
import Navbar from "./components/navbar/Navbar";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "YOUR STORE",
//   description: "Created by RPG",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{ paddingTop: "60px" }}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <QueryProvider>
            <Navbar />
            {children}
          </QueryProvider>
        </Provider>
        <Toaster
          position="right-top"
          gutter={12}
          containerStyle={{ margin: "30px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: { duration: 3000 },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </body>
    </html>
  );
}
