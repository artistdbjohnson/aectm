/** Normalize official AECTM destinations; never invent paths. */
export function officialUrl(href: string): string {
  if (!href) return href;
  let next = href.trim();
  next = next.replace(/^http:\/\/(www\.)?aectm\.pt/i, "https://aectm.pt");
  next = next.replace(/^http:\/\/educacaoartistica\.dge\.mec\.pt/i, "https://educacaoartistica.dge.mec.pt");
  next = next.replace(/^http:\/\/www\.dge\.mec\.pt/i, "https://www.dge.mec.pt");
  return next;
}

export function isDocumentHref(href: string): boolean {
  const h = href.toLowerCase();
  return (
    h.includes("wp-content") ||
    h.endsWith(".pdf") ||
    h.endsWith(".doc") ||
    h.endsWith(".docx") ||
    h.endsWith(".xls") ||
    h.endsWith(".xlsx") ||
    h.includes("drive.google.com")
  );
}

export function telHref(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("351")) return `tel:+${digits}`;
  if (digits.length === 9) return `tel:+351${digits}`;
  return `tel:${raw}`;
}

export function formatTel(raw: string): string {
  const d = raw.replace(/\D/g, "");
  if (d.length === 9) return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`;
  return raw;
}
