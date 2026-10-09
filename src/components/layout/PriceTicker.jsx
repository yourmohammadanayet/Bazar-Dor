"use client";

import { useEffect, useState } from "react";

const apiUrls = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

const units = {
  kg: "কেজি",
  liter: "লিটার",
  litre: "লিটার",
  l: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  pcs: "পিস",
};

const priceFormatter = new Intl.NumberFormat("bn-BD");

const percentFormatter = new Intl.NumberFormat("bn-BD", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

async function fetchProducts(signal) {
  // প্রথম API কাজ না করলে বিকল্পটি ব্যবহার করা হবে।
  for (const baseUrl of apiUrls) {
    try {
      const response = await fetch(`${baseUrl}/products`, {
        signal: AbortSignal.any([
          signal,
          AbortSignal.timeout(10_000),
        ]),
      });

      if (!response.ok) {
        throw new Error("পণ্যের দাম পাওয়া যায়নি।");
      }

      const products = await response.json();

      if (!Array.isArray(products)) {
        throw new Error("পণ্যের তথ্য সঠিক নয়।");
      }

      return products;
    } catch {
      if (signal.aborted) {
        throw new Error("Request cancelled");
      }
    }
  }

  throw new Error("এই মুহূর্তে পণ্যের দাম পাওয়া যাচ্ছে না।");
}

function TickerItem({ product }) {
  const direction = product.change?.dir;
  const symbol =
    direction === "up" ? "▲" : direction === "down" ? "▼" : "—";

  const changeColor =
    direction === "up"
      ? "text-[#05893e]"
      : direction === "down"
        ? "text-red-600"
        : "text-[#1d271f]/60";

  return (
    <li className="flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap pr-8 text-sm">
      <span aria-hidden="true">{product.image}</span>
      <span>{product.nameBn}</span>

      <span className="font-semibold">
        {priceFormatter.format(product.today)} টাকা/
        {units[product.unit] || product.unit}
      </span>

      <span className={`text-xs font-semibold ${changeColor}`}>
        {symbol}{" "}
        {percentFormatter.format(Math.abs(product.change?.pct ?? 0))}%
      </span>
    </li>
  );
}

export default function PriceTicker() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        const data = await fetchProducts(controller.signal);

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
  }, []);

  return (
    <section
      aria-label="আজকের পণ্যের দাম"
      className="h-[37px] overflow-hidden border-b border-[#e1e8e1] bg-[#fafcfa] text-[#1d271f]"
    >
      {loading ? (
        <div
          role="status"
          className="mx-auto flex h-9 max-w-6xl items-center gap-6 px-4"
        >
          <span className="sr-only">পণ্যের দাম লোড হচ্ছে…</span>
          {[1, 2, 3, 4].map((item) => (
            <span
              key={item}
              className="h-3 w-48 shrink-0 animate-pulse rounded bg-[#e1e8e1]"
            />
          ))}
        </div>
      ) : error || products.length === 0 ? (
        <p role="status" className="px-4 text-center text-xs leading-9">
          {error || "এই মুহূর্তে কোনো পণ্যের তথ্য নেই।"}
        </p>
      ) : (
        <div
          className="price-ticker-track"
          style={{
            animationDuration: `${Math.max(products.length * 6, 40)}s`,
          }}
        >
          {/* একই তালিকার দুই কপি স্ক্রলের ফাঁক দূর করে। */}
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1 ? true : undefined}
              className="flex shrink-0"
            >
              {products.map((product) => (
                <TickerItem key={product.id} product={product} />
              ))}
            </ul>
          ))}
        </div>
      )}
    </section>
  );
}