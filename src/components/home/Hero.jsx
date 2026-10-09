"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
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
    <section
      aria-labelledby="hero-heading"
      className="rounded-3xl border border-[#e1e8e1] bg-[#fafcfa]"
    >
      <div className="flex flex-col items-center gap-6 px-4 py-8 sm:px-8 sm:py-10 lg:flex-row lg:justify-between lg:px-4">
        {/* Today's market overview */}
        <div className="w-full lg:max-w-xl">
          <span className="inline-flex min-h-7 items-center rounded-full bg-[#05893e]/10 px-3 py-1 text-xs font-medium text-[#05893e]">
            {date || "আজকের বাজার"}
          </span>

          <h1
            id="hero-heading"
            className="mt-2 text-[28px] font-bold leading-tight text-[#1d271f] sm:text-4xl sm:leading-[45px]"
          >
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-3 text-base leading-6 text-[#1d271f]/70">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
            বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের
            পরিবর্তন এক জায়গায়।
          </p>

          <a
            href="#সব-পণ্য"
            className="mt-7 inline-flex h-10 items-center justify-center rounded-lg border border-[#047f39] bg-[#05893e] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#047f39]"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        {/* Market basket illustration */}
        <Image
          src="/bazar-hero.png"
          alt="ফল ও সবজিতে ভরা বাজারের ঝুড়ি"
          width={315}
          height={263}
          priority
          sizes="(max-width: 639px) 260px, 315px"
          className="h-auto w-[260px] max-w-full shrink-0 sm:w-[315px] lg:mr-10"
        />
      </div>
    </section>
  );
}