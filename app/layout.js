"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import QueryProvider from "./components/QueryProvider";
import store from "./redux/store/store";
import { Provider } from "react-redux";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <body
        style={{
          paddingTop: "60px",
          margin: 0,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <QueryProvider>
            <Navbar />
            <div style={{ flex: "1 0 auto" }}>{children}</div>
            <Footer />
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
