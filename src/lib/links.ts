export interface InternalHref {
  kind: "internal";
  href: string;
}

export interface ExternalHref {
  kind: "external";
  href: string;
}

export type ClassifiedHref = InternalHref | ExternalHref;

/** Aceita caminho interno ou http(s). Recusa javascript: e outros esquemas. */
export function classifyHref(href: string): ClassifiedHref | null {
  if (href.startsWith("/") && !href.startsWith("//")) {
    return { kind: "internal", href };
  }

  try {
    const url = new URL(href);
    if (url.protocol === "http:" || url.protocol === "https:") {
      return { kind: "external", href };
    }
  } catch {
    return null;
  }

  return null;
}
