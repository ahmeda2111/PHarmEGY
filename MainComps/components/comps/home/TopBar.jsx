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
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef(null);
  const barRef = useRef(null);
  const showAdmin = isStaffRole(profile?.role || user?.user_metadata?.role);

  useEffect(() => {
    if (!productsOpen && !mobileOpen) return;

    const handlePointerDown = (event) => {
      if (!barRef.current?.contains(event.target)) {
        setProductsOpen(false);
        setMobileOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setProductsOpen(false);
        setMobileOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen, productsOpen]);

  const closeMenus = () => {
    setProductsOpen(false);
    setMobileOpen(false);
  };

  return (
    <header ref={barRef} className="sticky top-0 z-40 overflow-x-clip border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 min-w-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 md:hidden"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => {
              setMobileOpen((value) => !value);
              setProductsOpen(false);
            }}
          >
            {mobileOpen ? (
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>

          <Link href="/" className="min-w-0 shrink py-2" onClick={closeMenus}>
            <img
              src="/assets/05_Wordmark/PHarmEGY_Wordmark_Transparent.png"
              alt="PHarmEGY"
              className="h-7 w-auto max-w-[9.5rem] object-contain object-left sm:h-8 sm:max-w-none"
            />
          </Link>

          <nav className="hidden min-w-0 flex-1 items-center gap-1 md:flex lg:gap-2">
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                aria-expanded={productsOpen}
                aria-haspopup="menu"
                onClick={() => setProductsOpen((value) => !value)}
                className="inline-flex items-center gap-1 border-b-2 border-blue-600 px-3 py-4 font-semibold text-blue-600 lg:px-4"
              >
                Products
                <svg
                  className={`h-4 w-4 transition ${productsOpen ? "rotate-180" : ""}`}
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

              {productsOpen ? (
                <div
                  role="menu"
                  className="absolute left-0 top-full z-30 min-w-48 rounded-b-xl border border-t-0 border-slate-200 bg-white p-2 shadow-lg"
                >
                  {productTypes.map((item) => (
                    <Link
                      key={item.type}
                      href={`/view-list?entity=products&type=${item.type}`}
                      role="menuitem"
                      onClick={closeMenus}
                      className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>

            <Link
              href="/view-list?entity=companies"
              className="px-3 py-4 font-semibold text-slate-700 hover:text-blue-600 lg:px-4"
            >
              Companies
            </Link>
          </nav>

          <div className="ml-auto flex min-w-0 shrink-0 items-center gap-2">
            {showAdmin ? (
              <Link
                href="/admin"
                className="hidden rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 sm:inline-flex"
              >
                Admin
              </Link>
            ) : null}
            <UserMenu />
          </div>
        </div>

        {mobileOpen ? (
          <nav className="space-y-1 border-t border-slate-200 py-3 md:hidden">
            <p className="px-2 pb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Products
            </p>
            {productTypes.map((item) => (
              <Link
                key={item.type}
                href={`/view-list?entity=products&type=${item.type}`}
                onClick={closeMenus}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/view-list?entity=companies"
              onClick={closeMenus}
              className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600"
            >
              Companies
            </Link>
            {showAdmin ? (
              <Link
                href="/admin"
                onClick={closeMenus}
                className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-100 sm:hidden"
              >
                Admin Panel
              </Link>
            ) : null}
          </nav>
        ) : null}
      </div>
    </header>
  );
}
