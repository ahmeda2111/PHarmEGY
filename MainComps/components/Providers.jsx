"use client";

import { ToastProvider } from "../lib/useToast";
import { AuthProvider } from "../lib/useAuth";
import { ThemeProvider } from "../lib/useTheme";
import ToastStack from "./comps/ToastStack";

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          {children}
          <ToastStack />
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
