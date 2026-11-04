"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signInAccount } from "../../../services/authActions";
import AuthField from "./AuthField";
import MainText from "../../comps/MainTextComponent";
import MainButton from "../../comps/MainButton";

export default function LoginScreen() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setNeedsConfirmation(false);
    setLoading(true);

    try {
      const result = await signInAccount({ identifier, password });
      setFieldErrors(result.fieldErrors || {});

      if (result.error) {
        setNeedsConfirmation(Boolean(result.needsConfirmation));
        setError(result.error);
        return;
      }

      router.push("/");
      router.refresh();
    } catch (submitError) {
      setError(submitError.message || "Could not log in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-1 items-center justify-center bg-slate-50 px-6 py-16">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Log in</h1>
        <p className="mt-3 text-slate-600">
          Use your email or phone number and password to sign in.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
          <AuthField
            id="login-identifier"
            label="Email or phone number"
            value={identifier}
            onChange={setIdentifier}
            error={fieldErrors.identifier}
            autoComplete="username"
            placeholder="email@example.com or 01012345678"
          />

          <AuthField
            id="login-password"
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            error={fieldErrors.password}
            autoComplete="current-password"
          />

          {error ? (
            <p
              className={`rounded-lg px-4 py-3 text-sm ${
                needsConfirmation
                  ? "bg-amber-50 text-amber-800"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {error}
            </p>
          ) : null}

          <MainButton type="submit" disabled={loading} fullWidth>
            <MainText>{loading ? "Logging in..." : "Log in"}</MainText>
          </MainButton>
        </form>

        <p className="mt-8 text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold text-blue-600 hover:text-blue-700">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
