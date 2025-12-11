"use client";

import { ToastProvider } from "@/components/ui/ToastProvider";

export function Providers({ children }) {
  return <ToastProvider>{children}</ToastProvider>;
}