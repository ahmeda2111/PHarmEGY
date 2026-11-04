"use client";

import Link from "next/link";
import MainText from "../MainTextComponent";

export default function AdminCompanyRow({ record, onDelete }) {
  return (
    <tr className="border-b border-slate-100">
      <td className="px-6 py-4 font-medium text-slate-900">
        <MainText>{record.name}</MainText>
      </td>
      <td className="px-6 py-4 text-slate-600">
        <MainText>{record.is_contracted ? "Yes" : "No"}</MainText>
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-end gap-4">
          <Link
            href={`/admin/companies/${record.id}`}
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

AdminCompanyRow.columns = [
  { key: "name", label: "Name" },
  { key: "contracted", label: "Contracted" },
  { key: "actions", label: "" },
];
