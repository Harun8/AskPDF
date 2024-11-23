"use client";
import Forms from "@/components/Form";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";

const Signin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();
  const t = useTranslations();

  const otpAuth = async (values) => {
    setIsSubmitting(true);
    let { error } = await supabase.auth.signInWithOtp({
      email: values.email,
      password: values.password,
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
  //   setIsSubmitting(true);
  //   let { error } = await supabase.auth.signUp({
  //     email: values.email,
  //     password: values.password,
  //     options: {
  //       emailRedirectTo: "http://localhost:3000/auth/callback",
  //     },
  //   });
  //   if (error) {
  //     setIsSubmitting(false);
  //     console.error("error", error);
  //   } else {
  //     setIsSubmitting(false);
  //     router.refresh();
  //   }
  // };

  // const authMethod = async (values) => {
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
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
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
      <title>Sign up | AskPDFs</title>

      <div className="flex justify-center md:grid md:grid-cols-2 md:gap-1 h-dvh">
        <div className="">
          <div className="flex justify-center">
            <div className="flex justify-center">
              <Forms
                signInWithGoogle={signInWithGoogle}
                isSubmitting={isSubmitting}
                showPassword={isPassword}
                onSubmit={otpAuth}
                title={t("login.signIn")}
                link="login"
                redirect={t("login.signInText")}></Forms>
            </div>
            {/* <div className=" flex justify-center">
              <Button
                data-testid="password-btn"
                onClick={() => setIsPassword((prev) => !prev)}>
                Show password
              </Button>
            </div> */}
          </div>
        </div>
        <div className="hidden md:flex md:justify-center md:items-center md:p-12 md:bg-indigo-800	">
          <div className="flex justify-center text-white">
            {isSubmitting
              ? "check your email :) (and spam folder!) "
              : "hello there :)"}
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
