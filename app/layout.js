import { ReactNode } from "react";
import "./globals.css";
import Script from "next/script";
import { Description } from "@radix-ui/react-dialog";
// import { NextIntlProvider } from "next-intl";
// import daFaqMessages from "@/messages/da.json"; 

export const metadata = {
  title: "Data from visitors",
  description: ""
};

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }) {
  return (
     <html lang="da">
     <head /> 
     <body>
      <Script 
      src="https://www.googletagmanager.com/gtag/js?id=G-F0SH1ED3EG"
      // makes sure GA loads after the page is interactive
      strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {` window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F0SH1ED3EG');`}
      </Script>
          {/* <NextIntlProvider locale="da" messages={daFaqMessages}> */}

      {children}
      {/* </NextIntlProvider> */}
     </body>
     </html>
  )
}
