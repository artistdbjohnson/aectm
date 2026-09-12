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
  label: Record<Locale, string>;
  children?: (NavNode | NavLeaf)[];
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
  if (locale === "en") {
    return data.en_titles[page.slug] ?? page.title;
  }
  return page.title;
}

export function chrome(locale: Locale) {
  return data.chrome[locale];
}
