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
import { toast } from "sonner";
import lscache from "lscache";

const supabase = createClientComponentClient();

const { createClient } = require("@supabase/supabase-js");

const client = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    realtime: {
      params: {
        eventsPerSecond: 100,
      },
    },
  }
);

const Preview = () => {
  const [conversation, setConversation] = useState([]);
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [pdf, setPdf] = useState(null);
  const params = useParams();
  const router = useRouter();
  const [showThinkingAnimation, setShowThinkingAnimation] = useState(false);
  const [currentResponse, setCurrentResponse] = useState("");
  const [sessionId, setSessionId] = useState();
  const [counter, setCounter] = useState(0);
  const supabase = createClientComponentClient();

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    // localStorage.setItem("questions", 0);

    const sessionId = crypto.randomUUID();
    setSessionId(sessionId);
  }, []);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          router.push("/");
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

    setPdf(data);
  };

  const uploadPdf = async () => {
    try {
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
    } catch (error) {
      console.error(error);
    }
  };
  const convHistory = [];

  const channelA = client.channel(`session-${sessionId}`);
  // This function does not need to be async since you're not awaiting it here

  useEffect(() => {
    // Correctly initialize currentResponse within the scope it will be used

    channelA
      .on("broadcast", { event: "acknowledge" }, (payload) => {
        if (payload.payload) {
          setShowThinkingAnimation(false);
        }
        setCurrentResponse((prev) => (prev += payload.payload.message));

        setConversation((conversation) => {
          const newConversation = [...conversation];
          const lastIndex = newConversation.length - 1;

          // Ensure the last message is of type 'response' before updating
          if (
            newConversation[lastIndex] &&
            newConversation[lastIndex].type === "response"
          ) {
            newConversation[lastIndex] = {
              ...newConversation[lastIndex],
              text: newConversation[lastIndex].text + payload.payload.message,
            };
          } else {
            // If the last message is not a 'response', append a new response message
            newConversation.push({
              type: "response",
              text: payload.payload.message,
            });
          }

          return newConversation;
        });
      })
      .subscribe();

    return () => {};
  }, [conversation]); // Empty dependency array to run once on mount

  const sendMessage = async (messageText) => {
    setCounter((prev) => prev + 1);
    // const index = Number(localStorage.getItem("questions"));
    // localStorage.setItem("questions", index + 1);

    const index = lscache.get("questions");
    lscache.set("questions", index + 1, 1440);
    if (counter == 10 || lscache.get("questions") > 10) {
      showToast(
        "Free daily questions limit reached",
        "Login to start asking more questions! :)"
      );
      return;
    }
    setCurrentResponse("");
    client.removeChannel(channelA);
    if (!messageText.trim()) return;
    setConversation((conversation) => [
      ...conversation,
      { type: "user", text: messageText },
      // { type: "response", text: "", streaming: true }, // Placeholder for streaming response
    ]);

    convHistory.push(messageText);

    try {
      setShowThinkingAnimation(true);
      const response = await fetch("/api/llm/preview", {
        method: "POST",
        body: JSON.stringify({
          sessionId: sessionId,
          messageText: messageText,
          conv_history: convHistory,
          // file_id: currentPdfId,
        }),
      });
    } catch (error) {
      console.log(error);
      return;
    }
  };

  function showToast(title, desc) {
    toast(title, {
      description: desc,
      position: "top-right",

      action: {
        label: "Understood",
        onClick: () => console.log("Undo"),
      },
    });
  }
  return (
    <>
      <title>Preview | AskPDFs</title>

      <div className="mx-12 flex flex-col lg:grid lg:grid-cols-2">
        <div className="rounded-lg border dark:border-slate-900	 shadow5 scrollbar scrollbar-thumb-blue-600 scrollbar-thumb-rounded">
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
            <TextField onSendMessage={sendMessage}></TextField>
            <div className=""></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Preview;
