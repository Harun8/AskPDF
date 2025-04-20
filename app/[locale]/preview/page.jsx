"use client";
import { Document, Page } from "react-pdf";
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

const { createClient } = require("@supabase/supabase-js");
import { useTranslations } from "next-intl";

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

const Preview = ({ params: { locale } }) => {
  const t = useTranslations("PathnamesPage");
  // setRequestLocale(locale);

  const [conversation, setConversation] = useState([]);
  const [numPages, setNumPages] = useState();
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
    loadPDF();
  }, [params]);

  // update this
  // useEffect(() => {
  //   const getInfo = async () => {
  //     try {
  //       const {
  //         data: { session },
  //       } = await supabase.auth.getSession();

  //       if (session) {
  //         router.push("/");
  //       } else {
  //         loadPDF();
  //       }
  //     } catch (error) {
  //       console.error("Error checking authentication", error);
  //     }
  //   };
  //   getInfo();
  // }, [params]);

  const loadPDF = async () => {
    // Check if the PDF is already cached in localStorage
    const cachedPdf = localStorage.getItem("cachedPreviewPDF");

    if (cachedPdf) {
      // Parse the base64 string and convert it back into a Blob for rendering
      const byteCharacters = atob(cachedPdf);
      const byteNumbers = new Array(byteCharacters.length)
        .fill(null)
        .map((_, i) => byteCharacters.charCodeAt(i));
      const byteArray = new Uint8Array(byteNumbers);

      const blob = new Blob([byteArray], { type: "application/pdf" });
      setPdf(blob);
      return;
    }

    // Fetch the PDF from Supabase if not cached
    const { data, error } = await supabase.storage
      .from("previewPDF")
      .download(`preview/Cuckoo.pdf`);

    if (error) {
      console.error("Error fetching PDF:", error);
      return;
    }

    // Cache the PDF in localStorage
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1]; // Get the base64 string
      localStorage.setItem("cachedPreviewPDF", base64String);
    };
    reader.readAsDataURL(data); // Convert the Blob to a base64 string

    // Set the PDF for display
    setPdf(data);
  };

  // used if i want another file to preview
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
      },
    });
  }
  return (
    <>
      <title>Preview | AskPDFs</title>
      <header className="sticky top-0 z-10 backdrop-blur-lg bg-zinc-100/80 dark:bg-slate-800 border-b dark:border-gray-950">
        <div className="w-full flex items-center justify-between px-4 py-3">
          {/* Left Section */}
          <div className="flex items-center">
            <div className="mr-6 pl-0">
              <svg
                        className="cursor-pointer"
                        onClick={() => router.push(`/${params.locale}/`)}
                xmlns="http://www.w3.org/2000/svg"
                width={25}
                height={25}
                viewBox="0 0 448 512"
              >
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
              </svg>
            </div>
            <h2 className="font-semibold">Coukoo Hashing for Undergraduates</h2>
          </div>
      
          {/* Right Section */}
          {/* <div className="flex items-center gap-2 mr-8">
      
                  <Button
              variant="newChat"
              size="newChat"
              onClick={() => router.push(`/${params.locale}/chat`)}
            >
              {t("newChat")}
            </Button>
          </div> */}
        </div>
      </header>

      <div className="mx-12 flex flex-col lg:grid lg:grid-cols-2">
        {/* <hi>{t("title")}</hi> */}
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
              sendMessage={sendMessage}  

            />
            {/* <TextField onSendMessage={sendMessage}></TextField> */}
            <div className=""></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Preview;
