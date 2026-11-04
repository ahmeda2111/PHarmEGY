import List from "../ListComponent";
import MainText from "../MainTextComponent";
import Link from "next/link";

export default function ProductsSection({ products, loading }) {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <MainText
              as="p"
              className="text-sm font-semibold uppercase tracking-wider text-blue-600"
            >
              Products
            </MainText>
            <MainText as="h2" className="mt-2 text-3xl font-bold text-slate-900">
              Our Products
            </MainText>
          </div>

          <Link
            href="/view-list?entity=products"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            <MainText>View all</MainText>
          </Link>
        </div>

        <List
          view="cards"
          item="productCard"
          data={products || []}
          loading={loading}
          empty="No products found."
          className="mt-10"
          skeletonClassName="h-64"
          itemProps={{
            showCompany: true,
            titleAs: "h3",
            typeClassName: "mt-2 text-sm font-medium capitalize text-blue-600",
          }}
        />
      </div>
    </section>
  );
}
