import type { Locale } from "@/content/data";
import { data } from "@/content/data";
import { isDocumentHref, officialUrl } from "@/lib/urls";

export type DocItem = {
  href: string;
  label: Record<Locale, string>;
  group: Record<Locale, string>;
  sourceSlug: string;
};

const LABEL_EN: Record<string, string> = {
  "PROJETO EDUCATIVO 2024-27": "Educational Project 2024–27",
  "REGULAMENTO INTERNO 2024-2027": "Internal Regulations 2024–2027",
  "Adenda – CONDUTA E UTILIZAÇÃO DE DISPOSITIVOS MÓVEIS":
    "Addendum — Conduct and use of mobile devices",
  "Adenda –": "Addendum —",
  "ASSINATURA ELETRÓNICA": "Electronic signature",
  "PLANO ANUAL DE ATIVIDADES 2025/26": "Annual Activities Plan 2025/26",
  "Relatório Final de Execução do Plano Anual de Atividades 23/24":
    "Final report on the Annual Activities Plan 23/24",
  "ORGANIZAÇÃO DO ANO LETIVO 2025-26": "Organisation of the 2025–26 school year",
  "Regra do uso dos Telemóveis no âmbito escolar – Pela entrada da adenda do regulamento interno fica revogado a 7 de janeiro de 2026":
    "School mobile-phone rule — revoked on 7 January 2026 by the internal-regulations addendum",
  "Regulamento Interno das Atividades de Enriquecimento Curricular – 1º Ciclo do Ensino Básico":
    "Internal regulations for curriculum-enrichment activities — 1st cycle",
  "Código de Conduta": "Code of Conduct",
  "Sistema de Controle Interno": "Internal control system",
  "Plano de Prevenção de Riscos de Corrupção e Infrações Conexas":
    "Plan for the prevention of corruption and related offences",
  "Relatório final de Autoavaliação – Fevereiro de 2024":
    "Final self-evaluation report — February 2024",
  "RELATÓRIO DE AUTOAVALIAÇÃO 2023/24": "Self-evaluation report 2023/24",
  "RELATÓRIO DE AUTOAVALIAÇÃO 2024/25": "Self-evaluation report 2024/25",
  "1º Ciclo": "1st cycle",
  "5º Ano": "Year 5",
  "6º Ano": "Year 6",
  "7ºAno": "Year 7",
  "8º Ano": "Year 8",
  "9º Ano": "Year 9",
  "Documento – Proteção de Dados": "Document — Data protection",
  "Windows": "Windows",
  "Linux": "Linux",
  "macOS": "macOS",
  "Novo Modelo de Avaliação Externa": "New external-assessment model",
  "Apresentação Modelo de Avaliação Externa": "Presentation of the external-assessment model",
  "Programa de Educação Estética e Artística": "Aesthetic and Artistic Education Programme",
  "Perfil dos Alunos à Saída da Escolaridade Obrigatória":
    "Student Profile at the End of Compulsory Schooling",
  "Ementa Escolar": "School menu",
};

const GROUP_EN: Record<string, string> = {
  "Documentos Orientadores": "Guiding documents",
  "Documentos alunos": "Student documents",
  "Manuais Escolares – 2026/2027": "Textbooks 2026/2027",
  "Ementas": "Menus",
  "Provas e Exames": "Tests and exams",
  "Ligações": "Links",
  "Aprendizagens Essenciais": "Essential learning",
  "PADDE": "PADDE",
  "Projeto Erasmus +": "Erasmus+",
};

const SOURCE_SLUGS = [
  "documentos-orientadores",
  "documentos-alunos",
  "manuais-escolares",
  "ementas",
  "provas-e-exames",
  "sample-page",
  "metas-curriculares",
  "padde",
  "projeto-erasmus",
] as const;

export function documentShelf(): DocItem[] {
  const seen = new Set<string>();
  const items: DocItem[] = [];
  for (const slug of SOURCE_SLUGS) {
    const page = data.pages[slug];
    if (!page) continue;
    for (const link of page.links) {
      const href = officialUrl(link.href);
      if (!href || !isDocumentHref(href) && !href.startsWith("http")) continue;
      if (!href.startsWith("http")) continue;
      if (seen.has(href)) continue;
      seen.add(href);
      const pt = (link.text || href).trim() || href;
      items.push({
        href,
        label: { pt, en: LABEL_EN[pt] ?? pt },
        group: {
          pt: page.title,
          en: GROUP_EN[page.title] ?? data.en_titles[page.slug] ?? page.title,
        },
        sourceSlug: slug === "sample-page" ? "ligacoes" : slug,
      });
    }
  }
  return items;
}

export const SHELF_INTRO = {
  pt: "Documentos publicados no site oficial do Agrupamento. Os ficheiros abrem no destino original (aectm.pt, Google Drive ou DGE).",
  en: "Documents published on the official cluster site. Files open at their original destination (aectm.pt, Google Drive or DGE).",
};
