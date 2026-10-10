"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const buttonClassName =
  "inline-flex h-8 w-[76px] shrink-0 items-center justify-center whitespace-nowrap rounded-lg border text-xs font-semibold leading-none transition-colors sm:h-10 sm:w-[96px] sm:text-sm";

export default function UserMenu() {
  const router = useRouter();
  const menuRef = useRef(null);
  const { data: session, isPending, error, refetch } = authClient.useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);

  function closeMenu() {
    if (menuRef.current) {
      menuRef.current.open = false;
    }
  }

  async function handleSignOut() {
    if (isSigningOut) return;

    setIsSigningOut(true);

    try {
      const { error: signOutError } = await authClient.signOut();

      if (signOutError) {
        toast.error("লগ আউট করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }

      closeMenu();
      toast.success("লগ আউট হয়েছে।");
      router.replace("/");
      router.refresh();
    } catch {
      toast.error("সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsSigningOut(false);
    }
  }

  if (isPending && !session) {
    return (
      <div
        role="status"
        aria-label="অ্যাকাউন্টের তথ্য লোড হচ্ছে"
        className="h-8 w-40 animate-pulse rounded-lg bg-[#e1e8e1] motion-reduce:animate-none sm:h-10 sm:w-[200px]"
      />
    );
  }

  if (error && !session) {
    return (
      <button
        type="button"
        onClick={() => refetch()}
        className="h-10 rounded-lg border border-[#e1e8e1] px-3 text-xs"
      >
        অ্যাকাউন্ট আবার লোড করুন
      </button>
    );
  }

  if (!session) {
    return (
      <div className="flex shrink-0 items-center gap-2">
        <Link
          href="/sign-in"
          className={`${buttonClassName} border-[#e1e8e1] bg-[#fafcfa] hover:bg-[#eef4ee]`}
        >
          সাইন ইন
        </Link>

        <Link
          href="/sign-up"
          className={`${buttonClassName} border-[#047f39] bg-[#05893e] text-white hover:bg-[#047f39]`}
          style={{
            boxShadow:
              "inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 3px 2px -2px rgba(5, 137, 62, 0.3), 0 6px 8px -3px rgba(5, 137, 62, 0.3)",
          }}
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  const name = session.user.name?.trim() || "ব্যবহারকারী";
  const initial = Array.from(name)[0];

  return (
    <details
      ref={menuRef}
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          closeMenu();
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          closeMenu();
          menuRef.current?.querySelector("summary")?.focus();
        }
      }}
    >
      <summary className="flex h-10 cursor-pointer list-none items-center gap-2 rounded-lg border border-[#e1e8e1] px-2 text-sm [&::-webkit-details-marker]:hidden">
        <span
          aria-hidden="true"
          className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#05893e]/10 font-semibold text-[#05893e]"
        >
          {initial}
        </span>

        <span className="max-w-28 truncate font-medium sm:max-w-40">
          {name}
        </span>

        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="size-4 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="m5 7.5 5 5 5-5" />
        </svg>
      </summary>

      <div className="absolute right-0 top-full z-50 mt-2 w-60 rounded-xl border border-[#e1e8e1] bg-[#fafcfa] p-2 shadow-lg">
        <div className="border-b border-[#e1e8e1] px-3 py-2">
          <p className="truncate text-sm font-semibold">{name}</p>
          <p className="mt-1 truncate text-xs text-[#536357]">
            {session.user.email}
          </p>
        </div>

        <Link
          href="/profile"
          onClick={closeMenu}
          className="mt-1 block rounded-lg px-3 py-2 text-sm hover:bg-[#edf5ed]"
        >
          আমার প্রোফাইল
        </Link>

        <button
          type="button"
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="block w-full rounded-lg px-3 py-2 text-left text-sm text-[#d03739] hover:bg-[#d03739]/5 disabled:opacity-60"
        >
          {isSigningOut ? "লগ আউট হচ্ছে..." : "লগ আউট"}
        </button>
      </div>
    </details>
  );
}