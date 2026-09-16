"use client";

import { useState } from "react";
import Link from "next/link";
import { chrome } from "@/content/data";
import { useLocale } from "@/content/locale";
import { IntentToggle, NewsGrid } from "@/components/NewsReading";

export function NewsList() {
  const { locale } = useLocale();
  const c = chrome(locale);
  const [q, setQ] = useState("");
  return (
    <div className="page-wrap py-10">
      <div className="glass mb-8 rounded-[28px] p-6 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="chrome-label mb-2">{c.highlights}</p>
            <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              {c.news}
            </h1>
            <p className="mt-2 max-w-xl text-sm text-muted">
              {locale === "pt"
                ? "Títulos, datas e textos transplantados de aectm.pt. Sem notícias inventadas."
                : "Titles, dates and bodies transplanted from aectm.pt. No invented news."}
            </p>
          </div>
          <IntentToggle />
        </div>
        <label className="mt-6 block">
          <span className="sr-only">{c.search}</span>
          <input
            className="w-full rounded-2xl border border-line bg-white/35 px-4 py-3 text-ink outline-none backdrop-blur-md focus:ring-2 focus:ring-brand/25"
            placeholder={
              locale === "pt" ? "Filtrar por título, data ou palavra…" : "Filter by title, date or keyword…"
            }
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </label>
      </div>
      <NewsGrid query={q} />
      <p className="mt-10 text-sm text-muted">
        <Link href="/" className="hover:text-ink">
          ← {c.backHome}
        </Link>
      </p>
    </div>
  );
}
