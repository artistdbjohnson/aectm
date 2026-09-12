import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage, pageTitle } from "@/content/data";
import { ContentPage } from "@/components/ContentPage";

const SLUG = "biblioteca-escolar-de-castro-marim";
const SOURCE = "biblioteca-escolar-de-castro-marim";

export const metadata: Metadata = {
  title: pageTitle(SLUG, "pt"),
};

export default function Page() {
  const page = getPage(SOURCE);
  if (!page) notFound();
  return <ContentPage slug={SLUG} page={page} />;
}
