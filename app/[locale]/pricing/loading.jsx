import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="sm:flex sm:flex-col sm:align-center p-10">
      {/* Main Skeleton */}
      <Skeleton className="relative self-center p-0.5 flex">
        <Skeleton className="bg-zinc-300 h-14 w-[500px]" />
      </Skeleton>

      <div className="mt-6 relative self-center flex">
        {/* First Section */}
        <div className="bg-zinc-200 space-y-3 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 md:max-w-5xl md:mx-auto xl:grid-cols-3">
          {/* Three Cards */}
          {[...Array(3)].map((_, index) => (
            <Skeleton
              key={index}
              className="bg-zinc-100  border border-slate-900 rounded-lg shadow-sm divide-y divide-slate-200"
            >
              {/* Card Header */}
              <div className="p-6">
                <Skeleton className="bg-zinc-300 text-xl h-4 w-[250px]" />
                <Skeleton className="bg-zinc-300 h-16 w-[250px]" />
                <Skeleton className="mt-6 bg-zinc-300 h-2 w-[150px]" />
                <Skeleton className="mt-4 bg-zinc-300 h-8 w-[250px]" />
              </div>

              {/* Card Content */}
              <div className="pt-6 pb-8 px-6">
                <Skeleton className="bg-zinc-300 text-xl h-4 w-[250px]" />
                <ul role="list" className="mt-4 space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <li key={i} className="flex space-x-3">
                      <Skeleton className="bg-zinc-300 h-4 w-[250px]" />
                    </li>
                  ))}
                </ul>
              </div>
            </Skeleton>
          ))}
        </div>
      </div>
    </div>
  );
}
