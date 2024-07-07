"use client";

// import Forms, { Credentials } from "@/components/Form";
import Forms, { FormValues } from "../../components/Form";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
// import LoginImage from "@/public/login.jpg";

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    setIsSubmitting(false);
  }, []);

  const login = async (values: FormValues) => {
    setIsSubmitting(true);
    let { error } = await supabase.auth.signInWithOtp({
      email: values.email,
      // options: {
      //   emailRedirectTo: "http://localhost:3000/auth/callback",
      // },
    });

    if (error) {
      console.error("error", error);
      setIsSubmitting(false);
    } else {
      // force reload upon switching site path
      // window.location.href = "/"; // router.push() does not work
    }
  };

  return (
    <>
      <title>Login | AskPDFs</title>

      <div className=" flex justify-center md:grid md:grid-cols-2 md:gap-1 h-dvh ">
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
        <div className="hidden md:flex md:justify-center md:items-center md:p-12 md:bg-blue-200 md:dark:bg-blue-900 ">
          <div className="flex justify-center">
            {" "}
            {isSubmitting ? "check your email :)" : "welcome back :)"}{" "}
          </div>
          {/* <div className="w-full">
            <Image
              className="rounded-3xl  object-cover"
              src={LoginImage}
              alt="blue image"
              layout="responsive"
            />
          </div> */}
        </div>
      </div>
    </>
  );
}
