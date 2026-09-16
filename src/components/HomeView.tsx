"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Calendar,
  GraduationCap,
  Users,
} from "lucide-react";
import { chrome, data } from "@/content/data";
import { useLocale } from "@/content/locale";
import { HomeNewsBlock } from "@/components/NewsReading";
import { TodayStrip } from "@/components/TodayStrip";

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.12 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] } },
};

export function HomeView() {
  const { locale } = useLocale();
  const c = chrome(locale);
  const welcome = data.news.find((n) => n.slug.includes("boas-vindas") || n.slug.includes("bem-vindos"));

  const phases =
    locale === "pt"
      ? [
          { href: "/escolas-do-agrupamento", t: "Conhecer o Agrupamento", d: "Escolas, estrutura e serviços de apoio." },
          { href: "/calendario-escolar", t: "Orientar o ano letivo", d: "Calendário, documentos, ementas e provas." },
          { href: "/noticias", t: "Acompanhar a comunidade", d: "Notícias, Erasmus+ e atividades." },
        ]
      : [
          { href: "/escolas-do-agrupamento", t: "Meet the cluster", d: "Schools, structure and support services." },
          { href: "/calendario-escolar", t: "Orient the school year", d: "Calendar, documents, menus and exams." },
          { href: "/noticias", t: "Follow the community", d: "News, Erasmus+ and activities." },
        ];

  return (
    <div>
      <section className="page-wrap pt-8 lg:pt-12">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
          <motion.div
            className="glass flex flex-col justify-end rounded-[32px] p-7 sm:p-10 lg:min-h-[500px]"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <motion.p variants={rise} className="chrome-label mb-3">
              {locale === "pt" ? "Ano letivo 2026/2027" : "School year 2026/2027"}
            </motion.p>
            <motion.h1
              variants={rise}
              className="font-display max-w-xl text-[2.15rem] font-semibold leading-[1.12] tracking-tight text-ink sm:text-[2.7rem]"
            >
              {c.welcome}
            </motion.h1>
            <motion.p variants={rise} className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
              {c.tagline}
            </motion.p>
            <motion.div variants={rise} className="card-rows mt-8">
              {phases.map((p, i) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className={`card-row flex items-start gap-3 rounded-2xl border ${
                    i === 0 ? "border-navy bg-navy text-white" : "border-line bg-white/30 text-ink"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                      i === 0 ? "bg-white text-navy" : "bg-white/50 text-muted"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{p.t}</span>
                    <span className={`block text-[12px] leading-snug ${i === 0 ? "opacity-75" : "text-muted"}`}>
                      {p.d}
                    </span>
                  </span>
                </Link>
              ))}
            </motion.div>
            <motion.div variants={rise} className="mt-8 flex flex-wrap gap-3">
              <Link href="/noticias" className="btn-3d btn-primary inline-flex items-center gap-2">
                {c.news} <ArrowRight size={15} />
              </Link>
              <Link href="/escolas-do-agrupamento" className="btn-3d btn-secondary inline-flex items-center">
                {c.schools}
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="glass relative min-h-[340px] overflow-hidden rounded-[32px] lg:min-h-[500px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.65 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#1454a0]/20 via-transparent to-[#0a2a5c]/35" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logo.png"
              alt=""
              className="absolute right-8 top-10 h-28 w-28 object-contain opacity-90"
            />
            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
              <p className="chrome-label">{c.siteName}</p>
              <p className="mt-1 font-display text-2xl font-semibold tracking-tight">{c.siteFull}</p>
              <p className="mt-2 max-w-sm text-sm text-muted">{data.contact.address}</p>
              {welcome ? (
                <Link
                  href={`/noticias/${welcome.slug}`}
                  className="mt-5 inline-flex text-[13px] font-semibold text-brand hover:underline"
                >
                  {locale === "pt" ? "Ler a mensagem da Direção" : "Read the Director’s message"}
                </Link>
              ) : null}
            </div>
          </motion.div>
        </div>
      </section>

      <TodayStrip />

      <section className="page-wrap py-10" id="quick">
        <p className="chrome-label mb-5">{c.quickLinks}</p>
        <div className="grid gap-rows sm:grid-cols-2 lg:grid-cols-3">
          {[
            { href: "/pais", icon: Users, pt: "Pais e E.E.", en: "Parents & guardians" },
            { href: "/alunos", icon: GraduationCap, pt: "Alunos", en: "Students" },
            { href: "/pessoal", icon: Building2, pt: "Pessoal", en: "Staff" },
            { href: "/calendario-escolar", icon: Calendar, pt: "Calendário Escolar", en: "School calendar" },
            { href: "/ementas", icon: BookOpen, pt: "Ementas", en: "Menus" },
            { href: "/documentos", icon: Building2, pt: "Prateleira de documentos", en: "Document shelf" },
          ].map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.04 * i, duration: 0.4 }}
            >
              <Link href={item.href} className="card-duo card-link flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white/40 text-navy">
                  <item.icon size={17} strokeWidth={1.75} />
                </span>
                <span className="text-sm font-semibold">
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
