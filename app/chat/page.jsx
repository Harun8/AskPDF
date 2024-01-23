"use client";
import { Document, Page } from "react-pdf";
// import pdf from ".../public/pdf";
import { pdfjs } from "react-pdf";
import pdf from "@/public/pdf.pdf";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
import React, { useState, useEffect } from "react";
import "@/public/styles/chat.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import TextField from "@/components/TextField";
import ConversationDisplay from "@/components/ConversationDisplay";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect, useRouter } from "next/navigation";
import sendFileToOpenAi from "@/util/openai";
import OpenAI from "openai";

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

  const onFileSelect = async (event) => {
    let filePath;
    let file_id;
    console.log("file chosen, upload it to db", event);
    const fileSizeLimit = 5 * 1024 * 1024; // 5MB
    if (event.target.files[0].size > fileSizeLimit) {
      console.log("SHIT IS TOO BIGG FAMALAM");
      event.target.value = "";
    } else {
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
        console.log("File upload success", data);
        console.log("data.id", data.id);
        file_id = data.id;
        // Handle success
      }

      try {
        const formData = new FormData();
        // a web API that allows you to easily construct a set of key/value pairs representing form fields and their values
        formData.append("file", event.target.files[0]);
        formData.append("file_id", file_id);

        const response = await fetch("/api/chat", {
          method: "POST",
          body: formData,
        });

        console.log("Content-Type: ", response.headers.get("Content-Type"));

        if (response.ok) {
          try {
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
            <label className="custum-file-upload " htmlFor="file">
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill=""
                  viewBox="0 0 24 24">
                  <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    id="SVGRepo_tracerCarrier"></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      fill=""
                      d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                      clipRule="evenodd"
                      fillRule="evenodd"></path>{" "}
                  </g>
                </svg>
              </div>
              <div className="text">
                <span>Click to upload PDF</span>
              </div>
              <input
                size="100"
                onChange={(event) => onFileSelect(event)}
                type="file"
                id="file"
                accept="application/pdf"></input>
            </label>
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
          <TextField onSendMessage={sendMessage}></TextField>
        </div>
      </div>
    </div>
  );
}
