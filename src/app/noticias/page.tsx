import type { Metadata } from "next";
import { NewsList } from "@/components/NewsList";

export const metadata: Metadata = {
  title: "Notícias / Destaques",
};

export default function NoticiasPage() {
  return <NewsList />;
}
