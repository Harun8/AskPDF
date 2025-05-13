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
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import Gradient from "../../public/gradient.jpg";
import Image from "next/image";
import Pricing from "./pricing/page";
import { Gallery } from "@/components/Gallery";
import videoFrame from "../../public/videoframe.jpg";

const ShineBorder = dynamic(() => import("@/components/ui/shine-border"), {
  ssr: false,
});
export default function Home() {
  const [video, setVideo] = useState();
  const [session, setSession] = useState(null);

  const t = useTranslations("HomePage");

  useEffect(() => {
    setSession(supabase.auth.getSession());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    // const getVideo = async () =>  {

    //   const { data } = await supabase
    // .storage
    // .from('PromoVID').getPublicUrl('VID/FullPromoEN.mp4');
    // // .getPublicUrl('VID/FullPromoEN.mp4');
    // setVideo(data.publicUrl);

    // }

    // getVideo()
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["promoVid"],
    queryFn: async () => {
      const { data } = supabase.storage
        .from("PromoVID")
        .getPublicUrl("VID/promo.mp4");

      return data;
    },
    staleTime: Infinity, // <--- here!
    cacheTime: Infinity, // <--- here!
  });

  useEffect(() => {
    if (data) {
      setVideo(data.publicUrl);
    }
  }, [data]);

  return (
    <>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: "AskPDFs AI PDF Analyzer",
            description:
              "Instantly analyze, summarize, and extract insights from PDFs with AI-powered AskPDFs.",
            // "thumbnailUrl": "https://www.askpdfs.io/video-thumbnail.jpg",
            uploadDate: "2024-02-27",
            contentUrl: video,
            embedUrl: "https://www.askpdfs.io",
          })}
        </script>

        <title>AskPDFs - AI PDF Analyzer & Summarizer</title>
        <meta
          name="description"
          content="AskPDFs is the fastest AI tool for analyzing, summarizing, and extracting insights from PDFs. Get instant answers from any document."
        />
        <meta
          name="keywords"
          content="AI PDF analysis, PDF summarizer, AI document reader, extract text from PDF, AI-powered PDF tool"
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="AskPDFs - AI PDF Analyzer & Summarizer"
        />
        <meta
          property="og:description"
          content="Revolutionize your document workflow with AskPDFs – the AI-powered PDF analyzer and summarizer."
        />
        <meta property="og:url" content="https://www.askpdfs.io/" />
        <meta property="og:type" content="website" />
        {/* <meta property="og:image" content="https://www.askpdfs.io/preview.jpg" /> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="AskPDFs - AI PDF Analyzer & Summarizer"
        />
        <meta
          name="twitter:description"
          content="AskPDFs is the best AI tool for analyzing and summarizing PDFs instantly."
        />
        {/* <meta name="twitter:image" content="https://www.askpdfs.io/preview.jpg" /> */}
      </Head>

      <title>AskPDFs</title>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-md sm:max-w-screen-lg md:max-w-screen-xl lg:max-w-screen-2xl text-center">
        <h1 className="text-6xl md:text-6xl font-bold font-black py-2">
          {t("title")}
        </h1>
        <h1 className="text-6xl md:text-6xl font-bold">{t("titleSecond")}</h1>

        <p className="text-zinc-400 text-xl py-2 mb-8">
          {t("underTitle")} <br></br> {t("underTitle2")}{" "}
        </p>
        <div className="space-x-4">
          <Link
            className=""
            href={session ? "/chat" : "/preview"}
            data-testid="login-btn"
          >
            <Button variant="nav" size="nav">
              {t("startChatting")}
            </Button>
          </Link>

          <Link
            className="text-sm font-['system-ui'] text-gray-700 hover:text-gray-500 font-bold"
            href="/faq"
          >
            <Button onClick={console.log("hest")} variant="nav2" size="newChat">
              {t("learn")}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1"
                stroke="currentColor"
                class="size-4 m-1 "
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </Button>
          </Link>
        </div>
        <div className="mt-12">
          {/* <ShineBorder className="w-full h-auto rounded-md"> */}

          {video ? (
            <video
              key={video}
              width={600}
              height={600}
              autoPlay={true}
              muted={true}
              controls
              className="w-full h-auto rounded-3xl"
              loading="lazy" // Lazy load
              playsInline // Avoid fullscreen autoplay on mobile
            >
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <p> loading video</p>
            // <Image
            //   className="w-full rounded-3xl"
            //   src={videoFrame}
            //   height={600}
            //   width={600}
            // ></Image>
          )}

          {/* </ShineBorder>     */}
        </div>

        <Testimonial></Testimonial>

        {/* Services */}
      </div>
      {/* <div className="">
 </div> */}

      <section id="services" className="bg-gray-50 py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-md sm:max-w-screen-lg md:max-w-screen-xl lg:max-w-screen-2xl text-center">
          <h2 className="text-md text-zinc-400 mb-4 text-center">Services</h2>
          <p className="text-5xl font-bold font-black py-6 text-center">
            {t("serviceTitle1")} <br /> {t("serviceTitle2")}
          </p>

          {/* First Service */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
            <div className="md:w-1/2 text-left">
              <h3 className="text-2xl font-semibold mb-2">
                {t("review1Title")}
                {/* <span className="text-blue-600"></span> */}
              </h3>
              <p className="text-gray-600">{t("review1Text")}</p>
            </div>
            <div className="md:w-1/2">
              <div className=" p-6 ">
                <Image
                  className="rounded-2xl"
                  src={Gradient}
                  width={700}
                  height={700}
                ></Image>
              </div>
            </div>
          </div>

          {/* Second Service */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
            <div className="md:w-1/2 text-left">
              <h3 className="text-2xl font-semibold mb-2">
                {t("review2Title")}
              </h3>
              <p className="text-gray-600">{t("review2Text")}</p>
            </div>
            <div className="md:w-1/2">
              <div className=" p-6 rounded-xl">
                <Image
                  className="rounded-xl"
                  src={Gradient}
                  width={700}
                  height={700}
                ></Image>
              </div>
            </div>
          </div>

          {/* Third Service */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 text-left">
              <h3 className="text-2xl font-semibold mb-2">
                {t("review3Title")}
              </h3>
              <p className="text-gray-600">{t("review3Text")}</p>
            </div>
            <div className="md:w-1/2">
              <div className="p-6">
                <Image
                  className="rounded-2xl"
                  src={Gradient}
                  width={700}
                  height={700}
                ></Image>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <Gallery></Gallery> */}

      <Pricing></Pricing>

      {/* <Faq></Faq> */}
    </>
  );
}
