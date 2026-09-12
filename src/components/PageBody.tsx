"use client";

import type { PageData } from "@/content/data";

export function PageBody({ page }: { page: PageData }) {
  if (page.blocks.length > 0) {
    return (
      <div className="prose-school max-w-3xl">
        {page.blocks.map((b, i) => {
          if (b.tag === "h1" || b.tag === "h2")
            return (
              <h2 key={i} className="text-xl font-extrabold sm:text-2xl">
                {b.text}
              </h2>
            );
          if (b.tag === "h3" || b.tag === "h4")
            return (
              <h3 key={i} className="text-lg font-extrabold">
                {b.text}
              </h3>
            );
          if (b.tag === "li")
            return (
              <li key={i} className="ml-5 list-disc text-muted">
                {b.text}
              </li>
            );
          return (
            <p key={i} className="text-muted">
              {b.text}
            </p>
          );
        })}
      </div>
    );
  }
  return (
    <div className="prose-school max-w-3xl whitespace-pre-wrap text-muted">
      {page.text || "—"}
    </div>
  );
}
