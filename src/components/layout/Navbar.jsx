"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const categories = [
  { name: "চাল", slug: "chal", emoji: "🍚" },
  { name: "ডাল", slug: "dal", emoji: "🫘" },
  { name: "তেল", slug: "tel", emoji: "🛢️" },
  { name: "সবজি", slug: "sobji", emoji: "🥬" },
  { name: "মাছ", slug: "mach", emoji: "🐟" },
  { name: "মাংস", slug: "mangsho", emoji: "🍗" },
  { name: "ডিম-দুধ", slug: "dim-dudh", emoji: "🥛" },
  { name: "মসলা", slug: "mosla", emoji: "🌶️" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [date, setDate] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Dhaka",
    });

    function updateDate() {
      setDate(formatter.format(new Date()));
    }

    updateDate();

    const interval = setInterval(updateDate, 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="border-b border-[#e1e8e1] bg-[#fafcfa] text-[#1d271f]">
      {/* লোগো, তারিখ ও অ্যাকাউন্ট */}
      <div className="mx-auto flex h-[68px] max-w-[1164px] items-center justify-between gap-2 px-4">
        <Link
          href="/"
          aria-label="বাজার দর হোম পেজ"
          className="flex min-w-0 items-center gap-2"
        >
          <span
            aria-hidden="true"
            className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#05893e] text-lg"
          >
            🛒
          </span>

          <div className="min-w-0">
            <span className="block text-xl font-bold leading-7">
              বাজার দর
            </span>
            <span className="block min-h-4 whitespace-nowrap text-[10px] leading-4 text-[#1d271f]/60 sm:text-xs">
              {date}
            </span>
          </div>
        </Link>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/signin"
            className="flex h-8 items-center justify-center rounded-lg border border-[#e1e8e1] px-2.5 text-xs font-medium transition-colors hover:bg-[#eef4ee] sm:h-10 sm:px-4 sm:text-sm"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="flex h-8 items-center justify-center rounded-lg border border-[#047f39] bg-[#05893e] px-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#047f39] sm:h-10 sm:px-4 sm:text-sm"
          >
            সাইন আপ
          </Link>
        </div>
      </div>

      {/* মোবাইলে ক্যাটাগরিগুলো পাশে স্ক্রল করা যাবে */}
      <div className="border-t border-[#e1e8e1]">
        <nav
          aria-label="পণ্যের ক্যাটাগরি"
          className="mx-auto max-w-6xl overflow-x-auto px-4"
        >
          <ul className="flex h-12 w-max items-center gap-1">
            {categories.map((category) => {
              const href = `/category/${category.slug}`;
              const isActive = pathname === href;

              return (
                <li key={category.slug}>
                  <Link
                    href={href}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex h-8 items-center gap-1.5 whitespace-nowrap rounded-lg px-[13px] text-xs font-semibold transition-colors ${
                      isActive
                        ? "bg-[#05893e] text-white"
                        : "text-[#1d271f] hover:bg-[#edf5ed]"
                    }`}
                  >
                    <span aria-hidden="true">{category.emoji}</span>
                    {category.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}