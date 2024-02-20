"use client";
const { createClient } = require("@supabase/supabase-js");
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

const MyChats = () => {
  const [pdfs, setPdfs] = useState([]);
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        console.log("session", session);
        setUserId(session.user.id);
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const getFiles = async () => {
      try {
        const { data, error } = await supabase.storage
          .from("pdfs")
          .list(userId);
        console.log("pdfs", data);
        setPdfs(data);
      } catch (error) {
        console.error(error);
      }
    };
    getFiles();
  }, [userId]);

  const getPdfId = (id) => {
    console.log("id", id);
    // router.push(`/chat/${id}`);
  };

  return (
    <>
      <div className="flex justify-center text-black dark:text-white">
        <div className="flex justify-center">
          <div className="mt-20">
            {pdfs.map((pdf) => {
              return (
                <a
                  className="flex justify-start mb-12 text-lg font-medium  bg-zinc-300 rounded p-6"
                  onClick={() => getPdfId(pdf.id)}
                  key={Math.random()}>
                  {pdf.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyChats;
