const ConversationDisplay = ({ conversation }) => {
  return (
    <div className="container mx-auto my-4">
      <div className="flex flex-col h-[450px]">
        {/* ^^// CHANGE THE HEIGHT TO MATCH USERS VIEWPORT */}{" "}
        {/* Adjust the height as needed */}
        <div className="flex-grow overflow-y-auto">
          <div className="border rounded-lg">
            {conversation.map((msg, index) => {
              let textColor =
                msg.type === "user" ? "text-blue-500" : "text-green-500";
              return (
                <div
                  key={index}
                  className={`ml-12 mt-4 mb-4 flex justify-start ${textColor}`}>
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
