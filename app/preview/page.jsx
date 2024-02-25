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
import { redirect, useRouter } from "next/navigation";

import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.NEXT_PUBLIC_API_KEY, // api key
//   dangerouslyAllowBrowser: true, // should be false
// });

const Preview = () => {
  const [conversation, setConversation] = useState([]);
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [pdf, setPdf] = useState(null);
  const params = useParams();
  const router = useRouter();
  const [showThinkingAnimation, setShowThinkingAnimation] = useState(false);

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
      .download(`preview/Cuckoo.pdf`);

    if (error) throw new Error(error.message);

    console.log("download data ", data);
    setPdf(data);
  };

  const uploadPdf = async () => {
    try {
      console.log("Is the modal open? ", isOpen);

      const formData = new FormData();
      // a web API that allows you to easily construct a set of key/value pairs representing form fields and their values
      formData.append("file", pdf);
      formData.append("file_title", "praktik");
      // formData.append("file_id", file_id);
      // formData.append("userId", userId);

      const response = await fetch("/api/llm/preview", {
        method: "POST",
        body: formData,
      });

      console.log("Content-Type: ", response.headers.get("Content-Type"));

      if (response.ok) {
        console.log("request worked");
      }
    } catch (error) {
      console.error;
    }
  };
  const convHistory = [];

  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return;
    const newMessage = { type: "user", text: messageText };
    setConversation([...conversation, newMessage]);

    convHistory.push(messageText);

    try {
      setShowThinkingAnimation(true);

      const response = await fetch("/api/llm/preview", {
        method: "POST",
        body: JSON.stringify({
          plan: null,
          messageText: messageText,
          conv_history: convHistory,
          // file_id: params.id,
        }),
      });

      const data = await response.json();
      console.log("data", data);
      convHistory.push(data);
      // Assuming data contains the chatbot response text
      if (data) {
        setShowThinkingAnimation(false);

        const chatbotResponse = {
          type: "response",
          text: data,
        };
        // Adding chatbot response to the conversation
        setConversation((conversation) => [...conversation, chatbotResponse]);
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };
  return (
    <div className="mx-12 flex flex-col lg:grid lg:grid-cols-2">
      <div className="rounded-lg border shadow5">
        <div className=" p-6 bg-gray h-[800px] overflow-y-auto  ">
          {pdf ? (
            <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
              {Array.apply(null, Array(numPages))
                .map((x, i) => i + 1)
                .map((page) => {
                  return (
                    <Page
                      className=""
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

      <div className="">
        <div className="">
          <ConversationDisplay
            showThinkingAnimation={showThinkingAnimation}
            conversation={conversation}
          />
        </div>
        <div className="mt-4">
          <TextField onSendMessage={sendMessage}></TextField>
        </div>
      </div>
    </div>
  );
};

export default Preview;
