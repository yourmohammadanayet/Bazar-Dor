"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfileForm({ user }) {
  const router = useRouter();
  const [name, setName] = useState(user.name || "");
  const [savedName, setSavedName] = useState(user.name || "");
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleUpdate(event) {
    event.preventDefault();

    if (isUpdating) return;

    const updatedName = name.trim();

    if (!updatedName) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    if (updatedName === savedName) {
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
      setSavedName(updatedName);
      toast.success("আপনার নাম আপডেট হয়েছে।");
      router.refresh();
    } catch {
      toast.error("সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsUpdating(false);
    }
  }

  return (
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
            disabled={isUpdating}
            className="mt-1 h-10 w-full rounded-lg border border-[#e1e8e1] bg-[#fafcfa] px-3 text-sm text-[#1d271f] placeholder:text-[#839087] focus:border-[#05893e] focus:outline-none disabled:opacity-60"
          />
        </div>

        <button
          type="submit"
          disabled={isUpdating}
          className="flex h-10 w-full items-center justify-center rounded-lg border border-[#05893e] bg-[#05893e] text-sm font-semibold text-white shadow-[0_3px_2px_-2px_rgba(5,137,62,0.3),0_4px_3px_-2px_rgba(5,137,62,0.3)] hover:bg-[#047333] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isUpdating ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
        </button>
      </form>
    </section>
  );
}