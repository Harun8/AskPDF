import { supabase } from "@/lib/supabase";
import React, { useEffect, useState } from "react";
const HowToUse = () => {
  const [video, setVideo] = useState();
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.getSession());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    const getVideo = async () => {
      const { data } = await supabase.storage
        .from("PromoVID")
        .getPublicUrl("VID/FullPromoEN.mp4");
      // .getPublicUrl('VID/FullPromoEN.mp4');
      setVideo(data.publicUrl);
    };

    getVideo();
  }, []);

  return (
    <>
      {/* <section id="works" className="relative bg-blue-950 py-10 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl text-white font-extrabold mx-auto md:text-6xl lg:text-5xl">How does it work?</h2>
            <p className="max-w-2xl mx-auto mt-4 text-base text-gray-400 leading-relaxed md:text-2xl">
              Our AI solution will help you from start to finish
            </p>
          </div>
          <div className="relative mt-12 lg:mt-20">
            <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
              <img
                alt=""
                loading="lazy"
                width="1000"
                height="500"
                decoding="async"
                className="w-full"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
              />
            </div>
            <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
              <div>
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                  <span className="text-xl font-semibold text-gray-700">1</span>
                </div>
                <h3 className="mt-6 text-xl text-white font-semibold leading-tight md:mt-10">Upload Your PDF</h3>
                <p className="mt-4 text-base text-gray-400 md:text-lg">
                  Simply drag and drop your PDF file into the upload area.
                </p>
              </div>
              <div>
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                  <span className="text-xl font-semibold text-gray-700">2</span>
                </div>
                <h3 className="mt-6 text-xl text-white font-semibold leading-tight md:mt-10">Ask Questions</h3>
                <p className="mt-4 text-base text-gray-400 md:text-lg">
                  Type your questions about the document content.
                </p>
              </div>
              <div>
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                  <span className="text-xl font-semibold text-gray-700">3</span>
                </div>
                <h3 className="mt-6 text-xl text-white font-semibold leading-tight md:mt-10">Get Instant Answers</h3>
                <p className="mt-4 text-base text-gray-400 md:text-lg">
                  Receive accurate answers powered by AI technology.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 m-auto max-w-xs h-[357px] blur-[118px] sm:max-w-md md:max-w-lg"></div>
      </section> */}

      <section class="bg-blue-950 ">
        <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div class="font-light text-gray-500 sm:text-lg ">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-zinc-200 ">
              Effortless Insights from Your PDFs
            </h2>
            <p class="mb-4">
              Unlock clear and instant understanding from your documents.
              AskPDFs.io intelligently transforms dense PDFs into concise,
              actionable insights. Whether you're researching, learning, or
              problem-solving, our tool simplifies complex information, enabling
              you to grasp key points quickly and effortlessly.
            </p>
            <p>
              Skip manual skimming and endless scrolling. Save time, boost
              productivity, and stay ahead with AskPDFs.io—your personal
              assistant for instant document clarity.
            </p>
          </div>
          <div class="">
            {video ? (
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
            ) : (
              <p className="text-gray-400">Loading video...</p> // Show a loading message while fetching the video URL
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default HowToUse;
