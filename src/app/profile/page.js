import Link from "next/link";
import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export const metadata = {
  title: "আমার প্রোফাইল",
};

async function ProfileContent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const name = session.user.name?.trim() || "ব্যবহারকারী";
  const initial = Array.from(name)[0];

  return (
    <section
      aria-label="অ্যাকাউন্টের তথ্য"
      className="rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-6"
    >
      <div className="flex flex-wrap items-center gap-4">
        <span
          aria-hidden="true"
          className="flex size-[70px] shrink-0 items-center justify-center rounded-full bg-[#05893e]/10 text-3xl font-semibold text-[#05893e]"
        >
          {initial}
        </span>

        <div className="min-w-0 flex-1">
          <h2 className="break-words text-xl font-semibold leading-7">
            {name}
          </h2>
          <p className="mt-1 break-all text-sm leading-6 text-[#536357]">
            {session.user.email}
          </p>
        </div>
      </div>

      <div className="mt-6 border-t border-[#e1e8e1] pt-6">
        <Link
          href="/profile/update"
          className="inline-flex h-10 items-center justify-center rounded-lg bg-[#05893e] px-5 text-sm font-semibold text-white hover:bg-[#047333]"
        >
          তথ্য আপডেট করুন
        </Link>
      </div>
    </section>
  );
}

function ProfileSkeleton() {
  return (
    <div role="status" aria-label="প্রোফাইল লোড হচ্ছে">
      <div
        aria-hidden="true"
        className="h-52 rounded-2xl bg-[#e1e8e1] motion-safe:animate-pulse"
      />
    </div>
  );
}

export default function ProfilePage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <header className="mb-6">
        <h1 className="text-2xl font-bold leading-8">
          আমার প্রোফাইল
        </h1>
        <p className="mt-1 text-sm leading-5 text-[#636f65]">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </header>

      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileContent />
      </Suspense>
    </main>
  );
}