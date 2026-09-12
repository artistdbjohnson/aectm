"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { data, chrome, type NavNode, type NavLeaf } from "@/content/data";
import { useLocale } from "@/content/locale";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { ThemeSwitch } from "@/components/ThemeSwitch";

function isLeaf(n: NavNode | NavLeaf): n is NavLeaf {
  return "href" in n && !!(n as NavLeaf).href && !("children" in n && (n as NavNode).children);
}

function labelOf(n: { label: { pt: string; en: string } }, locale: "pt" | "en") {
  return n.label[locale];
}

const PRIMARY = [
  { href: "/", id: "home" },
  { href: "/escolas-do-agrupamento", id: "escolas" },
  { href: "/servicos", id: "servicos" },
  { href: "/documentos-orientadores", id: "docs" },
  { href: "/noticias", id: "noticias" },
  { href: "/projeto-erasmus", id: "erasmus" },
  { href: "/contactos", id: "contactos" },
];

export function Header() {
  const { locale } = useLocale();
  const c = chrome(locale);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMega(null);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b transition-[background,box-shadow,height] duration-300 ${
          scrolled
            ? "border-line/70 bg-nav/90 shadow-sm backdrop-blur-md"
            : "border-transparent bg-nav/70 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:px-10">
          <Link href="/" className="flex items-center gap-3" aria-label={c.siteFull}>
            <LayoutGroup>
              <motion.img
                layoutId="aectm-logo"
                src="/brand/logo.png"
                alt=""
                className={`rounded-xl object-cover ${
                  scrolled ? "h-9 w-9" : "h-12 w-12"
                }`}
              />
              <motion.div layout className="leading-tight">
                <p
                  className={`font-black tracking-tight text-brand ${
                    scrolled ? "text-sm" : "text-base"
                  }`}
                >
                  {c.siteName}
                </p>
                {!scrolled ? (
                  <p className="hidden max-w-[220px] text-[11px] font-semibold text-muted sm:block">
                    {c.siteFull}
                  </p>
                ) : null}
              </motion.div>
            </LayoutGroup>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {PRIMARY.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              const label =
                item.id === "home"
                  ? c.home
                  : item.id === "noticias"
                    ? c.news
                    : item.id === "escolas"
                      ? c.schools
                      : item.id === "docs"
                        ? c.documents
                        : item.id === "servicos"
                          ? locale === "pt"
                            ? "Serviços"
                            : "Services"
                          : item.id === "erasmus"
                            ? "Erasmus+"
                            : c.contactTitle;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-full px-3 py-2 text-[13px] font-bold uppercase tracking-[0.4px] transition ${
                    active
                      ? "bg-brand/10 text-brand"
                      : "text-muted hover:bg-brand/5 hover:text-brand"
                  }`}
                  data-section={item.id}
                >
                  {label}
                  {active ? (
                    <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand" />
                  ) : null}
                </Link>
              );
            })}
            <button
              type="button"
              className="ml-1 inline-flex items-center gap-1 rounded-full px-3 py-2 text-[13px] font-bold uppercase tracking-[0.4px] text-muted hover:bg-brand/5 hover:text-brand"
              onClick={() => setMega(mega === "all" ? null : "all")}
              aria-expanded={mega === "all"}
            >
              Menu <ChevronDown size={14} />
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-ink"
              aria-label={c.search}
              onClick={() => setSearchOpen(true)}
            >
              <Search size={16} />
            </button>
            <LanguageSwitch />
            <ThemeSwitch />
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-navy text-white lg:hidden"
              aria-label="Menu"
              onClick={() => setOpen(true)}
            >
              <Menu size={18} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mega === "all" ? (
            <motion.div
              className="absolute inset-x-0 top-full border-b border-line bg-surface shadow-lg"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
            >
              <div className="mx-auto grid max-w-[1440px] gap-6 px-6 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
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
            className="fixed inset-0 z-50 overflow-y-auto bg-bg px-5 pb-10 pt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mb-6 flex items-center justify-between">
              <p className="font-black text-brand">{c.siteName}</p>
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-navy text-white"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              {data.nav.map((node, i) => (
                <MobileNode key={i} node={node} locale={locale} />
              ))}
              <Link
                href="/noticias"
                className="block rounded-xl border border-line bg-surface px-4 py-3 font-bold"
                onClick={() => setOpen(false)}
              >
                {c.news}
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {searchOpen ? (
          <motion.div
            className="fixed inset-0 z-[60] flex items-start justify-center bg-navy/50 px-4 pt-24 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
          >
            <div
              className="w-full max-w-lg rounded-2xl border border-line bg-surface p-5 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="chrome-label mb-3">{c.search}</p>
              <input
                className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-ink outline-none ring-brand focus:ring-2"
                placeholder={c.searchStub}
                disabled
              />
              <p className="mt-2 text-sm text-muted">{c.searchStub}</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function MegaColumn({
  node,
  locale,
}: {
  node: NavNode | NavLeaf;
  locale: "pt" | "en";
}) {
  if (isLeaf(node)) {
    return (
      <div>
        <Link href={node.href} className="font-extrabold text-ink hover:text-brand">
          {labelOf(node, locale)}
        </Link>
      </div>
    );
  }
  return (
    <div>
      {node.href ? (
        <Link href={node.href} className="chrome-label mb-2 block text-brand">
          {labelOf(node, locale)}
        </Link>
      ) : (
        <p className="chrome-label mb-2 text-brand">{labelOf(node, locale)}</p>
      )}
      <ul className="space-y-1.5">
        {(node.children || []).map((child, i) =>
          isLeaf(child) ? (
            <li key={i}>
              <Link
                href={child.href}
                className="text-sm font-semibold text-muted hover:text-brand"
              >
                {labelOf(child, locale)}
              </Link>
            </li>
          ) : (
            <li key={i} className="pt-2">
              <p className="text-xs font-extrabold uppercase tracking-wide text-ink">
                {labelOf(child, locale)}
              </p>
              <ul className="mt-1 space-y-1 pl-2">
                {(child.children || []).map((g, j) =>
                  isLeaf(g) ? (
                    <li key={j}>
                      <Link
                        href={g.href}
                        className="text-sm text-muted hover:text-brand"
                      >
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
}: {
  node: NavNode | NavLeaf;
  locale: "pt" | "en";
}) {
  if (isLeaf(node)) {
    return (
      <Link
        href={node.href}
        className="block rounded-xl border border-line bg-surface px-4 py-3 font-bold"
      >
        {labelOf(node, locale)}
      </Link>
    );
  }
  return (
    <div className="rounded-xl border border-line bg-surface px-4 py-3">
      <p className="font-extrabold">{labelOf(node, locale)}</p>
      <ul className="mt-2 space-y-1">
        {(node.children || []).map((child, i) =>
          isLeaf(child) ? (
            <li key={i}>
              <Link href={child.href} className="text-sm text-muted">
                {labelOf(child, locale)}
              </Link>
            </li>
          ) : (
            <li key={i} className="pt-1">
              <p className="text-xs font-extrabold uppercase">{labelOf(child, locale)}</p>
              <ul className="pl-2">
                {(child.children || []).map((g, j) =>
                  isLeaf(g) ? (
                    <li key={j}>
                      <Link href={g.href} className="text-sm text-muted">
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
