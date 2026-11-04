import Link from "next/link";
import MainText from "../MainTextComponent";
import MainButton from "../MainButton";

export default function CTASection() {
  return (
    <section className="bg-blue-600">
      <div className="mx-auto max-w-7xl px-6 py-16 text-center">
        <MainText as="h2" className="text-3xl font-bold text-white">
          Explore our products
        </MainText>

        <MainText as="p" className="mx-auto mt-4 max-w-2xl text-blue-100">
          Discover pharmaceutical and cosmetic products available through
          PHarmEGY.
        </MainText>

        <Link href="/view-list?entity=products" className="mt-8 inline-block">
          <MainButton variant="secondary">
            <MainText>Explore Products</MainText>
          </MainButton>
        </Link>
      </div>
    </section>
  );
}
