"use client";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Session } from "@supabase/auth-helpers-nextjs";

export default function Home() {

  return (

    <div className="flex justify-center mt-28	">
      <p className="font-serif font-bold"> Accelerate your work with AskPDF</p>
    </div>
  );
}
