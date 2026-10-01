
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              PharmaHub
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Discover trusted
              <span className="block text-blue-600">
                pharmaceutical products
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Discover pharmaceutical products and explore trusted
              pharmaceutical companies in one modern platform.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/view-list?entity=products"
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Explore our products
              </Link>

              <Link
                href="/about"
                className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                About Us
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="flex h-80 w-full max-w-lg items-center justify-center rounded-3xl bg-blue-100">
              <div className="text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-white text-4xl shadow-sm">
                  💊
                </div>

                <p className="mt-6 text-xl font-semibold text-slate-700">
                  PharmaHub
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Pharmaceutical Products Platform
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

