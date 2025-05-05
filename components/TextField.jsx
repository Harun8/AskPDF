"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Arrow from "@/public/arrow.svg";
import { Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
 } from "./ui/tooltip";
 import "../public/styles/textfield.css"
 import {
  animate,
  stagger,
} from 'animejs';
import ShineBorder from "./ui/shine-border";

const TextField = ({ onSendMessage, isDisabled, question, isTextDisabled }) => {
  const [enhancePrompt, setEnhancePrompt] = useState(false)
  const t = useTranslations("preview");


  useEffect(()=> {
    setMessage(question)

  }, [question])

  // useEffect(() => {
  //   const textWrapper = document.querySelector('.ml3');
  //   if (textWrapper) {
  //     textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
      
  //     animate('.ml3 .letter', {
  //       opacity: [0, 1],
  //       easing: "easeInOutQuad",
  //       duration: 6000,
  //       delay: stagger(400, { start: 0 }),
  //       direction: 'alternate',
  //       loop: true
  //     });
  //   }
  // }, []);

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

  const updatePrompt = async() => {

    if (!message.trim()) return;

    try {
      setEnhancePrompt(true)
     const response = await fetch("/api/llm/enhance", {
        method: "POST",
        body: JSON.stringify({
          prompt: message,
        }),
      })
      const data = await response.json()
      console.log("data", response, data)

      setTimeout(()=> {
        setMessage(data.data)
        setEnhancePrompt(false)

      }, 4000)
    } catch (error) {
      console.log("error", error)
    } finally{
    }
  }
  return (
    <div className="flex flex-col justify-end relative m-6">


      <div className="relative">
        <textarea
          onKeyDown={handleSendEnter}
          data-testid="chat-textfield"
          maxLength={150}
          disabled={isTextDisabled}
          id="message"
          rows="1"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`resize-none block w-full p-2.5 pr-12 text-sm dark:text-gray-300 text-gray-700 
            text-bold dark:bg-gray-800 rounded-xl border border-gray-900 dark:bg-gray-700
             dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500${enhancePrompt ? " animate-border-color border-2" : " dark:border-gray-950 border-gray-900"}`}
          placeholder={
            isDisabled
            ? "Processing your pdf, please wait ..."
            : `${t("message")}`
          }
          ></textarea>
        <div>
          </div>

          <button
          data-testid="chat-btn"
          onMouseDown={handleSend}
          disabled={isTextDisabled || !message.trim()}
          className="absolute text-black cursor-pointer dark:hover:text-gray-400 dark:text-white top-1/2 right-2 transform -translate-y-1/2  rounded p-2 "
        >
          
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
</svg>

 
        </button>
<TooltipProvider>
  <Tooltip defaultOpen={true} delayDuration={200}>
    <TooltipTrigger asChild>
      <button 
        data-testid="chat-btn"
        onMouseDown={updatePrompt}
        disabled={isDisabled || !message.trim()}
        className="absolute top-1/2 right-2 mr-8 transform -translate-y-1/2 text-purple-400 dark:text-purple-400 rounded p-2 hover:text-red-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
          />
        </svg>
      </button>
    </TooltipTrigger>
    <TooltipContent>
      <p className="dark:text-yellow-400 text-yellow-800  font-extrabold">{t("featureAlert")}</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>


      </div>
    </div>
  );
};

export default TextField;