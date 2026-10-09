export default function ProductSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-4"
    >
      <div className="animate-pulse motion-reduce:animate-none">
        <div className="flex items-center gap-3">
          <div className="size-12 shrink-0 rounded-xl bg-[#e1e8e1]" />

          <div className="flex-1">
            <div className="h-4 w-28 rounded bg-[#e1e8e1]" />
            <div className="mt-2 h-3 w-16 rounded bg-[#e1e8e1]" />
          </div>
        </div>

        <div className="mt-3 flex min-h-11 items-center justify-between">
          <div>
            <div className="h-3 w-16 rounded bg-[#e1e8e1]" />
            <div className="mt-2 h-5 w-24 rounded bg-[#e1e8e1]" />
          </div>

          <div className="h-6 w-16 rounded-full bg-[#e1e8e1]" />
        </div>
      </div>
    </div>
  );
}