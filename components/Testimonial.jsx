import { useTranslations } from "next-intl";
import { MarqueeDemo } from "./MarqueeDemo";
import { Gallery } from "./Gallery";

const Testimonial = () => {
  const t = useTranslations("Testimonial");

  return (
    <>
      <section className=" py-2 ">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <h2 className="text-center text-sm font-bold tracking-tight text-stone-500">
            {t("title")}
          </h2>

          <MarqueeDemo></MarqueeDemo>
          <div className="flex justify-center text-sm italic font-light text-zinc-600">
            {/* <p>             {t("underTitle")}
          </p> */}
          </div>
        </div>
        {/* <Gallery></Gallery> */}
      </section>
    </>
  );
};

export default Testimonial;
