import { BlurFade } from "@/components/magicui/blur-fade";
import { ClientTweetCard } from "./magicui/ClientTweetCard";

const images = Array.from({ length: 6 }, (_, i) => {
  const isLandscape = i % 2 === 0;
  const width = isLandscape ? 800 : 600;
  const height = isLandscape ? 600 : 800;
  return `https://picsum.photos/seed/${i + 1}/${width}/${height}`;
});

export function Gallery() {
  return (
    <section className="">
      <div className="container mx-auto px-4">
        <div className="columns-2 gap-4 sm:columns-3">
          {images.map((imageUrl, idx) => (
            <BlurFade key={imageUrl} delay={0.25 + idx * 0.05} inView>
                <ClientTweetCard className="mb-4 size-full rounded-lg object-contain" id="1897358566140600832"></ClientTweetCard>
              {/* <img
                className="mb-4 size-full rounded-lg object-contain"
                src={imageUrl}
                alt={`Random stock image ${idx + 1}`}
              /> */}
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}