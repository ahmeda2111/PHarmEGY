"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import List from "../../comps/ListComponent";
import MainText from "../../comps/MainTextComponent";
import { listManagedUsers, updateManagedUser } from "../../../services/adminActions";
import { canAssignRole, canManageUsers, USER_ROLES } from "../../../services/roles";
import { useAuth } from "../../../hooks/useAuth";
import { useToast } from "../../../hooks/useToast";
import AdminGuard from "./AdminGuard";

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
  const visibleUsers = users.filter((user) =>
    matchesSearch(user, search.trim().toLowerCase())
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
                <MainText>← Admin Panel</MainText>
              </Link>
              <MainText as="h1" className="mt-3 text-3xl font-bold text-slate-900">
                Users
              </MainText>
              <MainText as="p" className="mt-2 text-slate-600">
                Upgrade a caller&apos;s role, or set a new password for them.
              </MainText>
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
            <MainText as="p" className="mt-8 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
              Only admins and assistant admins can manage users.
            </MainText>
          ) : null}

          {error ? (
            <MainText as="p" className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </MainText>
          ) : null}

          {allowed ? (
            <List
              view="table"
              item="adminUser"
              data={visibleUsers}
              loading={loading}
              empty="No users found."
              className="mt-8"
              itemProps={{
                profile,
                assignableRoles,
                savingId,
                passwordForm,
                onRoleChange: handleRoleChange,
                onPasswordFormChange: (field, value) =>
                  setPasswordForm((current) => ({
                    ...current,
                    [field]: value,
                  })),
                onPasswordSave: handlePasswordSave,
                onTogglePassword: (item) =>
                  setPasswordForm(
                    passwordForm.id === item.id
                      ? { id: "", password: "", confirmPassword: "" }
                      : {
                          id: item.id,
                          password: "",
                          confirmPassword: "",
                        }
                  ),
              }}
            />
          ) : null}
        </div>
      </main>
    </AdminGuard>
  );
}
