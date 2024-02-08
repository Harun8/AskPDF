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
      <h1>hi</h1>

      <section className=" bg-blue-950	">
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
              src={Upload}
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
              src={Upload}
              width={50}
              height={50}
              alt="landing page main image"></Image>
            <p className=" flex justify-center mt-8 text-zinc-100 dark:text-slate-300 font-serif font-bold text-lg leading-tight">
              Let AskPDF find the answer
            </p>
          </div>
        </div>
      </section>

      <section className=" ">
        <div className=" flex justify-center">
          <p className=" mt-8 text-gray-900 dark:text-slate-300 font-serif font-bold text-3xl leading-tight">
            Loved by many
          </p>
        </div>
        <div className="mt-12 flex justify-center gap-16"></div>
      </section>
    </>
  );
}
