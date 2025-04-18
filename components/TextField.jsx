"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Arrow from "@/public/arrow.svg";

const TextField = ({ onSendMessage, isDisabled }) => {
  const t = useTranslations("preview");

  const [message, setMessage] = useState("");
  const handleSendEnter = (e) => {
    if (e.key === "Enter" ) {
      if (message.trim()) {
        onSendMessage(message); // Send the message to the API
        setMessage("");
      }

    }
  };

  const handleSend = () => {
      if (message.trim()) {
        onSendMessage(message); // Send the message to the API
        setMessage("");
      

    }
  };
  return (
    <div className="flex flex-col justify-end relative m-6">
      <div className="relative">
        <textarea
          onKeyDown={handleSendEnter}
          data-testid="chat-textfield"
          maxLength={150}
          disabled={isDisabled}
          id="message"
          rows="1"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="resize-none block w-full p-2.5 pr-12 text-sm dark:text-gray-300 text-gray-700 text-bold dark:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-950 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={
            isDisabled
              ? "Processing your pdf, please wait ..."
              : `${t("message")}`
          }
        ></textarea>
          <button
          data-testid="chat-btn"
          onMouseDown={handleSend}
          disabled={isDisabled || !message.trim()}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white rounded p-2 "
        >
        <Image
        priority={true}
        fetchPriority="eager"
        width={25}
        height={25}
         src={Arrow}
          alt="Arrow"

          ></Image>
 
        </button>
      </div>
    </div>
  );
};

export default TextField;