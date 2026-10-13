"use client";

import Link from "next/link";
import AdminGuard from "./AdminGuard";

const cards = [
  {
    href: "/admin/products",
    title: "Products",
    description: "Add medicines and cosmetics, and edit their details.",
  },
  {
    href: "/admin/companies",
    title: "Companies",
    description: "Add partner companies and update their information.",
  },
  {
    href: "/admin/users",
    title: "Users",
    description: "Upgrade a user's role or set a new password when they call.",
  },
];

export default function AdminHomeScreen() {
  return (
    <AdminGuard>
      <main className="flex-1 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Admin Panel
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Manage PHarmEGY data
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Add or edit products and companies shown on the site, and manage user
            accounts.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {cards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="rounded-3xl border border-slate-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <h2 className="text-2xl font-bold text-slate-900">
                  {card.title}
                </h2>
                <p className="mt-3 text-slate-600">{card.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </AdminGuard>
  );
}
