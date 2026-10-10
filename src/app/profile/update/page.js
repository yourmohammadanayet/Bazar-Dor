import Link from "next/link";
import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ProfileForm from "@/components/auth/ProfileForm";

export const metadata = {
  title: "তথ্য আপডেট",
};

async function UpdateContent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <ProfileForm
      user={{
        id: session.user.id,
        name: session.user.name,
      }}
    />
  );
}

function UpdateSkeleton() {
  return (
    <div role="status" aria-label="আপনার তথ্য লোড হচ্ছে">
      <div
        aria-hidden="true"
        className="h-52 rounded-2xl bg-[#e1e8e1] motion-safe:animate-pulse"
      />
    </div>
  );
}

export default function UpdateProfilePage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <header className="mb-6">
        <h1 className="text-2xl font-bold leading-8">
          তথ্য আপডেট করুন
        </h1>
        <p className="mt-1 text-sm leading-5 text-[#636f65]">
          আপনার নাম পরিবর্তন করে সংরক্ষণ করুন।
        </p>
      </header>

      <Suspense fallback={<UpdateSkeleton />}>
        <UpdateContent />
      </Suspense>

      <Link
        href="/profile"
        className="mt-6 inline-block text-sm text-[#05893e] hover:underline"
      >
        ← প্রোফাইলে ফিরে যান
      </Link>
    </main>
  );
}