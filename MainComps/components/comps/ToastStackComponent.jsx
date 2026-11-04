"use client";

import { useToast } from "../../hooks/useToast";

export default function ToastStack() {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[80] flex w-[min(22rem,calc(100%-2rem))] flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-lg ${
            toast.type === "delete" ? "bg-red-600" : "bg-green-600"
          }`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
