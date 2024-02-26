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
      <div className="flex flex-col md:grid grid-cols-2 mt-36 mx-10 h-dvh ">
        <div className="">
          <p className=" dark:text-slate-300 font-serif font-bold  text-3xl md:text-7xl leading-tight">
            <span className="">
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
            {/* <Button size="xlg" variant="homepage">
              Try AskPDF for free
            </Button> */}
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
          <div class=" flex justify-end">
            <Image
              className=" md:w-1/3 md:h-1/3  "
              src={SaveTime}
              width={350}
              height={350}
              alt="landing page main image"></Image>
          </div>
        </div>
        <div className="  ">
          <Image
            className="hidden md:flex md:justify-center"
            src={Typewriter}
            width={800}
            height={800}
            alt="landing page main image"></Image>
        </div>
      </div>

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
      </section>
      {/* <Testimonial></Testimonial> */}

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
    </>
  );
}
