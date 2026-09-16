import type { Metadata } from "next";
import { DocumentsShelf } from "@/components/DocumentsShelf";

export const metadata: Metadata = { title: "Documentos" };

export default function Page() {
  return <DocumentsShelf />;
}
