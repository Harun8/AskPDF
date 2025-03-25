"use server";
// i dont think this component is being used can be delete when seen
import { cookies } from "next/headers";
// import { Locale, defaultLocale } from "@/i18n/config";

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = "NEXT_LOCALE";

export async function getUserLocale() {
  return cookies().get(COOKIE_NAME)?.value || "en";
}

export async function setUserLocale(locale) {
  cookies().set(COOKIE_NAME, locale);
}
