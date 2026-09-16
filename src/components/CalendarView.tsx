"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  CALENDAR_NOTE,
  CALENDAR_SCOPE,
  CALENDAR_SIGNED,
  CALENDAR_SOURCE,
  MONTHS,
  SCHOOL_YEAR,
  WEEKDAYS,
  calendarSpans,
  formatIso,
  inSpan,
  isoToday,
  type CalSpan,
} from "@/content/calendar";
import { chrome } from "@/content/data";
import { useLocale } from "@/content/locale";

function daysInMonth(year: number, month: number) {
  return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}

function mondayIndex(year: number, month: number) {
  const dow = new Date(Date.UTC(year, month, 1)).getUTCDay();
  return dow === 0 ? 6 : dow - 1;
}

export function CalendarView() {
  const { locale } = useLocale();
  const c = chrome(locale);
  const today = isoToday();
  const initial = today >= "2026-09-01" && today <= "2027-06-30" ? today : "2026-09-15";
  const [cursor, setCursor] = useState(() => {
    const [y, m] = initial.split("-").map(Number);
    return { y, m: m - 1 };
  });
  const [selected, setSelected] = useState(initial);

  const cells = useMemo(() => {
    const dim = daysInMonth(cursor.y, cursor.m);
    const pad = mondayIndex(cursor.y, cursor.m);
    const out: (string | null)[] = Array(pad).fill(null);
    for (let d = 1; d <= dim; d++) {
      const mm = String(cursor.m + 1).padStart(2, "0");
      const dd = String(d).padStart(2, "0");
      out.push(`${cursor.y}-${mm}-${dd}`);
    }
    while (out.length % 7) out.push(null);
    return out;
  }, [cursor]);

  const selectedSpans = calendarSpans.filter((s) => inSpan(selected, s));

  function shift(delta: number) {
    setCursor((cur) => {
      const d = new Date(Date.UTC(cur.y, cur.m + delta, 1));
      return { y: d.getUTCFullYear(), m: d.getUTCMonth() };
    });
  }

  return (
    <article className="page-wrap py-10">
      <p className="chrome-label chrome-back">
        <Link href="/" className="hover:text-brand">
          {c.backHome}
        </Link>
      </p>
      <div className="card-stack">
      <div className="glass glass-card rounded-[28px]">
        <p className="chrome-label">{CALENDAR_SCOPE[locale]}</p>
        <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          {locale === "pt" ? `Calendário Escolar ${SCHOOL_YEAR}` : `School calendar ${SCHOOL_YEAR}`}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          {CALENDAR_SOURCE[locale]}
        </p>
        <p className="mt-2 text-[12px] text-muted">{CALENDAR_NOTE[locale]}</p>
      </div>

      <div className="grid gap-cards lg:grid-cols-[1.15fr_0.85fr]">
        <div className="glass glass-card rounded-[28px]">
          <div className="mb-4 flex items-center justify-between">
            <button type="button" className="rounded-full border border-line px-3 py-1.5 text-sm font-semibold" onClick={() => shift(-1)}>
              ←
            </button>
            <p className="font-display text-lg font-semibold">
              {MONTHS[locale][cursor.m]} {cursor.y}
            </p>
            <button type="button" className="rounded-full border border-line px-3 py-1.5 text-sm font-semibold" onClick={() => shift(1)}>
              →
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold uppercase tracking-wide text-muted">
            {WEEKDAYS[locale].map((d) => (
              <div key={d} className="py-1">{d}</div>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1">
            {cells.map((iso, i) => {
              if (!iso) return <div key={`e-${i}`} />;
              const spans = calendarSpans.filter((s) => inSpan(iso, s));
              const isSel = iso === selected;
              const isToday = iso === today;
              const term = spans.some((s) => s.kind === "term");
              const brk = spans.some((s) => s.kind === "break");
              return (
                <button
                  key={iso}
                  type="button"
                  onClick={() => setSelected(iso)}
                  className={`aspect-square rounded-xl text-[13px] font-semibold ${
                    isSel
                      ? "bg-navy text-white"
                      : brk
                        ? "bg-amber-200/50 text-ink"
                        : term
                          ? "bg-brand/15 text-ink"
                          : "text-muted"
                  } ${isToday && !isSel ? "ring-2 ring-brand/40" : ""}`}
                >
                  {Number(iso.slice(8))}
                </button>
              );
            })}
          </div>
          <div className="mt-4 flex flex-wrap gap-3 text-[12px] text-muted">
            <span className="inline-flex items-center gap-1.5">
              <i className="inline-block h-3 w-3 rounded bg-brand/20" />{" "}
              {locale === "pt" ? "Período letivo" : "Teaching term"}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <i className="inline-block h-3 w-3 rounded bg-amber-200/80" />{" "}
              {locale === "pt" ? "Interrupção" : "Break"}
            </span>
          </div>
        </div>

        <div className="card-stack">
          <div className="glass glass-card rounded-[28px]">
            <p className="chrome-label">{locale === "pt" ? "Dia selecionado" : "Selected day"}</p>
            <p className="font-display mt-1 text-xl font-semibold">{formatIso(selected, locale)}</p>
            {selectedSpans.length ? (
              <ul className="card-rows mt-4">
                {selectedSpans.map((s) => (
                  <li key={s.id} className="card-row rounded-2xl border border-line bg-white/30 text-sm">
                    <span className="font-semibold">{s.title[locale]}</span>
                    <span className="mt-0.5 block text-[12px] text-muted">
                      {formatIso(s.start, locale)} — {formatIso(s.end, locale)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-muted">
                {locale === "pt"
                  ? "Nenhum período publicado cobre este dia."
                  : "No published period covers this day."}
              </p>
            )}
          </div>
          <div className="glass glass-card rounded-[28px]">
            <p className="chrome-label mb-4">{locale === "pt" ? "Todos os períodos" : "All periods"}</p>
            <ul className="card-rows">
              {calendarSpans.map((s) => (
                <PeriodRow key={s.id} span={s} locale={locale} onPick={(iso) => {
                  setSelected(iso);
                  const [y, m] = iso.split("-").map(Number);
                  setCursor({ y, m: m - 1 });
                }} />
              ))}
            </ul>
            <p className="mt-4 text-[12px] text-muted">{CALENDAR_SIGNED[locale]}</p>
          </div>
        </div>
      </div>
      </div>
    </article>
  );
}

function PeriodRow({
  span,
  locale,
  onPick,
}: {
  span: CalSpan;
  locale: "pt" | "en";
  onPick: (iso: string) => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onPick(span.start)}
        className="card-row w-full rounded-2xl border border-line bg-white/25 text-left text-sm hover:bg-white/45"
      >
        <span className="font-semibold">{span.title[locale]}</span>
        <span className="mt-0.5 block text-[12px] text-muted">
          {formatIso(span.start, locale)} — {formatIso(span.end, locale)}
        </span>
      </button>
    </li>
  );
}
