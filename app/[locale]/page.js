"use client";

import { Link } from "@/i18n/routing";

import { supabase } from "@/lib/supabase";
import React, { useEffect, useState } from "react";

import "../../public/styles/landingPage.css";
import { TypeAnimation } from "react-type-animation";

import { useTranslations } from "next-intl";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { MarqueeDemo } from "@/components/MarqueeDemo";
export default function Home() {
  const [video, setVideo] = useState()
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.getSession());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    const { data } = supabase
  .storage
  .from('PromoVID')
  .getPublicUrl('VID/FullPromoEN.mp4');
  setVideo(data.publicUrl);

  }, []);
  const t = useTranslations("HomePage");

  

  return (
    <>
      <title>AskPDFs</title>
      {/* <h1>{t("title")}</h1> */}

      <div className="flex flex-col items-center mt-24 text-center min-h-screen">
        <h1 className=" text-4xl md:text-7xl font-bold font-sans mb-4 font-extrabold	 text-gray-800 ">
          {t("titleFirst")} <br></br>
          <span> {t("titleSecond")}</span>
        </h1>
        <p className="text-gray-500 mb-8 hover:text-orange-700">{t("underTitle")}</p>

        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <Link
            href="/pricing"
            className="bg-gray-800 text-white font-bold py-3 px-10 rounded-lg hover:bg-gray-800">
            {t("tryAskPDF")}
          </Link>
          <Link
            href="/preview"
            className="border border-gray-500 text-gray-950 font-bold py-3 px-10  rounded-lg hover:bg-gray-100">
            {t("tryDemo")}
          </Link>
        </div>
        {/* <MarqueeDemo></MarqueeDemo> */}
        <div className="mt-12 w-full max-w-screen-lg mx-auto h-auto">
  <NeonGradientCard
    neonColors={{
      firstColor: "#272234 ",
      secondColor: "#2e6f7c",
    }}
    className="w-full h-auto "
  >
      {/* <TypeAnimation
              sequence={["Ask anything", 1000, "Ask PDF", 1000]}
              wrapper="span"
              className=" text-gray-800 font-bold font-sans mb-4 font-extrabold	"
              speed={25}
              style={{ fontSize: "2em", display: "inline-block" }}
              repeat={0}
            /> */}
  
    <video
      key={video} // Ensures the video component reloads when the source changes

      autoPlay={true}
      muted={true}
      controls
      className="w-full h-auto rounded-md"
    >
      <source src={video} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </NeonGradientCard>
</div>
      </div>

      {/* <div className="flex flex-col md:grid grid-cols-2 mt-18 md:mt-28 mx-10   ">
        <div className="md:ml-12">
          <p className=" dark:text-slate-300 font-serif font-bold  text-3xl md:text-7xl leading-tight">
            <span data-testid="cypress-title" className="">
              Learn quicker <br /> with,
            </span>
            <span className="text-blue-600"> AskPDF</span>
          </p>
          <p className="font-base font-medium text-medium md:text-xl mt-6 leading-relaxed	 ">
            Optimize your PDF experience with{" "}
            <span className="text-blue-600"> AskPDF</span>: the smart solution
            that transforms your documents into responsive knowledge bases. Just
            upload, ask, and instantly get the answers you need. <br />
            Streamline your study or work sessions with{" "}
            <span className="text-blue-600"> AskPDF</span> where PDF's come to
            talk!
          </p>

          <div className="mt-16 flex items-start">
            <Link
              className=" inline-flex items-center justify-center whitespace-nowrap rounded-md
               text-sm font-medium ring-offset-white transition-colors
                focus-visible:outline-none focus-visible:ring-2 
                focus-visible:ring-slate-950 focus-visible:ring-offset-2 
                disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950
                 dark:focus-visible:ring-slate-300 bg-blue-700 text-white 
                 	 hover:bg-blue-900  h-11 rounded-none p-7"
              href="pricing">
              Try AskPDF for free
            </Link>

            <Link
              prefetch={true}
              className="   hover:text-red-500 dark:text-slate-300 dark:hover:text-red-500 hover:font-bold ml-6 my-auto font-semibold text-lg "
              href={session ? "/chat" : "/preview"}>
              <div className=" flex items-center">
                {session ? "Start chatting now" : "Try the demo"}
              </div>
            </Link>
          </div>
          <div className=" flex justify-end">
            <Image
              className=" md:w-1/3 md:h-1/3"
              src={SaveTime}
              width={350}
              height={350}
              alt="landing page main image"></Image>
          </div>
        </div>
        <div className="  ">
          <Image
            className="hidden md:flex md:justify-center"
            src={TypingLight}
            width={800}
            height={800}
            alt="landing page main image"></Image>
        </div>
      </div> */}
    </>
  );
}
