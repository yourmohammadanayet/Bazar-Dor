import { Suspense } from "react";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProducts } from "@/lib/api";
import ProductDetails from "@/components/products/ProductDetails";
import ProductDetailsSkeleton from "@/components/products/ProductDetailsSkeleton";

export const metadata = {
  title: "পণ্যের বিস্তারিত",
};

async function ProductContent({ params }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const { slug } = await params;
  const controller = new AbortController();
  const products = await getProducts(controller.signal);
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}

export default function ProductPage({ params }) {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-12 pt-6">
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductContent params={params} />
      </Suspense>
    </main>
  );
}