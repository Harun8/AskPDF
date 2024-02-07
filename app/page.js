import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Home() {
  return (
    <div>
      <div className="flex justify-center mt-28	">
        <ResizablePanelGroup
          direction="vertical"
          className="min-h-[200px] max-w-lg rounded-lg ">
          <ResizablePanel defaultSize={25}>
            <div className="flex h-full items-center justify-center p-6">
              <p className=" dark:text-slate-300	 font-serif font-bold text-2xl">
                {" "}
                Accelerate your work with{" "}
                <span className="text-blue-600		"> AskPDF</span>
              </p>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={75}>
            <div className="flex h-full items-center justify-center p-6"></div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <section className="flex justify-center">
        <h1>hi</h1>
      </section>
    </div>
  );
}
