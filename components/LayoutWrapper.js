// components/LayoutWrapper.js
"use client";

import { usePathname } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/footer";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

// Define the locales and paths that should hide Nav or Footer
const locales = ["en", "da"];
const hideNavPaths = [
  "/login",
  "/signin",
  "/success",
  "/chromeEx",
  "/chat",
  "/chat/*",
  "/preview",
];
const hideFooterPaths = [
  "/login",
  "/signin",
  "/success",
  "/mychats",
  "/chat",
  "/chat/*",
  "/preview",
  "/settings",
  "/chromeEx",
  "/pricing",
];

// Helper function to check if the pathname matches any hide path with a locale prefix
// Helper function to check if the pathname matches any hide path with a locale prefix
function matchesLocalizedPath(pathname, paths) {
  return paths.some((path) =>
    locales.some((locale) => {
      // Check if the path starts with /chat/ for dynamic routes
      const localizedPath = `/${locale}${path}`;
      if (localizedPath === `/${locale}/chat`) {
        return pathname.startsWith(localizedPath); // Match both /chat and /chat/:id
      }
      return pathname === localizedPath;
    })
  );
}

export default function LayoutWrapper({ children }) {
  const [session, setSession] = useState(null);
  const pathname = usePathname();

  const isNavVisible = !matchesLocalizedPath(pathname, hideNavPaths);
  const isFooterVisible = !matchesLocalizedPath(pathname, hideFooterPaths);

  // useEffect(() => {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${"theme"}=`);
  //   const themeIs = parts.pop().split(";").shift();
  // }, []);
  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!error) setSession(data.session);
    };
    fetchSession();
  }, []);

  useEffect(() => {
    // Set up a session state listener for real-time updates

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      subscription?.subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      {isNavVisible && <Nav session={session} />}
      {children}
      {isFooterVisible && <Footer />}
    </>
  );
}
