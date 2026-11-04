
"use client";

import { useMemo } from "react";
import List from "../../comps/ListComponent";
import MainText from "../../comps/MainTextComponent";
import { useGetItems } from "../../../hooks/useGetItems";

export default function ViewListScreen({ entity, type, q }) {
  const isProduct = entity === "products";

  const params = useMemo(() => {
    const result = {};

    if (isProduct && type) {
      result.filters = { type };
    }

    if (q) {
      result.search = {
        term: q,
        columns: ["name", "description"],
      };
    }

    return result;
  }, [isProduct, q, type]);

  const { items: data, loading, error } = useGetItems(
    isProduct ? "Products" : "Companies",
    params
  );

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
          <MainText
            as="p"
            className="text-sm font-semibold uppercase tracking-wider text-blue-600"
          >
            {entity}
          </MainText>

          <MainText as="h1" className="mt-2 text-3xl font-bold text-slate-900">
            {title}
          </MainText>
          {q ? (
            <MainText as="p" className="mt-2 text-slate-600">
              Results for “{q}”
            </MainText>
          ) : null}
        </div>

        {error ? (
          <MainText
            as="p"
            className="mt-8 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700"
          >
            {error}
          </MainText>
        ) : (
          <List
            view="cards"
            item={isProduct ? "productCard" : "companyCard"}
            data={data}
            loading={loading}
            empty={`No ${title.toLowerCase()} found.`}
            className="mt-8"
            itemProps={
              isProduct
                ? {
                    titleAs: "h2",
                    typeClassName: "mt-2 text-sm font-medium text-blue-600",
                  }
                : undefined
            }
          />
        )}
      </div>
    </main>
  );
}

