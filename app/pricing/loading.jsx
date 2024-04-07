import { Skeleton } from "@/components/ui/skeleton";
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <>
      <div className="sm:flex sm:flex-col sm:align-center p-10  ">
        <Skeleton className="relative self-center  p-0.5 flex">
          <Skeleton className=" bg-zinc-300 h-14 w-[500px]"></Skeleton>
        </Skeleton>
        <div className="mt-6 relative self-center flex">
          <div className="bg-zinc-200  ">
            <Skeleton className=" bg-zinc-300 h-8 w-[250px]"></Skeleton>
          </div>
        </div>

        <Skeleton className="mt-12 space-y-3 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 md:max-w-5xl md:mx-auto xl:grid-cols-3">
          <Skeleton className=" bg-zinc-100 dark:bg-gray-900 	 border border-slate-900 rounded-lg shadow-sm divide-y divide-slate-200">
            <div className="p-6">
              <Skeleton className=" bg-zinc-300 text-xl h-4 w-[250px]"></Skeleton>

              <Skeleton className=" bg-zinc-300 h-16 w-[250px]"></Skeleton>

              <Skeleton className=" mt-6 bg-zinc-300 h-2 w-[150px]"></Skeleton>
              <Skeleton className="mt-4 bg-zinc-300 h-8 w-[250px]"></Skeleton>
            </div>
            <div className="pt-6 pb-8 px-6">
              <Skeleton className=" bg-zinc-300 text-xl h-4 w-[250px]"></Skeleton>

              <ul role="list" className="mt-4 space-y-3">
                <Skeleton className="bg-zinc-300 h-4 w-[250px]" />
                <Skeleton className=" bg-zinc-300 h-4 w-[250px]" />

                <li className="flex space-x-3">
                  <Skeleton className=" bg-zinc-300 text-xl h-4 w-[250px]"></Skeleton>
                </li>
                <li className="flex space-x-3">
                  <Skeleton className=" bg-zinc-300 text-xl h-4 w-[250px]"></Skeleton>
                </li>
                <li className="flex space-x-3">
                  <Skeleton className=" bg-zinc-300 text-xl h-4 w-[250px]"></Skeleton>
                </li>
                <li className="flex space-x-3">
                  <Skeleton className=" bg-zinc-300 text-xl h-4 w-[250px]"></Skeleton>
                </li>
                <li className="flex space-x-3">
                  <Skeleton className=" bg-zinc-300 text-xl h-4 w-[250px]"></Skeleton>
                </li>
              </ul>
            </div>
          </Skeleton>
          <Skeleton className=" bg-zinc-100 dark:bg-gray-900 	 border border-slate-900 rounded-lg shadow-sm divide-y divide-slate-200">
            <div className="p-6">
              <Skeleton className=" bg-zinc-300 text-xl h-4 w-[250px]"></Skeleton>

              <Skeleton className=" bg-zinc-300 h-16 w-[250px]"></Skeleton>

              <Skeleton className=" mt-6 bg-zinc-300 h-2 w-[150px]"></Skeleton>
              <Skeleton className="mt-4 bg-zinc-300 h-8 w-[250px]"></Skeleton>
            </div>
            <div className="pt-6 pb-8 px-6">
              <Skeleton className=" bg-zinc-300 text-xl h-4 w-[250px]"></Skeleton>

              <ul role="list" className="mt-4 space-y-3">
                <Skeleton className="bg-zinc-300 h-4 w-[250px]" />
                <Skeleton className=" bg-zinc-300 h-4 w-[250px]" />

                <li className="flex space-x-3">
                  <Skeleton className=" bg-zinc-300 text-xl h-4 w-[250px]"></Skeleton>
                </li>
                <li className="flex space-x-3">
                  <Skeleton className=" bg-zinc-300 text-xl h-4 w-[250px]"></Skeleton>
                </li>
                <li className="flex space-x-3">
                  <Skeleton className=" bg-zinc-300 text-xl h-4 w-[250px]"></Skeleton>
                </li>
                <li className="flex space-x-3">
                  <Skeleton className=" bg-zinc-300 text-xl h-4 w-[250px]"></Skeleton>
                </li>
                <li className="flex space-x-3">
                  <Skeleton className=" bg-zinc-300 text-xl h-4 w-[250px]"></Skeleton>
                </li>
              </ul>
            </div>
          </Skeleton>
          <Skeleton className=" bg-zinc-100 dark:bg-gray-900 	 border border-slate-900 rounded-lg shadow-sm divide-y divide-slate-200">
            <div className="p-6">
              <Skeleton className=" bg-zinc-300 text-xl h-4 w-[250px]"></Skeleton>

              <Skeleton className=" bg-zinc-300 h-16 w-[250px]"></Skeleton>

              <Skeleton className=" mt-6 bg-zinc-300 h-2 w-[150px]"></Skeleton>
              <Skeleton className="mt-4 bg-zinc-300 h-8 w-[250px]"></Skeleton>
            </div>
            <div className="pt-6 pb-8 px-6">
              <Skeleton className=" bg-zinc-300 text-xl h-4 w-[250px]"></Skeleton>

              <ul role="list" className="mt-4 space-y-3">
                <Skeleton className="bg-zinc-300 h-4 w-[250px]" />
                <Skeleton className=" bg-zinc-300 h-4 w-[250px]" />

                <li className="flex space-x-3">
                  <Skeleton className=" bg-zinc-300 text-xl h-4 w-[250px]"></Skeleton>
                </li>
                <li className="flex space-x-3">
                  <Skeleton className=" bg-zinc-300 text-xl h-4 w-[250px]"></Skeleton>
                </li>
                <li className="flex space-x-3">
                  <Skeleton className=" bg-zinc-300 text-xl h-4 w-[250px]"></Skeleton>
                </li>
                <li className="flex space-x-3">
                  <Skeleton className=" bg-zinc-300 text-xl h-4 w-[250px]"></Skeleton>
                </li>
                <li className="flex space-x-3">
                  <Skeleton className=" bg-zinc-300 text-xl h-4 w-[250px]"></Skeleton>
                </li>
              </ul>
            </div>
          </Skeleton>
        </Skeleton>
      </div>
    </>
  );
}
