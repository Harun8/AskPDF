const ConversationDisplay = ({ conversation }) => {
  return (
    <div className=" border ">
      {conversation.map((msg, index) => (
        <div
          key={index}
          className={` ml-12 mt-6 flex justify-start text-gray-100 ${msg.type}`}>
          {msg.text}
        </div>
      ))}
    </div>
  );
};

export default ConversationDisplay;
