"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const inputClass =
  "mt-1 h-10 w-full rounded-lg border border-[#e1e8e1] bg-[#fafcfa] px-3 text-sm placeholder:text-[#839087] focus:border-[#05893e] focus:outline-none";

const buttonClass =
  "mt-5 flex h-10 w-full items-center justify-center rounded-lg bg-[#05893e] text-sm font-semibold text-white hover:bg-[#047333] disabled:cursor-wait disabled:opacity-60";

export default function LinkGitHubPage() {
  const { data: session, isPending, error } = authClient.useSession();
  const [isConnecting, setIsConnecting] = useState(false);

  async function connectGitHub(event) {
    event?.preventDefault();

    if (isConnecting) return;

    const form = event?.currentTarget;
    setIsConnecting(true);

    try {
      if (!session) {
        if (!form) {
          toast.error("আগে ইমেইল ও পাসওয়ার্ড লিখুন।");
          setIsConnecting(false);
          return;
        }

        const values = new FormData(form);
        const result = await authClient.signIn.email({
          email: String(values.get("email") || "").trim(),
          password: String(values.get("password") || ""),
        });

        if (result.error) {
          toast.error("সাইন ইন হয়নি। ইমেইল ও পাসওয়ার্ড যাচাই করুন।");
          setIsConnecting(false);
          return;
        }
      }

      const result = await authClient.linkSocial({
        provider: "github",
        callbackURL: "/?auth=success",
      });

      if (result.error) {
        toast.error(
          result.error.message || "GitHub যুক্ত করা যায়নি। আবার চেষ্টা করুন।"
        );
        setIsConnecting(false);
      }
    } catch {
      toast.error("সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      setIsConnecting(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <section className="rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-6">
        <h1 className="text-xl font-bold">GitHub অ্যাকাউন্ট যুক্ত করুন</h1>

        {isPending ? (
          <p className="mt-4 text-sm text-[#536357]">
            অ্যাকাউন্টের তথ্য লোড হচ্ছে…
          </p>
        ) : error ? (
          <p className="mt-4 text-sm text-[#d03739]">
            তথ্য লোড হয়নি। পেজটি রিফ্রেশ করুন।
          </p>
        ) : session ? (
          <>
            <p className="mt-3 break-all text-sm text-[#536357]">
              {session.user.email}
            </p>
            <button
              type="button"
              onClick={() => connectGitHub()}
              disabled={isConnecting}
              className={buttonClass}
            >
              {isConnecting ? "GitHub খুলছে…" : "GitHub যুক্ত করুন"}
            </button>
          </>
        ) : (
          <form onSubmit={connectGitHub} className="mt-4">
            <p className="mb-4 text-sm text-[#536357]">
              আগে তৈরি করা বাজার দর অ্যাকাউন্টের ইমেইল ও পাসওয়ার্ড লিখুন।
            </p>

            <label htmlFor="link-email" className="block text-sm font-medium">
              ইমেইল
            </label>
            <input
              id="link-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              disabled={isConnecting}
              className={inputClass}
            />

            <label
              htmlFor="link-password"
              className="mt-4 block text-sm font-medium"
            >
              পাসওয়ার্ড
            </label>
            <input
              id="link-password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="আগের অ্যাকাউন্টের পাসওয়ার্ড"
              required
              disabled={isConnecting}
              className={inputClass}
            />

            <button
              type="submit"
              disabled={isConnecting}
              className={buttonClass}
            >
              {isConnecting ? "সংযুক্ত হচ্ছে…" : "সাইন ইন করে GitHub যুক্ত করুন"}
            </button>
          </form>
        )}
      </section>
    </main>
  );
}