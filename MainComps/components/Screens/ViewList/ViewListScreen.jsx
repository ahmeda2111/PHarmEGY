
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { request } from "../../../requests/request";

export default function ViewListScreen({ entity, type }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isProduct = entity === "products";

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError("");

      try {
        const params =
          isProduct && type
            ? {
                filters: {
                  type,
                },
              }
            : {};

        const result = await request(
          isProduct ? "Products" : "Companies",
          params
        );

        setData(result || []);
      } catch (error) {
        setError(error.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [isProduct, type]);

  const title =
    entity === "companies"
      ? "Companies"
      : type === "medicine"
        ? "Medicines"
        : type === "cosmetics"
          ? "Cosmetics"
          : "Products";

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            {entity}
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            {title}
          </h1>
        </div>

        {error && (
          <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {loading && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-56 animate-pulse rounded-2xl bg-white"
              />
            ))}
          </div>
        )}

        {!loading && !error && data.length === 0 && (
          <div className="mt-8 rounded-2xl bg-white p-10 text-center">
            <p className="text-slate-500">
              No {title.toLowerCase()} found.
            </p>
          </div>
        )}

        {!loading && !error && data.length > 0 && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.map((item) => (
              <Link
                key={item.id}
                href={`/view?entity=${entity}&id=${item.id}`}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                  {isProduct ? "💊" : "🏢"}
                </div>

                <h2 className="mt-5 text-xl font-semibold text-slate-900 group-hover:text-blue-600">
                  {item.name}
                </h2>

                {isProduct && (
                  <p className="mt-2 text-sm font-medium text-blue-600">
                    {item.type}
                  </p>
                )}

                {!isProduct && (
                  <p className="mt-2 text-sm font-medium text-blue-600">
                    {item.is_contracted ? "Contracted" : "Not Contracted"}
                  </p>
                )}

                {item.description && (
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

