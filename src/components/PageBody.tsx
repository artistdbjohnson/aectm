"use client";

import type { PageData } from "@/content/data";
import { useLocale } from "@/content/locale";
import { locText } from "@/content/translate";

export function PageBody({ page }: { page: PageData }) {
  const { locale } = useLocale();
  if (page.blocks.length > 0) {
    return (
      <div className="prose-school max-w-3xl">
        {page.blocks.map((b, i) => {
          const text = locText(b.text, locale);
          if (b.tag === "h1" || b.tag === "h2")
            return (
              <h2 key={i} className="text-xl font-semibold sm:text-2xl">
                {text}
              </h2>
            );
          if (b.tag === "h3" || b.tag === "h4")
            return (
              <h3 key={i} className="text-lg font-semibold">
                {text}
              </h3>
            );
          if (b.tag === "li")
            return (
              <li key={i} className="ml-5 list-disc text-muted">
                {text}
              </li>
            );
          return (
            <p key={i} className="text-muted">
              {text}
            </p>
          );
        })}
      </div>
    );
  }
  return (
    <div className="prose-school max-w-3xl whitespace-pre-wrap text-muted">
      {locText(page.text, locale) || "—"}
    </div>
  );
}
