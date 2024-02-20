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

  let currentPdfId;
  const params = useParams();
  const supabase = createClientComponentClient();

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    const getAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        // console.log("session", session);

        if (session) {
          setIsAuthenticated(true);
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
            console.log("Could not fetch abilities");
          }

          const data = await response.json();
          console.log("data", data);
          setPlan(data.fileSize);
          setUploadCount(data.upload);
        } else {
          router.push("/");
          console.log("THE USER AINT AUTHENTICATED REDIRRRREEECCCTT MFFF");
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
        console.log("session", session);

        if (session) {
          setUserId(session.user.id);
          const response = await fetch(`/api/chat/${params.id}`, {
            method: "POST",
            body: JSON.stringify({
              userID: session.user.id,
            }),
          });
          console.log("params.id", params.id);

          if (!response.ok) {
            throw new Error("API call failed");
          }
          if (response.ok) {
            const data = await response.json();
            currentPdfId = params.id;

            console.log("params.id", params.id);

            console.log("response", data);
            fetchPdfUrl(params.id);
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

  async function fetchPdfUrl(file_id) {
    console.log("file_id", file_id);

    const { data, error } = await supabase
      .schema("storage")
      .from("objects")
      .select("path_tokens")
      .eq("id", file_id);

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
  const convHistory = [];

  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return;
    const newMessage = { type: "user", text: messageText };
    setConversation([...conversation, newMessage]);
    let currentResponse = ""; // Initialize an empty string to accumulate the content

    convHistory.push(messageText);

    try {
      const response = await fetch("/api/llm", {
        method: "POST",
        body: JSON.stringify({
          plan: plan,
          messageText: messageText,
          conv_history: convHistory,
          file_id: params.id,
        }),
      });

      const data = await response.json();
      console.log("data", data);
      convHistory.push(data);
      // Assuming data contains the chatbot response text
      if (data) {
        const chatbotResponse = {
          type: "response",
          text: data,
        };
        // Adding chatbot response to the conversation
        setConversation((conversation) => [...conversation, chatbotResponse]);
      }

      convHistory.push(currentResponse);
      console.log("conv", convHistory);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <div className="mx-12 grid gap-4 grid-cols-2">
      <div className="rounded-sm border shadow5">
        <div className=" p-4 bg-gray h-[800px] overflow-y-auto  ">
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
