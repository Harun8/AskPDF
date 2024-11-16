import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="text-gray-700 body-font overflow-hidden border-t border-gray-200">
      <div className="container flex ml-32 px-5 py-14 mx-auto flex flex-wrap">
        {/* Left Sidebar Skeleton */}
        <div className="lg:w-1/4 mt-48 hidden lg:block">
          <div className="mt-px border-t border-gray-300 border-b border-l rounded-tl-lg rounded-bl-lg overflow-hidden">
            {Array.from({ length: 7 }).map((_, index) => (
              <p
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-300" : "text-gray-900"
                } h-12 text-center px-4 flex items-center justify-start`}>
                <Skeleton className="bg-gray-400 h-4 w-3/4"></Skeleton>
              </p>
            ))}
          </div>
        </div>

        {/* Pricing Cards Skeleton */}
        <div className="flex lg:w-3/4 w-full flex-wrap lg:border border-gray-300 rounded-lg">
          {Array.from({ length: 3 }).map((_, cardIndex) => (
            <div
              key={cardIndex}
              className={`lg:w-1/3 lg:mt-px w-full mb-10 lg:mb-0 border-2 ${
                cardIndex === 1
                  ? "rounded-lg border-gray-800 relative"
                  : "border-gray-300 lg:border-none rounded-lg lg:rounded-none"
              }`}>
              {cardIndex === 1 && (
                <span className="bg-gray-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
                  <Skeleton className="h-4 w-16"></Skeleton>
                </span>
              )}
              <div className="px-2 text-center h-48 flex flex-col items-center justify-center">
                <Skeleton className="bg-gray-400 h-6 w-24 mb-2"></Skeleton>
                <Skeleton className="bg-gray-400 h-10 w-36 mb-4"></Skeleton>
                <Skeleton className="bg-gray-400 h-4 w-20"></Skeleton>
              </div>
              {Array.from({ length: 5 }).map((_, featureIndex) => (
                <p
                  key={featureIndex}
                  className={`${
                    featureIndex % 2 === 0 ? "bg-gray-300" : "text-gray-600"
                  } h-12 text-center px-2 flex items-center justify-center border-t border-gray-300`}>
                  <Skeleton className="bg-gray-400 h-4 w-3/4"></Skeleton>
                </p>
              ))}
              <div className="p-6 text-center border-t border-gray-300">
                <Skeleton className="bg-gray-400 h-10 w-full"></Skeleton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
