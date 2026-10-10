"use client";

import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ToastProvider() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const status = url.searchParams.get("auth");

    if (status !== "success" && status !== "error") return;

    url.searchParams.delete("auth");
    window.history.replaceState(
      window.history.state,
      "",
      `${url.pathname}${url.search}${url.hash}`
    );

    if (status === "error") {
      toast.error("সোশ্যাল সাইন ইন সম্পন্ন হয়নি। আবার চেষ্টা করুন।");
      return;
    }

    async function showSignInResult() {
      try {
        const { data, error } = await authClient.getSession();

        if (error || !data) {
          toast.error("সাইন ইন যাচাই করা যায়নি। আবার চেষ্টা করুন।");
          return;
        }

        toast.success("সাইন ইন সফল হয়েছে।");
      } catch {
        toast.error("সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      }
    }

    showSignInResult();
  }, []);

  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 4000,
        style: {
          fontFamily: "inherit",
          fontSize: "14px",
          background: "#fafcfa",
          color: "#1d271f",
          border: "1px solid #e1e8e1",
        },
      }}
    />
  );
}