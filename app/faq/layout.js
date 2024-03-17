import { Inter } from "next/font/google";
import "../globals.css";
import Nav from "@/components/Nav";
import { cookies } from "next/headers";
import { Inter as FontSans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function RootLayout({ children }) {
  const cookieStore = cookies();

  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html class="" lang="en">
      <body class="flex flex-col min-h-screen w-full bg-zinc-100	 dark:bg-gray-800">
        <Nav session={session}></Nav>
        <main class="flex-grow">
          {children}
          {/* <Analytics></Analytics>
          <SpeedInsights></SpeedInsights> */}
        </main>
        <Footer></Footer>
      </body>
    </html>
  );
}
