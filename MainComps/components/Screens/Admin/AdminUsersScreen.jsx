"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { listManagedUsers, updateManagedUser } from "../../../lib/adminActions";
import { canAssignRole, canManageUsers, USER_ROLES } from "../../../lib/roles";
import { useAuth } from "../../../lib/useAuth";
import { useToast } from "../../../lib/useToast";
import AdminGuard from "./AdminGuard";

const roleLabels = {
  client: "Client",
  employee: "Employee",
  assistant_admin: "Assistant admin",
  admin: "Admin",
};

function matchesSearch(user, search) {
  if (!search) return true;

  const haystack = [user.full_name, user.email, user.phone, user.role]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(search);
}

export default function AdminUsersScreen() {
  const { profile } = useAuth();
  const { showToast } = useToast();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [savingId, setSavingId] = useState("");
  const [passwordForm, setPasswordForm] = useState({
    id: "",
    password: "",
    confirmPassword: "",
  });

  const allowed = canManageUsers(profile?.role);
  const assignableRoles = USER_ROLES.filter((role) =>
    canAssignRole(profile?.role, role)
  );

  useEffect(() => {
    if (!allowed) {
      setLoading(false);
      return;
    }

    const load = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await listManagedUsers();
        setUsers(data || []);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [allowed]);

  const visibleUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return users.filter((user) => matchesSearch(user, query));
  }, [search, users]);

  const handleRoleChange = async (user, role) => {
    if (role === user.role) return;

    setSavingId(user.id);
    setError("");

    try {
      const updated = await updateManagedUser({ id: user.id, role });
      setUsers((current) =>
        current.map((item) => (item.id === user.id ? { ...item, ...updated } : item))
      );
      showToast(`${updated.full_name || "User"} role updated.`);
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setSavingId("");
    }
  };

  const handlePasswordSave = async (event) => {
    event.preventDefault();
    setError("");

    if (passwordForm.password !== passwordForm.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSavingId(passwordForm.id);

    try {
      await updateManagedUser({
        id: passwordForm.id,
        password: passwordForm.password,
      });
      setPasswordForm({ id: "", password: "", confirmPassword: "" });
      showToast("Password updated.");
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setSavingId("");
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
              <h1 className="mt-3 text-3xl font-bold text-slate-900">Users</h1>
              <p className="mt-2 text-slate-600">
                Upgrade a caller&apos;s role, or set a new password for them.
              </p>
            </div>

            {allowed ? (
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search name, phone, or email"
                className="w-full max-w-sm rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            ) : null}
          </div>

          {!allowed ? (
            <p className="mt-8 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
              Only admins and assistant admins can manage users.
            </p>
          ) : null}

          {error ? (
            <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          ) : null}

          {allowed && loading ? (
            <div className="mt-8 h-40 animate-pulse rounded-3xl bg-white" />
          ) : null}

          {allowed && !loading ? (
            <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white">
              {visibleUsers.length === 0 ? (
                <p className="p-8 text-slate-500">No users found.</p>
              ) : (
                <table className="w-full text-left">
                  <thead className="border-b border-slate-200 bg-slate-50 text-sm text-slate-500">
                    <tr>
                      <th className="px-6 py-4 font-medium">Name</th>
                      <th className="px-6 py-4 font-medium">Phone</th>
                      <th className="px-6 py-4 font-medium">Email</th>
                      <th className="px-6 py-4 font-medium">Role</th>
                      <th className="px-6 py-4 font-medium" />
                    </tr>
                  </thead>
                  <tbody>
                    {visibleUsers.map((user) => {
                      const canEditRole = canAssignRole(profile?.role, user.role);
                      const isSelf = user.id === profile?.id;
                      const openPassword = passwordForm.id === user.id;

                      return (
                        <tr key={user.id} className="border-b border-slate-100 align-top">
                          <td className="px-6 py-4 font-medium text-slate-900">
                            {user.full_name || "—"}
                            {user.status && user.status !== "active" ? (
                              <span className="mt-1 block text-xs font-medium text-amber-700">
                                {user.status}
                              </span>
                            ) : null}
                          </td>
                          <td className="px-6 py-4 text-slate-600">
                            {user.phone || "—"}
                          </td>
                          <td className="px-6 py-4 text-slate-600">
                            {user.email || "—"}
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={user.role || "client"}
                              disabled={savingId === user.id || isSelf || !canEditRole}
                              onChange={(event) =>
                                handleRoleChange(user, event.target.value)
                              }
                              className="w-full min-w-40 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
                            >
                              {(canEditRole ? assignableRoles : [user.role || "client"]).map(
                                (role) => (
                                  <option key={role} value={role}>
                                    {roleLabels[role] || role}
                                  </option>
                                )
                              )}
                            </select>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col items-end gap-3">
                              <button
                                type="button"
                                onClick={() =>
                                  setPasswordForm(
                                    openPassword
                                      ? { id: "", password: "", confirmPassword: "" }
                                      : {
                                          id: user.id,
                                          password: "",
                                          confirmPassword: "",
                                        }
                                  )
                                }
                                className="font-semibold text-blue-600 hover:text-blue-700"
                              >
                                {openPassword ? "Cancel" : "Set password"}
                              </button>

                              {openPassword ? (
                                <form
                                  className="w-72 space-y-2"
                                  onSubmit={handlePasswordSave}
                                >
                                  <input
                                    type="password"
                                    value={passwordForm.password}
                                    onChange={(event) =>
                                      setPasswordForm((current) => ({
                                        ...current,
                                        password: event.target.value,
                                      }))
                                    }
                                    placeholder="New password"
                                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                                  />
                                  <input
                                    type="password"
                                    value={passwordForm.confirmPassword}
                                    onChange={(event) =>
                                      setPasswordForm((current) => ({
                                        ...current,
                                        confirmPassword: event.target.value,
                                      }))
                                    }
                                    placeholder="Confirm password"
                                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                                  />
                                  <button
                                    type="submit"
                                    disabled={savingId === user.id}
                                    className="w-full rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-70"
                                  >
                                    {savingId === user.id
                                      ? "Saving..."
                                      : "Save password"}
                                  </button>
                                </form>
                              ) : null}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          ) : null}
        </div>
      </main>
    </AdminGuard>
  );
}
