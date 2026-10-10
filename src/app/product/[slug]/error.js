"use client";

import Link from "next/link";

export default function ProductError({ reset }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div
        role="alert"
        className="rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-6 text-center"
      >
        <h1 className="text-xl font-bold">পণ্যের তথ্য লোড করা যায়নি</h1>
        <p className="mt-2 text-sm text-[#536357]">
          সংযোগ যাচাই করে আবার চেষ্টা করুন।
        </p>

        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="h-10 rounded-lg bg-[#05893e] px-4 text-sm font-semibold text-white hover:bg-[#047333]"
          >
            আবার চেষ্টা করুন
          </button>
          <Link
            href="/"
            className="inline-flex h-10 items-center rounded-lg border border-[#e1e8e1] px-4 text-sm"
          >
            হোমে ফিরুন
          </Link>
        </div>
      </div>
    </main>
  );
}