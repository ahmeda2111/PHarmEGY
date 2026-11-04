"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { saveProduct } from "../../../services/adminActions";
import { useAuth } from "../../../hooks/useAuth";
import { useToast } from "../../../hooks/useToast";
import { useGetItems } from "../../../hooks/useGetItems";
import MainText from "../../comps/MainTextComponent";
import MainButton from "../../comps/MainButton";
import AdminGuard from "./AdminGuard";

const productTypes = [
  { value: "medicine", label: "Medicines" },
  { value: "cosmetics", label: "Cosmetics" },
];

const emptyForm = {
  name: "",
  description: "",
  type: "medicine",
  company_id: "",
};

export default function AdminProductFormScreen({ productId }) {
  const router = useRouter();
  const { profile } = useAuth();
  const { showToast } = useToast();
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const isEdit = Boolean(productId);

  const { items: companies } = useGetItems("Companies");
  const { items: products, loading } = useGetItems(
    "Products",
    productId ? { filters: { id: productId } } : { __skip: true }
  );

  const companiesList = companies || [];

  const product = products?.[0];

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        description: product.description || "",
        type: product.type || "medicine",
        company_id: product.company_id || "",
      });
    } else if (isEdit && !loading) {
      setError("Product not found.");
    }
  }, [product, isEdit, loading]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Enter a product name.");
      return;
    }

    setSaving(true);

    try {
      await saveProduct(
        {
          id: productId,
          ...form,
        },
        profile
      );
      showToast(isEdit ? "Product updated." : "Product added.");
      router.push("/admin/products");
      router.refresh();
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminGuard>
      <main className="flex-1 bg-slate-50">
        <div className="mx-auto max-w-3xl px-6 py-12 lg:px-8">
          <Link
            href="/admin/products"
            className="text-sm font-semibold text-blue-600"
          >
            ← Products
          </Link>

          <h1 className="mt-3 text-3xl font-bold text-slate-900">
            {isEdit ? "Edit product" : "Add product"}
          </h1>

          {loading ? (
            <div className="mt-8 h-40 animate-pulse rounded-3xl bg-white" />
          ) : (
            <form
              className="mt-8 space-y-5 rounded-3xl border border-slate-200 bg-white p-8"
              onSubmit={handleSubmit}
            >
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Name</span>
                <input
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, name: event.target.value }))
                  }
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">
                  Product type
                </span>
                <select
                  value={form.type}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, type: event.target.value }))
                  }
                  className="mt-2 w-full appearance-none rounded-lg border border-slate-300 bg-white bg-[length:16px] bg-[right_12px_center] bg-no-repeat px-4 py-3 text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E\")",
                  }}
                >
                  {productTypes.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">
                  Company
                </span>
                <select
                  value={form.company_id}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      company_id: event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">No company</option>
                  {companiesList.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">
                  Description
                </span>
                <textarea
                  value={form.description}
                  rows={5}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      description: event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </label>

              {error ? (
                <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </p>
              ) : null}

              <MainButton type="submit" disabled={saving} fullWidth>
                <MainText>{saving ? "Saving..." : isEdit ? "Save changes" : "Add product"}</MainText>
              </MainButton>
            </form>
          )}
        </div>
      </main>
    </AdminGuard>
  );
}
