"use client";

import { useState } from "react";

const TextField = ({ onSendMessage, isDisabled }) => {
  const [message, setMessage] = useState("");
  const handleSend = () => {
    onSendMessage(message); // get req to API
    setMessage("");
  };

  return (
    <div className="flex flex-col justify-end ">
      <textarea
        disabled={isDisabled}
        id="message"
        rows="4"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="block p-2.5 w-full text-sm dark:text-gray-300 text-gray-700 text-bold dark:bg-gray-800 rounded-lg border border-gray-300 dark:focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Message AskPDF..."></textarea>
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white rounded p-2 mt-2">
        Send
      </button>
    </div>
  );
};

export default TextField;
