import Hero from "@/components/home/Hero";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-12 pt-6">
      <Hero />

      {/* Product listings */}
      <section
        id="সব-পণ্য"
        aria-labelledby="all-products-heading"
        className="mt-10 scroll-mt-6"
      >
        <h2
          id="all-products-heading"
          className="text-xl font-bold text-[#1d271f]"
        >
          সব পণ্য
        </h2>

        <p className="mt-2 text-sm text-[#1d271f]/60">
          নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম ও দামের পরিবর্তন।
        </p>
      </section>
    </main>
  );
}