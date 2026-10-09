import Hero from "@/components/home/Hero";
import ProductSections from "@/components/home/ProductSections";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-12 pt-6">
      <Hero />
      <ProductSections />
    </main>
  );
}