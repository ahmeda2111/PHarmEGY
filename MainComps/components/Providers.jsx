"use client";

import { ToastProvider } from "../lib/useToast";
import { AuthProvider } from "../lib/useAuth";
import ToastStack from "./comps/ToastStack";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <ToastProvider>
        {children}
        <ToastStack />
      </ToastProvider>
    </AuthProvider>
  );
}
