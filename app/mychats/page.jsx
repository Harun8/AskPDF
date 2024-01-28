"use client";
const { createClient } = require("@supabase/supabase-js");
import { useRouter } from "next/navigation";

const MyChats = async () => {
  const router = useRouter();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data } = await supabase.from("pdfs").select();

  console.log("pdf_title", data.pdf_title);

  const getPdfId = (id) => {
    console.log("id", id);
    router.push(`/chat/${id}`);
  };

  return (
    <>
      <h2></h2>
      <div className="flex justify-center text-black dark:text-white">
        {data.map((data) => {
          return (
            <p onClick={() => getPdfId(data.id)} key={Math.random()}>
              {data.pdf_title}
            </p>
          );
        })}
      </div>
    </>
  );
};

export default MyChats;
