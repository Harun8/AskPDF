"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
// import { cookies } from "next/headers";
import { Inter as FontSans } from "next/font/google";
import React, { useEffect, useState } from "react";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { supabase } from "@/lib/supabase";
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Footer from "@/components/footer";
import { usePathname } from "next/navigation";
import Provider from "@/components/provider";
// import { createServerComponentClient } from "@/lib/supabaseServer";

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

export default function RootLayout({ children }) {
  const [session, setSession] = useState(null);
  const pathname = usePathname();
  const isNavVisible = hideNav.includes(pathname);
  const isFooterVisible = hideFooter.includes(pathname);

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
        {/* <Provider> */}
        <main className="flex-grow">
          {!isNavVisible && <Nav session={session}></Nav>}
          {children}
          <Analytics></Analytics>
          {/* <SpeedInsights></SpeedInsights> */}

          {!isFooterVisible && <Footer></Footer>}
        </main>
        {/* </Provider> */}
      </body>
    </html>
  );
}
