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
import Streamer from "@/util/openai/streamer";
import { ChatOpenAI } from "@langchain/openai";
import { modelChooser } from "@/util/openai/modelChooser";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import combineDocuments from "@/util/combineDocuments";
import formatConvHistory from "@/util/formatConvHistory";
const OpenAI = require("openai");
const { createClient } = require("@supabase/supabase-js");
import retriver from "@/util/retriever";
const standAloneQuestionTemplate = `Given some conversation history (if any) and a question, convert it into a standalone question. 
conversation history: {conv_history}

question: {question} 
standalone question:`;

const standaloneQuestionPrompt = PromptTemplate.fromTemplate(
  standAloneQuestionTemplate
);

const answerTemplate = `You're a helpful and enthusiastic suppport bot who can answer a given question about the context provided,
and the conversation history. 
 Try to find the answer in the context.
 Do not try to make up an answer. Always speak as if you were chatting to a friend.
 context: {context}
 conversation history: {conv_history}
 question: {question}
 answer:
  `;

const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);

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
          console.log("data with plan", data);
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
  const llm = new ChatOpenAI({
    openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    modelName: modelChooser(plan),
    streaming: true,
    //  temperature: 0.5
  });

  // console.log("min LLM ER:", llm);

  const standaloneQuestionchain = standaloneQuestionPrompt
    .pipe(llm)
    .pipe(new StringOutputParser());

  const retrieverChain = RunnableSequence.from([
    (prevResult) => prevResult.standalone_question,
    (prevResult) => retriver(prevResult, params.id),
    combineDocuments,
  ]);

  const answerChain = answerPrompt.pipe(llm).pipe(new StringOutputParser());

  const chain = RunnableSequence.from([
    {
      standalone_question: standaloneQuestionchain,
      original_input: new RunnablePassthrough(),
    },
    {
      context: retrieverChain,
      question: ({ original_input }) => original_input.question,
      conv_history: ({ original_input }) => original_input.conv_history,
    },
    answerChain,
  ]);

  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return;
    // Add a new user message and a placeholder for the chatbot response
    setConversation((conversation) => [
      ...conversation,
      { type: "user", text: messageText },
      { type: "response", text: "", streaming: true }, // Placeholder for streaming response
    ]);

    let currentResponse = ""; // Initialize an empty string to accumulate the content

    convHistory.push(messageText);

    try {
      setShowThinkingAnimation(true);

      const response = await chain.stream({
        question: messageText,
        conv_history: await formatConvHistory(convHistory),
      });

      if (response) {
        setShowThinkingAnimation(false);
      }
      let currentResponse = ""; // Initialize an empty string to accumulate the content

      // console.log("response", response);

      for await (const chunk of response) {
        console.log(`${chunk}|`);
        currentResponse += chunk;

        setConversation((conversation) => {
          const newConversation = [...conversation];
          // Find the index of the response placeholder
          const responseIndex = newConversation.findIndex(
            (msg) => msg.type === "response" && msg.streaming
          );
          if (responseIndex !== -1) {
            newConversation[responseIndex] = {
              type: "response",
              text: currentResponse,
              streaming: true,
            };
          }
          return newConversation;
        });
      }
      // After the streaming loop completes
      setConversation((conversation) => {
        const newConversation = [...conversation];
        const responseIndex = newConversation.findIndex(
          (msg) => msg.type === "response" && msg.streaming
        );
        if (responseIndex !== -1) {
          newConversation[responseIndex] = {
            ...newConversation[responseIndex],
            streaming: false, // Indicate streaming is complete
          };
        }
        return newConversation;
      });

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

export default ChatPage;
