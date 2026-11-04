"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isStaffRole } from "../../../services/roles";
import { useAuth } from "../../../hooks/useAuth";

export default function AdminGuard({ children }) {
  const { user, profile, ready } = useAuth();
  const router = useRouter();
  const role = profile?.role || user?.user_metadata?.role;
  const allowed = Boolean(user && isStaffRole(role));

  useEffect(() => {
    if (!ready) return;
    if (!user || !allowed) router.replace("/");
  }, [allowed, ready, router, user]);

  if (!ready) {
    return (
      <main className="flex-1 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="h-40 animate-pulse rounded-3xl bg-white" />
        </div>
      </main>
    );
  }

  if (!allowed) return null;

  return children;
}
