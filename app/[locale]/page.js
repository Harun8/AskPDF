"use client";

import { Link } from "@/i18n/routing";

import dynamic from "next/dynamic";
import { supabase } from "@/lib/supabase";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Head from "next/head";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import Testimonial from "@/components/Testimonial";
import Faq from "@/components/Faq";
import HowToUse from "@/components/HowToUse";



const ShineBorder = dynamic(() => import("@/components/ui/shine-border"), { ssr: false });
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
<script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "AskPDFs AI PDF Analyzer",
  "description": "Instantly analyze, summarize, and extract insights from PDFs with AI-powered AskPDFs.",
  // "thumbnailUrl": "https://www.askpdfs.io/video-thumbnail.jpg",
  "uploadDate": "2024-02-27",
  "contentUrl": video,
  "embedUrl": "https://www.askpdfs.io"
})}
</script>

    <title>AskPDFs - AI PDF Analyzer & Summarizer</title>
    <meta name="description" content="AskPDFs is the fastest AI tool for analyzing, summarizing, and extracting insights from PDFs. Get instant answers from any document." />
    <meta name="keywords" content="AI PDF analysis, PDF summarizer, AI document reader, extract text from PDF, AI-powered PDF tool" />
    <meta name="robots" content="index, follow" />
    <meta property="og:title" content="AskPDFs - AI PDF Analyzer & Summarizer" />
    <meta property="og:description" content="Revolutionize your document workflow with AskPDFs – the AI-powered PDF analyzer and summarizer." />
    <meta property="og:url" content="https://www.askpdfs.io/" />
    <meta property="og:type" content="website" />
    {/* <meta property="og:image" content="https://www.askpdfs.io/preview.jpg" /> */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="AskPDFs - AI PDF Analyzer & Summarizer" />
    <meta name="twitter:description" content="AskPDFs is the best AI tool for analyzing and summarizing PDFs instantly." />
    {/* <meta name="twitter:image" content="https://www.askpdfs.io/preview.jpg" /> */}
</Head>

      <title>AskPDFs</title>
      {/* <h1>{t("title")}</h1> */}

      <div className="flex flex-col bg-blue-950 items-center  text-center min-h-screen">
        <h1 className=" text-4xl md:text-7xl mt-24 font-bold font-sans mb-4 font-extrabold	 text-yellow-50 ">
          {t("titleFirst")} <br></br>
          <span> {t("titleSecond")}</span>
        </h1>
        <p className="text-gray-500 mb-8 hover:text-orange-700">{t("underTitle")}</p>

        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <Link
            href="/pricing"
            prefetch={true}
            className="bg-orange-600 text-white font-bold py-3 px-10 rounded-lg hover:bg-orange-800">
            {t("tryAskPDF")}
          </Link>
          <Link
            href="/preview"
            className="border border-gray-500 text-white font-bold py-3 px-10  rounded-lg hover:bg-blue-800">
            {t("tryDemo")}
          </Link>
        </div>
        <div className="mt-12 w-full max-w-screen-lg mx-auto h-auto">
  {/* <NeonGradientCard
    neonColors={{
      firstColor: "#ffffff ",
      secondColor: "#2e6f7c",
      }}
      className="w-full h-auto "
      > */}
      <ShineBorder className="w-full h-auto rounded-md">

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


  </ShineBorder>
  {/* </NeonGradientCard> */}
</div>

      </div>
<Testimonial></Testimonial>


{/* <HowToUse></HowToUse> */}
<Faq></Faq>


    </>
  );
}
