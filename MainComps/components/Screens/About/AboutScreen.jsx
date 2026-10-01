
import Link from "next/link";

export default function AboutScreen() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                About PharmaHub
              </p>

              <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                A modern platform for pharmaceutical products
              </h1>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                PharmaHub is a commercial and marketing platform that
                connects pharmaceutical companies with the products they
                provide. We receive product information from our partner
                companies and make their pharmaceutical and cosmetic
                products easier to discover through one modern platform.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/view-list?entity=products"
                  className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  Explore Products
                </Link>

                <Link
                  href="/view-list?entity=companies"
                  className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Our Companies
                </Link>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="flex h-96 w-full max-w-lg items-center justify-center rounded-3xl bg-blue-100">
                <div className="text-center">
                  <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-3xl bg-white text-5xl shadow-sm">
                    💊
                  </div>

                  <h2 className="mt-6 text-2xl font-bold text-slate-800">
                    PharmaHub
                  </h2>

                  <p className="mt-2 text-slate-500">
                    Pharmaceutical & Healthcare Platform
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Who We Are
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Bringing products and companies together
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              PharmaHub works with pharmaceutical companies to receive their
              products and showcase them through our platform. Our goal is to
              create a simple and organized place where products can be
              discovered, explored, and connected to the companies behind
              them.
            </p>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Companies can become partners with PharmaHub, while their
              products can be presented across our platform under clear
              categories such as medicines and cosmetics.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              What We Do
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Everything in one place
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                💊
              </div>

              <h3 className="mt-6 text-xl font-semibold text-slate-900">
                Pharmaceutical Products
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Discover pharmaceutical products and explore their
                information through a simple and organized experience.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                🏢
              </div>

              <h3 className="mt-6 text-xl font-semibold text-slate-900">
                Partner Companies
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Explore the pharmaceutical companies connected with the
                products available on PharmaHub.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                📢
              </div>

              <h3 className="mt-6 text-xl font-semibold text-slate-900">
                Product Promotion
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                PharmaHub provides a digital platform for showcasing and
                promoting products from pharmaceutical companies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl bg-blue-600 p-8 text-white md:p-10">
              <div className="text-3xl">🎯</div>

              <h2 className="mt-6 text-2xl font-bold">
                Our Mission
              </h2>

              <p className="mt-4 leading-7 text-blue-100">
                To make pharmaceutical product discovery simpler by bringing
                products, companies, and useful information together in one
                accessible digital platform.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-900 p-8 text-white md:p-10">
              <div className="text-3xl">🚀</div>

              <h2 className="mt-6 text-2xl font-bold">
                Our Vision
              </h2>

              <p className="mt-4 leading-7 text-slate-300">
                To build a modern digital ecosystem that helps pharmaceutical
                companies present their products and makes healthcare product
                information easier to explore.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 p-6 text-center">
              <p className="text-3xl font-bold text-blue-600">Products</p>
              <p className="mt-2 text-sm text-slate-500">
                Pharmaceutical & cosmetic products
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6 text-center">
              <p className="text-3xl font-bold text-blue-600">Companies</p>
              <p className="mt-2 text-sm text-slate-500">
                Pharmaceutical partners
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6 text-center">
              <p className="text-3xl font-bold text-blue-600">2</p>
              <p className="mt-2 text-sm text-slate-500">
                Product categories
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6 text-center">
              <p className="text-3xl font-bold text-blue-600">1</p>
              <p className="mt-2 text-sm text-slate-500">
                Unified platform
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Contact Us
              </p>

              <h2 className="mt-3 text-3xl font-bold text-slate-900">
                Let’s connect
              </h2>

              <p className="mt-5 max-w-xl leading-7 text-slate-600">
                Whether you are looking to explore our products, learn more
                about PharmaHub, or discuss a potential partnership, our team
                is ready to hear from you.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                    📍
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Location
                    </h3>

                    <p className="mt-1 text-slate-600">
                      Cairo, Egypt
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                    ✉️
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Email
                    </h3>

                    <p className="mt-1 text-slate-600">
                      info@pharmahub.com
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                    📞
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Phone
                    </h3>

                    <p className="mt-1 text-slate-600">
                      +20 100 000 0000
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="overflow-hidden rounded-3xl bg-slate-900">
              <div className="flex h-full min-h-80 items-center justify-center p-8">
                <div className="text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-3xl">
                    📍
                  </div>

                  <h3 className="mt-6 text-2xl font-bold text-white">
                    PharmaHub
                  </h3>

                  <p className="mt-3 text-slate-300">
                    Cairo, Egypt
                  </p>

                  <p className="mt-2 text-sm text-slate-400">
                    Our main office and business operations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white">
            Explore PharmaHub
          </h2>

          <p className="mt-4 text-lg leading-8 text-blue-100">
            Discover our products and explore the companies behind them.
          </p>

          <Link
            href="/view-list?entity=products"
            className="mt-8 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            Explore Products
          </Link>
        </div>
      </section>
    </main>
  );
}

