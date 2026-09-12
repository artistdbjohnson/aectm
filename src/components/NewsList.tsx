"use client";

import Link from "next/link";
import { chrome } from "@/content/data";
import { useLocale } from "@/content/locale";
import {
  IntentToggle,
  NewsGrid,
} from "@/components/NewsReading";

export function NewsList() {
  const { locale } = useLocale();
  const c = chrome(locale);
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="chrome-label mb-2">{c.highlights}</p>
          <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
            {c.news}
          </h1>
        </div>
        <IntentToggle />
      </div>
      <NewsGrid />
      <p className="mt-10 text-sm text-muted">
        <Link href="/" className="hover:text-ink">
          ← {c.backHome}
        </Link>
      </p>
    </div>
  );
}
