import Link from "next/link";
import {
  formatNumber,
  formatPercentage,
  getUnitName,
} from "@/lib/format";

const changeStyles = {
  up: {
    symbol: "▲",
    className: "bg-[#f0f5f0] text-[#d03739]",
    label: "দাম বেড়েছে",
  },
  down: {
    symbol: "▼",
    className: "bg-[#f0f5f0] text-[#05893e]",
    label: "দাম কমেছে",
  },
  flat: {
    symbol: "—",
    className: "bg-[#f0f5f0] text-[#1d271f]/60",
    label: "দাম অপরিবর্তিত",
  },
};

export default function ProductCard({ product }) {
  const change =
    changeStyles[product.change?.dir] || changeStyles.flat;

  const percentage = formatPercentage(product.change?.pct ?? 0);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-4 text-[#1d271f] transition-colors hover:border-[#05893e]"
    >
      <article>
        {/* Product name and selling unit */}
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-2xl"
          >
            {product.image}
          </span>

          <div className="min-w-0">
            <h3 className="text-base font-semibold leading-6">
              {product.nameBn}
            </h3>
            <p className="text-xs leading-4 text-[#1d271f]/60">
              প্রতি {getUnitName(product.unit)}
            </p>
          </div>
        </div>

        {/* Today's price and daily change */}
        <div className="mt-3 flex min-h-11 items-center justify-between gap-2">
          <div>
            <p className="text-xs leading-4 text-[#1d271f]/70">
              আজকের দাম
            </p>
            <p className="text-xl font-bold leading-7">
              {formatNumber(product.today)}{" "}
              <span className="text-sm font-medium">টাকা</span>
            </p>
          </div>

          <span
            aria-label={`${change.label} ${percentage} শতাংশ`}
            className={`inline-flex h-6 shrink-0 items-center gap-1 rounded-full px-2 text-xs font-semibold ${change.className}`}
          >
            <span aria-hidden="true">{change.symbol}</span>
            {percentage}%
          </span>
        </div>
      </article>
    </Link>
  );
}