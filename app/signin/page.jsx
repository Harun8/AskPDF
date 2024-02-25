"use client";
import react from "react";
import Forms from "@/components/Form";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import LoginImage from "@/public/text.jpg";
import Image from "next/image";

const Signin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const signUpp = async (values) => {
    setIsSubmitting(true);
    console.log("signup been called", values.email, values.password);

    let { error } = await supabase.auth.signInWithOtp({
      email: values.email,
      password: values.password,
      // options: {
      //   emailRedirectTo: "http://localhost:3000/auth/callback",

      // },
    });
    if (error) {
      setIsSubmitting(false);
      console.log("error", error);
    } else {
      setIsSubmitting(false);

      console.log("Sucess! Please check your email");
      router.refresh();
    }
  };
  return (
    <>
      <div class="flex justify-center md:grid md:grid-cols-2 md:gap-1 h-dvh">
        <div className="">
          <div className="flex justify-center">
            <div className="flex justify-center">
              <Forms
                isSubmitting={isSubmitting}
                onSubmit={signUpp}
                title="Sign up"
                link="login"
                redirect="Already have an account? Log in"></Forms>
            </div>
          </div>
        </div>
        <div className="hidden md:flex md:justify-center md:items-center md:p-12 md:bg-indigo-800	">
          <div className="flex justify-center text-white">
            {isSubmitting ? "check your email :)" : "hello there :)"}
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
