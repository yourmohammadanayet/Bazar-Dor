"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "./SocialButtons";

const fields = [
  {
    name: "name",
    label: "নাম",
    type: "text",
    placeholder: "যেমন: রহিম উদ্দিন",
    autoComplete: "name",
  },
  {
    name: "email",
    label: "ইমেইল",
    type: "email",
    placeholder: "you@example.com",
    autoComplete: "email",
  },
  {
    name: "password",
    label: "পাসওয়ার্ড",
    type: "password",
    placeholder: "কমপক্ষে ৮ অক্ষর",
    autoComplete: "new-password",
  },
  {
    name: "confirmPassword",
    label: "পাসওয়ার্ড নিশ্চিত করুন",
    type: "password",
    placeholder: "আবার লিখুন",
    autoComplete: "new-password",
  },
];

export default function SignUpForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const isDisabled = isSubmitting || isComplete;

  async function handleSubmit(event) {
    event.preventDefault();

    if (isDisabled) return;

    const values = new FormData(event.currentTarget);
    const name = String(values.get("name") || "").trim();
    const email = String(values.get("email") || "").trim();
    const password = String(values.get("password") || "");
    const confirmPassword = String(values.get("confirmPassword") || "");

    if (!name) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না।");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        toast.error(
          error.code === "USER_ALREADY_EXISTS" ||
            error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL"
            ? "এই ইমেইলে ইতিমধ্যে অ্যাকাউন্ট আছে।"
            : "অ্যাকাউন্ট তৈরি করা যায়নি। তথ্য যাচাই করে আবার চেষ্টা করুন।"
        );
        return;
      }

      setIsComplete(true);
      toast.success("অ্যাকাউন্ট তৈরি হয়েছে। এবার সাইন ইন করুন।");
      router.replace("/sign-in");
    } catch {
      toast.error("সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name}>
          <label
            htmlFor={field.name}
            className="block text-sm font-medium leading-[21px]"
          >
            {field.label}
          </label>
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            autoComplete={field.autoComplete}
            required
            minLength={field.type === "password" ? 8 : undefined}
            maxLength={field.type === "password" ? 128 : undefined}
            disabled={isDisabled}
            className="mt-1 h-10 w-full rounded-lg border border-[#e1e8e1] bg-[#fafcfa] px-3 text-sm font-normal focus:border-[#05893e] focus:outline-none disabled:opacity-60"
          />
        </div>
      ))}

      <button
        type="submit"
        disabled={isDisabled}
        className="flex h-10 w-full items-center justify-center rounded-lg border border-[#05893e] bg-[#05893e] text-sm font-semibold text-white shadow-[0_3px_2px_-2px_rgba(5,137,62,0.3),0_4px_3px_-2px_rgba(5,137,62,0.3)] hover:bg-[#047333] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isDisabled ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
      </button>

      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-[#e1e8e1]" />
        <span className="text-xs leading-4 text-[#536357]">অথবা</span>
        <span className="h-px flex-1 bg-[#e1e8e1]" />
      </div>

      <SocialButtons />

      <p className="text-center text-sm font-normal leading-5">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/sign-in" className="text-[#05893e] hover:underline">
          সাইন ইন করুন
        </Link>
      </p>
    </form>
  );
}