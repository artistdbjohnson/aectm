"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, BookOpen, Building2, Calendar, Globe2 } from "lucide-react";
import { chrome, data } from "@/content/data";
import { useLocale } from "@/content/locale";

const fade: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export function HomeView() {
  const { locale } = useLocale();
  const c = chrome(locale);
  const news = data.news.filter((n) => n.title !== "_").slice(0, 9);
  const heroImg =
    news.find((n) => n.image)?.image ||
    "https://aectm.pt/wp-content/uploads/2018/05/cropped-logo-192x192.png";

  return (
    <div>
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--a-hero)" }}
        id="top"
      >
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-10 lg:py-20">
          <div>
            <p className="chrome-label mb-3 text-brand">
              {locale === "pt" ? "Ano letivo 2026/2027" : "School year 2026/2027"}
            </p>
            <motion.h1
              className="text-4xl font-black leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              {c.welcome}
            </motion.h1>
            <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-muted">
              {c.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/noticias" className="btn-3d btn-primary inline-flex items-center gap-2">
                {c.news} <ArrowRight size={16} />
              </Link>
              <Link href="/escolas-do-agrupamento" className="btn-3d btn-secondary inline-flex items-center">
                {c.schools}
              </Link>
            </div>
          </div>
          <motion.div
            className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-surface shadow-lg"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={heroImg} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent p-5 text-white">
              <p className="text-xs font-extrabold uppercase tracking-[1.5px] opacity-80">
                AECTM
              </p>
              <p className="font-extrabold">{c.siteFull}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-10" id="quick">
        <p className="chrome-label mb-4">{c.quickLinks}</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { href: "/calendario-escolar", icon: Calendar, pt: "Calendário Escolar", en: "School Calendar" },
            { href: "/ementas", icon: BookOpen, pt: "Ementas", en: "Menus" },
            { href: "/documentos-orientadores", icon: Building2, pt: "Documentos Orientadores", en: "Guiding Documents" },
            { href: "/projeto-erasmus", icon: Globe2, pt: "Erasmus+", en: "Erasmus+" },
          ].map((item, i) => (
            <motion.div
              key={item.href}
              variants={fade}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.05 * i }}
            >
              <Link href={item.href} className="card-duo flex items-center gap-3 px-4 py-4">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <item.icon size={18} />
                </span>
                <span className="font-extrabold">{locale === "pt" ? item.pt : item.en}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pb-16 sm:px-6 lg:px-10" id="noticias">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="chrome-label mb-1">{c.highlights}</p>
            <h2 className="text-2xl font-black tracking-tight sm:text-3xl">{c.news}</h2>
          </div>
          <Link href="/noticias" className="text-sm font-extrabold uppercase tracking-[0.5px] text-brand hover:underline">
            {c.allNews}
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((n) => (
            <motion.article
              key={n.id}
              className="card-duo overflow-hidden"
              variants={fade}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
            >
              <Link href={`/noticias/${n.slug}`} className="block">
                <div className="aspect-[16/10] bg-line/40">
                  {n.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={n.image} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-2xl font-black text-brand/40">
                      AECTM
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-xs font-bold text-muted">{n.date}</p>
                  <h3 className="mt-1 line-clamp-2 font-extrabold leading-snug">{n.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm text-muted">{n.excerpt}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-extrabold text-brand">
                    {c.readMore} <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
