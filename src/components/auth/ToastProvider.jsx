"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

function RouteNotifications() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const status = searchParams.get("auth");
  const notice = searchParams.get("notice");

  useEffect(() => {
    const requiresLogin = notice === "login-required";
    const hasAuthResult = status === "success" || status === "error";

    if (!requiresLogin && !hasAuthResult) return;

    const url = new URL(window.location.href);

    if (requiresLogin) {
      url.searchParams.delete("notice");
    }

    if (hasAuthResult) {
      url.searchParams.delete("auth");
    }

    window.history.replaceState(
      window.history.state,
      "",
      `${url.pathname}${url.search}${url.hash}`
    );

    if (requiresLogin) {
      toast.error("এই পেজটি দেখতে আগে সাইন ইন করুন।", {
        id: "login-required",
      });
    }

    if (status === "error") {
      toast.error("সোশ্যাল সাইন ইন সম্পন্ন হয়নি। আবার চেষ্টা করুন।", {
        id: "social-auth-result",
      });
      return;
    }

    if (status !== "success") return;

    let cancelled = false;

    async function showSignInResult() {
      try {
        const { data, error } = await authClient.getSession();

        if (cancelled) return;

        if (error || !data) {
          toast.error("সাইন ইন যাচাই করা যায়নি। আবার চেষ্টা করুন।", {
            id: "social-auth-result",
          });
          return;
        }

        toast.success("সাইন ইন সফল হয়েছে।", {
          id: "social-auth-result",
        });
      } catch {
        if (!cancelled) {
          toast.error("সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।", {
            id: "social-auth-result",
          });
        }
      }
    }

    showSignInResult();

    return () => {
      cancelled = true;
    };
  }, [pathname, status, notice]);

  return null;
}

export default function ToastProvider() {
  return (
    <>
      <Suspense fallback={null}>
        <RouteNotifications />
      </Suspense>

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
    </>
  );
}