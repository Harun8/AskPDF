"use client";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import ConversationDisplay from "@/components/ConversationDisplay";
import TextField from "@/components/TextField";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";

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
const ChatPage = () => {
  const [conversation, setConversation] = useState([]);
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [pdf, setPdf] = useState(null);
  const [chat_id, setChat_id] = useState(null);
  const [userId, setUserId] = useState(null);
  const [answer, setAnswer] = useState([]);
  const [question, setQuestion] = useState([]);
  const [plan, setPlan] = useState(null);
  const [uploadCount, setUploadCount] = useState(null);
  const [showThinkingAnimation, setShowThinkingAnimation] = useState(false);
  const [currentResponse, setCurrentResponse] = useState("");
  const [title, setTitle] = useState("")

  const router = useRouter();
  let currentPdfId;
  const params = useParams();
  const supabase = createClientComponentClient();
  const t = useTranslations("chat");

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    const getAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          const response = await fetch("/api/abilities", {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Specify the content type as JSON
            },
            body: JSON.stringify({
              user_id: session.user.id,
            }),
          });

          if (!response.ok) {
            console.error("response to abilities endpoint failed");
          }

          const data = await response.json();
          setPlan(data.fileSize);
          setUploadCount(data.upload);
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Error checking authentication", error);
        // Handle error as appropriate
      }
    };

    getAuth();
  }, []);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          setUserId(session.user.id);

          currentPdfId = params.id;
          fetchPdfUrl(params.id);
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Error checking authentication", error);
        // Handle error as appropriate
      }

      // Make sure to use the `id` in the request
    };
    getInfo();
  }, [params]);

  async function fetchPdfUrl(file_id) {
    const { data, error } = await supabase
      .schema("storage")
      .from("objects")
      .select("path_tokens")
      .eq("id", file_id);

    if (error) throw new Error(error.message);
    console.log(data[0].path_tokens[1].split(".pdf")[0])
    setTitle(data[0].path_tokens[1].split(".pdf")[0])

    if (data) {
      const { data: download, error } = await supabase.storage
        .from("pdfs")
        .download(`${data[0].path_tokens[0]}/${data[0].path_tokens[1]}`);

      if (error) throw new Error(error.message);

      console.log(download)
      setPdf(download);
    }
  }

  const convHistory = [];
  const channelA = client.channel(`session-${userId}`);

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
    setCurrentResponse("");
    client.removeChannel(channelA);
    if (!messageText.trim()) return;
    // Add a new user message and a placeholder for the chatbot response
    setConversation((conversation) => [
      ...conversation,
      { type: "user", text: messageText },
      // { type: "response", text: "", streaming: true }, // Placeholder for streaming response
    ]);

    convHistory.push(messageText);
    try {
      setShowThinkingAnimation(true);
      const response = await fetch("/api/llm", {
        method: "POST",
        body: JSON.stringify({
          sessionId: userId,

          plan: plan,
          messageText: messageText,
          conv_history: convHistory,
          file_id: params.id,
        }),
      });
    } catch (error) {
      console.error(error);
      return;
    }
  };

  console.log(params.locale)
  return (
    <>
<header className="sticky top-0 z-10 backdrop-blur-lg bg-zinc-100/80 dark:bg-blue-900/80 border-b dark:border-blue-800">
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
      <h2 className="font-semibold">{title}</h2>
    </div>

    {/* Right Section */}
    <div className="flex items-center gap-2 mr-8">

            <Button
        variant="newChat"
        size="newChat"
        onClick={() => router.push(`/${params.locale}/chat`)}
      >
        {t("newChat")}
      </Button>
    </div>
  </div>
</header>

      <div className="mx-12 flex flex-col lg:grid lg:grid-cols-2">
        <div className="rounded-lg border shadow5">
          <div className="p-4 bg-gray h-[800px] overflow-y-auto">
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
              <div className="flex justify-center mt-48">
              <h1 className="text-gray-600">loading file ...</h1>
              </div>
            )}
          </div>
        </div>

        <div className="">
          <div className="">
            <ConversationDisplay
              processingPDF={false}
              showThinkingAnimation={showThinkingAnimation}
              conversation={conversation}
              sendMessage={sendMessage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
