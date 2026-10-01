
import Link from "next/link";

export default function ProductsSection({ products, loading }) {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Products
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Our Products
            </h2>
          </div>

          <Link
            href="/view-list?entity=products"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View all
          </Link>
        </div>

        {loading && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-64 animate-pulse rounded-2xl bg-white"
              />
            ))}
          </div>
        )}

        {!loading && products?.length > 0 && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/view?entity=products&id=${product.id}`}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                  💊
                </div>

                <h3 className="mt-5 text-xl font-semibold text-slate-900 group-hover:text-blue-600">
                  {product.name}
                </h3>

                <p className="mt-2 text-sm font-medium capitalize text-blue-600">
                  {product.type}
                </p>

                {product.description && (
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                    {product.description}
                  </p>
                )}

                {product.company && (
                  <p className="mt-4 text-xs font-medium text-slate-500">
                    {product.company.name}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}

        {!loading && (!products || products.length === 0) && (
          <div className="mt-10 rounded-2xl bg-white p-10 text-center">
            <p className="text-slate-500">No products found.</p>
          </div>
        )}
      </div>
    </section>
  );
}

