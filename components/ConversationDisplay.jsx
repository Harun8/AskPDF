import Image from "next/image";
import LoadingPDF from "./loadingPDF";
import ProcessingPDF from "./processingPDF";

import AskPDFs from "@/public/askpdf2.png";
import user from "@/public/user.png";

const ConversationDisplay = ({
  conversation,
  showThinkingAnimation,
  processingPDF,
}) => {
  return (
    <div className="   ">
      <div className="flex flex-col h-[600px]">
        {/* ^^// CHANGE THE HEIGHT TO MATCH USERS VIEWPORT */}{" "}
        {/* Adjust the height as needed */}
        <div className=" ">
          <div
            className={` overflow-y-auto border-4 dark:border-gray-950 rounded-lg shadow-xl h-[600px]  dark:bg-gray-900 ${
              processingPDF ? " flex justify-center items-center	" : " "
            }	`}>
            {processingPDF && (
              <>
                <ProcessingPDF></ProcessingPDF>
              </>
            )}

            {conversation.map((msg, index) => {
              let textColor =
                msg.type === "user"
                  ? "text-zinc-800 dark:text-slate-400	 bg-zinc-200 dark:bg-gray-800 "
                  : "text-gray-800 font-bold	 bg-zinc-200 dark:bg-gray-800 ";
              return (
                <div
                key={index}
                className={`relative whitespace-pre-line mt-4 mb-4 pl-4 py-4 ml-2 mr-2 flex ${
                  msg.type === "user" ? "justify-start" : "justify-start items-center"
                } rounded-lg ${textColor}`}>
                {msg.type !== "user" && (
                  <Image
                    src={AskPDFs}
                    width={25}
                    height={25}
                    className="absolute top-0 left-0 mt-4 ml-1 "
                    alt="AskPDFs Logo"
                  />
                )}
               {msg.type == "user" && (
                  <Image
                    src={user}
                    width={25}
                    height={25}
                    className="absolute top-0 left-0 mt-4 ml-1 "
                    alt="AskPDFs Logo"
                  />   
                )}
                <span className="ml-4">{msg.text}</span>
              </div>
              );
            })}
            {showThinkingAnimation && (
              <div className="mt-4 mb-4 pl-4 py-4 ml-2 mr-2 flex justify-start rounded-lg bg-zinc-200 dark:bg-gray-800">
                <LoadingPDF />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationDisplay;
