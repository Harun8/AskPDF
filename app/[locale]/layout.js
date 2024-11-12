// "use client";
import { Inter } from "next/font/google";
import "../globals.css";
import Nav from "@/components/Nav";
import { Toaster } from "@/components/ui/sonner";
import { Inter as FontSans } from "next/font/google";
// import React, { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { supabase } from "@/lib/supabase";
import Footer from "@/components/footer";
// import { usePathname } from "next/navigation";
import Provider from "@/components/provider";
import { headers } from "next/headers";

// import { appWithTranslation } from "next-i18next";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

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
async function RootLayout({ children, params: { locale } }) {
  const headersList = headers();
  const currentPathname = headersList.get("x-pathname") || "";
  console.log("headers", currentPathname, headersList);
  // const [session, setSession] = useState(null);

  const isNavVisible = !hideNav.includes(currentPathname);
  const isFooterVisible = !hideFooter.includes(currentPathname);
  // const [isMounted, setIsMounted] = useState(false);

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  // useEffect(() => {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${"theme"}=`);
  //   const themeIs = parts.pop().split(";").shift();
  // }, []);
  // useEffect(() => {
  //   // Fetch session on component mount
  //   setSession(supabase.auth.getSession());

  //   // Set up a session state listener for real-time updates
  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   });
  // }, []);

  return (
    <html className="" lang={locale}>
      <body className="flex flex-col min-h-screen w-full bg-zinc-100 dark:bg-gray-800">
        <Provider>
          <main className="flex-grow">
            <NextIntlClientProvider messages={messages}>
              {!isNavVisible && <Nav /*session={session}*/></Nav>}
              {children}

              <Analytics></Analytics>
              {!isFooterVisible && <Footer></Footer>}
            </NextIntlClientProvider>
          </main>
        </Provider>
        <Toaster></Toaster>
      </body>
    </html>
  );
}
export default RootLayout;
