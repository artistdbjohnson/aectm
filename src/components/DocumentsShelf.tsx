"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { documentShelf, SHELF_INTRO } from "@/content/documents";
import { chrome } from "@/content/data";
import { useLocale } from "@/content/locale";

export function DocumentsShelf() {
  const { locale } = useLocale();
  const c = chrome(locale);
  const items = useMemo(() => documentShelf(), []);
  const groups = useMemo(() => {
    const map = new Map<string, typeof items>();
    for (const item of items) {
      const key = item.group[locale];
      map.set(key, [...(map.get(key) || []), item]);
    }
    return [...map.entries()];
  }, [items, locale]);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return groups;
    return groups
      .map(([g, list]) => [
        g,
        list.filter((i) => `${i.label.pt} ${i.label.en} ${i.group.pt}`.toLowerCase().includes(query)),
      ] as const)
      .filter(([, list]) => list.length);
  }, [groups, q]);

  return (
    <article className="page-wrap py-10">
      <p className="chrome-label chrome-back">
        <Link href="/" className="hover:text-brand">{c.backHome}</Link>
      </p>
      <div className="glass mb-stack rounded-[28px]">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {locale === "pt" ? "Prateleira de documentos" : "Document shelf"}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{SHELF_INTRO[locale]}</p>
        <input
          className="mt-5 w-full rounded-2xl border border-line bg-white/35 px-4 py-3 outline-none backdrop-blur-md focus:ring-2 focus:ring-brand/25"
          placeholder={locale === "pt" ? "Filtrar documentos…" : "Filter documents…"}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
      {filtered.length === 0 ? (
        <p className="glass rounded-3xl px-5 py-8 text-sm text-muted">
          {locale === "pt"
            ? "Nenhum documento corresponde ao filtro. A prateleira só inclui ligações já publicadas em aectm.pt."
            : "No document matches this filter. The shelf only includes links already published on aectm.pt."}
        </p>
      ) : null}
      <div className="space-y-8">
        {filtered.map(([group, list]) => (
          <section key={group}>
            <h2 className="font-display mb-3 text-xl font-semibold">{group}</h2>
            <ul className="grid gap-row sm:grid-cols-2">
              {list.map((d) => (
                <li key={d.href}>
                  <a
                    href={d.href}
                    target="_blank"
                    rel="noreferrer"
                    className="card-duo flex items-center justify-between gap-3 px-4 py-3 text-sm font-semibold"
                  >
                    <span className="line-clamp-2">{d.label[locale]}</span>
                    <ExternalLink size={14} className="shrink-0 opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}
