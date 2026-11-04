"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getUserAvatar, getUserName, useAuth } from "../../../hooks/useAuth";
import { isStaffRole } from "../../../services/roles";
import MainText from "../MainTextComponent";
import MainButton from "../MainButton";

const accountLinks = [
  { href: "/account", label: "Profile" },
  { href: "/settings", label: "Settings" },
  { href: "/cart", label: "Cart" },
];

function EmptyAvatar() {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-slate-300 bg-slate-50 text-slate-400">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5.5 19.2c.8-3.2 3.3-5 6.5-5s5.7 1.8 6.5 5" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function UserAvatar({ user, profile }) {
  const name = getUserName(user, profile);
  const avatar = getUserAvatar(user);
  const initial = name.charAt(0).toUpperCase();

  if (avatar) {
    return (
      <img
        src={avatar}
        alt={name}
        className="h-9 w-9 shrink-0 rounded-full object-cover"
      />
    );
  }

  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
      {initial}
    </span>
  );
}

export default function UserMenu() {
  const { user, profile, signOut } = useAuth();
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

  if (!user) {
    return (
      <div className="flex min-w-0 items-center gap-2 py-2">
        <span className="hidden sm:inline-flex">
          <EmptyAvatar />
        </span>

        <Link href="/login">
          <MainButton size="small">
            <MainText>Log in</MainText>
          </MainButton>
        </Link>

        <Link href="/signup">
          <MainButton variant="outline" size="small">
            <MainText>Sign up</MainText>
          </MainButton>
        </Link>
      </div>
    );
  }

  const name = getUserName(user, profile);

  return (
    <div className="relative min-w-0 py-2" ref={menuRef}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
        className="flex max-w-[9.5rem] min-w-0 items-center gap-2 rounded-full py-1 pl-1 pr-1.5 transition hover:bg-slate-50 sm:max-w-[12rem] sm:pr-3"
      >
        <UserAvatar user={user} profile={profile} />
        <span className="hidden truncate text-sm font-semibold text-slate-800 sm:inline">
          {name}
        </span>
        <svg
          className={`hidden h-4 w-4 shrink-0 text-slate-500 transition sm:block ${open ? "rotate-180" : ""}`}
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
          className="absolute right-0 top-full z-30 mt-1 w-[min(14rem,calc(100vw-2rem))] rounded-xl border border-slate-200 bg-white p-2 shadow-lg"
        >
          {accountLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600"
            >
              {item.label}
            </Link>
          ))}

          {showAdmin && (
            <Link
              href="/admin"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600"
            >
              Admin Panel
            </Link>
          )}

          <button
            type="button"
            role="menuitem"
            onClick={async () => {
              setOpen(false);
              await signOut();
            }}
            className="mt-1 w-full rounded-lg px-4 py-3 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
