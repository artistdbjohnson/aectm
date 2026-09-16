"use client";

import Link from "next/link";
import { chrome, data } from "@/content/data";
import { useLocale } from "@/content/locale";
import { newsCopy } from "@/content/news-en";
import { officialUrl } from "@/lib/urls";

export function NewsArticle({ slug }: { slug: string }) {
  const { locale } = useLocale();
  const c = chrome(locale);
  const item = data.news.find((n) => n.slug === slug);
  if (!item) {
    return (
      <div className="page-wrap py-16">
        <div className="glass rounded-[28px]">
          <p className="font-semibold">404</p>
          <Link href="/noticias" className="text-brand">
            {c.allNews}
          </Link>
        </div>
      </div>
    );
  }
  const copy = newsCopy(item, locale);
  return (
    <article className="page-wrap max-w-3xl py-10">
      <Link href="/noticias" className="chrome-label chrome-back hover:text-brand">
        ← {c.news}
      </Link>
      <div className="glass rounded-[28px]">
        <p className="text-sm font-semibold text-muted">{item.date}</p>
        <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          {copy.title}
        </h1>
        {item.image ? (
          <div className="mt-6 overflow-hidden rounded-3xl border border-line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={officialUrl(item.image)} alt="" className="w-full object-cover" />
          </div>
        ) : null}
        <div className="prose-school mt-8 whitespace-pre-wrap text-muted">
          {copy.body || copy.excerpt}
        </div>
        <p className="mt-8 text-sm text-muted">
          <a className="text-brand hover:underline" href={item.link} target="_blank" rel="noreferrer">
            {locale === "pt" ? "Ver no site original" : "View on the original site"}
          </a>
        </p>
      </div>
    </article>
  );
}
