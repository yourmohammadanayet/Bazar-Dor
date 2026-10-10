"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/products/ProductCard";
import ProductSkeleton from "@/components/products/ProductSkeleton";
import { getProducts } from "@/lib/api";
import { formatNumber } from "@/lib/format";

const gridClassName =
  "mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3";

function ProductSection({
  id,
  title,
  icon,
  iconClassName,
  subtitle,
  products,
  loading,
  emptyMessage,
}) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      aria-busy={loading}
      className="scroll-mt-6"
    >
      <h2
        id={headingId}
        className="flex items-center gap-2 text-xl font-bold text-[#1d271f]"
      >
        {icon && (
          <span aria-hidden="true" className={`text-sm ${iconClassName}`}>
            {icon}
          </span>
        )}
        {title}
      </h2>

      {subtitle && (
        <p className="mt-2 text-sm text-[#1d271f]/60">
          {subtitle}
        </p>
      )}

      {loading ? (
        <div role="status">
          <span className="sr-only">পণ্যের দাম লোড হচ্ছে…</span>

          <div className={gridClassName}>
            {Array.from({ length: 6 }, (_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        </div>
      ) : products.length > 0 ? (
        <div className={gridClassName}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="mt-4 rounded-2xl border border-[#e1e8e1] p-5 text-sm text-[#1d271f]/60">
          {emptyMessage}
        </p>
      )}
    </section>
  );
}

export default function ProductSections() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        const data = await getProducts(controller.signal);

        if (!controller.signal.aborted) {
          setProducts(data);
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
  }, [retryCount]);

  function retry() {
    setError("");
    setLoading(true);
    setRetryCount((count) => count + 1);
  }

  // Show the six largest increases and decreases.
  const risers = products
    .filter((product) => product.change?.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((product) => product.change?.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  if (error) {
    return (
      <section
        id="সব-পণ্য"
        aria-labelledby="products-error-heading"
        className="mt-10 scroll-mt-6 rounded-2xl border border-[#e1e8e1] p-6 text-center"
      >
        <h2
          id="products-error-heading"
          className="text-xl font-bold text-[#1d271f]"
        >
          পণ্যের তথ্য পাওয়া যায়নি
        </h2>

        <p role="alert" className="mt-2 text-sm text-red-600">
          {error}
        </p>

        <button
          type="button"
          onClick={retry}
          className="mt-4 rounded-lg bg-[#05893e] px-4 py-2 text-sm font-semibold text-white hover:bg-[#047f39]"
        >
          আবার চেষ্টা করুন
        </button>
      </section>
    );
  }

  return (
    <div className="mt-10 space-y-10">
      <ProductSection
        id="price-risers"
        title="আজ দাম বেড়েছে"
        icon="▲"
        iconClassName="text-[#d03739]"
        products={risers}
        loading={loading}
        emptyMessage="আজ কোনো পণ্যের দাম বাড়েনি।"
      />

      <ProductSection
        id="price-fallers"
        title="আজ দাম কমেছে"
        icon="▼"
        iconClassName="text-[#05893e]"
        products={fallers}
        loading={loading}
        emptyMessage="আজ কোনো পণ্যের দাম কমেনি।"
      />

      <ProductSection
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle={
          loading
            ? "নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম।"
            : `মোট ${formatNumber(products.length)}টি পণ্য দেখানো হচ্ছে`
        }
        products={products}
        loading={loading}
        emptyMessage="এই মুহূর্তে কোনো পণ্যের তথ্য নেই।"
      />
    </div>
  );
}