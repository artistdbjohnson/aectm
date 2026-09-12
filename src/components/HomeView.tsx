"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Calendar,
  Globe2,
} from "lucide-react";
import { chrome, data } from "@/content/data";
import { useLocale } from "@/content/locale";
import { HomeNewsBlock } from "@/components/NewsReading";

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Aurora-onboard remap: left welcome phases + right community surface. */
export function HomeView() {
  const { locale } = useLocale();
  const c = chrome(locale);
  const heroImg =
    data.news.find((n) => n.image && n.title !== "_")?.image ||
    "/brand/logo.png";

  const phases =
    locale === "pt"
      ? [
          { n: "01", t: "Conhecer o Agrupamento", d: "Escolas, estrutura e serviços de apoio." },
          { n: "02", t: "Orientar o ano letivo", d: "Calendário, documentos, ementas e provas." },
          { n: "03", t: "Acompanhar a comunidade", d: "Notícias, Erasmus+ e atividades." },
        ]
      : [
          { n: "01", t: "Meet the cluster", d: "Schools, structure, and support services." },
          { n: "02", t: "Orient the school year", d: "Calendar, documents, menus, and exams." },
          { n: "03", t: "Follow the community", d: "News, Erasmus+, and activities." },
        ];

  return (
    <div>
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--a-hero)" }}
        id="top"
      >
        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch lg:gap-8 lg:px-10 lg:py-16">
          {/* Left — aurora welcome column */}
          <motion.div
            className="flex flex-col justify-end rounded-[28px] border border-line bg-surface p-7 shadow-[0_24px_60px_rgba(0,0,0,0.06)] sm:p-10 lg:min-h-[520px]"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <motion.p variants={rise} className="chrome-label mb-4">
              {locale === "pt" ? "Ano letivo 2026/2027" : "School year 2026/2027"}
            </motion.p>
            <motion.h1
              variants={rise}
              className="max-w-xl text-[2.1rem] font-medium leading-[1.12] tracking-tight text-ink sm:text-[2.75rem]"
            >
              {c.welcome}
            </motion.h1>
            <motion.p
              variants={rise}
              className="mt-4 max-w-md text-[15px] leading-relaxed text-muted"
            >
              {c.tagline}
            </motion.p>

            <motion.div variants={rise} className="mt-8 space-y-2.5">
              {phases.map((p, i) => (
                <div
                  key={p.n}
                  className={`flex items-start gap-3 rounded-2xl border px-3.5 py-3 ${
                    i === 0
                      ? "border-ink bg-ink text-[var(--a-bg)]"
                      : "border-line bg-bg text-ink"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                      i === 0
                        ? "bg-[var(--a-bg)] text-ink"
                        : "bg-line/60 text-muted"
                    }`}
                  >
                    {p.n}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{p.t}</p>
                    <p
                      className={`text-[12px] leading-snug ${
                        i === 0 ? "opacity-70" : "text-muted"
                      }`}
                    >
                      {p.d}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div variants={rise} className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/noticias"
                className="btn-3d btn-primary inline-flex items-center gap-2"
              >
                {c.news} <ArrowRight size={15} />
              </Link>
              <Link
                href="/escolas-do-agrupamento"
                className="btn-3d btn-secondary inline-flex items-center"
              >
                {c.schools}
              </Link>
            </motion.div>
          </motion.div>

          {/* Right — community media surface */}
          <motion.div
            className="relative min-h-[360px] overflow-hidden rounded-[28px] border border-line lg:min-h-[520px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroImg}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9">
              <p className="text-[11px] font-semibold uppercase tracking-[1.6px] text-white/70">
                AECTM
              </p>
              <p className="mt-1 text-xl font-medium tracking-tight sm:text-2xl">
                {c.siteFull}
              </p>
              <p className="mt-2 max-w-sm text-sm text-white/70">
                {data.contact.address}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-10"
        id="quick"
      >
        <p className="chrome-label mb-4">{c.quickLinks}</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              href: "/calendario-escolar",
              icon: Calendar,
              pt: "Calendário Escolar",
              en: "School Calendar",
            },
            { href: "/ementas", icon: BookOpen, pt: "Ementas", en: "Menus" },
            {
              href: "/documentos-orientadores",
              icon: Building2,
              pt: "Documentos Orientadores",
              en: "Guiding Documents",
            },
            {
              href: "/projeto-erasmus",
              icon: Globe2,
              pt: "Erasmus+",
              en: "Erasmus+",
            },
          ].map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * i, duration: 0.4 }}
            >
              <Link
                href={item.href}
                className="card-duo flex items-center gap-3 px-4 py-4"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-bg text-ink">
                  <item.icon size={17} strokeWidth={1.75} />
                </span>
                <span className="text-sm font-medium">
                  {locale === "pt" ? item.pt : item.en}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <HomeNewsBlock />
    </div>
  );
}
