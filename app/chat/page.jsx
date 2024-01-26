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

const openai = new OpenAI({
  apiKey: "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", // api key
  dangerouslyAllowBrowser: true, // should be false
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

  const router = useRouter();
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const pdfURL = "/pdf.pdf";
  const supabase = createClientComponentClient();

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

  const sendMessage = async (messageText) => {
    let answer = [];
    let pdfTexts;
    console.log("msgTExt", messageText);
    if (!messageText.trim()) return;

    const newMessage = { type: "user", text: messageText };
    setConversation([...conversation, newMessage]);

    try {
      let { data: pdfs, error } = await supabase
        .from("pdfs")
        .select("*")
        .eq("id", currentPdfId);

      if (error) {
        console.log("Error", error);
        throw error;
      }

      if (pdfs.length === 0) {
        console.log("No PDF found with the given ID.");
        return;
      }

      pdfTexts = pdfs.map((pdf) => pdf.text);
      console.log("PDF text type", typeof pdfTexts[0]);
      console.log("Number of PDFs", pdfTexts.length);
    } catch (error) {
      console.log(error);
      return;
    }

    let flattenedPdfTexts = pdfTexts.flat();

    let messages = [
      { role: "system", content: "You are a helpful assistant." },
      ...flattenedPdfTexts.map((pdfText) => ({
        role: "user",
        content: pdfText,
      })),
      { role: "user", content: messageText },
    ];

    console.log("messages ", messages);
    // Add the user's query at the end
    messages.push({ role: "user", content: messageText });

    // Call the OpenAI API
    let completion;
    try {
      let currentResponse = ""; // Initialize an empty string to accumulate the content

      completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0301",
        messages: messages,
        stream: true,
      });

      let updatedConversation;

      for await (const chunk of completion) {
        if (chunk.choices[0].delta.content != null) {
          const content = chunk.choices[0].delta.content;

          // Accumulate the content.
          currentResponse += content;
          console.log(currentResponse);
          setConversation((prevConversation) => {
            updatedConversation = [...prevConversation];

            // Check if the last entry is a response and update it, or create a new response entry
            if (
              updatedConversation.length > 0 &&
              updatedConversation[updatedConversation.length - 1].type ===
                "response"
            ) {
              updatedConversation[updatedConversation.length - 1].text +=
                currentResponse;
            } else {
              updatedConversation.push({
                type: "response",
                text: currentResponse,
              });
            }

            currentResponse = ""; // Clear currentResponse after updating the conversation.
            return updatedConversation;
          });
        }
      }
      console.log("Convo", updatedConversation);

      if (!conversation.length > 0) {
        let answerIndex = conversation.length - 2;
        console.log("I am saving this: ");
      } else {
      }
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      return;
    }
    // saveMessages();
  };

  const saveMessages = async () => {
    console.log("In save message fn");
    console.log("convo", conversation);

    //     try {

    // const { data, error } = await supabase
    // .from('messages')
    // .insert([
    //   { some_column: 'someValue' },
    //   { some_column: 'otherValue' },
    // ])
    // .select()

    //     } catch (error) {

    //     }
  };

  // useEffect(()=>{

  // },[openModal])

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
      setPdf(event.target.files[0]); // call method
      const { data, error } = await supabase.storage
        .from("pdfs")
        .upload(filePath, event.target.files[0]);
      if (error) {
        // Handle error
        console.log("error", error);
      } else {
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
            isDisabled={isTextDisabled}
            onSendMessage={sendMessage}></TextField>
        </div>
      </div>
    </div>
  );
}
