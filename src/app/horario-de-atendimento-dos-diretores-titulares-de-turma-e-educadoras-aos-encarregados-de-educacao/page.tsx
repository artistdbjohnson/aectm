import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage, pageTitle } from "@/content/data";
import { ContentPage } from "@/components/ContentPage";

const SLUG = "horario-de-atendimento-dos-diretores-titulares-de-turma-e-educadoras-aos-encarregados-de-educacao";
const SOURCE = "horario-de-atendimento-dos-diretores-titulares-de-turma-e-educadoras-aos-encarregados-de-educacao";

export const metadata: Metadata = {
  title: pageTitle(SLUG, "pt"),
};

export default function Page() {
  const page = getPage(SOURCE);
  if (!page) notFound();
  return <ContentPage slug={SLUG} page={page} />;
}
