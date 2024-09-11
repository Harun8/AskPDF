"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import { Toaster } from "@/components/ui/sonner";
import { Inter as FontSans } from "next/font/google";
import React, { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { supabase } from "@/lib/supabase";
import Footer from "@/components/footer";
import { usePathname } from "next/navigation";
import Provider from "@/components/provider";
import { appWithTranslation } from "next-i18next";

const inter = Inter({ subsets: ["latin"] });

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const hideNav = ["/login", "/signin", "/success"];
const hideFooter = [
  "/login",
  "/signin",
  "/success",
  "/mychats",
  "/chat",
  "/preview",
  "/settings",
];
function RootLayout({ children }) {
  const [session, setSession] = useState(null);
  const pathname = usePathname();
  const isNavVisible = hideNav.includes(pathname);
  const isFooterVisible = hideFooter.includes(pathname);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${"theme"}=`);
    const themeIs = parts.pop().split(";").shift();

    console.log("parts", themeIs);
  }, []);
  useEffect(() => {
    // Fetch session on component mount
    setSession(supabase.auth.getSession());

    // Set up a session state listener for real-time updates
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <html className="" lang="en">
      <body className="flex flex-col min-h-screen w-full bg-zinc-100	 dark:bg-gray-800">
        <Provider>
          <main className="flex-grow">
            {!isNavVisible && <Nav session={session}></Nav>}
            {children}
            <Analytics></Analytics>
            {!isFooterVisible && <Footer></Footer>}
          </main>
        </Provider>
        <Toaster></Toaster>
      </body>
    </html>
  );
}
export default appWithTranslation(RootLayout);
