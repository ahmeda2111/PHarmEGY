"use client";

import Link from "next/link";
import MainText from "../MainTextComponent";

export default function AdminProductRow({ record, onDelete }) {
  return (
    <tr className="border-b border-slate-100">
      <td className="px-6 py-4 font-medium text-slate-900">
        <MainText>{record.name}</MainText>
      </td>
      <td className="px-6 py-4 text-slate-600">
        <MainText>{record.type}</MainText>
      </td>
      <td className="px-6 py-4 text-slate-600">
        <MainText>{record.company?.name || "—"}</MainText>
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-end gap-4">
          <Link
            href={`/products/${record.id}`}
            className="font-semibold text-slate-600 hover:text-slate-900"
          >
            <MainText>View</MainText>
          </Link>
          <Link
            href={`/admin/products/${record.id}`}
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            <MainText>Edit</MainText>
          </Link>
          <button
            type="button"
            onClick={() => onDelete(record)}
            className="font-semibold text-red-600 hover:text-red-700"
          >
            <MainText>Delete</MainText>
          </button>
        </div>
      </td>
    </tr>
  );
}

AdminProductRow.columns = [
  { key: "name", label: "Name" },
  { key: "type", label: "Type" },
  { key: "company", label: "Company" },
  { key: "actions", label: "" },
];
