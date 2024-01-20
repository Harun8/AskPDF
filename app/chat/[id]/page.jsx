"use client";
import { Document, Page } from "react-pdf";
// import pdf from ".../public/pdf";
import { pdfjs } from "react-pdf";
import pdf from "@/public/pdf.pdf";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import ConversationDisplay from "@/components/ConversationDisplay";
import TextField from "@/components/TextField";

const ChatPage = () => {
  const [conversation, setConversation] = useState([]);

  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [pdf, setPdf] = useState(null);
  const params = useParams();
  const supabase = createClientComponentClient();

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    const getAuth = async () => {};

    getAuth();
  }, []);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        console.log("session", session);

        if (session) {
          const response = await fetch(`/api/chat/${params.id}`, {
            method: "POST",
            body: JSON.stringify({
              userID: session.user.id,
            }),
          });

          if (!response.ok) {
            throw new Error("API call failed");
          }
          if (response.ok) {
            const data = await response.json();
            console.log("response", data);
            fetchPdfFilePath(params.id);
          }
        } else {
          router.push("/");
          console.log("THE USER AINT AUTHENTICATED REDIRRRREEECCCTT MFFF");
        }
      } catch (error) {
        console.error("Error checking authentication", error);
        // Handle error as appropriate
      }

      // Make sure to use the `id` in the request
    };
    getInfo();
  }, [params]);

  async function fetchPdfFilePath(pdfId) {
    const { data, error } = await supabase
      .from("pdfs") // Replace with your table name
      .select("file_id") // Adjust based on your schema
      .eq("id", pdfId)
      .single();

    if (error) throw new Error(error.message);

    console.log("data", data);

    return fetchPdfUrl(data.file_id);
  }

  async function fetchPdfUrl(file_id) {
    console.log("file_id", file_id);

    const { data, error } = await supabase
      .schema("storage")
      .from("objects")
      .select("path_tokens")
      .eq("id", file_id);

    // const { data, error } = await supabase
    // .storage
    // .from('pdfs')
    // .download('folder/avatar1.png')

    if (error) throw new Error(error.message);

    console.log("publicURL", data);

    if (data) {
      console.log(
        "Path to file, ",
        data[0].path_tokens[0] + data[0].path_tokens[1]
      );
      const { data: download, error } = await supabase.storage
        .from("pdfs")
        .download(`${data[0].path_tokens[0]}/${data[0].path_tokens[1]}`);

      console.log("download data ", download);

      if (error) throw new Error(error.message);

      setPdf(download);
    }
  }

  const sendMessage = () => {
    console.log("Send message");
  };

  return (
    <div className="mx-12 grid gap-4 grid-cols-2">
      <div className="rounded-lg border shadow5">
        <div className=" p-12 bg-gray h-[800px] overflow-y-auto  ">
          {pdf ? (
            <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
              {Array.apply(null, Array(numPages))
                .map((x, i) => i + 1)
                .map((page) => {
                  return (
                    <Page
                      className="mb-12"
                      pageNumber={page}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />
                  );
                })}
            </Document>
          ) : (
            <h1>no file</h1>
          )}
        </div>
      </div>

      <div className="flex flex-col justify-between h-full">
        <div className="flex-grow overflow-y-auto">
          <ConversationDisplay conversation={conversation} />
        </div>
        <div className="mt-4">
          <TextField onSendMessage={sendMessage}></TextField>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
