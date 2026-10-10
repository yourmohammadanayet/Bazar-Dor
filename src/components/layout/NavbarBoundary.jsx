import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";

function NavbarSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="h-[118px] border-b border-[#e1e8e1] bg-[#fafcfa]"
    >
      <div className="mx-auto flex h-[68px] max-w-[1164px] items-center justify-between px-4">
        <div className="h-10 w-40 rounded-lg bg-[#e1e8e1] motion-safe:animate-pulse" />
        <div className="h-10 w-28 rounded-lg bg-[#e1e8e1] motion-safe:animate-pulse" />
      </div>

      <div className="h-[49px] border-t border-[#e1e8e1]" />
    </div>
  );
}

export default function NavbarBoundary() {
  return (
    <Suspense fallback={<NavbarSkeleton />}>
      <Navbar />
    </Suspense>
  );
}