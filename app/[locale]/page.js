"use client";

import { Link } from "@/i18n/routing";

import dynamic from "next/dynamic";
import { supabase } from "@/lib/supabase";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Head from "next/head";



const NeonGradientCard = dynamic(() => import("@/components/ui/neon-gradient-card"), { ssr: false });
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
       <Head>
        <title>Best PDF AI Tool - AskPDFs</title>
        <meta name="description" content="AskPDFs is the best AI-powered tool to analyze and summarize PDFs instantly." />
        <meta name="keywords" content="AI PDF analysis, PDF summarizer, AI document reader" />
      </Head>
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
        <div className="mt-12 w-full max-w-screen-lg mx-auto h-auto">
  <NeonGradientCard
    neonColors={{
      firstColor: "#ffffff ",
      secondColor: "#2e6f7c",
    }}
    className="w-full h-auto "
  >

<video 
    key={video} 
    width={600} 
    height={600} 
    autoPlay={true} 
    muted={true} 
    controls 
    className="w-full h-auto rounded-md"
    loading="lazy" // Lazy load
    playsInline // Avoid fullscreen autoplay on mobile
>
    <source src={video} type="video/mp4" />
    Your browser does not support the video tag.
</video>

  </NeonGradientCard>
</div>
      </div>
      <div className="mt-22">

      </div>

    </>
  );
}
