import { Suspense } from "react";
import CheckEmailScreen from "@/MainComps/components/Screens/Auth/CheckEmailScreen";

export default function CheckEmailPage() {
  return (
    <Suspense
      fallback={
        <main className="flex flex-1 items-center justify-center bg-slate-50 px-6 py-16">
          <p className="text-slate-500">Loading...</p>
        </main>
      }
    >
      <CheckEmailScreen />
    </Suspense>
  );
}
