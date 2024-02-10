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

      <section className=" ">
        {/* <div className=" flex justify-center">
          <p className=" mt-8 text-gray-900 dark:text-slate-300 font-serif font-bold text-3xl leading-tight">
            Loved by many <br />
            <span className="text-sm"> and by many i mean me for now</span>
          </p>
        </div>
        <div className="mt-12 flex justify-center gap-16"></div> */}

        <div class="min-w-screen min-h-screen  flex items-center justify-center ">
          <div class="w-full bg-gray-300  border-t border-b border-gray-200 px-5 py-16 md:py-24 text-gray-800">
            <div class="w-full max-w-6xl mx-auto">
              <div class="text-center max-w-xl mx-auto">
                <h1 class="text-6xl md:text-7xl font-bold mb-5 text-gray-600">
                  What people <br />
                  are saying.
                </h1>
                <h3 class="text-xl mb-5 font-light">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </h3>
                <div class="text-center mb-10">
                  <span class="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"></span>
                  <span class="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"></span>
                  <span class="inline-block w-40 h-1 rounded-full bg-indigo-500"></span>
                  <span class="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"></span>
                  <span class="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"></span>
                </div>
              </div>
              <div class="-mx-3 md:flex items-start">
                <div class="px-3 md:w-1/3">
                  <div class="w-full mx-auto rounded-lg  border border-gray-200 p-5 text-gray-800 font-light mb-6">
                    <div class="w-full flex mb-4 items-center">
                      <div class="overflow-hidden rounded-full w-10 h-10  border border-gray-200">
                        <img src="https://i.pravatar.cc/100?img=1" alt="" />
                      </div>
                      <div class="flex-grow pl-3">
                        <h6 class="font-bold text-sm uppercase text-gray-600">
                          Kenzie Edgar.
                        </h6>
                      </div>
                    </div>
                    <div class="w-full">
                      <p class="text-sm leading-tight">
                        <span class="text-lg leading-none italic font-bold text-gray-400 mr-1">
                          "
                        </span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quos sunt ratione dolor exercitationem minima quas
                        itaque saepe quasi architecto vel! Accusantium, vero
                        sint recusandae cum tempora nemo commodi soluta
                        deleniti.
                        <span class="text-lg leading-none italic font-bold text-gray-400 ml-1">
                          "
                        </span>
                      </p>
                    </div>
                  </div>
                  <div class="w-full mx-auto rounded-lg  border border-gray-200 p-5 text-gray-800 font-light mb-6">
                    <div class="w-full flex mb-4 items-center">
                      <div class="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                        <img src="https://i.pravatar.cc/100?img=2" alt="" />
                      </div>
                      <div class="flex-grow pl-3">
                        <h6 class="font-bold text-sm uppercase text-gray-600">
                          Stevie Tifft.
                        </h6>
                      </div>
                    </div>
                    <div class="w-full">
                      <p class="text-sm leading-tight">
                        <span class="text-lg leading-none italic font-bold text-gray-400 mr-1">
                          "
                        </span>
                        Lorem ipsum, dolor sit amet, consectetur adipisicing
                        elit. Dolore quod necessitatibus, labore sapiente, est,
                        dignissimos ullam error ipsam sint quam tempora vel.
                        <span class="text-lg leading-none italic font-bold text-gray-400 ml-1">
                          "
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="px-3 md:w-1/3">
                  <div class="w-full mx-auto rounded-lg  border border-gray-200 p-5 text-gray-800 font-light mb-6">
                    <div class="w-full flex mb-4 items-center">
                      <div class="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                        <img src="https://i.pravatar.cc/100?img=3" alt="" />
                      </div>
                      <div class="flex-grow pl-3">
                        <h6 class="font-bold text-sm uppercase text-gray-600">
                          Tommie Ewart.
                        </h6>
                      </div>
                    </div>
                    <div class="w-full">
                      <p class="text-sm leading-tight">
                        <span class="text-lg leading-none italic font-bold text-gray-400 mr-1">
                          "
                        </span>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Vitae, obcaecati ullam excepturi dicta error
                        deleniti sequi.
                        <span class="text-lg leading-none italic font-bold text-gray-400 ml-1">
                          "
                        </span>
                      </p>
                    </div>
                  </div>
                  <div class="w-full mx-auto rounded-lg border border-gray-200 p-5 text-gray-800 font-light mb-6">
                    <div class="w-full flex mb-4 items-center">
                      <div class="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                        <img src="https://i.pravatar.cc/100?img=4" alt="" />
                      </div>
                      <div class="flex-grow pl-3">
                        <h6 class="font-bold text-sm uppercase text-gray-600">
                          Charlie Howse.
                        </h6>
                      </div>
                    </div>
                    <div class="w-full">
                      <p class="text-sm leading-tight">
                        <span class="text-lg leading-none italic font-bold text-gray-400 mr-1">
                          "
                        </span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Architecto inventore voluptatum nostrum atque, corrupti,
                        vitae esse id accusamus dignissimos neque reprehenderit
                        natus, hic sequi itaque dicta nisi voluptatem! Culpa,
                        iusto.
                        <span class="text-lg leading-none italic font-bold text-gray-400 ml-1">
                          "
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="px-3 md:w-1/3">
                  <div class="w-full mx-auto rounded-lg  border border-gray-200 p-5 text-gray-800 font-light mb-6">
                    <div class="w-full flex mb-4 items-center">
                      <div class="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                        <img src="https://i.pravatar.cc/100?img=5" alt="" />
                      </div>
                      <div class="flex-grow pl-3">
                        <h6 class="font-bold text-sm uppercase text-gray-600">
                          Nevada Herbertson.
                        </h6>
                      </div>
                    </div>
                    <div class="w-full">
                      <p class="text-sm leading-tight">
                        <span class="text-lg leading-none italic font-bold text-gray-400 mr-1">
                          "
                        </span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nobis, voluptatem porro obcaecati dicta, quibusdam sunt
                        ipsum, laboriosam nostrum facere exercitationem pariatur
                        deserunt tempora molestiae assumenda nesciunt alias
                        eius? Illo, autem!
                        <span class="text-lg leading-none italic font-bold text-gray-400 ml-1">
                          "
                        </span>
                      </p>
                    </div>
                  </div>
                  <div class="w-full mx-auto rounded-lg  border border-gray-200 p-5 text-gray-800 font-light mb-6">
                    <div class="w-full flex mb-4 items-center">
                      <div class="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                        <img src="https://i.pravatar.cc/100?img=6" alt="" />
                      </div>
                      <div class="flex-grow pl-3">
                        <h6 class="font-bold text-sm uppercase text-gray-600">
                          Kris Stanton.
                        </h6>
                      </div>
                    </div>
                    <div class="w-full">
                      <p class="text-sm leading-tight">
                        <span class="text-lg leading-none italic font-bold text-gray-400 mr-1">
                          "
                        </span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptatem iusto, explicabo, cupiditate quas totam!
                        <span class="text-lg leading-none italic font-bold text-gray-400 ml-1">
                          "
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
          <div>
            <a
              title="Buy me a beer"
              href="https://www.buymeacoffee.com/scottwindon"
              target="_blank"
              class="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12">
              <img
                class="object-cover object-center w-full h-full rounded-full"
                src=""
              />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
