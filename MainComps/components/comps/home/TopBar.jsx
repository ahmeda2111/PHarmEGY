
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { isStaffRole } from "../../../lib/roles";
import { useAuth } from "../../../lib/useAuth";
import UserMenu from "./UserMenu";

const productTypes = [
  { label: "Medicines", type: "medicine" },
  { label: "Cosmetics", type: "cosmetics" },
];

export default function TopBar() {
  const { user, profile } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const showAdmin = isStaffRole(profile?.role || user?.user_metadata?.role);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4 sm:gap-8">
            <Link href="/" className="shrink-0 py-3">
              <img
                src="/assets/05_Wordmark/PHarmEGY_Wordmark_Transparent.png"
                alt="PHarmEGY"
                className="h-8 w-auto"
              />
            </Link>

            <div className="relative" ref={menuRef}>
              <button
                type="button"
                aria-expanded={open}
                aria-haspopup="menu"
                onClick={() => setOpen((value) => !value)}
                className="inline-flex items-center gap-1 border-b-2 border-blue-600 px-3 py-5 font-semibold text-blue-600 sm:px-4"
              >
                Products
                <svg
                  className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {open && (
                <div
                  role="menu"
                  className="absolute left-0 top-full z-30 min-w-48 rounded-b-xl border border-t-0 border-slate-200 bg-white p-2 shadow-lg"
                >
                  {productTypes.map((item) => (
                    <Link
                      key={item.type}
                      href={`/view-list?entity=products&type=${item.type}`}
                      role="menuitem"
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/view-list?entity=companies"
              className="px-3 py-5 font-semibold text-slate-700 hover:text-blue-600 sm:px-4"
            >
              Companies
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {showAdmin ? (
              <Link
                href="/admin"
                className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 sm:px-4"
              >
                Admin Panel
              </Link>
            ) : null}
            <UserMenu />
          </div>
        </div>
      </div>
    </section>
  );
}
