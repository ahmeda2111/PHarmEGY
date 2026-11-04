"use client";

import Link from "next/link";
import { useState } from "react";
import List from "../../comps/ListComponent";
import MainText from "../../comps/MainTextComponent";
import MainButton from "../../comps/MainButton";
import { deleteCompany } from "../../../services/adminActions";
import { useToast } from "../../../hooks/useToast";
import { useGetItems } from "../../../hooks/useGetItems";
import AdminGuard from "./AdminGuard";

export default function AdminCompaniesScreen() {
  const { showToast } = useToast();
  const { items: companies, loading, error, refetch } = useGetItems("Companies");
  const [localError, setLocalError] = useState("");

  const handleDelete = async (company) => {
    try {
      await deleteCompany(company.id);
      refetch();
      showToast("Company deleted.", "delete");
    } catch (deleteError) {
      setLocalError(deleteError.message);
    }
  };

  return (
    <AdminGuard>
      <main className="flex-1 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Link href="/admin" className="text-sm font-semibold text-blue-600">
                <MainText>← Admin Panel</MainText>
              </Link>
              <MainText as="h1" className="mt-3 text-3xl font-bold text-slate-900">
                Companies
              </MainText>
            </div>

            <Link href="/admin/companies/new">
              <MainButton>
                <MainText>Add company</MainText>
              </MainButton>
            </Link>
          </div>

          {error || localError ? (
            <MainText as="p" className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {localError || error}
            </MainText>
          ) : null}

          <List
            view="table"
            item="adminCompany"
            data={companies}
            loading={loading}
            empty="No companies yet."
            className="mt-8"
            itemProps={{ onDelete: handleDelete }}
          />
        </div>
      </main>
    </AdminGuard>
  );
}
