"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/MainComps/lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [message, setMessage] = useState("Confirming your email...");

  useEffect(() => {
    const confirm = async () => {
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");
      const errorDescription = url.searchParams.get("error_description");

      if (errorDescription) {
        setMessage(errorDescription.replace(/\+/g, " "));
        return;
      }

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          setMessage(error.message);
          return;
        }
      }

      router.replace("/");
      router.refresh();
    };

    confirm();
  }, [router]);

  return (
    <main className="flex flex-1 items-center justify-center bg-slate-50 px-6 py-16">
      <p className="text-slate-600">{message}</p>
    </main>
  );
}
