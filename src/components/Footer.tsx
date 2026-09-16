"use client";

import Link from "next/link";
import { chrome, data } from "@/content/data";
import { useLocale } from "@/content/locale";
import { formatTel, telHref } from "@/lib/urls";

export function Footer() {
  const { locale } = useLocale();
  const c = chrome(locale);
  return (
    <footer className="mt-16 border-t border-line/80">
      <div className="page-wrap grid gap-10 py-12 lg:grid-cols-3">
        <div className="glass glass-card rounded-3xl">
          <p className="font-display text-lg font-semibold tracking-tight text-ink">
            {c.siteName}
          </p>
          <p className="mt-1 text-sm text-muted">{c.siteFull}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {data.contact.address}
            <br />
            <a className="text-ink underline-offset-2 hover:underline" href={telHref(data.contact.tel)}>
              {c.telLabel} {formatTel(data.contact.tel)}
            </a>
            <br />
            {c.faxLabel} {formatTel(data.contact.fax)}
            <br />
            <a className="text-ink underline-offset-2 hover:underline" href={`mailto:${data.contact.email}`}>
              {data.contact.email}
            </a>
          </p>
        </div>
        <div className="glass glass-card rounded-3xl">
          <p className="chrome-label mb-4">{c.quickLinks}</p>
          <ul className="card-rows text-sm">
            {[
              ["/escolas-do-agrupamento", c.schools],
              ["/documentos", c.documents],
              ["/noticias", c.news],
              ["/calendario-escolar", c.calendar],
              ["/projeto-erasmus", "Erasmus+"],
              ["/contactos", c.contactTitle],
              ["/politica-de-privacidade", locale === "pt" ? "Privacidade" : "Privacy"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link className="text-muted hover:text-ink" href={href}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="glass glass-card rounded-3xl">
          <p className="chrome-label mb-4">dglxss</p>
          <p className="text-sm leading-relaxed text-muted">
            {c.attribution}{" "}
            <a
              className="font-semibold text-ink underline-offset-2 hover:underline"
              href="https://www.douglxss.com/"
              target="_blank"
              rel="noreferrer"
            >
              dglxss
            </a>
            .
          </p>
          <p className="mt-3 text-[12px] leading-relaxed text-muted">{c.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
