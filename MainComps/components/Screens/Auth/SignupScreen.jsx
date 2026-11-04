"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signUpAccount } from "../../../services/authActions";
import AuthField from "./AuthField";
import MainText from "../../comps/MainTextComponent";
import MainButton from "../../comps/MainButton";

export default function SignupScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signUpAccount({
        fullName,
        phone,
        email,
        password,
        confirmPassword,
      });

      setFieldErrors(result.fieldErrors || {});

      if (result.error) {
        setError(result.error);
        return;
      }

      if (result.needsConfirmation) {
        router.push(
          `/check-email?email=${encodeURIComponent(result.email || email)}`
        );
        return;
      }

      router.push("/");
      router.refresh();
    } catch (submitError) {
      setError(submitError.message || "Could not create the account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-1 items-center justify-center bg-slate-50 px-6 py-16">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Sign up</h1>
        <p className="mt-3 text-slate-600">
          Create your PHarmEGY account with your name and phone number.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
          <AuthField
            id="signup-name"
            label="Full name"
            value={fullName}
            onChange={(value) => setFullName(value.replace(/\d/g, ""))}
            error={fieldErrors.fullName}
            autoComplete="name"
            placeholder="Your full name"
          />

          <AuthField
            id="signup-phone"
            label="Phone number"
            value={phone}
            onChange={(value) => setPhone(value.replace(/\D/g, ""))}
            error={fieldErrors.phone}
            autoComplete="tel"
            inputMode="numeric"
            placeholder="01012345678"
          />

          <AuthField
            id="signup-email"
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            error={fieldErrors.email}
            autoComplete="email"
            placeholder="email@example.com"
          />

          <AuthField
            id="signup-password"
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            error={fieldErrors.password}
            autoComplete="new-password"
          />

          <AuthField
            id="signup-confirm-password"
            label="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            error={fieldErrors.confirmPassword}
            autoComplete="new-password"
          />

          <p className="text-xs leading-5 text-slate-500">
            Password must be at least 8 characters and include uppercase, lowercase, and a number.
          </p>

          {error ? (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
          >
            <MainButton fullWidth>
              <MainText>{loading ? "Creating account..." : "Create account"}</MainText>
            </MainButton>
          </button>
        </form>

        <p className="mt-8 text-sm text-slate-600">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
