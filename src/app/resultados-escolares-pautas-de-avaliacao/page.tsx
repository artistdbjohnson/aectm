import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage, pageTitle } from "@/content/data";
import { ContentPage } from "@/components/ContentPage";

const SLUG = "resultados-escolares-pautas-de-avaliacao";

export const metadata: Metadata = {
  title: pageTitle(SLUG, "pt"),
};

export default function Page() {
  const page = getPage(SLUG);
  if (!page) notFound();
  return <ContentPage slug={SLUG} page={page} />;
}
