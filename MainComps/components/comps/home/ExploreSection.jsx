
import Link from "next/link";

export default function ExploreSection() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-50 px-8 py-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Explore
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-900">
            Explore our products
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Discover pharmaceutical and cosmetic products from trusted
            pharmaceutical companies through PharmaHub.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/view-list?entity=products"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Explore Products
            </Link>
{/* 
            <Link
              href="/about"
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              About Us
            </Link> */}
          </div>
        </div>
      </div>
    </section>
  );
}

