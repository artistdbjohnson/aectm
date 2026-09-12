"use client";

import Link from "next/link";
import { chrome, data } from "@/content/data";
import { useLocale } from "@/content/locale";

export function Footer() {
  const { locale } = useLocale();
  const c = chrome(locale);
  return (
    <footer className="mt-20 border-t border-line bg-surface">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-10">
        <div>
          <p className="font-black text-brand">{c.siteName}</p>
          <p className="mt-1 text-sm font-semibold text-muted">{c.siteFull}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {data.contact.address}
            <br />
            Tel {data.contact.tel} · Fax {data.contact.fax}
            <br />
            <a className="text-brand hover:underline" href={`mailto:${data.contact.email}`}>
              {data.contact.email}
            </a>
          </p>
        </div>
        <div>
          <p className="chrome-label mb-3">{c.quickLinks}</p>
          <ul className="space-y-1.5 text-sm font-semibold">
            <li><Link className="hover:text-brand" href="/escolas-do-agrupamento">{c.schools}</Link></li>
            <li><Link className="hover:text-brand" href="/documentos-orientadores">{c.documents}</Link></li>
            <li><Link className="hover:text-brand" href="/noticias">{c.news}</Link></li>
            <li><Link className="hover:text-brand" href="/projeto-erasmus">Erasmus+</Link></li>
            <li><Link className="hover:text-brand" href="/contactos">{c.contactTitle}</Link></li>
            <li><Link className="hover:text-brand" href="/politica-de-privacidade">{locale === "pt" ? "Privacidade" : "Privacy"}</Link></li>
          </ul>
        </div>
        <div>
          <p className="chrome-label mb-3">dglxss</p>
          <p className="text-sm text-muted">
            {c.builtBy}{" "}
            <a
              className="font-bold text-brand hover:underline"
              href="https://douglxss.com"
              target="_blank"
              rel="noreferrer"
            >
              douglxss.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
