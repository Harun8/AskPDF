"use client";

import Forms from "@/components/Form";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const login = async (values) => {
    console.log("signup been called", values.email, values.password);

    let { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      console.log("error", error);
    } else {
      router.push("/");
      console.log("Sucess! You're signed in!!!");
    }
  };

  return (
    <div className="flex justify-center">
      <Forms
        onSubmit={login}
        link="signin"
        title="Login"
        redirect="Don't have an account? Sign up?"></Forms>
    </div>
  );
}
