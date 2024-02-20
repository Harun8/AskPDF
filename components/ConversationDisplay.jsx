import LoadingPDF from "./loadingPDF";
const ConversationDisplay = ({ conversation, showThinkingAnimation }) => {
  return (
    <div className="   ">
      <div className="flex flex-col h-[500px]">
        {/* ^^// CHANGE THE HEIGHT TO MATCH USERS VIEWPORT */}{" "}
        {/* Adjust the height as needed */}
        <div className=" ">
          <div
            className={` overflow-y-auto border-4 rounded-lg shadow-xl h-[500px]  dark:bg-gray-900					`}>
            {conversation.map((msg, index) => {
              let textColor =
                msg.type === "user"
                  ? "text-zinc-800	 bg-zinc-200 dark:bg-gray-800 "
                  : "text-blue-500 font-semibold	 bg-zinc-200 dark:bg-gray-800 ";
              return (
                <div
                  key={index}
                  className={` mt-4 mb-4 pl-4  py-4 ml-2 mr-2 flex justify-start rounded-lg ${textColor}`}>
                  {msg.type === "response" && showThinkingAnimation ? (
                    <LoadingPDF></LoadingPDF>
                  ) : null}{" "}
                  {msg.text}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationDisplay;
