"use client";

import Link from "next/link";
import { chrome, pageTitle, type PageData } from "@/content/data";
import { useLocale } from "@/content/locale";
import { PageBody } from "@/components/PageBody";
import { DocLinks } from "@/components/DocLinks";
import { ProvenancePanel } from "@/components/ProvenancePanel";

export function ContentPage({
  slug,
  page,
}: {
  slug: string;
  page: PageData;
}) {
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
      href: l.href,
      note: locale === "pt" ? "Fonte / documento no site oficial" : "Source / document on the official site",
    }));

  return (
    <article className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-10">
      <p className="chrome-label mb-2">
        <Link href="/" className="hover:text-brand">
          {c.backHome}
        </Link>
      </p>
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <h1 className="max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">
          {title}
        </h1>
        {showProvenance && provenanceItems.length ? (
          <ProvenancePanel title={title} items={provenanceItems} />
        ) : null}
      </div>

      {page.images[0] ? (
        <div className="mb-8 overflow-hidden rounded-3xl border border-line bg-surface">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={page.images[0].src}
            alt={page.images[0].alt || title}
            className="max-h-[420px] w-full object-cover"
          />
        </div>
      ) : null}

      <PageBody page={page} />
      <DocLinks page={page} />

      {slug === "contactos" || slug === "contatos" ? (
        <div className="mt-10 card-duo max-w-xl p-6">
          <p className="chrome-label mb-2">{c.contactTitle}</p>
          <p className="font-bold">Av. Dr. José Afonso Gomes, Apt 62, 8950-275 Castro Marim</p>
          <p className="mt-2 text-muted">
            Tel{" "}
            <a className="text-brand" href="tel:+351281531708">
              281531708
            </a>
            <br />
            Fax 281531713
            <br />
            <a className="text-brand" href="mailto:geral@aectm.pt">
              geral@aectm.pt
            </a>
          </p>
        </div>
      ) : null}

      {slug === "giae" ? (
        <div className="mt-8">
          <a
            className="btn-3d btn-primary inline-flex"
            href="https://aectm.giae.pt"
            target="_blank"
            rel="noreferrer"
          >
            GIAE → aectm.giae.pt
          </a>
        </div>
      ) : null}
    </article>
  );
}

// silence unused if tree-shaken
