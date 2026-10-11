"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function CheckEmailScreen() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  return (
    <main className="flex flex-1 items-center justify-center bg-slate-50 px-6 py-16">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl">
          ✉️
        </div>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          Confirm your email
        </h1>

        <p className="mt-4 leading-7 text-slate-600">
          A confirmation email was sent
          {email ? (
            <>
              {" "}
              to <span className="font-semibold text-slate-900">{email}</span>
            </>
          ) : (
            " to you"
          )}
          . Confirm it before you log in.
        </p>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          If you don&apos;t see it, check your Spam or Junk folder.
        </p>

        <Link
          href="/login"
          className="mt-8 inline-block w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Go to Log in
        </Link>
      </div>
    </main>
  );
}
