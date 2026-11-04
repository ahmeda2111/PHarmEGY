"use client";

import { useTheme } from "../../../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative inline-flex h-14 w-32 shrink-0 items-center rounded-full bg-slate-200 transition-all duration-500 dark:bg-slate-700"
    >
      {/* Sliding Circle with Icon */}
      <div
        className={`absolute h-10 w-10 rounded-full bg-white shadow-xl transition-all duration-500 ease-in-out ${
          isDark ? "translate-x-2" : "translate-x-20"
        }`}
      >
        {isDark ? (
          <div className="flex h-full w-full items-center justify-center text-slate-700">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-yellow-500">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <path strokeLinecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          </div>
        )}
      </div>
    </button>
  );
}
