"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Image from "next/image";
import LPBI from "@/public/landingPage.svg";
import { Button } from "@/components/ui/button";
import TypingLight from "@/public/TypingLight.svg";
import TypingDark from "@/public/TypingDark.svg";

import Upload from "@/public/upload.svg";
import Answer from "@/public/answer.svg";
import Pdf from "@/public/pdf.svg";
import Coffee from "@/public/coffee.svg";
import SaveTime from "@/public/Save-time.svg";
import { supabase } from "@/lib/supabase";
import React, { useEffect, useState } from "react";

import Link from "next/link";

export default function Home(props) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Fetch session on component mount
    setSession(supabase.auth.getSession());

    // Set up a session state listener for real-time updates
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <>
      <div className="flex flex-col md:grid grid-cols-2  mt-28 mx-10  ">
        <div className="">
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
      </div>

      {/* <section className=" mt-5 bg-blue-950 dark:bg-blue-950  py-16	">
        <div className=" flex justify-center">
          <p className="mx-auto mt-8 text-zinc-100 dark:text-slate-300 font-serif font-bold text-3xl leading-tight">
            How does it work
          </p>
        </div>
        <div className="mt-12 pb-8 flex flex-col md:flex-row md:justify-center gap-16">
          <div>
            <Image
              className="mx-auto"
              src={Upload}
              width={50}
              height={50}
              alt="landing page main image"></Image>
            <p className=" flex justify-center mt-8 text-zinc-100 dark:text-slate-300 font-serif font-bold text-lg leading-tight">
              Upload your PDF file
            </p>
          </div>
          <div>
            <Image
              className="mx-auto"
              src={Answer}
              width={50}
              height={50}
              alt="landing page main image"></Image>
            <p className=" flex justify-center mt-8 text-zinc-100 dark:text-slate-300 font-serif font-bold text-lg leading-tight">
              Ask any question about your PDF
            </p>
          </div>
          <div>
            <Image
              className=" mx-auto"
              src={Pdf}
              width={50}
              height={50}
              alt="landing page main image"></Image>
            <p className=" flex justify-center mt-8 text-zinc-100 dark:text-slate-300 font-serif font-bold text-lg leading-tight">
              Let AskPDF find the answer
            </p>
          </div>
        </div>
      </section> */}
      {/* 
      <div className="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
        <div>
          <a
            title="Buy me a beer"
            href="https://www.buymeacoffee.com/scottwindon"
            target="_blank"
            className="block w-16 bg-zinc-300 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12">
            <Image
              className="object-cover object-center w-full h-full rounded-full"
              src={Coffee}
            />
          </a>
        </div>
      </div> */}
    </>
  );
}
