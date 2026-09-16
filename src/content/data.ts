import raw from "./data.json";

export type Locale = "pt" | "en";

export type NavLeaf = {
  href: string;
  label: Record<Locale, string>;
  source?: string;
};

export type NavNode = {
  id?: string;
  href?: string;
  children?: (NavNode | NavLeaf)[];
  label: Record<Locale, string>;
  source?: string;
};

export type PageData = {
  title: string;
  slug: string;
  text: string;
  blocks: { tag: string; text: string }[];
  images: { src: string; alt: string }[];
  links: { text: string; href: string }[];
};

export type NewsItem = {
  id: number;
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  body: string;
  link: string;
  image: string | null;
  author: string;
};

export type SiteData = {
  nav: NavNode[];
  aliases: Record<string, string>;
  chrome: Record<Locale, Record<string, string>>;
  pages: Record<string, PageData>;
  news: NewsItem[];
  en_titles: Record<string, string>;
  contact: {
    address: string;
    tel: string;
    fax: string;
    email: string;
  };
};

export const data = raw as SiteData;

const CHROME_FALLBACK: Record<Locale, Record<string, string>> = {
  pt: {
    siteName: "AECTM",
    siteFull: "Agrupamento de Escolas de Castro Marim",
    tagline: "Página do Agrupamento de Escolas de Castro Marim",
    welcome: "Bem-vindos ao ano letivo 2026/2027!",
    news: "Notícias",
    highlights: "Destaques",
    search: "Pesquisar",
    readMore: "Ler mais",
    themeLight: "Claro",
    themeDark: "Escuro",
    home: "Início",
    quickLinks: "Acesso rápido",
    contactTitle: "Contactos",
    telLabel: "Telefone",
    faxLabel: "Fax",
    calendar: "Calendário",
    provenance: "Proveniência",
    allNews: "Todas as notícias",
    schools: "Escolas",
    documents: "Documentos",
    backHome: "Voltar ao início",
    attribution: "Estudo de design independente. Criado por",
    disclaimer:
      "Não afiliado ao Agrupamento. Conteúdo transplantado de aectm.pt para um estudo de handoff.",
  },
  en: {
    siteName: "AECTM",
    siteFull: "Castro Marim School Cluster",
    tagline: "Site of the Castro Marim School Cluster",
    welcome: "Welcome to the 2026/2027 school year!",
    news: "News",
    highlights: "Highlights",
    search: "Search",
    readMore: "Read more",
    themeLight: "Light",
    themeDark: "Dark",
    home: "Home",
    quickLinks: "Quick links",
    contactTitle: "Contacts",
    telLabel: "Telephone",
    faxLabel: "Fax",
    calendar: "Calendar",
    provenance: "Provenance",
    allNews: "All news",
    schools: "Schools",
    documents: "Documents",
    backHome: "Back to home",
    attribution: "Independent design study. Built by",
    disclaimer:
      "Not affiliated with the school cluster. Content transplanted from aectm.pt for a handoff study.",
  },
};

export function resolveSlug(slug: string): string {
  return data.aliases[slug] ?? slug;
}

export function getPage(slug: string): PageData | undefined {
  const key = resolveSlug(slug);
  return data.pages[key];
}

export function pageTitle(slug: string, locale: Locale): string {
  const page = getPage(slug);
  if (!page) return slug;
  if (locale === "en") return data.en_titles[page.slug] ?? page.title;
  return page.title;
}

export function chrome(locale: Locale) {
  return { ...CHROME_FALLBACK[locale], ...data.chrome[locale] };
}
