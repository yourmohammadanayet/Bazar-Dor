"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import {
  formatNumber,
  formatPercentage,
  getUnitName,
} from "@/lib/format";

const changeStyles = {
  up: {
    symbol: "▲",
    color: "text-[#d03739]",
    label: "দাম বেড়েছে",
  },
  down: {
    symbol: "▼",
    color: "text-[#05893e]",
    label: "দাম কমেছে",
  },
  flat: {
    symbol: "—",
    color: "text-[#1d271f]/60",
    label: "দাম অপরিবর্তিত",
  },
};

function TickerItem({ product }) {
  const change =
    changeStyles[product.change?.dir] || changeStyles.flat;
  const percentage = formatPercentage(product.change?.pct ?? 0);

  return (
    <li className="flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap pr-8 text-sm">
      <span aria-hidden="true">{product.image}</span>
      <span>{product.nameBn}</span>

      <span className="font-semibold">
        {formatNumber(product.today)} টাকা/
        {getUnitName(product.unit)}
      </span>

      <span className={`text-xs font-semibold ${change.color}`}>
        <span className="sr-only">{change.label} </span>
        <span aria-hidden="true">{change.symbol}</span>{" "}
        {percentage}%
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
              aria-hidden="true"
              className="h-3 w-48 shrink-0 rounded bg-[#e1e8e1] motion-safe:animate-pulse"
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
          {/* Repeat the list for seamless scrolling. */}
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