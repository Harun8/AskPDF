"use client";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import ConversationDisplay from "@/components/ConversationDisplay";
import TextField from "@/components/TextField";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";
import ChatNav from "@/components/ChatNav";
import {
  conversationLogic,
  useConversationLogic,
} from "@/util/streaming/chat-util";
import { useMutation, useQuery } from "@tanstack/react-query";

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
  const [title, setTitle] = useState("");

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
    console.log(data[0].path_tokens[1].split(".pdf")[0]);
    setTitle(data[0].path_tokens[1].split(".pdf")[0]);

    if (data) {
      const { data: download, error } = await supabase.storage
        .from("pdfs")
        .download(`${data[0].path_tokens[0]}/${data[0].path_tokens[1]}`);

      if (error) throw new Error(error.message);

      console.log(download);
      setPdf(download);
    }
  }

  const convHistory = [];
  const channelA = client.channel(`session-${userId}`);

  useConversationLogic(
    channelA,
    setShowThinkingAnimation,
    setCurrentResponse,
    setConversation,
    conversation
  );

  const sendMessageMutation = useMutation({
    mutationFn: async (messageText) => {
      const response = await fetch("/api/llm", {
        method: "POST",
        body: JSON.stringify({
          sessionId: userId,
          plan,
          messageText,
          conv_history: convHistory,
          file_id: params.id,
        }),
      });

      if (!response.ok) {
        setShowThinkingAnimation(false);

        throw new Error("Request failed");
      }

      return response.json();
    },
  });

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

      await sendMessageMutation.mutateAsync(messageText);
    } catch (error) {
      console.error(error);
      return;
    }
  };

  console.log(params.locale);
  return (
    <>
      <ChatNav
        showBtn={true}
        btnTitle={t("newChat")}
        redirect="chat"
        title={title}
      ></ChatNav>

      <div className="mx-12 flex flex-col lg:grid lg:grid-cols-2">
        <div className="rounded-lg border dark:border-gray-950 shadow5">
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
