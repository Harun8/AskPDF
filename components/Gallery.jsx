import { BlurFade } from "@/components/magicui/blur-fade";
import { ClientTweetCard } from "./magicui/ClientTweetCard";
import { useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const images = Array.from({ length: 5 }, (_, i) => {
  const isLandscape = i % 2 === 0;
  const width = isLandscape ? 800 : 600;
  const height = isLandscape ? 600 : 800;
  return `https://ojvcjdbzzpzmvsluhwhc.supabase.co/storage/v1/object/public/PromoVID/Testimonial/Testi${i+1}.png`;
});
const supabase = createClientComponentClient();

export function Gallery() {


useEffect(() => {
  const fetchData = async () => {
    try {
      const { data, error } =  supabase
        .storage
        .from('PromoVID')
        .getPublicUrl('Testimonial'); // Specify the folder path

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        console.log("Testimonial images:", data);
        // Process the data as needed, e.g., set state with image URLs
        // const imageUrls = data.map(file => supabase.storage.from('PromoVID').getPublicUrl(`testimonial/${file.name}`).publicUrl);
        // setImages(imageUrls); // Uncomment and handle as needed
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  fetchData();
}, []);

  return (
    <section className="mb-12">
      <div className="container mx-auto px-4">
        <div className="columns-2 gap-4 sm:columns-3">
          <ClientTweetCard className="mb-4 size-full rounded-lg object-contain" id="1897358566140600832"></ClientTweetCard>
          {images.map((imageUrl, idx) => (
            <BlurFade key={imageUrl} delay={0.25 + idx * 0.05} inView>
              <img
                className="mb-4 size-full rounded-lg object-contain"
                src={imageUrl}
                alt={`Random stock image ${idx + 1}`}
                />
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}