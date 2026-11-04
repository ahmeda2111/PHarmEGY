"use client";

import MainText from "../../comps/MainTextComponent";
import MainButton from "../../comps/MainButton";
import ThemeToggle from "../../comps/home/ThemeToggle";

export default function SettingsScreen() {
  return (
    <main className="flex-1 bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
        <MainText as="h1" className="mb-8 text-3xl font-bold text-slate-900 dark:text-white">
          Settings
        </MainText>

        <div className="space-y-6">
          {/* Theme Toggle Section */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <MainText as="h2" className="text-lg font-semibold text-slate-900 dark:text-white">
                  Appearance
                </MainText>
                <MainText as="p" className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Switch between light and dark mode
                </MainText>
              </div>
              <ThemeToggle />
            </div>
          </div>

          {/* Other Settings Placeholder */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <MainText as="h2" className="text-lg font-semibold text-slate-900 dark:text-white">
              Account Settings
            </MainText>
            <MainText as="p" className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              More settings coming soon...
            </MainText>
          </div>
        </div>
      </div>
    </main>
  );
}
