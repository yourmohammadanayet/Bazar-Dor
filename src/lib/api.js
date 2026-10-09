const apiUrls = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

export async function getProducts(signal) {
  for (const baseUrl of apiUrls) {
    try {
      const response = await fetch(`${baseUrl}/products`, {
        signal: AbortSignal.any([
          signal,
          AbortSignal.timeout(10_000),
        ]),
      });

      if (!response.ok) {
        throw new Error("Unable to fetch products.");
      }

      const products = await response.json();

      if (!Array.isArray(products)) {
        throw new Error("Invalid product response.");
      }

      return products;
    } catch (error) {
      // Stop cancelled requests instead of trying another API.
      if (signal.aborted) {
        throw error;
      }
    }
  }

  throw new Error("পণ্যের দাম লোড করা যায়নি। আবার চেষ্টা করুন।");
}