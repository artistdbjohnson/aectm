"use client";

import Link from "next/link";
import { chrome, data } from "@/content/data";
import { useLocale } from "@/content/locale";

export function NewsArticle({ slug }: { slug: string }) {
  const { locale } = useLocale();
  const c = chrome(locale);
  const item = data.news.find((n) => n.slug === slug);
  if (!item) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <p className="font-extrabold">404</p>
        <Link href="/noticias" className="text-brand">
          {c.allNews}
        </Link>
      </div>
    );
  }
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link href="/noticias" className="chrome-label hover:text-brand">
        ← {c.news}
      </Link>
      <p className="mt-4 text-sm font-bold text-muted">{item.date}</p>
      <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
        {item.title}
      </h1>
      {item.image ? (
        <div className="mt-6 overflow-hidden rounded-3xl border border-line">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.image} alt="" className="w-full object-cover" />
        </div>
      ) : null}
      <div className="prose-school mt-8 whitespace-pre-wrap text-muted">
        {item.body}
      </div>
      <p className="mt-8 text-sm text-muted">
        <a
          className="text-brand hover:underline"
          href={item.link}
          target="_blank"
          rel="noreferrer"
        >
          {locale === "pt" ? "Ver no site original" : "View on original site"}
        </a>
      </p>
    </article>
  );
}
