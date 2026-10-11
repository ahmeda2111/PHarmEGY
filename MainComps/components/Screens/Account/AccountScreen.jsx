"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getProfileForAuthUser } from "../../../lib/authActions";
import { useAuth } from "../../../lib/useAuth";

function formatDate(value) {
  if (!value) return "—";

  return new Date(value).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function Row({ label, value }) {
  return (
    <div className="grid gap-1 border-b border-slate-100 py-4 sm:grid-cols-[10rem_1fr] sm:items-center">
      <dt className="text-sm font-medium text-slate-500">{label}</dt>
      <dd className="font-medium text-slate-900">{value || "—"}</dd>
    </div>
  );
}

export default function AccountScreen() {
  const { user, ready } = useAuth();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ready) return;

    if (!user) {
      setLoading(false);
      return;
    }

    const load = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getProfileForAuthUser(user);
        setProfile(data);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [ready, user]);

  if (!ready || loading) {
    return (
      <main className="flex-1 bg-slate-50">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
          <div className="h-40 animate-pulse rounded-3xl bg-white" />
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex-1 bg-slate-50">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
          <h1 className="text-3xl font-bold text-slate-900">Profile</h1>
          <p className="mt-3 text-slate-600">Log in to see your account details.</p>
          <Link
            href="/login"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Log in
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-slate-50">
      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900">Profile</h1>
        <p className="mt-3 text-slate-600">Your PHarmEGY account details.</p>

        {error ? (
          <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <dl className="mt-8 rounded-3xl border border-slate-200 bg-white px-6 py-2">
          <Row label="Full name" value={profile?.full_name} />
          <Row label="Phone" value={profile?.phone} />
          <Row label="Email" value={profile?.email || user.email} />
          <Row label="Role" value={profile?.role} />
          <Row label="Status" value={profile?.status} />
          <Row label="Created at" value={formatDate(profile?.created_at)} />
        </dl>
      </div>
    </main>
  );
}
