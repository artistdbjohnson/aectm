import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage, pageTitle } from "@/content/data";
import { ContentPage } from "@/components/ContentPage";

const SLUG = "politica-de-privacidade";
const SOURCE = "politica-de-privacidade";

export const metadata: Metadata = {
  title: pageTitle(SLUG, "pt"),
};

export default function Page() {
  const page = getPage(SOURCE);
  if (!page) notFound();
  return <ContentPage slug={SLUG} page={page} />;
}
