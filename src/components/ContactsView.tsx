"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, Printer } from "lucide-react";
import { chrome, data } from "@/content/data";
import { useLocale } from "@/content/locale";
import { formatTel, telHref } from "@/lib/urls";

export function ContactsView() {
  const { locale } = useLocale();
  const c = chrome(locale);
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.contact.address)}`;

  return (
    <article className="page-wrap py-10">
      <p className="chrome-label mb-2">
        <Link href="/" className="hover:text-brand">
          {c.backHome}
        </Link>
      </p>
      <div className="glass mb-6 rounded-[28px] p-6 sm:p-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {c.contactTitle}
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted">
          {locale === "pt"
            ? "Contactos publicados em aectm.pt/contatos/. Telefone e email são ligações reais."
            : "Contacts published at aectm.pt/contatos/. Phone and email are live links."}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="glass rounded-[28px] p-6">
          <p className="inline-flex items-center gap-2 chrome-label">
            <MapPin size={14} /> {locale === "pt" ? "Morada" : "Address"}
          </p>
          <p className="mt-3 font-display text-xl font-semibold leading-snug">
            Agrupamento de Escolas de Castro Marim
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Avenida Dr. José Afonso Gomes
            <br />
            Apartado 62
            <br />
            8950-275 Castro Marim
          </p>
          <a
            href={maps}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex text-sm font-semibold text-brand hover:underline"
          >
            {locale === "pt" ? "Abrir no mapa" : "Open in maps"}
          </a>
        </div>
        <div className="glass space-y-4 rounded-[28px] p-6">
          <div>
            <p className="inline-flex items-center gap-2 chrome-label">
              <Phone size={14} /> {c.telLabel}
            </p>
            <p className="mt-2">
              <a className="text-lg font-semibold hover:underline" href={telHref(data.contact.tel)}>
                {formatTel(data.contact.tel)}
              </a>
            </p>
          </div>
          <div>
            <p className="inline-flex items-center gap-2 chrome-label">
              <Printer size={14} /> {c.faxLabel}
            </p>
            <p className="mt-2 text-lg font-semibold">{formatTel(data.contact.fax)}</p>
          </div>
          <div>
            <p className="inline-flex items-center gap-2 chrome-label">
              <Mail size={14} /> {locale === "pt" ? "Endereço eletrónico" : "Email"}
            </p>
            <p className="mt-2">
              <a className="text-lg font-semibold hover:underline" href={`mailto:${data.contact.email}`}>
                {data.contact.email}
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {[
          { href: "/escolas-do-agrupamento", pt: "Escolas do Agrupamento", en: "Schools in the cluster" },
          { href: "/servicos-de-apoio", pt: "Serviços de Apoio / CPCJ", en: "Support services / CPCJ" },
          { href: "https://aectm.giae.pt", pt: "GIAE", en: "GIAE", ext: true },
        ].map((x) => (
          <a
            key={x.href}
            href={x.href}
            target={"ext" in x ? "_blank" : undefined}
            rel={"ext" in x ? "noreferrer" : undefined}
            className="card-duo px-4 py-4 text-sm font-semibold"
          >
            {locale === "pt" ? x.pt : x.en}
          </a>
        ))}
      </div>
    </article>
  );
}
