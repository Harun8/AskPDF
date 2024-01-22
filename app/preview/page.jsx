"use client";
import { Document, Page } from "react-pdf";
// import pdf from ".../public/pdf";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import ConversationDisplay from "@/components/ConversationDisplay";
import TextField from "@/components/TextField";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const Preview = () => {
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
    const getInfo = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        console.log("session", session);

        if (session) {
          router.push("/");
          console.log("THE USER ISSSS AUTHENTICATED REDIRRRREEECCCTT MFFF");
          console.log("THE DONT NEED TO SEE THE PREVIEW PAGE");
        } else {
          loadPDF();
        }
      } catch (error) {
        console.error("Error checking authentication", error);
      }
    };
    getInfo();
  }, [params]);

  const loadPDF = async () => {
    const { data, error } = await supabase.storage
      .from("previewPDF")
      .download(`preview/Praktik hos LINAK.pdf`);

    if (error) throw new Error(error.message);

    console.log("download data ", data);
    setPdf(data);
  };
  const sendMessage = async () => {
    console.log("send message");
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

export default Preview;
