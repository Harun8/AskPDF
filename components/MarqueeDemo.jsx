import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import { useTranslations } from "next-intl";

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        "relative cursor-pointer overflow-hidden rounded-xl p-4",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}>
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-col">
          <figcaption className="text-xl font-serif text-zinc-100 font-black dark:text-white tracking-wide">
            {name}
          </figcaption>
        </div>
      </div>
    </figure>
  );
};

export function MarqueeDemo() {
  const t = useTranslations("HomePage");
  const reviews = t.raw("reviews") || []; // Ensure it's an array
  const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
  const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

  return (
    <div className="relative flex p-8 flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:150s]">
        {firstRow.map((review, index) => (
          <ReviewCard key={review.name + index} {...review} />
        ))}
        {secondRow.map((review, index) => (
          <ReviewCard key={review.name + index} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 from-white dark:from-background"></div>
    </div>
  );
}
