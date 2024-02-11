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

import Link from "next/link";
import Testimonial from "@/components/Testimonial";

export default function Home() {
  return (
    <>
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
            <span className="ml-14"> the handiest </span> <br />
            way to organize <br />
            <span className="text-blue-600		"> reading</span>
          </p>
        </div>
        <div class="row-span-2 col-span-2 mx-auto">
          <Image
            src={LPBI}
            width={350}
            height={350}
            alt="landing page main image"></Image>
        </div>
        <div></div>
      </div>

      <section className=" bg-blue-950 py-16	">
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

      <Testimonial></Testimonial>

      {/* <section className=" "> */}
      {/* <div className=" flex justify-center">
          <p className=" mt-8 text-gray-900 dark:text-slate-300 font-serif font-bold text-3xl leading-tight">
            Loved by many <br />
            <span className="text-sm"> and by many i mean me for now</span>
          </p>
        </div>
        <div className="mt-12 flex justify-center gap-16"></div> */}

      {/* <div class="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
          <div>
            <a
              title="Buy me a beer"
              href="https://www.buymeacoffee.com/scottwindon"
              target="_blank"
              class="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12">
              <img
                class="object-cover object-center w-full h-full rounded-full"
                src="https://i.pinimg.com/originals/60/fd/e8/60fde811b6be57094e0abc69d9c2622a.jpg"
              />
            </a>
          </div>
        </div> */}
      {/* </section> */}
    </>
  );
}
