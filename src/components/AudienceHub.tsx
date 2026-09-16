"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { audiences, type AudienceId } from "@/content/audiences";
import { chrome } from "@/content/data";
import { useLocale } from "@/content/locale";

export function AudienceHub({ id }: { id: AudienceId }) {
  const { locale } = useLocale();
  const c = chrome(locale);
  const hub = audiences[id];
  return (
    <article className="page-wrap py-10">
      <p className="chrome-label mb-2">
        <Link href="/" className="hover:text-brand">{c.backHome}</Link>
      </p>
      <div className="glass mb-6 rounded-[28px] p-6 sm:p-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {hub.title[locale]}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{hub.lede[locale]}</p>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {hub.links.map((l) => (
          <li key={l.href}>
            {l.external ? (
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="card-duo flex items-center justify-between gap-3 px-5 py-4 font-semibold"
              >
                {l.label[locale]}
                <ExternalLink size={15} className="opacity-50" />
              </a>
            ) : (
              <Link href={l.href} className="card-duo flex items-center justify-between gap-3 px-5 py-4 font-semibold">
                {l.label[locale]}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </article>
  );
}
