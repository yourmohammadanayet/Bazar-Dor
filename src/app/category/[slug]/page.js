import { Suspense } from "react";
import { notFound } from "next/navigation";
import CategoryProducts from "@/components/category/CategoryProducts";
import ProductSkeleton from "@/components/products/ProductSkeleton";
import { categories, getCategory } from "@/lib/categories";

export function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = getCategory(slug);

  return {
    title: category
      ? `${category.nameBn} এর দাম`
      : "ক্যাটাগরি পাওয়া যায়নি",
  };
}

function CategoryFallback() {
  return (
    <div role="status">
      <span className="sr-only">ক্যাটাগরি লোড হচ্ছে…</span>

      <div
        aria-hidden="true"
        className="h-8 w-32 animate-pulse rounded bg-[#e1e8e1] motion-reduce:animate-none"
      />

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

async function CategoryContent({ params }) {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) {
    notFound();
  }

  return <CategoryProducts key={category.slug} category={category} />;
}

export default function CategoryPage({ params }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <Suspense fallback={<CategoryFallback />}>
        <CategoryContent params={params} />
      </Suspense>
    </main>
  );
}