import LoadingPDF from "./loadingPDF";
import ProcessingPDF from "./processingPDF";

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
                  : "text-blue-500 font-semibold	 bg-zinc-200 dark:bg-gray-800 ";
              return (
                <div
                  key={index}
                  className={` whitespace-pre-line mt-4 mb-4 pl-4  py-4 ml-2 mr-2 flex justify-start rounded-lg ${textColor}`}>
                  {msg.text}{" "}
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
