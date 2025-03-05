
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    
      <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <div className=" min-h-screen flex flex-col">
           


          
            <ToastContainer position="top-right" autoClose={3000} />
            <main className="flex-grow ">

        {children}
            </main>
         
          </div>
      </body>
    </html>
  );
}
