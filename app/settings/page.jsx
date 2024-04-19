"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Settings() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/");
      }

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

    if (data) window.location.href = data.url;
  };

  if (router.pathname === "/login") {
    // Return null or any other placeholder if you are on /login page
    return null;
  }

  return (
    <>
      <title>Settings | AskPDFs</title>

      <div className="flex justify-center">
        <div className="mt-20">
          <p className="flex justify-center mb-12 text-lg font-medium">
            Settings page
          </p>
          <Button variant="homepage" onClick={manageBilling}>
            Manage membership
          </Button>
        </div>
      </div>
    </>
  );
}
