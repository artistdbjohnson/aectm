import type { Metadata } from "next";
import { NewsList } from "@/components/NewsList";

export const metadata: Metadata = {
  title: "Destaques",
};

export default function Page() {
  return <NewsList />;
}
