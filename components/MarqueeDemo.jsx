import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import { useTranslations } from "next-intl";
import EY from "../public/EY.png"
import Image from "next/image";
import SDU from "../public/SDU.png"
import UCL from "../public/UCL.png"
import CBS from "../public/CBS.png"

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        "relative cursor-pointer overflow-hidden rounded-xl p-4",
        ""
      )}>
      <div className="flex flex-row items-center">
        <div className="flex flex-col">
          {/* <figcaption className="text-xl font-serif text-blue-950 dark:text-zinc-100 font-black dark:text-white tracking-wide"> */}
            {/* <img src={EY}></img> */}
            <Image 
            src={img}
            width={100}
            height={100} ></Image>
          {/* </figcaption> */}
        </div>
      </div>
    </figure>
  );
};

export function MarqueeDemo() {
  // const t = useTranslations("HomePage");
  // const reviews = t.raw("reviews") || []; // Ensure it's an array
  // const secondRow = reviews.slice(Math.ceil(reviews.length / 2));
  
  const reviews = [
    {
      img: EY
    },
    {
      img: SDU
    },
    {
      img: UCL
    },
    {
      img: CBS
    }
    
  ]
  const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));

  return (
    <div className="relative flex p-8 flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:10s]">
        {reviews.map((review, index) => (
          <ReviewCard  {...review} />
        ))}
        {/* {secondRow.map((review, index) => (
          <ReviewCard key={review.name + index} {...review} />
        ))} */}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 from-white dark:from-background"></div>
    </div>
  );
}
