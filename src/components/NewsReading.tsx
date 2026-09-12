"use client";

/**
 * Axiom #3 — Shared-layout news → reading panel + intent density.
 * Comunidade (browse) vs Avisos (decide).
 */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import Link from "next/link";
import { chrome, data, type NewsItem } from "@/content/data";
import { useLocale } from "@/content/locale";

type Intent = "comunidade" | "avisos";

type NewsReadingCtx = {
  open: (item: NewsItem) => void;
  close: () => void;
  active: NewsItem | null;
  intent: Intent;
  setIntent: (i: Intent) => void;
};

const Ctx = createContext<NewsReadingCtx | null>(null);

export function NewsReadingProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<NewsItem | null>(null);
  const [intent, setIntent] = useState<Intent>("comunidade");

  const open = useCallback((item: NewsItem) => setActive(item), []);
  const close = useCallback(() => setActive(null), []);

  const value = useMemo(
    () => ({ open, close, active, intent, setIntent }),
    [open, close, active, intent],
  );

  return (
    <Ctx.Provider value={value}>
      <LayoutGroup id="news-read">{children}</LayoutGroup>
      <ReadingPanel />
    </Ctx.Provider>
  );
}

export function useNewsReading() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useNewsReading within NewsReadingProvider");
  return ctx;
}

function ReadingPanel() {
  const ctx = useContext(Ctx);
  const { locale } = useLocale();
  const c = chrome(locale);
  if (!ctx) return null;
  const { active, close } = ctx;
  return (
    <AnimatePresence>
      {active ? (
        <>
          <motion.button
            type="button"
            aria-label="Close"
            className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-xl flex-col border-l border-line bg-surface shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            role="dialog"
            aria-modal
            aria-label={active.title}
          >
            <div className="flex items-start justify-between gap-3 border-b border-line px-5 py-4">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-muted">{active.date}</p>
                <motion.h2
                  layoutId={`news-title-${active.id}`}
                  className="mt-1 text-xl font-medium leading-snug tracking-tight"
                >
                  {active.title}
                </motion.h2>
              </div>
              <button
                type="button"
                onClick={close}
                className="shrink-0 rounded-full border border-line p-2"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
            {active.image ? (
              <motion.div
                layoutId={`news-img-${active.id}`}
                className="aspect-[16/9] shrink-0 overflow-hidden border-b border-line bg-line/30"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={active.image}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </motion.div>
            ) : null}
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-muted">
                {active.body || active.excerpt}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/noticias/${active.slug}`}
                  className="btn-3d btn-primary inline-flex items-center"
                  onClick={close}
                >
                  {c.readMore}
                </Link>
                <a
                  href={active.link}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-3d btn-secondary inline-flex items-center gap-2"
                >
                  aectm.pt <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

export function IntentToggle() {
  const { intent, setIntent } = useNewsReading();
  const { locale } = useLocale();
  return (
    <div
      className="inline-flex rounded-full border border-line bg-surface p-1"
      role="tablist"
      aria-label={locale === "pt" ? "Densidade" : "Intent density"}
    >
      {(
        [
          { id: "comunidade" as const, pt: "Comunidade", en: "Community" },
          { id: "avisos" as const, pt: "Avisos", en: "Notices" },
        ] as const
      ).map((t) => (
        <button
          key={t.id}
          type="button"
          role="tab"
          aria-selected={intent === t.id}
          onClick={() => setIntent(t.id)}
          className={`rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition ${
            intent === t.id
              ? "bg-ink text-[var(--a-bg)]"
              : "text-muted hover:text-ink"
          }`}
        >
          {locale === "pt" ? t.pt : t.en}
        </button>
      ))}
    </div>
  );
}

export function NewsCard({ item, dense }: { item: NewsItem; dense?: boolean }) {
  const { open } = useNewsReading();
  const { locale } = useLocale();
  const c = chrome(locale);

  return (
    <motion.article
      layout
      className={`card-duo overflow-hidden ${dense ? "" : ""}`}
    >
      <button
        type="button"
        className="block w-full text-left"
        onClick={() => open(item)}
      >
        <motion.div
          layoutId={`news-img-${item.id}`}
          className={`bg-line/30 ${dense ? "aspect-[21/9]" : "aspect-[16/10]"}`}
        >
          {item.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.image}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-lg font-medium text-muted/40">
              AECTM
            </div>
          )}
        </motion.div>
        <div className={dense ? "p-3" : "p-4"}>
          <p className="text-[11px] font-semibold text-muted">{item.date}</p>
          <motion.h3
            layoutId={`news-title-${item.id}`}
            className={`mt-1 font-medium leading-snug tracking-tight ${
              dense ? "line-clamp-1 text-sm" : "line-clamp-2 text-base"
            }`}
          >
            {item.title}
          </motion.h3>
          {!dense ? (
            <p className="mt-2 line-clamp-3 text-sm text-muted">{item.excerpt}</p>
          ) : null}
          <span className="mt-2 inline-block text-[12px] font-semibold text-accent">
            {c.readMore}
          </span>
        </div>
      </button>
    </motion.article>
  );
}

export function NewsGrid() {
  const { intent } = useNewsReading();
  const news = data.news.filter((n) => n.title !== "_");

  // Avisos = decide density: tighter list, prefer administrative/notice-like titles
  const avisosKeywords = [
    "aviso",
    "greve",
    "matrícul",
    "matricul",
    "lista",
    "concurso",
    "prova",
    "exame",
    "calendário",
    "inscri",
    "alerta",
  ];
  const filtered =
    intent === "avisos"
      ? news.filter((n) =>
          avisosKeywords.some((k) => n.title.toLowerCase().includes(k)),
        )
      : news;

  const list = (filtered.length ? filtered : news).slice(
    0,
    intent === "avisos" ? 12 : 9,
  );

  return (
    <motion.div
      layout
      className={
        intent === "avisos"
          ? "grid gap-3 sm:grid-cols-2"
          : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      }
    >
      {list.map((n) => (
        <NewsCard key={n.id} item={n} dense={intent === "avisos"} />
      ))}
    </motion.div>
  );
}

export function HomeNewsBlock() {
  const { locale } = useLocale();
  const c = chrome(locale);
  return (
    <section
      className="mx-auto max-w-[1440px] px-4 pb-16 sm:px-6 lg:px-10"
      id="noticias"
    >
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="chrome-label mb-1">{c.highlights}</p>
          <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">
            {c.news}
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <IntentToggle />
          <Link
            href="/noticias"
            className="text-[12px] font-semibold uppercase tracking-[0.6px] text-muted hover:text-ink"
          >
            {c.allNews}
          </Link>
        </div>
      </div>
      <div id="avisos-rail" className="sr-only" aria-hidden />
      <NewsGrid />
    </section>
  );
}
