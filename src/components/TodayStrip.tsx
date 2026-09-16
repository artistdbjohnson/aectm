"use client";

import Link from "next/link";
import { calendarSpans, formatIso, isoToday, spansOn, upcomingSpans } from "@/content/calendar";
import { useLocale } from "@/content/locale";

export function TodayStrip() {
  const { locale } = useLocale();
  const today = isoToday();
  const now = spansOn(today);
  const next = upcomingSpans(today, 3);
  const inYear = today >= "2026-09-15" && today <= "2027-06-30";

  return (
    <section className="page-wrap pt-8" aria-labelledby="hoje-title">
      <div className="glass flex flex-col gap-4 rounded-[28px] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <div>
          <p className="chrome-label" id="hoje-title">
            {locale === "pt" ? "Hoje na escola" : "Today at school"}
          </p>
          <p className="mt-1 font-display text-xl font-semibold tracking-tight">
            {formatIso(today, locale)}
          </p>
          {now.length ? (
            <p className="mt-1 text-sm text-muted">
              {now.map((s) => s.title[locale]).join(" · ")}
            </p>
          ) : inYear ? (
            <p className="mt-1 text-sm text-muted">
              {locale === "pt"
                ? "Fora dos períodos letivos publicados (interrupção ou fim de semana no calendário)."
                : "Outside the published teaching periods (a break, or a day not marked as a term)."}
            </p>
          ) : (
            <p className="mt-1 text-sm text-muted">
              {locale === "pt"
                ? "O calendário publicado cobre 2026/2027. Consulte o original em aectm.pt."
                : "The published calendar covers 2026/2027. See the original on aectm.pt."}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {(next.length ? next : calendarSpans.slice(0, 3)).map((s) => (
            <Link
              key={s.id}
              href="/calendario-escolar"
              className="rounded-full border border-line bg-white/35 px-3 py-1.5 text-[12px] font-semibold backdrop-blur-md"
            >
              {s.title[locale]}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
