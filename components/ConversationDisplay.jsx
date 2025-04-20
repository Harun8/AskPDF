import LoadingPDF from "./loadingPDF";
import ProcessingPDF from "./processingPDF";


import TextField from "./TextField";
import { useState } from "react";
import { useTranslations } from "next-intl";


let questions = [
  "Summarize this document in a few sentences.",
  "What are the key points or main arguments in this document?",
  "Who is the author of this document",
  "Can you provide a bullet-point summary of this document?"

]
const ConversationDisplay = ({
  conversation,
  showThinkingAnimation,
  processingPDF,
  sendMessage,
  isTextDisabled
}, props) => {

  const [question, setQuestion] = useState("")
  
  const updateText = (txt) => {
    console.log("clicked msg", txt )
    setQuestion(txt)
  }
  
  const t = useTranslations("chat")
  const questions = t.raw("questions")

  console.log("isTextDisabled ", isTextDisabled)
  return (
    <div className="flex flex-col h-[800px] border-4 dark:border-gray-950 rounded-lg shadow-xl dark:bg-gray-900">
     
        <div className="flex-grow overflow-y-auto">
          {conversation.length == 0 && (
            <div className="flex flex-col justify-center items-center h-full space-y-4">
            <p className="text-xl font-bold">{t("title")}</p>
            {questions.map((q) => (
              
              <p onClick={() => updateText(q.text)} className="dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-zinc-300 font-semibold text-sm dark:bg-gray-800/60 bg-zinc-400/70 hover:bg-zinc-200 p-2 rounded-xl cursor-pointer">
            {q.text}
              </p>
            ))}
  
            </div>
          )}
          {processingPDF && (
            <div className="flex justify-center items-center h-full">
          <ProcessingPDF />
            </div>
          )}

          {conversation.map((msg, index) => {
          let textColor =
            msg.type === "user"
              ? "text-zinc-800 dark:text-gray-200  "
              : "text-gray-800 dark:text-gray-300 font-bold ";
          return (
            <div
              key={index}
              className={`relative whitespace-pre-line mt-4 mb-4 pl-4 py-4 mr-2 flex ${
                msg.type === "user"
                  ? "justify-end mr-12 "
                  : "justify-start items-center"
              } rounded-md ${textColor}`}>
              {/* {msg.type !== "user" && (
                <Image
                  priority={true}
                  fetchPriority="eager"
                  src={AskPDFs}
                  width={25}
                  height={25}
                  className="absolute top-0 left-0 mt-4 ml-1"
                  alt="AskPDFs Logo"
                />
              )} */}
              {/* {msg.type === "user" && (
                <Image
                  priority={true}
                  fetchPriority="eager"
                  src={user}
                  width={25}
                  height={25}
                  className="absolute top-0 left-0 mt-4 ml-1"
                  alt="User Logo"
                />
              )} */}
              
              <span className={`ml-4 ${msg.type == "user" ? " rounded-xl p-3" : ""}`}>{msg.text}</span>
            </div>
          );
        })}

        {showThinkingAnimation && (
          <div className="mt-4 mb-4 pl-4 py-4 ml-2 mr-2 flex justify-start rounded-lg ">
            <LoadingPDF />
          </div>
        )}
      </div>


      {/* TextField at the bottom */}
      <div className=" border-gray-300 dark:border-gray-700">
        <TextField question={question} onSendMessage={sendMessage} isTextDisabled={isTextDisabled}  isDisabled={processingPDF} />
      </div>
    </div>
  );
};

export default ConversationDisplay;