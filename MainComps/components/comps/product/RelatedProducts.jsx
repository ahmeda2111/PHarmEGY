"use client";

import Link from "next/link";
import { useGetItems } from "../../../hooks/useGetItems";
import MainText from "../MainTextComponent";
import List from "../ListComponent";

// TODO: Replace with actual API filtering by product type
export default function RelatedProducts({ currentProduct }) {
  const productType = currentProduct?.type;

  const { items: relatedProducts, loading } = useGetItems(
    "Products",
    productType
      ? {
          filters: { type: productType },
          limit: 4,
        }
      : { __skip: true }
  );

  // Filter out the current product from related products
  const filteredProducts = relatedProducts?.filter(
    (p) => p.id !== currentProduct?.id
  );

  if (!productType || loading || !filteredProducts || filteredProducts.length === 0) {
    return null;
  }

  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between border-b border-slate-200 pb-4">
          <MainText className="text-xl font-semibold text-slate-900">
            You May Also Like
          </MainText>
          <Link href={`/view-list?entity=products&type=${productType}`}>
            <MainText className="text-sm font-semibold text-blue-600 hover:text-blue-700">
              View All
            </MainText>
          </Link>
        </div>

        {/* Products Grid using List Component */}
        <List
          view="cards"
          item="productCard"
          data={filteredProducts}
          loading={loading}
          empty="No related products found"
        />
      </div>
    </div>
  );
}
