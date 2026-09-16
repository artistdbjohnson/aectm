"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { data } from "@/content/data";
import { useLocale } from "@/content/locale";
import { newsCopy } from "@/content/news-en";

export function SearchDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { locale } = useLocale();
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (query.length < 2) return [];
    return data.news
      .filter((n) => n.title && n.title !== "_")
      .filter((n) => {
        const copy = newsCopy(n, locale);
        const hay = `${copy.title} ${copy.excerpt} ${copy.body} ${n.date}`.toLowerCase();
        return hay.includes(query);
      })
      .slice(0, 8);
  }, [q, locale]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-navy/35 px-4 pt-24 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="glass-strong glass-card w-full max-w-lg rounded-3xl"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="chrome-label mb-3">
              {locale === "pt" ? "Pesquisar notícias" : "Search news"}
            </p>
            <input
              autoFocus
              className="w-full rounded-2xl border border-line bg-white/40 px-4 py-3 text-ink outline-none backdrop-blur-md focus:ring-2 focus:ring-brand/25"
              placeholder={
                locale === "pt"
                  ? "Título, data ou palavra…"
                  : "Title, date or keyword…"
              }
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <ul className="card-rows mt-4 max-h-80 overflow-y-auto">
              {q.trim().length >= 2 && results.length === 0 ? (
                <li className="px-1 py-3 text-sm text-muted">
                  {locale === "pt"
                    ? "Nenhuma notícia corresponde à pesquisa."
                    : "No news items match this search."}
                </li>
              ) : null}
              {results.map((n) => {
                const copy = newsCopy(n, locale);
                return (
                  <li key={n.id}>
                    <Link
                      href={`/noticias/${n.slug}`}
                      onClick={onClose}
                      className="card-row block rounded-2xl border border-line bg-white/25 hover:bg-white/45"
                    >
                      <p className="text-[11px] font-semibold text-muted">{n.date}</p>
                      <p className="text-sm font-semibold leading-snug">{copy.title}</p>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p className="mt-3 text-[12px] text-muted">
              {locale === "pt"
                ? "Pesquisa no arquivo transplantado de aectm.pt."
                : "Searches the archive transplanted from aectm.pt."}
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function newsMatches(itemTitle: string, query: string, extra = ""): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return `${itemTitle} ${extra}`.toLowerCase().includes(q);
}
