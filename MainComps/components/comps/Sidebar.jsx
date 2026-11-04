"use client";

import { useEffect } from "react";
import { useSidebar } from "../../hooks/useSidebar";
import { useModal } from "../../hooks/useModal";
import { useToast } from "../../hooks/useToast";
import { useWhatsApp } from "../../hooks/useWhatsApp";
import { registerSidebar } from "../../hooks/useSidebar";
import BuyNowSidebar from "./sidebar/BuyNowSidebar";
import MainText from "./MainTextComponent";
import MainButton from "./MainButton";

export default function Sidebar() {
  const { isOpen, content, closeSidebar } = useSidebar();
  const { show } = useModal();
  const { showToast } = useToast();
  const { sendOrderMessage, setWhatsAppNumber } = useWhatsApp();

  // Set WhatsApp number on mount
  useEffect(() => {
    setWhatsAppNumber("201008461899"); // Set to null to disable
  }, [setWhatsAppNumber]);

  // Register sidebars on mount with all callbacks
  useEffect(() => {
    const BuyNowSidebarWithCallbacks = (props) => (
      <BuyNowSidebar
        {...props}
        onShowModal={show}
        onShowToast={showToast}
        onSendWhatsAppOrder={sendOrderMessage}
      />
    );
    registerSidebar("buyNow", BuyNowSidebarWithCallbacks);
  }, [show, showToast, sendOrderMessage]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeSidebar}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md transform transition-transform duration-300 ease-in-out sm:max-w-lg">
        <div className="flex h-full flex-col bg-white shadow-2xl dark:bg-slate-800">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-700">
            <MainText as="h2" className="text-xl font-bold text-slate-900 dark:text-white">
              {content?.title || "Sidebar"}
            </MainText>
            <button
              type="button"
              onClick={closeSidebar}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
              aria-label="Close sidebar"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {content?.component || (
              <div className="flex h-full items-center justify-center">
                <MainText className="text-slate-500 dark:text-slate-400">
                  No content available
                </MainText>
              </div>
            )}
          </div>

          {/* Footer */}
          {content?.footer && (
            <div className="border-t border-slate-200 px-6 py-4 dark:border-slate-700">
              {content.footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
