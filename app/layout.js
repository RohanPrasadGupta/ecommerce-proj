import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "YOUR STORE",
  description: "Created by RPG",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
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
