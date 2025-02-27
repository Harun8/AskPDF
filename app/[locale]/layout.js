// "use client";
import { Inter } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Inter as FontSans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Provider from "@/components/provider";
import LayoutWrapper from "@/components/LayoutWrapper";


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

export const metadata = {
  title: "AskPDFs",
  description: "Ask anything, AskPDFs",
  twitter: {
    card: "summary_large_image"
  }
}

async function RootLayout({ children, params: { locale } }) {
  // const [isMounted, setIsMounted] = useState(false);

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="flex flex-col min-h-screen w-full bg-zinc-100 dark:bg-gray-800">
        <Provider>
            

          <main className="flex-grow">
            <NextIntlClientProvider messages={messages}>
              <LayoutWrapper>{children}</LayoutWrapper>
              <Analytics />
            </NextIntlClientProvider>
          </main>
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}
export default RootLayout;
