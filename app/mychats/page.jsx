"use client";
const { createClient } = require("@supabase/supabase-js");
import { useRouter } from "next/navigation";

const supabaseUrl = "https://hjtlrhjfabtavtcdtvuf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqdGxyaGpmYWJ0YXZ0Y2R0dnVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMyNTgwNzQsImV4cCI6MjAxODgzNDA3NH0.AO_McXBnZ5ifxBko66NXN4OdWAs8536SS6W4DtpdG2s";

const MyChats = async () => {
  const router = useRouter();

  const supabase = createClient(supabaseUrl, supabaseKey);

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
