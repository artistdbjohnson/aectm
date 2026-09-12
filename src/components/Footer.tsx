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
          <p className="text-sm font-medium tracking-tight text-ink">
            {c.siteName}
          </p>
          <p className="mt-1 text-sm text-muted">{c.siteFull}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {data.contact.address}
            <br />
            Tel {data.contact.tel} · Fax {data.contact.fax}
            <br />
            <a
              className="text-ink underline-offset-2 hover:underline"
              href={`mailto:${data.contact.email}`}
            >
              {data.contact.email}
            </a>
          </p>
        </div>
        <div>
          <p className="chrome-label mb-3">{c.quickLinks}</p>
          <ul className="space-y-1.5 text-sm">
            <li>
              <Link className="text-muted hover:text-ink" href="/escolas-do-agrupamento">
                {c.schools}
              </Link>
            </li>
            <li>
              <Link className="text-muted hover:text-ink" href="/documentos-orientadores">
                {c.documents}
              </Link>
            </li>
            <li>
              <Link className="text-muted hover:text-ink" href="/noticias">
                {c.news}
              </Link>
            </li>
            <li>
              <Link className="text-muted hover:text-ink" href="/projeto-erasmus">
                Erasmus+
              </Link>
            </li>
            <li>
              <Link className="text-muted hover:text-ink" href="/contactos">
                {c.contactTitle}
              </Link>
            </li>
            <li>
              <Link className="text-muted hover:text-ink" href="/politica-de-privacidade">
                {locale === "pt" ? "Privacidade" : "Privacy"}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="chrome-label mb-3">dglxss</p>
          <p className="text-sm text-muted">
            {locale === "pt" ? "Construído por" : "Built by"}{" "}
            <a
              className="font-medium text-ink underline-offset-2 hover:underline"
              href="https://www.douglxss.com/"
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
