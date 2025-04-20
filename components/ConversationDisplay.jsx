import Image from "next/image";
import LoadingPDF from "./loadingPDF";
import ProcessingPDF from "./processingPDF";

import AskPDFs from "@/public/askpdf2.png";
import user from "@/public/user.png";
import TextField from "./TextField";

const ConversationDisplay = ({
  conversation,
  showThinkingAnimation,
  processingPDF,
  sendMessage
}) => {
  return (
    <div className="flex flex-col h-[800px] border-4 dark:border-gray-950 rounded-lg shadow-xl dark:bg-gray-900">
      {/* Conversation messages */}
      <div className="flex-grow overflow-y-auto">
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
        <TextField  onSendMessage={sendMessage}  isDisabled={processingPDF} />
      </div>
    </div>
  );
};

export default ConversationDisplay;