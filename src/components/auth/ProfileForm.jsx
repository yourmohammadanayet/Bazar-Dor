"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfileForm({ user }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [name, setName] = useState(user.name || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const currentUser =
    session?.user.id === user.id ? session.user : user;

  const displayName = currentUser.name || "ব্যবহারকারী";
  const initial = Array.from(displayName.trim())[0];
  const isBusy = isUpdating || isSigningOut;

  async function handleUpdate(event) {
    event.preventDefault();

    if (isBusy) return;

    const updatedName = name.trim();

    if (!updatedName) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    if (updatedName === currentUser.name) {
      toast("নামে কোনো পরিবর্তন করা হয়নি।");
      return;
    }

    setIsUpdating(true);

    try {
      const { error } = await authClient.updateUser({
        name: updatedName,
      });

      if (error) {
        toast.error("নাম আপডেট করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }

      setName(updatedName);
      toast.success("আপনার নাম আপডেট হয়েছে।");
      router.refresh();
    } catch {
      toast.error("সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsUpdating(false);
    }
  }

  async function handleSignOut() {
    if (isBusy) return;

    setIsSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }

      toast.success("সাইন আউট হয়েছে।");
      router.replace("/sign-in");
      router.refresh();
    } catch {
      toast.error("সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsSigningOut(false);
    }
  }

  return (
    <div className="space-y-6">
      <section
        aria-label="অ্যাকাউন্টের তথ্য"
        className="flex flex-wrap items-center gap-4 rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-6"
      >
        <div
          aria-hidden="true"
          className="flex size-[70px] shrink-0 items-center justify-center rounded-full bg-[#05893e]/10 text-3xl font-semibold text-[#05893e]"
        >
          {initial}
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="break-words text-xl font-semibold leading-7">
            {displayName}
          </h2>
          <p className="mt-1 break-all text-sm leading-6 text-[#536357]">
            {currentUser.email}
          </p>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          disabled={isBusy}
          className="inline-flex h-10 shrink-0 items-center justify-center rounded-lg border border-[#e1e8e1] bg-[#fafcfa] px-4 text-sm font-medium hover:bg-[#edf5ed] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSigningOut ? "সাইন আউট হচ্ছে..." : "↩ সাইন আউট"}
        </button>
      </section>

      <section
        aria-labelledby="profile-information-heading"
        className="rounded-2xl border border-[#e1e8e1] bg-[#fafcfa]"
      >
        <h2
          id="profile-information-heading"
          className="border-b border-[#e1e8e1] px-6 py-4 text-xl font-semibold leading-7"
        >
          তথ্য
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4 p-6">
          <div>
            <label
              htmlFor="profile-name"
              className="block text-sm font-medium leading-[21px]"
            >
              নাম
            </label>
            <input
              id="profile-name"
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="আপনার নাম লিখুন"
              required
              maxLength={100}
              disabled={isBusy}
              className="mt-1 h-10 w-full rounded-lg border border-[#e1e8e1] bg-[#fafcfa] px-3 text-sm text-[#1d271f] placeholder:text-[#839087] focus:border-[#05893e] focus:outline-none disabled:opacity-60"
            />
          </div>

          <button
            type="submit"
            disabled={isBusy}
            className="flex h-10 w-full items-center justify-center rounded-lg border border-[#05893e] bg-[#05893e] text-sm font-semibold text-white shadow-[0_3px_2px_-2px_rgba(5,137,62,0.3),0_4px_3px_-2px_rgba(5,137,62,0.3)] hover:bg-[#047333] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
          </button>
        </form>
      </section>
    </div>
  );
}