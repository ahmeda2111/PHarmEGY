"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useGetItems } from "../../../hooks/useGetItems";
import ProductGallery from "../../comps/product/ProductGallery";
import ProductPurchaseSection from "../../comps/product/ProductPurchaseSection";
import ProductDescription from "../../comps/product/ProductDescription";
import ProductReviews from "../../comps/product/ProductReviews";
import RelatedProducts from "../../comps/product/RelatedProducts";
import MainText from "../../comps/MainTextComponent";
import MainButton from "../../comps/MainButton";

export default function ViewScreen({ entity, id }) {
  const isProduct = entity === "products";
  const backHref = isProduct
    ? "/view-list?entity=products"
    : "/view-list?entity=companies";
  const backLabel = isProduct ? "Products" : "Companies";

  const params = useMemo(() => {
    return { filters: { id } };
  }, [id]);

  const { items, loading, error } = useGetItems(
    isProduct ? "Products" : "Companies",
    id ? params : { filters: { __skip: true } }
  );

  const data = items?.[0] || null;

  if (!id) {
    return (
      <main className="flex-1 bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
          <div className="rounded-2xl bg-white p-10 text-center">
            <MainText className="text-gray-500">
              Select a {isProduct ? "product" : "company"} to view details
            </MainText>
          </div>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="flex-1 bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
          <div className="grid animate-pulse gap-8 rounded-3xl bg-white p-8 shadow-sm md:grid-cols-2">
            <div className="h-96 rounded-2xl bg-gray-200" />
            <div className="space-y-5 py-6">
              <div className="h-10 w-2/3 rounded bg-gray-200" />
              <div className="h-6 w-32 rounded bg-gray-200" />
              <div className="h-24 w-full rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 bg-gray-50">
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
      <main className="flex-1 bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
          <Link href={backHref} className="text-sm font-semibold text-blue-600">
            ← {backLabel}
          </Link>
          <div className="mt-6 rounded-2xl bg-white p-10 text-center">
            <MainText className="text-gray-500">
              {isProduct ? "Product" : "Company"} not found
            </MainText>
          </div>
        </div>
      </main>
    );
  }

  if (!isProduct) {
    return (
      <main className="flex-1 bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
          <Link href={backHref} className="text-sm font-semibold text-blue-600">
            ← {backLabel}
          </Link>
          <div className="mt-6 grid gap-8 rounded-3xl bg-white p-8 shadow-sm md:grid-cols-2">
            <div className="flex min-h-96 items-center justify-center rounded-2xl bg-gray-100">
              <span className="text-8xl">🏢</span>
            </div>
            <div className="flex flex-col justify-center">
              <MainText as="h1" className="text-4xl font-bold text-gray-900">
                {data.name}
              </MainText>
              <MainText as="p" className="mt-5 text-lg font-semibold text-blue-600">
                Contracted: {data.is_contracted ? "Yes" : "No"}
              </MainText>
              {data.description ? (
                <MainText as="p" className="mt-5 text-base leading-7 text-gray-600">
                  {data.description}
                </MainText>
              ) : null}
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <Link href={backHref} className="text-sm font-semibold text-blue-600">
          ← {backLabel}
        </Link>

        {/* Product Details Section */}
        <div className="mt-6 grid gap-8 rounded-3xl bg-white p-8 shadow-sm md:grid-cols-2">
          {/* Left Column - Gallery */}
          <ProductGallery images={data.images || []} />

          {/* Right Column - Purchase Section */}
          <ProductPurchaseSection product={data} />
        </div>

        {/* Product Description Section */}
        <ProductDescription product={data} />

        {/* Product Reviews Section */}
        <ProductReviews />

        {/* Related Products Section */}
        <RelatedProducts currentProduct={data} />
      </div>
    </main>
  );
}
