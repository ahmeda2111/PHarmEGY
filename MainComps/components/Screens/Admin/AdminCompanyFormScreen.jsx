"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { saveCompany } from "../../../lib/adminActions";
import { useAuth } from "../../../lib/useAuth";
import { useToast } from "../../../lib/useToast";
import { request } from "../../../requests/request";
import AdminGuard from "./AdminGuard";

const emptyForm = {
  name: "",
  description: "",
  is_contracted: false,
};

export default function AdminCompanyFormScreen({ companyId }) {
  const router = useRouter();
  const { profile } = useAuth();
  const { showToast } = useToast();
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(Boolean(companyId));
  const [saving, setSaving] = useState(false);
  const isEdit = Boolean(companyId);

  useEffect(() => {
    if (!companyId) return;

    const load = async () => {
      try {
        const rows = await request("Companies", {
          filters: { id: companyId },
        });
        const company = rows?.[0];

        if (!company) {
          setError("Company not found.");
          return;
        }

        setForm({
          name: company.name || "",
          description: company.description || "",
          is_contracted: Boolean(company.is_contracted),
        });
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [companyId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Enter a company name.");
      return;
    }

    setSaving(true);

    try {
      await saveCompany(
        {
          id: companyId,
          ...form,
        },
        profile
      );
      showToast(isEdit ? "Company updated." : "Company added.");
      router.push("/admin/companies");
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
            href="/admin/companies"
            className="text-sm font-semibold text-blue-600"
          >
            ← Companies
          </Link>

          <h1 className="mt-3 text-3xl font-bold text-slate-900">
            {isEdit ? "Edit company" : "Add company"}
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

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.is_contracted}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      is_contracted: event.target.checked,
                    }))
                  }
                  className="h-4 w-4"
                />
                <span className="text-sm font-medium text-slate-700">
                  Contracted company
                </span>
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

              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-70"
              >
                {saving ? "Saving..." : isEdit ? "Save changes" : "Add company"}
              </button>
            </form>
          )}
        </div>
      </main>
    </AdminGuard>
  );
}
