"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "./SocialButtons";

const inputClass =
  "mt-1 h-10 w-full rounded-lg border border-[#e1e8e1] bg-[#fafcfa] px-3 focus:border-[#05893e] focus:outline-none disabled:opacity-60";

export default function SignInForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const isDisabled = isSubmitting || isSignedIn;

  async function handleSubmit(event) {
    event.preventDefault();

    if (isDisabled) return;

    const values = new FormData(event.currentTarget);
    const email = String(values.get("email") || "").trim();
    const password = String(values.get("password") || "");

    setIsSubmitting(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(
          error.code === "INVALID_EMAIL_OR_PASSWORD"
            ? "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।"
            : "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।"
        );
        return;
      }

      setIsSignedIn(true);
      toast.success("সাইন ইন সফল হয়েছে।");
      router.replace("/");
      router.refresh();
    } catch {
      toast.error("সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="signin-email"
          className="block text-sm font-medium leading-[21px]"
        >
          ইমেইল
        </label>
        <input
          id="signin-email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
          disabled={isDisabled}
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="signin-password"
          className="block text-sm font-medium leading-[21px]"
        >
          পাসওয়ার্ড
        </label>
        <input
          id="signin-password"
          name="password"
          type="password"
          placeholder="কমপক্ষে ৮ অক্ষর"
          autoComplete="current-password"
          required
          disabled={isDisabled}
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={isDisabled}
        className="flex h-10 w-full items-center justify-center rounded-lg border border-[#05893e] bg-[#05893e] text-white shadow-[0_3px_2px_-2px_rgba(5,137,62,0.3),0_4px_3px_-2px_rgba(5,137,62,0.3)] hover:bg-[#047333] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isDisabled ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
      </button>

      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-[#e1e8e1]" />
        <span className="text-xs leading-4 text-[#536357]">অথবা</span>
        <span className="h-px flex-1 bg-[#e1e8e1]" />
      </div>

      <SocialButtons />

      <p className="text-center text-sm leading-5">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/sign-up" className="text-[#05893e] hover:underline">
          সাইন আপ করুন
        </Link>
      </p>
    </form>
  );
}