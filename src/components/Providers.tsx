"use client";

import type { ReactNode } from "react";
import { LocaleProvider } from "@/content/locale";
import { ThemeProvider } from "@/content/theme";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LocaleProvider>{children}</LocaleProvider>
    </ThemeProvider>
  );
}
