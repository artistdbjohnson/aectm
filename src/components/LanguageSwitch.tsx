"use client";

import { useLocale } from "@/content/locale";

export function LanguageSwitch() {
  const { locale, setLocale } = useLocale();
  return (
    <div
      className="inline-flex overflow-hidden rounded-full border border-line bg-surface p-0.5"
      role="group"
      aria-label="Language"
    >
      {(["pt", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={`rounded-full px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-[1px] transition ${
            locale === code
              ? "bg-brand text-white"
              : "text-muted hover:text-ink"
          }`}
          aria-pressed={locale === code}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
