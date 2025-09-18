"use client";
const { createClient } = require("@supabase/supabase-js");
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { AiFillFilePdf } from "react-icons/ai"

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
  
// mere design på mychats page. lav en ny skitse i figma eller wireframe

  return (
    <>
      <title>My chats | AskPDFs</title>
    <div className="min-h-screen p-6 dark:bg-blue-950/60">
    <div className="max-w-2xl mx-auto">

      <h1 className="text-3xl font-bold text-center mt-4 mb-8 dark:text-white">
        {t("myChats")}{" "}
      </h1>
      <div className="flex justify-center text-black  dark:text-white">
        <div className="flex justify-center ml-20">
          <div className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow max-h-[500px] overflow-y-auto">
  {pdfs.filter(pdf => pdf.name !== ".emptyFolderPlaceholder").length === 0 ? (
    <p className="text-center text-gray-500 dark:text-gray-300">Ingen tidligere chats</p>
  ) : (
    <ul>
    {pdfs
    .filter(pdf => pdf.name !== ".emptyFolderPlaceholder")
    .map((pdf, idx, arr) => (
      <li key={pdf.id}>
      <Link
        prefetch
        key={pdf.id}
        href={`/chat/${pdf.id}`}
        className="flex items-center gap-3 bg-zinc-300 dark:bg-zinc-600 hover:bg-gradient-to-r from-indigo-500 to-purple-500 dark:hover:from-indigo-700 dark:hover:to-purple-700 hover:scale-105 transition-transform duration-300 shadow-md rounded-xl p-4 mb-4 cursor-pointer"
      >
        <AiFillFilePdf className="text-red-600 text-2xl" />
        <span className="truncate">{pdf.name}</span>
      </Link>
      {idx < arr.length - 1 && (
        <hr className="my-2 border-indigo-200 dark:border-indigo-700 opacity-60" />
      )}
      </li>
      ))}
    </ul>
  )}

    </div>

        </div>
      </div>
            </div>
          </div>
          
    </>
  )
}

export default MyChats;
