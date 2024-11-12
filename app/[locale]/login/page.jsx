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

  const router = useRouter();
  const supabase = createClientComponentClient();

  const t = useTranslations();

  useEffect(() => {
    setIsSubmitting(false);
  }, []);

  const otpAuth = async (values) => {
    setIsSubmitting(true);
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
  const passwordAuth = async (values) => {
    setIsSubmitting(true);
    let { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      setIsSubmitting(false);
      console.error("error", error);
    } else {
      setIsSubmitting(false);
      router.push("/"); // Redirects to /auth/callback after login
    }
  };

  const authMethod = async (values) => {
    let auth = isPassword ? "password" : "otp";
    switch (auth) {
      case "otp":
        otpAuth(values);
        break;
      case "password":
        passwordAuth(values);
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
              showPassword={isPassword}
              onSubmit={authMethod}
              link="signin"
              title={t("Navbar.login")}
              redirect={t("login.text")}></Forms>
          </div>
          <div className=" flex justify-center">
            <Button
              data-testid="password-btn"
              onClick={() => setIsPassword((prev) => !prev)}>
              Login with password
            </Button>
          </div>
        </div>
        <div className="hidden md:flex md:justify-center md:items-center md:p-12 md:bg-blue-200 md:dark:bg-blue-900 ">
          <div className="flex justify-center">
            {" "}
            {isSubmitting
              ? `${t("login.checkMail")}`
              : `${t("login.welcomeBack")}`}{" "}
          </div>
        </div>
      </div>
    </>
  );
}
