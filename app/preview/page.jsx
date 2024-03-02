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

const supabase = createClientComponentClient();
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
import retriverPDF from "@/util/retrieverPDF";
// const standAloneQuestionTemplate = `Given some conversation history (if any) and a question, convert it into a standalone question.
// conversation history: {conv_history}

// question: {question}
// standalone question:`;

// const standaloneQuestionPrompt = PromptTemplate.fromTemplate(
//   standAloneQuestionTemplate
// );
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
// const answerTemplate = `You're a helpful and enthusiastic suppport bot who can answer a given question about the context provided,
// and the conversation history.
//  Try to find the answer in the context.
//  Do not try to make up an answer. Always speak as if you were chatting to a friend.
//  context: {context}
//  conversation history: {conv_history}
//  question: {question}
//  answer:
//   `;

// const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);

const Preview = () => {
  const [conversation, setConversation] = useState([]);
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [pdf, setPdf] = useState(null);
  const params = useParams();
  const router = useRouter();
  const [showThinkingAnimation, setShowThinkingAnimation] = useState(false);
  const [currentResponse, setCurrentResponse] = useState("");

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
  // const llm = new ChatOpenAI({
  //   openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  //   modelName: modelChooser(null),
  //   streaming: true,
  //   //  temperature: 0.5
  // });

  // // console.log("min LLM ER:", llm);

  // const standaloneQuestionchain = standaloneQuestionPrompt
  //   .pipe(llm)
  //   .pipe(new StringOutputParser());

  // const retrieverChain = RunnableSequence.from([
  //   (prevResult) => prevResult.standalone_question,
  //   (prevResult) => retriverPDF(prevResult),
  //   combineDocuments,
  // ]);

  // const answerChain = answerPrompt.pipe(llm).pipe(new StringOutputParser());

  // const chain = RunnableSequence.from([
  //   {
  //     standalone_question: standaloneQuestionchain,
  //     original_input: new RunnablePassthrough(),
  //   },
  //   {
  //     context: retrieverChain,
  //     question: ({ original_input }) => original_input.question,
  //     conv_history: ({ original_input }) => original_input.conv_history,
  //   },
  //   answerChain,
  // ]);

  const channelA = client.channel("room-1");

  useEffect(() => {
    console.log("useffect called");
    // Correctly initialize currentResponse within the scope it will be used

    console.log("current response", currentResponse);
    channelA
      .on("broadcast", { event: "test" }, (payload) => {
        console.log("payload", payload);
        if (payload.payload) {
          setShowThinkingAnimation(false);
        }
        setCurrentResponse((prev) => (prev += payload.payload.message));
        setConversation((conversation) => {
          // Clone the current conversation
          const newConversation = [...conversation];
          // Update the last message's text with the accumulated currentResponse
          newConversation[newConversation.length - 1] = {
            ...newConversation[newConversation.length - 1],
            type: "response",
            text: currentResponse,
          };
          return newConversation;
        });
      })
      .subscribe();

    return () => {
      // console.log("Attempting to unsubscribe", channelA);
      // channelA.unsubscribe();
      // console.log("Unsubscribed", channelA);
      // currentResponse = "";
    };
  }, [conversation]); // Empty dependency array to run once on mount

  const sendMessage = async (messageText) => {
    setCurrentResponse("");
    client.removeChannel(channelA);
    if (!messageText.trim()) return;
    setConversation((conversation) => [
      ...conversation,
      { type: "user", text: messageText },
      { type: "response", text: "", streaming: true }, // Placeholder for streaming response
    ]);

    convHistory.push(messageText);

    try {
      setShowThinkingAnimation(true);
      const response = await fetch("/api/llm/preview", {
        method: "POST",
        body: JSON.stringify({
          // plan: plan,
          messageText: messageText,
          conv_history: convHistory,
          // file_id: currentPdfId,
        }),
      });

      // const response = await chain.stream({
      //   question: messageText,
      //   conv_history: await formatConvHistory(convHistory),
      // });

      // if (response) {
      //   setShowThinkingAnimation(false);
      // }
      // let currentResponse = ""; // Initialize an empty string to accumulate the content
      // for await (const chunk of response) {
      //   console.log(`${chunk}|`);
      //   currentResponse += chunk;

      //   // Update the last message in the conversation with the new currentResponse
      //   setConversation((conversation) => {
      //     // Clone the current conversation
      //     const newConversation = [...conversation];
      //     // Update the last message's text with the accumulated currentResponse
      //     newConversation[newConversation.length - 1] = {
      //       ...newConversation[newConversation.length - 1],
      //       type: "response",
      //       text: currentResponse,
      //     };
      //     return newConversation;
      //   });
      // }
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
