"use client";

import { ExternalLink } from "lucide-react";
import type { PageData } from "@/content/data";

export function DocLinks({ page }: { page: PageData }) {
  const docs = page.links.filter((l) => {
    const h = l.href.toLowerCase();
    return (
      h.includes("wp-content") ||
      h.endsWith(".pdf") ||
      h.endsWith(".doc") ||
      h.endsWith(".docx") ||
      h.endsWith(".xls") ||
      h.endsWith(".xlsx") ||
      h.startsWith("http")
    );
  });
  if (!docs.length) return null;
  const seen = new Set<string>();
  const unique = docs.filter((d) => {
    if (seen.has(d.href)) return false;
    seen.add(d.href);
    return true;
  });
  return (
    <div className="mt-10">
      <p className="chrome-label mb-3">Links</p>
      <ul className="grid gap-2 sm:grid-cols-2">
        {unique.slice(0, 40).map((d, i) => (
          <li key={i}>
            <a
              href={d.href}
              target="_blank"
              rel="noreferrer"
              className="card-duo flex items-center justify-between gap-3 px-4 py-3 text-sm font-bold text-ink hover:text-brand"
            >
              <span className="line-clamp-2">{d.text || d.href}</span>
              <ExternalLink size={14} className="shrink-0 opacity-50" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
