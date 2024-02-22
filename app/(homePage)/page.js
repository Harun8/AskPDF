import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Image from "next/image";
import LPBI from "@/public/landingPage.svg";
import { Button } from "@/components/ui/button";
import Typewriter from "@/public/typewriter.svg";
import Upload from "@/public/upload.svg";
import Answer from "@/public/answer.svg";
import Pdf from "@/public/pdf.svg";
import Coffee from "@/public/coffee.svg";
import SaveTime from "@/public/Save-time.svg";

import Link from "next/link";
import Testimonial from "@/components/Testimonial";

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-2 mt-36 mx-10 h-dvh ">
        <div className="">
          <p className=" dark:text-slate-300 font-serif font-bold text-7xl leading-tight">
            <span className="">
              Learn quicker <br /> with,
            </span>
            <span className="text-blue-600"> AskPDF</span>
          </p>
          <p className="font-base font-medium text-2xl mt-6 leading-relaxed	 ">
            Optimize your PDF experience with{" "}
            <span className="text-blue-600"> AskPDF</span>: the smart solution
            that transforms your documents into responsive knowledge bases. Just
            upload, ask, and instantly get the answers you need. <br />
            Streamline your study or work sessions with{" "}
            <span className="text-blue-600"> AskPDF</span> where PDF's come to
            talk!
          </p>

          <div className="mt-16 flex items-start">
            <Button size="xlg" variant="homepage">
              Try AskPDF for free
            </Button>
            <Link
              className="  hover:text-red-500  hover:font-bold ml-6 my-auto font-semibold text-lg "
              href="/preview">
              <div className=" flex items-center">
                Try the demo
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 448 512"
                  className="ml-2 ">
                  <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                </svg>
              </div>
            </Link>
          </div>
          <div className="flex justify-end">
            <Image
              src={SaveTime}
              width={350}
              height={350}
              alt="landing page main image"></Image>
          </div>
        </div>
        <div className="">
          <Image
            src={Typewriter}
            width={800}
            height={800}
            alt="landing page main image"></Image>
        </div>
      </div>
      {/* 
      <div class=" mt-16 flex justify-center grid grid-rows-3 grid-flow-col gap-4">
        <div class="row-span-3 ...">
          <Image
            src={Typewriter}
            width={650}
            height={650}
            alt="landing page main image"></Image>

          <div className="flex justify-start mt-6 ">
            <Button size="xlg" variant="homepage">
              Try AskPDF for free
            </Button>
            <Link
              className=" hover:text-gray-700 ml-6 my-auto font-semibold text-lg"
              href="/preview">
              Try the demo
            </Link>
          </div>
        </div>
        <div class="col-span-2 ...">
          <p className=" dark:text-slate-300 font-serif font-bold text-6xl leading-tight">
            <span className="">
              Engage <br />
            </span>
            <span className="">
              with your <br />
            </span>
            <span className="text-blue-600"> PDFs</span>
          </p>
        </div>
        <div class="row-span-2 col-span-2 mx-auto">
          <Image
            src={SaveTime}
            width={350}
            height={350}
            alt="landing page main image"></Image>
        </div>
        <div></div>
      </div> */}
      <section className=" mt-5 bg-blue-950 py-16	">
        <div className=" flex justify-center">
          <p className=" mx-auto mt-8 text-zinc-100 dark:text-slate-300 font-serif font-bold text-3xl leading-tight">
            How does it work
          </p>
        </div>
        <div className=" mt-12 pb-8 flex justify-center gap-16">
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
              className="mx-auto"
              src={Pdf}
              width={50}
              height={50}
              alt="landing page main image"></Image>
            <p className=" flex justify-center mt-8 text-zinc-100 dark:text-slate-300 font-serif font-bold text-lg leading-tight">
              Let AskPDF find the answer
            </p>
          </div>
        </div>
      </section>
      {/* <Testimonial></Testimonial> */}
      {/* <section className=" "> */}
      {/* <div className=" flex justify-center">
          <p className=" mt-8 text-gray-900 dark:text-slate-300 font-serif font-bold text-3xl leading-tight">
            Loved by many <br />
            <span className="text-sm"> and by many i mean me for now</span>
          </p>
        </div>
        <div className="mt-12 flex justify-center gap-16"></div> */}
      <div class="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
        <div>
          <a
            title="Buy me a beer"
            href="https://www.buymeacoffee.com/scottwindon"
            target="_blank"
            class="block w-16 bg-zinc-300 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12">
            <Image
              class="object-cover object-center w-full h-full rounded-full"
              src={Coffee}
            />
          </a>
        </div>
      </div>
      {/* </section> */}
    </>
  );
}
