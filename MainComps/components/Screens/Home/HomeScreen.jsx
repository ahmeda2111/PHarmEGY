
"use client";

import HeroSection from "../../comps/home/HeroSection";
import ProductsSection from "../../comps/home/ProductsSection";
import CTASection from "../../comps/home/CTASection";

import { useGetItems } from "../../../hooks/useGetItems";

export default function HomeScreen() {
  const { items: products, loading, error } = useGetItems("Products");

  return (
    <main className="min-h-screen bg-white">
      <HeroSection />

      {error && (
        <div className="mx-auto max-w-7xl px-6 pt-6 lg:px-8">
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            <p className="font-semibold">Request Error</p>

            <p className="mt-1 text-sm">
              {error}
            </p>
          </div>
        </div>
      )}

      <ProductsSection
        products={products}
        loading={loading}
      />

      <CTASection />
    </main>
  );
}


