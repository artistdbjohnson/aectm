"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { data, chrome, type NavNode, type NavLeaf } from "@/content/data";
import { useLocale } from "@/content/locale";
import { ChromeCluster } from "@/components/ChromeCluster";
import { BrandMark } from "@/components/BrandMark";
import { SearchDialog } from "@/components/SearchDialog";

function isLeaf(n: NavNode | NavLeaf): n is NavLeaf {
  return Boolean(
    "href" in n &&
      (n as NavLeaf).href &&
      !("children" in n && (n as NavNode).children?.length),
  );
}

function labelOf(n: { label: { pt: string; en: string } }, locale: "pt" | "en") {
  return n.label[locale];
}

const PRIMARY = [
  { href: "/", id: "inicio", pt: "Início", en: "Home" },
  { href: "/noticias", id: "noticias", pt: "Notícias", en: "News" },
  { href: "/calendario-escolar", id: "calendario", pt: "Calendário", en: "Calendar" },
  { href: "/documentos", id: "documentos", pt: "Documentos", en: "Documents" },
  { href: "/contactos", id: "contactos", pt: "Contactos", en: "Contacts" },
] as const;

const AUDIENCES = [
  { href: "/pais", pt: "Pais", en: "Parents" },
  { href: "/alunos", pt: "Alunos", en: "Students" },
  { href: "/pessoal", pt: "Pessoal", en: "Staff" },
] as const;

