"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { deleteProduct } from "../../../lib/adminActions";
import { useToast } from "../../../lib/useToast";
import { request } from "../../../requests/request";
import AdminGuard from "./AdminGuard";

export default function AdminProductsScreen() {
  const { showToast } = useToast();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await request("Products");
        setProducts(data || []);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleDelete = async (product) => {
    try {
      await deleteProduct(product.id);
      setProducts((current) => current.filter((item) => item.id !== product.id));
      showToast("Product deleted.", "delete");
    } catch (deleteError) {
      setError(deleteError.message);
    }
  };

  return (
    <AdminGuard>
      <main className="flex-1 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Link href="/admin" className="text-sm font-semibold text-blue-600">
                ← Admin Panel
              </Link>
              <h1 className="mt-3 text-3xl font-bold text-slate-900">
                Products
              </h1>
            </div>

            <Link
              href="/admin/products/new"
              className="rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Add product
            </Link>
          </div>

          {error ? (
            <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          ) : null}

          {loading ? (
            <div className="mt-8 h-40 animate-pulse rounded-3xl bg-white" />
          ) : (
            <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white">
              {products.length === 0 ? (
                <p className="p-8 text-slate-500">No products yet.</p>
              ) : (
                <table className="w-full text-left">
                  <thead className="border-b border-slate-200 bg-slate-50 text-sm text-slate-500">
                    <tr>
                      <th className="px-6 py-4 font-medium">Name</th>
                      <th className="px-6 py-4 font-medium">Type</th>
                      <th className="px-6 py-4 font-medium">Company</th>
                      <th className="px-6 py-4 font-medium" />
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b border-slate-100">
                        <td className="px-6 py-4 font-medium text-slate-900">
                          {product.name}
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {product.type}
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {product.company?.name || "—"}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-4">
                            <Link
                              href={`/admin/products/${product.id}`}
                              className="font-semibold text-blue-600 hover:text-blue-700"
                            >
                              Edit
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleDelete(product)}
                              className="font-semibold text-red-600 hover:text-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </main>
    </AdminGuard>
  );
}
