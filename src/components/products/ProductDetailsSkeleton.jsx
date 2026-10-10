export default function ProductDetailsSkeleton() {
  return (
    <div role="status" aria-label="পণ্যের তথ্য লোড হচ্ছে">
      <span className="sr-only">পণ্যের তথ্য লোড হচ্ছে…</span>

      <div
        aria-hidden="true"
        className="space-y-6 motion-safe:animate-pulse"
      >
        <div className="h-5 w-60 rounded bg-[#e1e8e1]" />
        <div className="h-44 rounded-2xl bg-[#e1e8e1]" />

        <div className="space-y-6 rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-5">
          <div className="h-7 w-40 rounded bg-[#e1e8e1]" />
          <div className="grid gap-3 sm:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-24 rounded-xl bg-[#e1e8e1]" />
            ))}
          </div>
          <div className="h-7 w-52 rounded bg-[#e1e8e1]" />
          <div className="h-80 rounded-xl bg-[#e1e8e1]" />
        </div>
      </div>
    </div>
  );
}