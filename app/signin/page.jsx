"use client";

import Forms from "@/components/Form";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

const signUp = async (values) => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  console.log("signup been called", values.email, values.password);

  let { error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
    options: {
      emailRedirectTo: "http://localhost:3000/auth/callback",
    },
  });

  if (error) {
    console.log("error", error);
  } else {
    console.log("Sucess! Please check your email");
    router.refresh();
  }
};

const Signin = () => {
  return (
    <div className="flex justify-center">
       

      <Forms
        onSubmit={signUp}
        title="Sign up"
        link="login"
        redirect="Already have an account? Log in"></Forms>
    </div>
  );
};

export default Signin;
