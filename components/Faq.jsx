// tells next.js to render  the component only on the client, so the useRouter() will work.
'use client';

import React, { useState } from 'react'
import { useTranslations } from "next-intl";
import { useRouter } from 'next/navigation';
import { uploadLimit } from '@/util/uploadLimit';


const lastUpdated = '03. September 2025';


const Faq = () => {
      const t = useTranslations();
      const router = useRouter();
      const [showfeedback, setShowFeedback] = useState(false);
      const [feedback, setFeedback] = useState('');

      const handleSubmitFeedback = () => {
        if (window.gtag('event', 'faq_feedback', {
            event_category: 'FAQ',
            event_label: feedback.substring(0, 50)
        }))

        
        alert('Tak for din feedback!');
        setShowFeedback(false);
        setFeedback('');
      }
    
      
      const handleQuestionClick = (questionKey) => {
        if (window.gtag) {
            window.gtag('event', 'faq_click', {
                'event_category': 'FAQ',
                'event_label': questionKey
            })
        }
      }   
        
    //ændring af design - ny skitse
    
  return (
    <div className="dark:bg-blue-950 bg-zinc-100">
    <p className='text-center text-sm text-gray-500 mt-4'>
        {t("faq.lastUpdated")} {lastUpdated}
    </p>
    <div className="w-full max-w-3xl px-2 mx-auto py-12 dark:bg-transparent dark:text-gray-200">
        <h3 className="mt-3 text-2xl font-bold text-gray-800 md:text-2xl dark:text-gray-100 flex justify-center">
        {t("faq.faq")}
        </h3>
        <div className="grid max-w-5xl mx-auto mt-6 divide-y divide-gray-200 dark:divide-gray-700">
            <details className="group py-4" onClick={() => 
                handleQuestionClick('whatIsAskPDF')}>
                <summary className="flex items-center text-black dark:text-white justify-between font-medium list-none cursor-pointer">
                    <span>{t("faq.whatIsAskPDF")}</span>
                    <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor"
                            strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24"
                            width="24" className="dark:stroke-gray-400">
                            <path d="M6 9l6 6 6-6"></path>
                        </svg>
                    </span>
                </summary>
                <p className="mt-3 text-black group-open:animate-fadeIn dark:text-gray-300">
                {t("faq.askPDFDescription")}
                </p>
            </details>

            <details className="group py-4" onClick={() =>
                handleQuestionClick('subscriptionDifference')}>
                <summary className="flex items-center justify-between font-medium list-none cursor-pointer">
                    <span>{t("faq.subscriptionDifference")}</span>
                    <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" shapRendering="geometricPrecision" stroke="currentColor"
                            stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24"
                            width="24" className="dark:stroke-gray-400">
                            <path d="M6 9l6 6 6-6"></path>
                        </svg>
                    </span>
                </summary>
                <p className="mt-3 text-black group-open:animate-fadeIn dark:text-gray-300">
                {t("faq.subscriptionDifferenceDescription")}
                </p>
            </details>

            <details className="group py-4" onClick={() =>
               handleQuestionClick('uploadLimit')
             }>
                <summary className="flex items-center justify-between font-medium list-none cursor-pointer">
                    <span>{t("faq.uploadLimit")}</span>
                    <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor"
                            stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24"
                            width="24" className="dark:stroke-gray-400">
                            <path d="M6 9l6 6 6-6"></path>
                        </svg>
                    </span>
                </summary>
                <p className="mt-3 text-black group-open:animate-fadeIn dark:text-gray-300">
                {t("faq.uploadLimitDescription")}
                </p>
            </details>

            <details className="group py-4" onClick={() =>
                handleQuestionClick('fileFormat')
            }>
                <summary className="flex items-center justify-between font-medium list-none cursor-pointer">
                    <span>{t("faq.fileFormat")}</span>
                    <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor"
                            stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24"
                            width="24" className="dark:stroke-gray-400">
                            <path d="M6 9l6 6 6-6"></path>
                        </svg>
                    </span>
                </summary>
                <p className="mt-3 text-black group-open:animate-fadeIn dark:text-gray-300">
                    {t("faq.fileFormatDescription")}
                </p>
            </details>

            <details className="group py-4" onClick={() =>
                handleQuestionClick('dataPrivacy')
            }>
                <summary className="flex items-center justify-between font-medium list-none cursor-pointer">
                    <span>{t("faq.dataPrivacy")}</span>
                    <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor"
                            stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24"
                            width="24" className="dark:stroke-gray-400">
                            <path d="M6 9l6 6 6-6"></path>
                        </svg>
                    </span>
                </summary>
                <p className="mt-3 text-black group-open:animate-fadeIn dark:text-gray-300">
                    {t("faq.dataPrivacyDescription")}
                </p>
            </details>

            <details className="group py-4" onClick={() => 
                handleQuestionClick('accuracy')
            }>
                <summary className="flex items-center justify-between font-medium list-none cursor-pointer">
                    <span>{t("faq.accuracy")}</span>
                    <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor"
                            stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24"
                            width="24" className="dark:stroke-gray-400">
                            <path d="M6 9l6 6 6-6"></path>
                        </svg>
                    </span>
                </summary>
                <p className="mt-3 text-black group-open:animate-fadeIn dark:text-gray-300">
                    {t("faq.accuracyDescription")}
                </p>
            </details>

            <div className='flex justify-center mt-4'>
                <button className='px-4 bg-blue-600 text-white rounded'
                onClick={() => setShowFeedback(true)}>
                 {t("faq.giveFeedback")}   
                </button>
            </div>

            {showfeedback && ( 
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                <div className='bg-white p-6 rounded max-w-md w-full'>
                    <h4 className='text-xl mb-4'>{t("faq.feedbackTitle")}</h4>
                    <textarea className="w-full border p-2 rounded mb-4" 
                    rows={4}
                     placeholder={t("faq.feedbackPlaceholder")}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
             className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowFeedback(false)}
              >
                {t("faq.cancel")}
              </button>
              <button
             className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={handleSubmitFeedback}
              >
                {t("faq.submit")}
                </button>
            
            
            </div>
          </div>
         </div>
  )}
</div>
</div>
</div>
  );
  
};

export default Faq;