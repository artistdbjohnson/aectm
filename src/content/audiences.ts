import type { Locale } from "@/content/data";

export type AudienceId = "pais" | "alunos" | "pessoal";

export type AudienceLink = {
  href: string;
  label: Record<Locale, string>;
  note?: Record<Locale, string>;
  external?: boolean;
};

export type AudienceHub = {
  id: AudienceId;
  title: Record<Locale, string>;
  lede: Record<Locale, string>;
  links: AudienceLink[];
};

export const audiences: Record<AudienceId, AudienceHub> = {
  pais: {
    id: "pais",
    title: { pt: "Pais e encarregados de educação", en: "Parents and guardians" },
    lede: {
      pt: "Atalhos reais do site do Agrupamento: calendário, ementas, documentos, GIAE e contactos.",
      en: "Working shortcuts from the cluster site: calendar, menus, documents, GIAE and contacts.",
    },
    links: [
      { href: "/calendario-escolar", label: { pt: "Calendário Escolar 2026-2027", en: "School calendar 2026–2027" } },
      { href: "/ementas", label: { pt: "Ementas", en: "Menus" } },
      { href: "/manuais-escolares", label: { pt: "Manuais Escolares 2026/2027", en: "Textbooks 2026/2027" } },
      { href: "/documentos-alunos", label: { pt: "Documentos alunos", en: "Student documents" } },
      {
        href: "/horario-atendimento-dt",
        label: { pt: "Horário de atendimento dos Diretores de Turma", en: "Class-director office hours" },
      },
      { href: "/associacao-de-pais", label: { pt: "Associação de Pais", en: "Parents Association" } },
      {
        href: "https://aectm.giae.pt",
        label: { pt: "GIAE — plataforma de alunos", en: "GIAE — student platform" },
        external: true,
      },
      { href: "/contactos", label: { pt: "Contactos", en: "Contacts" } },
    ],
  },
  alunos: {
    id: "alunos",
    title: { pt: "Alunos", en: "Students" },
    lede: {
      pt: "Calendário, turmas, provas, ementas e atividades — páginas já existentes no Agrupamento.",
      en: "Calendar, classes, exams, menus and activities — pages already published by the cluster.",
    },
    links: [
      { href: "/calendario-escolar", label: { pt: "Calendário Escolar", en: "School calendar" } },
      { href: "/turmas", label: { pt: "Turmas 2025/2026", en: "Classes 2025/2026" } },
      { href: "/ementas", label: { pt: "Ementas", en: "Menus" } },
      { href: "/provas-e-exames", label: { pt: "Provas e Exames", en: "Tests and exams" } },
      { href: "/documentos-alunos", label: { pt: "Documentos alunos", en: "Student documents" } },
      { href: "/atividades", label: { pt: "Atividades", en: "Activities" } },
      { href: "/atividades-extracurricular", label: { pt: "Clubes / extracurricular", en: "Clubs / extracurricular" } },
      { href: "/biblioteca-escolar", label: { pt: "Biblioteca Escolar", en: "School library" } },
      {
        href: "https://aectm.giae.pt",
        label: { pt: "GIAE", en: "GIAE" },
        external: true,
      },
    ],
  },
  pessoal: {
    id: "pessoal",
    title: { pt: "Pessoal docente e não docente", en: "Teaching and non-teaching staff" },
    lede: {
      pt: "Estrutura, documentos orientadores, concursos, legislação e GIAE — só destinos publicados.",
      en: "Structure, guiding documents, vacancies, legislation and GIAE — published destinations only.",
    },
    links: [
      { href: "/documentos-orientadores", label: { pt: "Documentos Orientadores", en: "Guiding documents" } },
      { href: "/ofertas-de-escola-concursos", label: { pt: "Ofertas / Concursos", en: "Vacancies / contests" } },
      { href: "/criterios-de-avaliacao", label: { pt: "Critérios de Avaliação", en: "Assessment criteria" } },
      { href: "/legislacao", label: { pt: "Legislação", en: "Legislation" } },
      { href: "/direcao", label: { pt: "Direção", en: "Directorate" } },
      { href: "/conselho-pedagogico", label: { pt: "Conselho Pedagógico", en: "Pedagogical Council" } },
      { href: "/servicos", label: { pt: "Serviços", en: "Services" } },
      {
        href: "https://aectm.giae.pt",
        label: { pt: "GIAE", en: "GIAE" },
        external: true,
      },
    ],
  },
};
