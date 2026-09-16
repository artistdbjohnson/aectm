import type { Locale } from "@/content/data";
import dictionary from "./pt-en.json";

const EXACT = dictionary as Record<string, string>;

const PHRASES: [RegExp, string][] = [
  [/Em atualização/gi, "Being updated"],
  [/Descarregar/gi, "Download"],
  [/Ano [Ll]etivo/g, "School year"],
  [/Encarregados? de [Ee]ducação/gi, "guardians"],
  [/Diretores? de [Tt]urma/gi, "class directors"],
  [/Pré-escolar/gi, "Pre-school"],
  [/1[ºo]\.?\s*[Cc]iclo/g, "1st cycle"],
  [/2[ºo]\.?\s*[Cc]iclo/g, "2nd cycle"],
  [/3[ºo]\.?\s*[Cc]iclo/g, "3rd cycle"],
  [/Conselho [Gg]eral/g, "General Council"],
  [/Conselho [Pp]edagógico/g, "Pedagogical Council"],
  [/Conselho [Aa]dministrativo/g, "Administrative Council"],
  [/Agrupamento de Escolas de Castro Marim/g, "Castro Marim School Cluster"],
  [/Agrupamento/g, "cluster"],
  [/Procedimento concursal/gi, "Recruitment procedure"],
  [/Concurso de/gi, "Vacancy —"],
  [/Lista [Pp]rovisória/g, "Provisional list"],
  [/Lista [Dd]efinitiva/g, "Final list"],
  [/Classificação final/gi, "Final ranking"],
  [/Entrevista/g, "Interview"],
  [/Convocatória/g, "Call"],
  [/Horário/g, "Timetable"],
  [/Horas/g, "hours"],
  [/Ementa Escolar/gi, "School menu"],
  [/Semana de/gi, "Week of"],
  [/Foi publicado[oa]s?\s+/gi, "Published: "],
  [/Foi publicada\s+/gi, "Published: "],
  [/Documentos Orientadores/g, "Guiding documents"],
  [/Associação de Pais/g, "Parents Association"],
  [/Biblioteca Escolar/g, "School Library"],
  [/Critérios de Avaliação/g, "Assessment criteria"],
  [/Manuais Escolares/g, "Textbooks"],
  [/Atividades de Enriquecimento Curricular/gi, "curriculum-enrichment activities"],
  [/Plano Anual de Atividades/gi, "Annual Activities Plan"],
  [/Regulamento Interno/g, "Internal Regulations"],
  [/Projeto Educativo/g, "Educational Project"],
  [/Telefone/g, "Telephone"],
  [/Endereço eletrónico/gi, "Email"],
  [/Morada/g, "Address"],
  [/Atualizado/g, "Updated"],
  [/Setembro de/gi, "September "],
  [/Janeiro de/gi, "January "],
  [/Fevereiro de/gi, "February "],
  [/Março de/gi, "March "],
  [/Abril de/gi, "April "],
  [/Maio de/gi, "May "],
  [/Junho de/gi, "June "],
  [/Julho de/gi, "July "],
  [/Agosto de/gi, "August "],
  [/Outubro de/gi, "October "],
  [/Novembro de/gi, "November "],
  [/Dezembro de/gi, "December "],
];

function applyPhrases(text: string): string {
  let out = text;
  for (const [re, to] of PHRASES) out = out.replace(re, to);
  return out;
}

export function toEnglish(pt: string): string {
  const key = pt.trim();
  if (!key) return pt;
  if (EXACT[key]) return EXACT[key];
  if (EXACT[pt]) return EXACT[pt];
  const phrased = applyPhrases(pt);
  return phrased;
}

export function locText(pt: string, locale: Locale): string {
  return locale === "en" ? toEnglish(pt) : pt;
}
