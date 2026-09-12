"use client";

import { Moon, Sun } from "lucide-react";
import { useLocale } from "@/content/locale";
import { useTheme } from "@/content/theme";
import { chrome } from "@/content/data";

/** Axiom #1 — theme/locale as designed chrome (one tonal craft cluster). */
export function ChromeCluster() {
  const { locale, setLocale } = useLocale();
  const { theme, toggle } = useTheme();
  const c = chrome(locale);

  return (
    <div
      className="inline-flex items-center gap-0.5 rounded-full border border-line bg-surface/90 p-1 shadow-[0_1px_0_rgba(0,0,0,0.04)] backdrop-blur-md"
      role="group"
      aria-label={locale === "pt" ? "Idioma e tema" : "Language and theme"}
    >
      {(["pt", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={`rounded-full px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[1.2px] transition ${
            locale === code
              ? "bg-ink text-[var(--a-bg)]"
              : "text-muted hover:text-ink"
          }`}
          aria-pressed={locale === code}
        >
          {code}
        </button>
      ))}
      <span className="mx-0.5 h-4 w-px bg-line" aria-hidden />
      <button
        type="button"
        onClick={toggle}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink transition hover:bg-bg"
        aria-label={theme === "light" ? c.themeDark : c.themeLight}
      >
        {theme === "light" ? <Moon size={14} strokeWidth={1.75} /> : <Sun size={14} strokeWidth={1.75} />}
      </button>
    </div>
  );
}
