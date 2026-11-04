"use client";

import { createContext, useContext, useState } from "react";

const SidebarContext = createContext(null);

// Sidebar Registry - Map of sidebar names to their content
const sidebarRegistry = {};

export function registerSidebar(name, component) {
  sidebarRegistry[name] = component;
}

export function getSidebar(name) {
  return sidebarRegistry[name];
}

export function SidebarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);
  const [sidebarName, setSidebarName] = useState(null);

  const openSidebar = (name, props = {}) => {
    const sidebarComponent = getSidebar(name);
    
    if (!sidebarComponent) {
      setContent({
        title: "Sidebar Not Found",
        component: <div className="text-center text-slate-500">Sidebar "{name}" not found</div>,
      });
    } else {
      setContent({
        title: props.title || name,
        component: sidebarComponent(props),
        footer: props.footer,
      });
    }
    
    setSidebarName(name);
    setIsOpen(true);
  };

  const closeSidebar = () => {
    setIsOpen(false);
    setContent(null);
    setSidebarName(null);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, content, sidebarName, openSidebar, closeSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
