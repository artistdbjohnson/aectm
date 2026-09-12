"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/content/theme";
import { useLocale } from "@/content/locale";
import { chrome } from "@/content/data";

export function ThemeSwitch() {
  const { theme, toggle } = useTheme();
  const { locale } = useLocale();
  const c = chrome(locale);
  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-ink transition hover:border-brand"
      aria-label={theme === "light" ? c.themeDark : c.themeLight}
    >
      {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}