export function Header() {
  const { locale } = useLocale();
  const c = chrome(locale);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMega(false);
  }, [pathname]);

  const activeId = PRIMARY.find((p) =>
    p.href === "/"
      ? pathname === "/"
      : pathname === p.href || pathname.startsWith(`${p.href}/`),
  )?.id;

  return (
    <>
      <header className={`sticky top-0 z-40 transition-shadow duration-300 ${scrolled ? "glass-nav shadow-sm" : "glass-nav"}`}>
        <div className="page-wrap flex items-center justify-between gap-3 py-[var(--space-chrome-bar)]">
          <BrandMark collapsed={scrolled} title={c.siteName} subtitle={c.siteFull} />

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label={locale === "pt" ? "Principal" : "Primary"}>
            {PRIMARY.map((item) => {
              const active = activeId === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`relative rounded-full px-3 py-2 text-[13px] font-semibold transition ${
                    active ? "text-navy" : "text-muted hover:text-ink"
                  }`}
                >
                  {locale === "pt" ? item.pt : item.en}
                  {active ? (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-brand"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  ) : null}
                </Link>
              );
            })}
            <button
              type="button"
              className="ml-1 inline-flex items-center gap-1 rounded-full px-3 py-2 text-[13px] font-semibold text-muted hover:text-ink"
              onClick={() => setMega((v) => !v)}
              aria-expanded={mega}
            >
              {locale === "pt" ? "Menu" : "Menu"} <ChevronDown size={14} />
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white/35 text-ink backdrop-blur-md"
              aria-label={c.search}
              onClick={() => setSearchOpen(true)}
            >
              <Search size={15} strokeWidth={1.75} />
            </button>
            <ChromeCluster />
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-navy text-white lg:hidden"
              aria-label="Menu"
              onClick={() => setOpen(true)}
            >
              <Menu size={17} />
            </button>
          </div>
        </div>

        <div className="page-wrap hidden border-t border-line/70 py-1.5 lg:flex">
          <div className="flex flex-wrap gap-1.5">
            {AUDIENCES.map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className={`rounded-full px-3 py-1 text-[12px] font-semibold ${
                  pathname === a.href
                    ? "bg-navy text-white"
                    : "text-muted hover:bg-white/35 hover:text-ink"
                }`}
              >
                {locale === "pt" ? a.pt : a.en}
              </Link>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {mega ? (
            <motion.div
              className="absolute inset-x-0 top-full border-b border-line glass-strong"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="page-wrap grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
                {data.nav.map((node, i) => (
                  <MegaColumn key={i} node={node} locale={locale} />
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-50 overflow-y-auto px-5 pb-10 pt-5"
            style={{ background: "var(--a-grad)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mb-6 flex items-center justify-between">
              <p className="font-display font-semibold text-ink">{c.siteName}</p>
              <div className="flex items-center gap-2">
                <ChromeCluster />
                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-navy text-white"
                  onClick={() => setOpen(false)}
                  aria-label={locale === "pt" ? "Fechar" : "Close"}
                >
                  <X size={17} />
                </button>
              </div>
            </div>
            <div className="mb-4 flex flex-wrap gap-2">
              {[
                ...PRIMARY.map((s) => ({ href: s.href, pt: s.pt, en: s.en })),
                ...AUDIENCES.map((s) => ({ href: s.href, pt: s.pt, en: s.en })),
              ].map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-line bg-white/40 px-3 py-1.5 text-xs font-semibold backdrop-blur-md"
                >
                  {locale === "pt" ? s.pt : s.en}
                </Link>
              ))}
            </div>
            <div className="space-y-3">
              {data.nav.map((node, i) => (
                <MobileNode key={i} node={node} locale={locale} close={() => setOpen(false)} />
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function MegaColumn({ node, locale }: { node: NavNode | NavLeaf; locale: "pt" | "en" }) {
  if (isLeaf(node)) {
    return (
      <div>
        <Link href={node.href} className="font-semibold text-ink hover:opacity-70">
          {labelOf(node, locale)}
        </Link>
      </div>
    );
  }
  return (
    <div>
      {node.href ? (
        <Link href={node.href} className="chrome-label mb-3 block">
          {labelOf(node, locale)}
        </Link>
      ) : (
        <p className="chrome-label mb-3">{labelOf(node, locale)}</p>
      )}
      <ul className="space-y-2">
        {(node.children || []).map((child, i) =>
          isLeaf(child) ? (
            <li key={i}>
              <Link href={child.href} className="text-sm text-muted transition hover:text-ink">
                {labelOf(child, locale)}
              </Link>
            </li>
          ) : (
            <li key={i} className="pt-2">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-ink">
                {labelOf(child, locale)}
              </p>
              <ul className="mt-1.5 space-y-1.5 pl-2">
                {(child.children || []).map((g, j) =>
                  isLeaf(g) ? (
                    <li key={j}>
                      <Link href={g.href} className="text-sm text-muted hover:text-ink">
                        {labelOf(g, locale)}
                      </Link>
                    </li>
                  ) : null,
                )}
              </ul>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

function MobileNode({
  node,
  locale,
  close,
}: {
  node: NavNode | NavLeaf;
  locale: "pt" | "en";
  close: () => void;
}) {
  if (isLeaf(node)) {
    return (
      <Link
        href={node.href}
        onClick={close}
        className="card-duo card-link block font-semibold"
      >
        {labelOf(node, locale)}
      </Link>
    );
  }
  return (
    <div className="card-duo card-link">
      <p className="font-semibold">{labelOf(node, locale)}</p>
      <ul className="mt-2 space-y-1.5">
        {(node.children || []).map((child, i) =>
          isLeaf(child) ? (
            <li key={i}>
              <Link href={child.href} onClick={close} className="text-sm text-muted">
                {labelOf(child, locale)}
              </Link>
            </li>
          ) : (
            <li key={i} className="pt-1">
              <p className="text-[11px] font-semibold uppercase">{labelOf(child, locale)}</p>
              <ul className="pl-2">
                {(child.children || []).map((g, j) =>
                  isLeaf(g) ? (
                    <li key={j}>
                      <Link href={g.href} onClick={close} className="text-sm text-muted">
                        {labelOf(g, locale)}
                      </Link>
                    </li>
                  ) : null,
                )}
              </ul>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
