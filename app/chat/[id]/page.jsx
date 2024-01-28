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

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_API_KEY, // api key
  dangerouslyAllowBrowser: true, // should be false
});

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

          let { data, error } = await supabase
            .from("pdfs")
            .select("chatId")
            .eq("id", params.id);

          console.log("chatId", data[0].chatId);
          setChat_id(data[0].chatId);

          if (error)
            throw new Error("could not get the chatID for this pdf file");

          if (!response.ok) {
            throw new Error("API call failed");
          }
          if (response.ok) {
            const data = await response.json();
            currentPdfId = params.id;

            console.log("params.id", params.id);

            console.log("response", data);
            fetchPdfFilePath(params.id);
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

  async function fetchPdfFilePath(pdfId) {
    const { data, error } = await supabase
      .from("pdfs") // Replace with your table name
      .select("file_id") // Adjust based on your schema
      .eq("id", pdfId)
      .single();

    if (error) throw new Error(error.message);

    console.log("data", data);

    return fetchPdfUrl(data.file_id);
  }

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

  useEffect(() => {
    console.log("answer", answer);
    console.log("question", question);
  }, [answer, question]);

  const sendMessage = async (messageText) => {
    let pdfTexts;
    console.log("msgTExt", messageText);
    if (!messageText.trim()) return;

    const newMessage = { type: "user", text: messageText };
    setConversation([...conversation, newMessage]);

    try {
      let { data: pdfs, error } = await supabase
        .from("pdfs")
        .select("*")
        .eq("id", params.id);

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

      let questionIndex = updatedConversation.length - 2;
      let answerÍndex = updatedConversation.length - 1;

      if (!conversation.length > 0) {
        setAnswer((prevAnswer) => [
          ...prevAnswer,
          updatedConversation[answerÍndex].text,
        ]);
        setQuestion((prevQuestion) => [
          ...prevQuestion,
          updatedConversation[questionIndex].text,
        ]);

        const { data, error } = await supabase.from("messages").insert([
          // USING PARAMS ID DOES NOT SEEM SAFE
          {
            chatId: chat_id,
            question: question,
            answer: answer,
            user_id: userId,
          },
        ]);

        console.log("data", data);
        if (error) throw new Error("Message not saved in the DB");
      } else {
        setAnswer((prevAnswer) => [
          ...prevAnswer,
          updatedConversation[answerÍndex].text,
        ]);
        setQuestion((prevQuestion) => [
          ...prevQuestion,
          updatedConversation[questionIndex].text,
        ]);

        const { data, error } = await supabase
          .from("messages")
          .update({
            question: question,
            answer: answer,
          })
          .eq("chatId", chat_id)
          .select();

        console.log("data", data);
        if (error) throw new Error("Message not saved in the DB");
      }
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
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
