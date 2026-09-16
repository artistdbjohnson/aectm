"use client";

import Link from "next/link";
import { chrome, pageTitle, type PageData } from "@/content/data";
import { useLocale } from "@/content/locale";
import { PageBody } from "@/components/PageBody";
import { DocLinks } from "@/components/DocLinks";
import { ProvenancePanel } from "@/components/ProvenancePanel";
import { officialUrl } from "@/lib/urls";

export function ContentPage({ slug, page }: { slug: string; page: PageData }) {
  const { locale } = useLocale();
  const c = chrome(locale);
  const title = pageTitle(slug, locale);
  const showProvenance =
    slug.includes("erasmus") ||
    slug.includes("documentos-orientadores") ||
    slug.includes("padde") ||
    slug.includes("pna");

  const provenanceItems = page.links
    .filter((l) => l.href)
    .slice(0, 12)
    .map((l) => ({
      label: l.text || l.href,
      href: officialUrl(l.href),
      note:
        locale === "pt"
          ? "Fonte / documento no site oficial"
          : "Source / document on the official site",
    }));

  const images = page.images.filter((img) => img.src && !img.src.startsWith("http://"));

  return (
    <article className="page-wrap py-10">
      <p className="chrome-label mb-2">
        <Link href="/" className="hover:text-brand">
          {c.backHome}
        </Link>
      </p>
      <div className="glass mb-8 rounded-[28px] p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h1 className="font-display max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h1>
          {showProvenance && provenanceItems.length ? (
            <ProvenancePanel title={title} items={provenanceItems} />
          ) : null}
        </div>
      </div>

      {images[0] ? (
        <div className="glass mb-8 overflow-hidden rounded-[28px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[0].src.startsWith("http") ? officialUrl(images[0].src) : images[0].src}
            alt={images[0].alt || title}
            className="max-h-[420px] w-full object-cover"
          />
        </div>
      ) : null}

      <div className="glass rounded-[28px] p-6 sm:p-8">
        <PageBody page={page} />
        <DocLinks page={page} />
        {slug === "giae" ? (
          <a
            className="btn-3d btn-primary mt-8 inline-flex"
            href="https://aectm.giae.pt"
            target="_blank"
            rel="noreferrer"
          >
            GIAE → aectm.giae.pt
          </a>
        ) : null}
      </div>
    </article>
  );
}
