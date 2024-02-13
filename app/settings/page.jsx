"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Settings() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [userId, setUserId] = useState(null);

  console.log("router", router);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log("session", session);

      if (!session) console.log("No session");

      console.log("session", session.user.id);
      setUserId(session.user.id);
    };

    getUser();
  }, []);

  const manageBilling = async () => {
    const response = await fetch("/api/settings", {
      method: "POST",
      body: JSON.stringify({
        id: userId,
      }),
    });
    const data = await response.json();

    console.log("data", data);
    if (data) window.location.href = data.url;
  };

  if (router.pathname === "/login") {
    console.log("yeaa");
    // Return null or any other placeholder if you are on /login page
    return null;
  }

  return (
    <>
      <div className="flex justify-center">
        <Button variant="homepage" onClick={manageBilling}>
          Cancel membership
        </Button>
      </div>
    </>
  );
}
