"use client";

import Link from "next/link";
import { chrome, data } from "@/content/data";
import { useLocale } from "@/content/locale";

export function NewsList() {
  const { locale } = useLocale();
  const c = chrome(locale);
  const news = data.news.filter((n) => n.title !== "_");
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-10">
      <p className="chrome-label mb-2">{c.highlights}</p>
      <h1 className="text-3xl font-black tracking-tight sm:text-4xl">{c.news}</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {news.map((n) => (
          <article key={n.id} className="card-duo overflow-hidden">
            <Link href={`/noticias/${n.slug}`}>
              <div className="aspect-[16/10] bg-line/40">
                {n.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={n.image} alt="" className="h-full w-full object-cover" />
                ) : null}
              </div>
              <div className="p-4">
                <p className="text-xs font-bold text-muted">{n.date}</p>
                <h2 className="mt-1 line-clamp-2 font-extrabold">{n.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm text-muted">{n.excerpt}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
