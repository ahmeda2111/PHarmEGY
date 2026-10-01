
"use client";

import Link from "next/link";

const productTypes = [
  { label: "Medicines", type: "medicine" },
  { label: "Cosmetics", type: "cosmetics" },
];

export default function TopBar() {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <div className="group relative">
            <button className="border-b-2 border-blue-600 px-4 py-5 font-semibold text-blue-600">
              Products
            </button>

            <div className="absolute left-0 top-full z-20 hidden min-w-48 rounded-b-xl border border-t-0 border-slate-200 bg-white p-2 shadow-lg group-hover:block">
              {productTypes.map((item) => (
                <Link
                  key={item.type}
                  href={`/view-list?entity=products&type=${item.type}`}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/view-list?entity=companies"
            className="px-4 py-5 font-semibold text-slate-700 hover:text-blue-600"
          >
            Companies
          </Link>
        </div>
      </div>
    </section>
  );
}

