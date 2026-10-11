
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-blue-600">
      <div className="mx-auto max-w-7xl px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-white">
          Explore our products
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-blue-100">
          Discover pharmaceutical and cosmetic products available through
          PHarmEGY.
        </p>

        <Link
          href="/view-list?entity=products"
          className="mt-8 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
        >
          Explore Products
        </Link>
      </div>
    </section>
  );
}

