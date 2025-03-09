"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import Sidebar from "@/components/Sidebar";

 
export default function Settings() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [userId, setUserId] = useState(null);
  const t = useTranslations("SettingsPage");

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

    if (!response.ok) {
      showToast("Info", "You don't have a paid membership");
    } else {
      const data = await response.json();

      if (data) window.location.href = data.url;
    }
  };

  if (router.pathname === "/login") {
    // Return null or any other placeholder if you are on /login page
    return null;
  }

  function showToast(title, desc) {
    toast(title, {
      description: desc,
      position: "top-right",

      action: {
        label: "Understood",
      },
    });
  }


  return (
    <>

      <title>Settings | AskPDFs</title>
      <div>
        {/* <Sidebar></Sidebar> */}
      </div>

      <div className="flex justify-center">
     
        <div className="mt-20">
          {/* <p className="flex justify-center mb-12 text-lg font-medium">
            Settings page
          </p> */}
          <Button variant="homepage" onClick={manageBilling}>
            {t("membership")}
          </Button>
        </div>
      </div>
    </>
  );
}
