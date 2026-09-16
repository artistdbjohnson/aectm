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
      <p className="chrome-label chrome-back">
        <Link href="/" className="hover:text-brand">{c.backHome}</Link>
      </p>
      <div className="card-stack">
        <div className="glass glass-card rounded-[28px]">
          <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {hub.title[locale]}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{hub.lede[locale]}</p>
        </div>
        <ul className="grid gap-rows sm:grid-cols-2">
          {hub.links.map((l) => (
            <li key={l.href}>
              {l.external ? (
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="card-duo card-link flex items-center justify-between gap-3 font-semibold"
                >
                  {l.label[locale]}
                  <ExternalLink size={15} className="opacity-50" />
                </a>
              ) : (
                <Link href={l.href} className="card-duo card-link flex items-center justify-between gap-3 font-semibold">
                  {l.label[locale]}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
