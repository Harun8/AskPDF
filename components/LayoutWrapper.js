// components/LayoutWrapper.js
"use client";

import { usePathname } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/footer";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

// Define the locales and paths that should hide Nav or Footer
const locales = ["en", "da"];
const hideNavPaths = ["/login", "/signin", "/success"];
const hideFooterPaths = [
  "/login",
  "/signin",
  "/success",
  "/mychats",
  "/chat",
  "/preview",
  "/settings",
];

// Helper function to check if the pathname matches any hide path with a locale prefix
function matchesLocalizedPath(pathname, paths) {
  return paths.some((path) =>
    locales.some((locale) => pathname === `/${locale}${path}`)
  );
}

export default function LayoutWrapper({ children }) {
  const [session, setSession] = useState(null);
  const pathname = usePathname();

  const isNavVisible = !matchesLocalizedPath(pathname, hideNavPaths);
  const isFooterVisible = !matchesLocalizedPath(pathname, hideFooterPaths);

  useEffect(() => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${"theme"}=`);
    const themeIs = parts.pop().split(";").shift();
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
    <>
      {isNavVisible && <Nav session={session} />}
      {children}
      {isFooterVisible && <Footer />}
    </>
  );
}
