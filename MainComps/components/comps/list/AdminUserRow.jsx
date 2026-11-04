"use client";

import { canAssignRole } from "../../../services/roles";
import MainText from "../MainTextComponent";
import MainButton from "../MainButton";

const roleLabels = {
  client: "Client",
  employee: "Employee",
  assistant_admin: "Assistant admin",
  admin: "Admin",
};

export default function AdminUserRow({
  record,
  profile,
  assignableRoles,
  savingId,
  passwordForm,
  onRoleChange,
  onPasswordFormChange,
  onPasswordSave,
  onTogglePassword,
}) {
  const canEditRole = canAssignRole(profile?.role, record.role);
  const isSelf = record.id === profile?.id;
  const openPassword = passwordForm.id === record.id;
  const roles = canEditRole ? assignableRoles : [record.role || "client"];

  return (
    <tr className="border-b border-slate-100 align-top">
      <td className="px-6 py-4 font-medium text-slate-900">
        <MainText>{record.full_name || "—"}</MainText>
        {record.status && record.status !== "active" ? (
          <MainText as="span" className="mt-1 block text-xs font-medium text-amber-700">
            {record.status}
          </MainText>
        ) : null}
      </td>
      <td className="px-6 py-4 text-slate-600">
        <MainText>{record.phone || "—"}</MainText>
      </td>
      <td className="px-6 py-4 text-slate-600">
        <MainText>{record.email || "—"}</MainText>
      </td>
      <td className="px-6 py-4">
        <select
          value={record.role || "client"}
          disabled={savingId === record.id || isSelf || !canEditRole}
          onChange={(event) => onRoleChange(record, event.target.value)}
          className="w-full min-w-40 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
        >
          {roles.map((role) => (
            <option key={role} value={role}>
              {roleLabels[role] || role}
            </option>
          ))}
        </select>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-col items-end gap-3">
          <button
            type="button"
            onClick={() => onTogglePassword(record)}
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            <MainText variant="link">{openPassword ? "Cancel" : "Set password"}</MainText>
          </button>

          {openPassword ? (
            <form className="w-72 space-y-2" onSubmit={onPasswordSave}>
              <input
                type="password"
                value={passwordForm.password}
                onChange={(event) => onPasswordFormChange("password", event.target.value)}
                placeholder="New password"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(event) =>
                  onPasswordFormChange("confirmPassword", event.target.value)
                }
                placeholder="Confirm password"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
              <MainButton
                type="submit"
                size="small"
                disabled={savingId === record.id}
                fullWidth
              >
                <MainText>{savingId === record.id ? "Saving..." : "Save password"}</MainText>
              </MainButton>
            </form>
          ) : null}
        </div>
      </td>
    </tr>
  );
}

AdminUserRow.columns = [
  { key: "name", label: "Name" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "actions", label: "" },
];
