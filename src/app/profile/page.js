import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ProfileForm from "@/components/auth/ProfileForm";

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

  return (
    <ProfileForm
      user={{
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
      }}
    />
  );
}

function ProfileSkeleton() {
  return (
    <div
      role="status"
      aria-label="প্রোফাইল লোড হচ্ছে"
      className="space-y-6"
    >
      <div className="h-28 animate-pulse rounded-2xl bg-[#e1e8e1] motion-reduce:animate-none" />
      <div className="h-52 animate-pulse rounded-2xl bg-[#e1e8e1] motion-reduce:animate-none" />
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