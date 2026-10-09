"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ProductCard from "@/components/products/ProductCard";
import ProductSkeleton from "@/components/products/ProductSkeleton";
import { getProducts } from "@/lib/api";
import { formatNumber } from "@/lib/format";

const gridClassName =
  "mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3";

export default function CategoryProducts({ category }) {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        const data = await getProducts(controller.signal);

        if (!controller.signal.aborted) {
          setProducts(
            data.filter((product) => product.category === category.slug),
          );
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setError(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => controller.abort();
  }, [category.slug, retryCount]);

  function retry() {
    setError("");
    setLoading(true);
    setRetryCount((count) => count + 1);
  }

  // Sort a copy so the default API order stays intact.
  const sortedProducts = [...products];

  if (sortOrder === "price-asc") {
    sortedProducts.sort((a, b) => a.today - b.today);
  } else if (sortOrder === "price-desc") {
    sortedProducts.sort((a, b) => b.today - a.today);
  }

  return (
    <section aria-labelledby="category-heading" aria-busy={loading}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1
            id="category-heading"
            className="flex items-center gap-3 text-2xl font-bold text-[#1d271f]"
          >
            <span aria-hidden="true">{category.icon}</span>
            {category.nameBn}
          </h1>

          <p className="mt-2 text-sm text-[#1d271f]/60">
            {loading
              ? "পণ্যের দাম লোড হচ্ছে…"
              : error
                ? "পণ্যের তথ্য পাওয়া যায়নি।"
                : `মোট ${formatNumber(products.length)}টি পণ্য`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor="category-sort"
            className="text-sm font-medium text-[#1d271f]"
          >
            সাজান:
          </label>

          <div className="relative">
            <select
              id="category-sort"
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              disabled={loading || Boolean(error) || products.length === 0}
              className="h-10 w-[210px] appearance-none rounded-lg border border-[#e1e8e1] bg-[#fafcfa] py-2 pl-3 pr-9 text-sm text-[#1d271f] disabled:opacity-60"
            >
              <option value="default">ডিফল্ট</option>
              <option value="price-asc">দাম: কম থেকে বেশি</option>
              <option value="price-desc">দাম: বেশি থেকে কম</option>
            </select>

            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="pointer-events-none absolute right-3 top-3 size-4 text-[#1d271f]/60"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>

      {loading ? (
        <div role="status">
          <span className="sr-only">পণ্যের দাম লোড হচ্ছে…</span>

          <div className={gridClassName}>
            {Array.from({ length: 6 }, (_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        </div>
      ) : error ? (
        <div className="mt-6 rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-6 text-center">
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>

          <button
            type="button"
            onClick={retry}
            className="mt-4 rounded-lg bg-[#05893e] px-4 py-2 text-sm font-semibold text-white hover:bg-[#047f39]"
          >
            আবার চেষ্টা করুন
          </button>
        </div>
      ) : products.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] px-4 py-12 text-center">
          <p className="text-4xl font-bold text-[#05893e]">৪০৪</p>

          <h2 className="mt-3 text-xl font-bold text-[#1d271f]">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
          </h2>

          <Link
            href="/"
            className="mt-5 inline-flex h-10 items-center rounded-lg bg-[#05893e] px-4 text-sm font-semibold text-white hover:bg-[#047f39]"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      ) : (
        <div className={gridClassName}>
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}