"use client";


import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React, { useEffect } from 'react'

const ChromeEx = () => {

  const supabase = createClientComponentClient();
  
  useEffect(()=> {
    async function sendSession () {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      window.postMessage({ 
        type: 'LOGIN_SUCCESS', 
        target: 'CHROME_EXTENSION',
        session: { session }
      }, '*');
    }

    sendSession()
  }, [])

  return (
    
    
          <div className="flex justify-center">
         
            <div className="mt-20">
              <p className="flex justify-center mb-12 text-lg text-black font-medium">
                You can close this window
              </p>
         
            </div>
          </div>
  )
}

export default ChromeEx