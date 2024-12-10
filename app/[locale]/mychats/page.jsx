"use client";
const { createClient } = require("@supabase/supabase-js");
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const supabase = createClientComponentClient();

const MyChats = () => {
  const [pdfs, setPdfs] = useState([]);
  const [userId, setUserId] = useState(null);
  const router = useRouter();
  const t = useTranslations("Navbar");

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          router.push("/");
          return;
        }
        setUserId(session.user.id);

        const { data, error } = await supabase.storage
          .from("pdfs")
          .list(session.user.id);
        setPdfs(data);
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, []);
  


  return (
    <>
      <title>My chats | AskPDFs</title>

      <p className="flex justify-center font-medium font-4xl">
        {t("myChats")}{" "}
      </p>
      <div className="flex justify-center text-black dark:text-white">
        <div className="flex justify-center">
          <div className="mt-20">
            {pdfs.map((pdf) => {
              if (pdf.name == ".emptyFolderPlaceholder") return null;
              return (
                <Link
                  className=" cursor-pointer hover:bg-zinc-400 flex justify-start mb-12 text-lg font-medium  bg-zinc-300 dark:bg-zinc-600 rounded p-6"
                  href={`/chat/${pdf.id}`}
                  key={pdf.id}>
                  {pdf.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyChats;
