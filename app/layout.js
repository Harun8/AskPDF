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
// import { createServerComponentClient } from "@/lib/supabaseServer";

const inter = Inter({ subsets: ["latin"] });

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const hideLayout = ["/login", "/signin", "/success"];

export default function RootLayout({ children }) {
  const [session, setSession] = useState(null);
  const pathname = usePathname();
  const hideNavFooter = hideLayout.includes(pathname);
  useEffect(() => {
    // Fetch session on component mount
    setSession(supabase.auth.getSession());

    // Set up a session state listener for real-time updates
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  // const cookieStore = cookies();

  // const supabase = createServerComponentClient({ cookies: () => cookieStore });
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  return (
    <html className="" lang="en">
      <body className="flex flex-col min-h-screen w-full bg-zinc-100	 dark:bg-gray-800">
        <main className="flex-grow">
          {!hideNavFooter && <Nav session={session}></Nav>}
          {children}
          <Analytics></Analytics>
          {/* <SpeedInsights></SpeedInsights> */}

          {!hideNavFooter && <Footer></Footer>}
        </main>
      </body>
    </html>
  );
}
