"use client";

import { ToastProvider } from "../hooks/useToast";
import { AuthProvider } from "../hooks/useAuth";
import { ThemeProvider } from "../hooks/useTheme";
import { SidebarProvider } from "../hooks/useSidebar";
import { ModalProvider } from "../hooks/useModal";
import ToastStack from "./comps/ToastStackComponent";
import Sidebar from "./comps/Sidebar";
import Modal from "./comps/Modal";

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ModalProvider>
          <SidebarProvider>
            <ToastProvider>
              {children}
              <ToastStack />
              <Sidebar />
              <Modal />
            </ToastProvider>
          </SidebarProvider>
        </ModalProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
