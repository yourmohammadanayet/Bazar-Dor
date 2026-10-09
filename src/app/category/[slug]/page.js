import { notFound } from "next/navigation";
import CategoryProducts from "@/components/category/CategoryProducts";
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
    title: category ? `${category.nameBn} এর দাম` : "ক্যাটাগরি পাওয়া যায়নি",
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <CategoryProducts key={category.slug} category={category} />
    </main>
  );
}