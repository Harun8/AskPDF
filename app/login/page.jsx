"use client";

import Forms from "@/components/Form";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import LoginImage from "@/public/login.jpg";

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    setIsSubmitting(false);
  }, []);

  const login = async (values) => {
    setIsSubmitting(true);
    let { error } = await supabase.auth.signInWithOtp({
      email: values.email,
      // options: {
      //   emailRedirectTo: "http://localhost:3000/auth/callback",
      // },
    });

    if (error) {
      console.log("error", error);
      setIsSubmitting(false);
    } else {
      // force reload upon switching site path
      // window.location.href = "/"; // router.push() does not work
      // console.log("Sucess! You're signed in!!!");
    }
  };

  return (
    <div class="grid grid-cols-2 gap-1 ">
      <div className="">
        <div className="flex justify-center">
          <Forms
            isSubmitting={isSubmitting}
            showPassword={false}
            onSubmit={login}
            link="signin"
            title="Login"
            redirect="Don't have an account? Sign up?"></Forms>
        </div>
      </div>
      <div className="flex justify-center items-center p-6">
        <div className="w-full">
          <Image
            className="rounded-3xl  object-cover"
            src={LoginImage}
            alt="blue image"
            layout="responsive"
          />
        </div>
      </div>
    </div>
  );
}
