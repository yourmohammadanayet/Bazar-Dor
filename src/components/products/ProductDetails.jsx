import Link from "next/link";
import {
  formatNumber,
  formatPercentage,
  getUnitName,
} from "@/lib/format";

const changeStyles = {
  up: {
    symbol: "▲",
    label: "দাম বেড়েছে",
    color: "text-[#d03739]",
  },
  down: {
    symbol: "▼",
    label: "দাম কমেছে",
    color: "text-[#05893e]",
  },
  flat: {
    symbol: "—",
    label: "দাম অপরিবর্তিত",
    color: "text-[#536357]",
  },
};

export default function ProductDetails({ product }) {
  const unit = getUnitName(product.unit);
  const change = changeStyles[product.change?.dir] || changeStyles.flat;
  const difference = Math.abs(product.today - product.yesterday);
  const percentage = formatPercentage(product.change?.pct ?? 0);

  const markets = (product.markets || []).filter(
    (market) =>
      Number.isFinite(market.min) &&
      Number.isFinite(market.max) &&
      market.min <= market.max
  );

  const minimum = markets.length
    ? Math.min(...markets.map((market) => market.min))
    : null;

  const maximum = markets.length
    ? Math.max(...markets.map((market) => market.max))
    : null;

  // Use each market's midpoint to calculate the overall average.
  const average = markets.length
    ? Math.round(
        markets.reduce(
          (total, market) => total + (market.min + market.max) / 2,
          0
        ) / markets.length
      )
    : null;

  const summary = [
    {
      label: "সর্বনিম্ন দাম",
      value: minimum,
      description: "সবচেয়ে কম দামের বাজার",
      color: "text-[#05893e]",
    },
    {
      label: "সর্বাধিক দাম",
      value: maximum,
      description: "সবচেয়ে বেশি দামের বাজার",
      color: "text-[#d03739]",
    },
    {
      label: "গড় দাম",
      value: average,
      description: `প্রতি ${unit}-এর হিসাবে`,
      color: "text-[#05893e]",
    },
  ];

  return (
    <div className="space-y-6 text-[#1d271f]">
      <nav aria-label="ব্রেডক্রাম্ব" className="py-2 text-sm">
        <ol className="flex flex-wrap items-center gap-3">
          <li>
            <Link href="/" className="text-[#536357] hover:text-[#05893e]">
              হোম
            </Link>
          </li>

          <li aria-hidden="true" className="text-[#536357]">
            ›
          </li>

          <li>
            <Link
              href={`/category/${product.category}`}
              className="text-[#536357] hover:text-[#05893e]"
            >
              {product.categoryNameBn}
            </Link>
          </li>

          <li aria-hidden="true" className="text-[#536357]">
            ›
          </li>

          <li aria-current="page">{product.nameBn}</li>
        </ol>
      </nav>

      {/* Product overview */}
      <header className="rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-5">
        <div className="flex flex-wrap items-center gap-4">
          <span
            aria-hidden="true"
            className="flex size-20 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-4xl"
          >
            {product.image}
          </span>

          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold leading-9 sm:text-3xl">
              {product.nameBn}
            </h1>

            <p className="text-sm text-[#536357]">
              প্রতি {unit} · {product.categoryNameBn}
            </p>

            <p className={`mt-2 text-sm ${change.color}`}>
              গতকালের তুলনায় আজ {change.label}
              {difference > 0 && ` · ${formatNumber(difference)} টাকা`}
            </p>
          </div>

          <div className="flex w-full shrink-0 flex-col items-center justify-center rounded-xl bg-[#f0f5f0] px-5 py-4 text-center sm:w-auto sm:min-w-[118px]">
            <p className="whitespace-nowrap text-sm leading-5 text-[#536357]">
              আজকের দাম
            </p>

            <p className="text-3xl font-bold leading-9">
              {formatNumber(product.today)}
            </p>

            <p className="whitespace-nowrap text-sm leading-5 text-[#536357]">
              টাকা / {unit}
            </p>

            <p
              className={`mt-1 inline-flex items-center justify-center gap-1 whitespace-nowrap text-sm font-semibold leading-5 ${change.color}`}
            >
              <span aria-hidden="true">{change.symbol}</span>
              <span>{percentage}%</span>
            </p>
          </div>
        </div>
      </header>

      <div className="space-y-6 rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-5">
        {/* Market price summary */}
        <section aria-labelledby="price-summary-heading">
          <h2
            id="price-summary-heading"
            className="text-xl font-bold leading-7"
          >
            দামের সারসংক্ষেপ
          </h2>

          <dl className="mt-3 grid gap-3 sm:grid-cols-3">
            {summary.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-[#e1e8e1] bg-[#f0f5f0] px-6 py-4"
              >
                <dt className="text-sm text-[#536357]">{item.label}</dt>

                <dd className={`mt-1 text-2xl font-bold ${item.color}`}>
                  {item.value === null ? "—" : formatNumber(item.value)}
                  {item.value !== null && (
                    <span className="ml-1 text-sm font-medium">টাকা</span>
                  )}
                </dd>

                <dd className="mt-1 text-xs text-[#536357]">
                  {item.description}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Prices by market */}
        <section aria-labelledby="market-prices-heading">
          <h2
            id="market-prices-heading"
            className="text-xl font-bold leading-7"
          >
            বাজারভিত্তিক আজকের দাম
          </h2>

          {markets.length === 0 ? (
            <p className="mt-3 text-sm text-[#536357]">
              এই পণ্যের বাজারভিত্তিক দাম এখনও পাওয়া যায়নি।
            </p>
          ) : (
            <div
              role="region"
              aria-labelledby="market-prices-heading"
              tabIndex={0}
              className="mt-3 overflow-x-auto rounded-xl border border-[#e1e8e1]"
            >
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <caption className="sr-only">
                  {product.nameBn}: প্রতি {unit}-এর বাজারভিত্তিক দাম টাকায়
                </caption>

                <thead className="bg-[#f0f5f0]">
                  <tr>
                    {["বাজার", "বিভাগ", "সর্বনিম্ন", "সর্বাধিক", "গড়"].map(
                      (heading) => (
                        <th
                          key={heading}
                          scope="col"
                          className="whitespace-nowrap px-4 py-3 font-semibold"
                        >
                          {heading}
                        </th>
                      )
                    )}
                  </tr>
                </thead>

                <tbody>
                  {markets.map((market, index) => (
                    <tr
                      key={`${market.division}-${market.market}-${index}`}
                      className="border-t border-[#e1e8e1]"
                    >
                      <th scope="row" className="px-4 py-3 font-medium">
                        {market.market}
                      </th>

                      <td className="px-4 py-3 text-[#536357]">
                        {market.division}
                      </td>

                      <td className="whitespace-nowrap px-4 py-3 text-[#05893e]">
                        {formatNumber(market.min)} টাকা
                      </td>

                      <td className="whitespace-nowrap px-4 py-3 text-[#d03739]">
                        {formatNumber(market.max)} টাকা
                      </td>

                      <td className="whitespace-nowrap px-4 py-3 font-semibold">
                        {formatNumber((market.min + market.max) / 2)} টাকা
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link
          href={`/category/${product.category}`}
          className="inline-flex h-10 items-center justify-center rounded-lg border border-[#e1e8e1] bg-[#fafcfa] px-4 text-sm font-semibold hover:bg-[#edf5ed]"
        >
          ← {product.categoryNameBn} ক্যাটাগরি
        </Link>

        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-lg bg-[#05893e] px-4 text-sm font-semibold text-white hover:bg-[#047333]"
        >
          সব পণ্য দেখুন
        </Link>
      </div>
    </div>
  );
}