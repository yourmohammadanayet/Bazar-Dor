import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100svh-155px)] items-center justify-center bg-[#f0f5f0] px-4 py-12 text-[#1d271f]">
      <div className="max-w-md text-center">
        <p className="text-6xl font-bold text-[#05893e]">৪০৪</p>

        <h1 className="mt-5 text-2xl font-bold">
          পেজটি পাওয়া যায়নি
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#536357]">
          আপনি যে পেজটি খুঁজছেন, সেটি এই ঠিকানায় পাওয়া যায়নি।
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-[#05893e] px-5 text-sm font-semibold text-white hover:bg-[#047333]"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}