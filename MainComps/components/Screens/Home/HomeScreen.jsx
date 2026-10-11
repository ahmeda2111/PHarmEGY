
"use client";

import { useEffect, useState } from "react";

import HeroSection from "../../comps/home/HeroSection";
// import ExploreSection from "../../comps/home/ExploreSection";
import ProductsSection from "../../comps/home/ProductsSection";
import CTASection from "../../comps/home/CTASection";

import { request } from "../../../requests/request";

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await request("Products");

        setProducts(data || []);
      } catch (error) {
        setError(error.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      {/* <ExploreSection /> */}

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


