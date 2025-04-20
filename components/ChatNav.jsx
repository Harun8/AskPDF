import { useTranslations } from 'next-intl'
import React from 'react'
import { redirect, useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Button } from './ui/button';

const ChatNav = ({title, showBtn, btnTitle, redirect}) => {
    const router = useRouter();
    const params = useParams();

    const t = useTranslations("chat")
  return (
          <header className="sticky top-0 z-10 backdrop-blur-lg bg-zinc-100/80 dark:bg-slate-800 border-b dark:border-gray-950">
          <div className="w-full flex items-center justify-between px-4 py-3">
        {/* Left Section */} 
        <div className="flex items-center">
        <div className="mr-6 pl-0 dark:text-white dark:hover:text-zinc-400 text-black cursor-pointer">
          <svg
            onClick={() => router.push(`/${params.locale}/`)}
    
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
    </svg>
    
          </div>
          <h2 className="font-semibold">{title}</h2>
        </div>
    
        {/* Right Section */}
        {showBtn && (
        <div className="flex items-center gap-2 mr-8">
    
                <Button
            variant="newChat"
            size="newChat"
            onClick={() => router.push(`/${params.locale}/${redirect}`)}
          >
            {btnTitle}
          </Button>
        </div>
            
        )}
      </div>
    </header>
  )
}

export default ChatNav