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
import combineDocuments from "@/util/combineDocuments";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { StringOutputParser } from "langchain/schema/output_parser";
import { retriver } from "@/util/retriever";

import OpenAI from "openai";

const ChatPage = () => {
  const [conversation, setConversation] = useState([]);

  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [pdf, setPdf] = useState(null);
  const [chat_id, setChat_id] = useState(null);
  const [userId, setUserId] = useState(null);
  const [answer, setAnswer] = useState([]);
  const [question, setQuestion] = useState([]);
  let currentPdfId;
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

  const sendMessage = async (messageText) => {
    let answerIndex = [];
    let pdfTexts;
    // console.log("msgTExt", messageText);
    if (!messageText.trim()) return;
    const newMessage = { type: "user", text: messageText };
    setConversation([...conversation, newMessage]);
    let updatedConversation;
    let currentResponse = ""; // Initialize an empty string to accumulate the content
    let chunkHolder = [];

    convHistory.push(messageText);

    try {
      // console.log("check check");
      const response = await chain.invoke({
        question: messageText,
        conv_history: formatConvHistory(convHistory),
      });
      // for await (const chunk of response) {
      //   const content = chunk;
      //   // Accumulate the content.
      //   currentResponse += content;
      //   // console.log(currentResponse);
      //   setConversation((prevConversation) => {
      //     updatedConversation = [...prevConversation];

      //     // Check if the last entry is a response and update it, or create a new response entry
      //     if (
      //       updatedConversation.length > 0 &&
      //       updatedConversation[updatedConversation.length - 1].type ===
      //         "response"
      //     ) {
      //       // console.log("i got here 1", currentResponse);
      //       updatedConversation[updatedConversation.length - 1].text =
      //         currentResponse;
      //     } else {
      //       // console.log("i got here 2");

      //       updatedConversation.push({
      //         type: "response",
      //         text: currentResponse,
      //       });
      //     }

      //     // currentResponse = ""; // Clear currentResponse after updating the conversation.
      //     return updatedConversation;
      //   });
      // }
      convHistory.push(currentResponse);
      console.log("conv", convHistory);

      // console.log("Convo", updatedConversation);

      if (!conversation.length > 0) {
        answerIndex = conversation.length - 2;
        console.log("I am saving this: ");
      } else {
      }
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
