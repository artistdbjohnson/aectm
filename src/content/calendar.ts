import type { Locale } from "@/content/data";

export type CalSpan = {
  id: string;
  kind: "term" | "break";
  title: Record<Locale, string>;
  detail?: Record<Locale, string>;
  start: string;
  end: string;
};

/** Transplanted from aectm.pt/calendario-escolar-2017-2018 (label: 2026-2027). */
export const SCHOOL_YEAR = "2026/2027";

export const CALENDAR_SOURCE = {
  pt: "Despacho n.º 8368/2024, de 25 de julho, alterado pelo Despacho n.º 9989/2025, de 21 de agosto",
  en: "Order no. 8368/2024 of 25 July, amended by Order no. 9989/2025 of 21 August",
};

export const CALENDAR_SCOPE = {
  pt: "Pré-escolar, 1.º, 2.º e 3.º ciclos",
  en: "Pre-school and 1st, 2nd and 3rd cycles",
};

export const CALENDAR_SIGNED = {
  pt: "Castro Marim, 01 de setembro de 2026",
  en: "Castro Marim, 1 September 2026",
};

export const CALENDAR_NOTE = {
  pt: "Texto e datas transplantados do calendário publicado em aectm.pt. O slug original no WordPress é calendario-escolar-2017-2018.",
  en: "Text and dates transplanted from the calendar published on aectm.pt. The original WordPress slug is calendario-escolar-2017-2018.",
};

export const calendarSpans: CalSpan[] = [
  {
    id: "p1",
    kind: "term",
    title: { pt: "1.º Período", en: "1st term" },
    start: "2026-09-15",
    end: "2026-12-15",
  },
  {
    id: "natal",
    kind: "break",
    title: { pt: "1.ª Interrupção — Natal", en: "1st break — Christmas" },
    start: "2026-12-16",
    end: "2026-12-31",
  },
  {
    id: "p2",
    kind: "term",
    title: { pt: "2.º Período", en: "2nd term" },
    start: "2027-01-04",
    end: "2027-03-19",
  },
  {
    id: "carnaval",
    kind: "break",
    title: { pt: "2.ª Interrupção — Carnaval", en: "2nd break — Carnival" },
    start: "2027-02-08",
    end: "2027-02-10",
  },
  {
    id: "pascoa",
    kind: "break",
    title: { pt: "3.ª Interrupção — Páscoa", en: "3rd break — Easter" },
    start: "2027-03-22",
    end: "2027-04-02",
  },
  {
    id: "p3-9",
    kind: "term",
    title: { pt: "3.º Período — 9.º ano", en: "3rd term — Year 9" },
    start: "2027-04-05",
    end: "2027-06-04",
  },
  {
    id: "p3-258",
    kind: "term",
    title: { pt: "3.º Período — 5.º, 6.º, 7.º e 8.º anos", en: "3rd term — Years 5–8" },
    start: "2027-04-05",
    end: "2027-06-11",
  },
  {
    id: "p3-pre",
    kind: "term",
    title: { pt: "3.º Período — Pré-escolar e 1.º ciclo", en: "3rd term — Pre-school and 1st cycle" },
    start: "2027-04-05",
    end: "2027-06-30",
  },
];

export function isoToday(): string {
  return new Date().toISOString().slice(0, 10);
}

export function inSpan(iso: string, span: CalSpan): boolean {
  return iso >= span.start && iso <= span.end;
}

export function spansOn(iso: string): CalSpan[] {
  return calendarSpans.filter((s) => inSpan(iso, s));
}

export function upcomingSpans(iso: string, n = 4): CalSpan[] {
  return calendarSpans.filter((s) => s.end >= iso).slice(0, n);
}

export function formatIso(iso: string, locale: Locale): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return new Intl.DateTimeFormat(locale === "pt" ? "pt-PT" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export const WEEKDAYS: Record<Locale, string[]> = {
  pt: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
  en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
};

export const MONTHS: Record<Locale, string[]> = {
  pt: [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ],
  en: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ],
};
