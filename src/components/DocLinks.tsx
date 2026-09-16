"use client";

import { ExternalLink } from "lucide-react";
import type { PageData } from "@/content/data";
import { useLocale } from "@/content/locale";
import { locText } from "@/content/translate";
import { officialUrl } from "@/lib/urls";

export function DocLinks({ page }: { page: PageData }) {
  const { locale } = useLocale();
  const docs = page.links.filter((l) => l.href);
  if (!docs.length) return null;
  const seen = new Set<string>();
  const unique = docs.filter((d) => {
    const href = officialUrl(d.href);
    if (seen.has(href)) return false;
    seen.add(href);
    return true;
  });
  return (
    <div className="mt-10">
      <p className="chrome-label mb-3">
        {locale === "pt" ? "Ligações e ficheiros" : "Links and files"}
      </p>
      <ul className="grid gap-row sm:grid-cols-2">
        {unique.slice(0, 48).map((d, i) => {
          const href = officialUrl(d.href);
          const label = locText(d.text || href, locale);
          const internal = href.startsWith("/");
          return (
            <li key={i}>
              <a
                href={href}
                target={internal ? undefined : "_blank"}
                rel={internal ? undefined : "noreferrer"}
                className="card-duo flex items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-ink"
              >
                <span className="line-clamp-2">{label}</span>
                <ExternalLink size={14} className="shrink-0 opacity-50" />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
