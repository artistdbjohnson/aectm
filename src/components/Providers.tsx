"use client";

import type { ReactNode } from "react";
import { LocaleProvider } from "@/content/locale";
import { ThemeProvider } from "@/content/theme";
import { NewsReadingProvider } from "@/components/NewsReading";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <NewsReadingProvider>{children}</NewsReadingProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}
