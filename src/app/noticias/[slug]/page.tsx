import type { Metadata } from "next";
import { data } from "@/content/data";
import { NewsArticle } from "@/components/NewsArticle";

export function generateStaticParams() {
  return data.news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = data.news.find((n) => n.slug === slug);
  return { title: item?.title ?? "Notícia" };
}

export default async function NewsSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <NewsArticle slug={slug} />;
}
