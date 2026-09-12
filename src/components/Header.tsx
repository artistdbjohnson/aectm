"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { data, chrome, type NavNode, type NavLeaf } from "@/content/data";
import { useLocale } from "@/content/locale";
import { ChromeCluster } from "@/components/ChromeCluster";

function isLeaf(n: NavNode | NavLeaf): n is NavLeaf {
  return Boolean(
    "href" in n &&
      (n as NavLeaf).href &&
      !("children" in n && (n as NavNode).children?.length),
  );
}

function labelOf(
  n: { label: { pt: string; en: string } },
  locale: "pt" | "en",
) {
  return n.label[locale];
}

/** Section-aware sticky targets (Axiom #2). */
const SECTIONS = [
  { id: "avisos", href: "/destaques", pt: "Avisos", en: "Notices" },
  { id: "noticias", href: "/noticias", pt: "Notícias", en: "News" },
  { id: "escolas", href: "/escolas-do-agrupamento", pt: "Escolas", en: "Schools" },
  { id: "documentos", href: "/documentos-orientadores", pt: "Documentos", en: "Documents" },
  { id: "contactos", href: "/contactos", pt: "Contactos", en: "Contacts" },
] as const;

export function Header() {
  const { locale } = useLocale();
  const c = chrome(locale);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("noticias");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMega(false);
    // Path-based section awareness
    if (pathname.startsWith("/contactos") || pathname.startsWith("/contatos"))
      setActiveSection("contactos");
    else if (
      pathname.startsWith("/documentos") ||
      pathname.startsWith("/legislacao") ||
      pathname.startsWith("/padde")
    )
      setActiveSection("documentos");
    else if (pathname.startsWith("/escolas")) setActiveSection("escolas");
    else if (pathname.startsWith("/destaques")) setActiveSection("avisos");
    else if (pathname.startsWith("/noticias") || pathname === "/")
      setActiveSection("noticias");
  }, [pathname]);

  // Home: IntersectionObserver for section-aware underline
  useEffect(() => {
    if (pathname !== "/") return;
    const ids = ["avisos-rail", "noticias", "quick", "top"];
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible?.target?.id) return;
        if (visible.target.id === "noticias") setActiveSection("noticias");
        if (visible.target.id === "avisos-rail") setActiveSection("avisos");
        if (visible.target.id === "quick") setActiveSection("escolas");
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0.1, 0.4] },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b transition-[background,backdrop-filter,border-color] duration-300 ${
          scrolled
            ? "border-line/80 bg-nav backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:px-10">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label={c.siteFull}
          >
            <LayoutGroup id="aectm-brand">
              <motion.img
                layoutId="aectm-logo"
                src="/brand/logo.png"
                alt=""
                transition={{ type: "spring", stiffness: 380, damping: 34 }}
                className={`rounded-xl object-cover ${
                  scrolled ? "h-9 w-9" : "h-[52px] w-[52px]"
                }`}
              />
              <motion.div
                layout
                className="leading-tight"
                transition={{ type: "spring", stiffness: 380, damping: 34 }}
              >
                <p
                  className={`font-medium tracking-tight text-ink ${
                    scrolled ? "text-sm" : "text-base"
                  }`}
                >
                  {c.siteName}
                </p>
                <AnimatePresence initial={false}>
                  {!scrolled ? (
                    <motion.p
                      key="full"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="hidden max-w-[240px] overflow-hidden text-[11px] font-normal text-muted sm:block"
                    >
                      {c.siteFull}
                    </motion.p>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            </LayoutGroup>
          </Link>

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label={locale === "pt" ? "Secções" : "Sections"}
          >
            {SECTIONS.map((item) => {
              const active = activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`relative rounded-full px-3 py-2 text-[12px] font-semibold tracking-wide transition ${
                    active ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {locale === "pt" ? item.pt : item.en}
                  {active ? (
                    <motion.span
                      layoutId="section-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-ink"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  ) : null}
                </Link>
              );
            })}
            <button
              type="button"
              className="ml-1 inline-flex items-center gap-1 rounded-full px-3 py-2 text-[12px] font-semibold text-muted hover:text-ink"
              onClick={() => setMega((v) => !v)}
              aria-expanded={mega}
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
              <Search size={15} strokeWidth={1.75} />
            </button>
            <ChromeCluster />
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-[var(--a-bg)] lg:hidden"
              aria-label="Menu"
              onClick={() => setOpen(true)}
            >
              <Menu size={17} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mega ? (
            <motion.div
              className="absolute inset-x-0 top-full border-b border-line bg-surface/95 shadow-xl backdrop-blur-xl"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mx-auto grid max-w-[1440px] gap-8 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
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
              <p className="font-medium text-ink">{c.siteName}</p>
              <div className="flex items-center gap-2">
                <ChromeCluster />
                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-[var(--a-bg)]"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                >
                  <X size={17} />
                </button>
              </div>
            </div>
            <div className="mb-4 flex flex-wrap gap-2">
              {SECTIONS.map((s) => (
                <Link
                  key={s.id}
                  href={s.href}
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold"
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

      <AnimatePresence>
        {searchOpen ? (
          <motion.div
            className="fixed inset-0 z-[60] flex items-start justify-center bg-black/45 px-4 pt-28 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
          >
            <div
              className="w-full max-w-lg rounded-2xl border border-line bg-surface p-5 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="chrome-label mb-3">{c.search}</p>
              <input
                className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-ink outline-none focus:ring-2 focus:ring-ink/20"
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
        <Link href={node.href} className="font-medium text-ink hover:opacity-70">
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
              <Link
                href={child.href}
                className="text-sm text-muted transition hover:text-ink"
              >
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
                      <Link
                        href={g.href}
                        className="text-sm text-muted hover:text-ink"
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
        className="block rounded-2xl border border-line bg-surface px-4 py-3 font-medium"
      >
        {labelOf(node, locale)}
      </Link>
    );
  }
  return (
    <div className="rounded-2xl border border-line bg-surface px-4 py-3">
      <p className="font-medium">{labelOf(node, locale)}</p>
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
              <p className="text-[11px] font-semibold uppercase">
                {labelOf(child, locale)}
              </p>
              <ul className="pl-2">
                {(child.children || []).map((g, j) =>
                  isLeaf(g) ? (
                    <li key={j}>
                      <Link
                        href={g.href}
                        onClick={close}
                        className="text-sm text-muted"
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
