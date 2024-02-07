"use client";
import { Dialog, Transition } from "@headlessui/react";

import { Document, Page } from "react-pdf";
// import pdf from ".../public/pdf";
import { pdfjs } from "react-pdf";
import pdf from "@/public/pdf.pdf";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
import React, { Fragment, useState, useEffect } from "react";
import "@/public/styles/chat.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import TextField from "@/components/TextField";
import ConversationDisplay from "@/components/ConversationDisplay";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect, useRouter } from "next/navigation";
import sendFileToOpenAi from "@/util/openai";
import OpenAI from "openai";
import Modal from "@/components/Modal";

import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { StringOutputParser } from "langchain/schema/output_parser";
import { retriver } from "@/util/retriever";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "langchain/schema/runnable";
import combineDocuments from "./../../util/combineDocuments";

const supabase = createClientComponentClient();

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_API_KEY, // api key
  dangerouslyAllowBrowser: true, // should be false
});

const llm = new ChatOpenAI({
  openAIApiKey: process.env.NEXT_PUBLIC_API_KEY,
  streaming: true,
  // modelName: "gpt-4-0125-preview",
  //  temperature: 0.5
});

export default function chat() {
  const [conversation, setConversation] = useState([]);
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [pdf, setPdf] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPdfId, setCurrentPdfId] = useState(null);
  const [chatId, setChatId] = useState("");
  const [userId, setUserId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isTextDisabled, setIsTextDisabled] = useState(true);
  const [duplicateFileError, setDuplicateFileError] = useState(false);

  const router = useRouter();
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // const tweetTemplate = `Generate a response for this product: {pdfFile}`;

  // const tweetPrompt = PromptTemplate.fromTemplate(tweetTemplate);

  // const tweetChain = tweetPrompt.pipe(llm);

  // clean the user question
  const standAloneQuestionTemplate = `Given some conversation history (if any) and a question, convert it into a standalone question. 
    conversation history: {conv_history}
    
    question: {question} 
    standalone question:`;

  const standaloneQuestionPrompt = PromptTemplate.fromTemplate(
    standAloneQuestionTemplate
  );

  const answerTemplate = `You're a helpful and enthusiastic suppport bot who can answer a given question about the context provided
  and the conversation history.
     Try to find the answer in the context. If the answer is not given in the context, check if the answer is in the conversation history.
     If you really do not know the answer
     say "I'm sorry, I can not find it in the PDF".
     Do not try to make up an answer. Always speak as if you were chatting to a friend.
     context: {context}
     conversation history: {conv_history}
     question: {question}
     answer: 
      `;

  const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);

  const standaloneQuestionchain = standaloneQuestionPrompt
    .pipe(llm)
    .pipe(new StringOutputParser());

  const retrieverChain = RunnableSequence.from([
    (prevResult) => prevResult.standalone_question, // 1
    retriver, // 2
    combineDocuments, // 3
  ]);
  const answerChain = answerPrompt.pipe(llm).pipe(new StringOutputParser());

  // standalone question works pretty well
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

  useEffect(() => {
    const getAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        // console.log("session", session);

        if (session) {
          setUserId(session.user.id);
          setIsAuthenticated(true);
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
    console.log("convo", conversation);
  }, [conversation]);

  const convHistory = [];

  function formatConvHistory(messages) {
    return messages
      .map((message, i) => {
        if (i % 2 === 0) {
          return `Human: ${message}`;
        } else {
          return `AI: ${message}`;
        }
      })
      .join(`\n`);
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

    try {
      // console.log("check check");
      const response = await chain.invoke({
        question: messageText,
        conv_history: formatConvHistory(convHistory),
      });
      for await (const chunk of response) {
        const content = chunk;
        // Accumulate the content.
        currentResponse += content;
        // console.log(currentResponse);
        setConversation((prevConversation) => {
          updatedConversation = [...prevConversation];

          // Check if the last entry is a response and update it, or create a new response entry
          if (
            updatedConversation.length > 0 &&
            updatedConversation[updatedConversation.length - 1].type ===
              "response"
          ) {
            // console.log("i got here 1", currentResponse);
            updatedConversation[updatedConversation.length - 1].text =
              currentResponse;
          } else {
            // console.log("i got here 2");

            updatedConversation.push({
              type: "response",
              text: currentResponse,
            });
          }

          // currentResponse = ""; // Clear currentResponse after updating the conversation.
          return updatedConversation;
        });
      }
      convHistory.push(messageText);
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

  const saveMessages = async () => {
    console.log("In save message fn");
    console.log("convo", conversation);
  };

  const onFileSelect = async (event) => {
    console.log("Is the modal open? ", isOpen);
    event.stopPropagation();
    let filePath;
    let file_id;
    console.log("file chosen, upload it to db", event);
    const fileSizeLimit = 5 * 1024 * 1024; // 5MB
    if (event.target.files[0].size > fileSizeLimit) {
      console.log("SHIT IS TOO BIGG FAMALAM");
      event.target.value = "";
    } else {
      console.log("Is the modal open? ", isOpen);

      filePath = `${userId}/${event.target.files[0].name}`;
      console.log("userid", userId);
      const { data, error } = await supabase.storage
        .from("pdfs")
        .upload(filePath, event.target.files[0]);
      if (error) {
        setDuplicateFileError(true);
        // Handle error
        console.log("error", error.message);
        return;
      } else {
        setDuplicateFileError(false);

        setPdf(event.target.files[0]); // call method
        console.log("Is the modal open? ", isOpen);

        console.log("File upload success", data);
        console.log("data.id", data.id);
        file_id = data.id;
        // Handle success
      }

      try {
        console.log("Is the modal open? ", isOpen);

        const formData = new FormData();
        // a web API that allows you to easily construct a set of key/value pairs representing form fields and their values
        formData.append("file", event.target.files[0]);
        formData.append("file_title", event.target.files[0].name);
        formData.append("file_id", file_id);
        formData.append("userId", userId);

        const response = await fetch("/api/chat", {
          method: "POST",
          body: formData,
        });

        console.log("Content-Type: ", response.headers.get("Content-Type"));

        if (response.ok) {
          console.log("Is the modal open? ", isOpen);

          try {
            setIsTextDisabled(false);
            const textResponse = await response.text(); // Read response as text
            console.log("Response Text: ", textResponse);

            // If you still need to parse JSON from the text
            try {
              const data = JSON.parse(textResponse); // Try parsing as JSON
              console.log("Parsed Data: ", data);
              setCurrentPdfId(data.pdfIds[0]);
              setChatId(data.chatId);
              history.replaceState(data, "convo", `/chat/${data.pdfIds[0]}`);

              // router.replace(`/chat/${data.pdfIds[0]}`, undefined, { shallow: true });
            } catch (jsonError) {
              console.error("Error parsing JSON from text: ", jsonError);
              // Handle case where text is not JSON
            }
          } catch (error) {
            console.error("Error reading text response: ", error);
          }
        } else {
          console.log("Response not OK: ", response.status);
        }

        // const result = await response.json();
        // console.log(result); // handle the response
      } catch (error) {
        console.log("error in chat page", error);
      }
    }
  };

  function closeModal() {
    setDuplicateFileError(false);
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="mx-12 grid gap-4 grid-cols-2">
      <div className="rounded-lg border shadow5">
        {pdf ? (
          <div className=" p-12 bg-gray h-[800px] overflow-y-auto  ">
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
          </div>
        ) : (
          <div className="flex justify-center mt-48">
            <button onClick={openModal}> Click me</button>
            <div className="text">{/* <span>Click to upload PDF</span> */}</div>

            <Modal
              isDuplicate={duplicateFileError}
              title={
                duplicateFileError
                  ? "You've already uploaded this file"
                  : "Upload your image"
              }
              isOpen={isOpen}
              closeModal={closeModal}
              openModal={openModal}
              onFileSelect={onFileSelect}></Modal>

            {/* <input
                size="100"
                onChange={(event) => onFileSelect(event)}
                type="file"
                id="file"
                accept="application/pdf"></input> */}
          </div>
        )}

        {pdf && (
          <p>
            Page {pageNumber} of {numPages}
          </p>
        )}
      </div>

      <div className="flex flex-col justify-between h-full">
        <div className="flex-grow overflow-y-auto">
          <ConversationDisplay conversation={conversation} />
        </div>

        <div className="mt-4">
          <TextField
            // isDisabled={isTextDisabled}
            onSendMessage={sendMessage}></TextField>
        </div>
      </div>
    </div>
  );
}
