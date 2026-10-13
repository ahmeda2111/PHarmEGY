"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { request } from "../../../requests/request";

export default function ViewScreen({ entity, id }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isProduct = entity === "products";
  const backHref = isProduct
    ? "/view-list?entity=products"
    : "/view-list?entity=companies";
  const backLabel = isProduct ? "Products" : "Companies";

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError("");

      try {
        const result = await request(isProduct ? "Products" : "Companies", {
          filters: {
            id,
          },
        });

        setData(result?.[0] || null);
      } catch (loadError) {
        setError(loadError.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getData();
    }
  }, [id, isProduct]);

  if (!id) {
    return (
      <main className="flex-1 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
          <p className="rounded-2xl bg-white p-10 text-center text-slate-500">
            Choose a {isProduct ? "product" : "company"} to view its details.
          </p>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="flex-1 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
          <div className="grid animate-pulse gap-8 rounded-3xl bg-white p-8 shadow-sm md:grid-cols-2">
            <div className="h-96 rounded-2xl bg-slate-200" />
            <div className="space-y-5 py-6">
              <div className="h-10 w-2/3 rounded bg-slate-200" />
              <div className="h-6 w-32 rounded bg-slate-200" />
              <div className="h-24 w-full rounded bg-slate-200" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
            {error}
          </div>
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="flex-1 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
          <Link href={backHref} className="text-sm font-semibold text-blue-600">
            ← {backLabel}
          </Link>
          <div className="mt-6 rounded-2xl bg-white p-10 text-center">
            <p className="text-slate-500">
              {isProduct ? "Product" : "Company"} not found.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <Link href={backHref} className="text-sm font-semibold text-blue-600">
          ← {backLabel}
        </Link>

        <div className="mt-6 grid gap-8 rounded-3xl bg-white p-8 shadow-sm md:grid-cols-2">
          <div className="flex min-h-96 items-center justify-center rounded-2xl bg-slate-100">
            <span className="text-8xl">{isProduct ? "💊" : "🏢"}</span>
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              {isProduct ? data.type || "Product" : "Company"}
            </p>

            <h1 className="mt-2 text-4xl font-bold text-slate-900">{data.name}</h1>

            {isProduct ? (
              <>
                {data.company?.name ? (
                  <p className="mt-4 text-base font-medium text-slate-700">
                    Company:{" "}
                    <Link
                      href={`/view?entity=companies&id=${data.company.id}`}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      {data.company.name}
                    </Link>
                  </p>
                ) : null}

                {data.description ? (
                  <p className="mt-5 text-base leading-7 text-slate-600">
                    {data.description}
                  </p>
                ) : null}
              </>
            ) : (
              <>
                <p className="mt-5 text-lg font-semibold text-blue-600">
                  Contracted: {data.is_contracted ? "Yes" : "No"}
                </p>

                {data.description ? (
                  <p className="mt-5 text-base leading-7 text-slate-600">
                    {data.description}
                  </p>
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
