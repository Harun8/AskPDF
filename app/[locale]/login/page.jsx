"use client";

import { Button } from "@/components/ui/button";
import Forms, { FormValues } from "../../../components/Form";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [buttonCliked, setButtonClicked] = useState(false);

  const router = useRouter();
  const supabase = createClientComponentClient();

  const t = useTranslations();

  useEffect(() => {
    setIsSubmitting(false);
  }, []);

  const otpAuth = async (values) => {
    setIsSubmitting(true);
    setButtonClicked(true);
    let { error } = await supabase.auth.signInWithOtp({
      email: values.email,
      // password: values.password,
      // options: {
      //   emailRedirectTo: "http://localhost:3000/auth/callback",
      // },
    });
    if (error) {
      setIsSubmitting(false);
      console.error("error", error);
    } else {
      setIsSubmitting(false);
      router.refresh();
    }
  };
  // const passwordAuth = async (values) => {
  //   console.log("passwordAuth", values);
  //   setIsSubmitting(true);
  //   let { error } = await supabase.auth.signInWithPassword({
  //     email: values.email,
  //     password: values.password,
  //   });

  //   if (error) {
  //     setIsSubmitting(false);
  //     console.error("error", error);
  //   } else {
  //     setIsSubmitting(false);
  //     router.push("/"); // Redirects to /auth/callback after login
  //   }
  // };

  // const authMethod = async (values) => {
  //   console.log("got in here", values);
  //   let auth = isPassword ? "password" : "otp";
  //   switch (auth) {
  //     case "otp":
  //       otpAuth(values);
  //       break;
  //     case "password":
  //       passwordAuth(values);
  //   }
  // };
  async function signInWithGoogle() {
    const currentUrl = new URL(window.location.href);
    const source = currentUrl.searchParams.get('source');
  
    // Set the base URL for redirection
    const baseUrl = 'http://localhost:3000';
  
    // Define the redirect URL based on the source
    const redirectTo = source === 'extension'
      ? `${baseUrl}/`
      : `${baseUrl}/en/chromeEx`;
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectTo,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) {
      console.log(error);
      redirect("/error");
    }
    console.log(data);
    redirect(data.url);
  }

  return (
    <>
      <title>Login | AskPDFs</title>

      <div className=" flex justify-center md:grid md:grid-cols-2 md:gap-1 h-dvh ">
        <div className="">
          <div className="flex justify-center">
            {/* <LoginForm></LoginForm> */}
            <Forms
              signInWithGoogle={signInWithGoogle}
              isSubmitting={isSubmitting}
              showPassword={false}
              onSubmit={otpAuth}
              link="signin"
              title={t("login.login")}
              redirect={t("login.loginText")}></Forms>
          </div>
          <div className=" flex justify-center"></div>
        </div>
        <div className="hidden md:flex md:justify-center md:items-center md:p-12 md:bg-blue-200 md:dark:bg-blue-900 ">
          <div className="flex justify-center">
            {" "}
            {buttonCliked
              ? `${t("login.checkMail")}`
              : `${t("login.welcomeBack")}`}{" "}
          </div>
        </div>
      </div>
    </>
  );
}
