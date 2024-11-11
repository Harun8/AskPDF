import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }

  // messages: (await import(`../messages/${locale}.json`)).default,

  return {
    locale,
    messages: (
      await (locale === "da"
        ? // When using Turbopack, this will enable HMR for `en`
          import("../messages/da.json")
        : import(`../messages/${locale}.json`))
    ).default,
  };
});
