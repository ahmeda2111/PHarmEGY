"use client";

import List from "../../comps/ListComponent";
import MainText from "../../comps/MainTextComponent";
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
          <MainText
            as="p"
            className="text-sm font-semibold uppercase tracking-wider text-blue-600"
          >
            Admin Panel
          </MainText>
          <MainText as="h1" className="mt-2 text-3xl font-bold text-slate-900">
            Manage PHarmEGY data
          </MainText>
          <MainText as="p" className="mt-3 max-w-2xl text-slate-600">
            Add or edit products and companies shown on the site, and manage user
            accounts.
          </MainText>

          <List
            view="cards"
            item="adminLink"
            data={cards}
            layoutClassName="grid gap-6 md:grid-cols-3"
            className="mt-10"
          />
        </div>
      </main>
    </AdminGuard>
  );
}
