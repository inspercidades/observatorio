export interface CatalogItem {
  id: string;
  title: string;
  description: string;
  theme: string;
  geographicScope: string;
  category: string;
  formats: string[];
  region: string;
  cities: string[];
  source: string;
  sourceLink?: string;
  keywords: string[];
  period?: string;
  updatedAt: string;
  tags: string[];
  dataset_info: {
    dataset_title: string;
    dataset_description: string;
    dataset_link: string;
    dataset_period?: string;
    dataset_format: string;
  }[];
}

export interface CatalogCategories {
  themes: string[];
  geographicScopes: string[];
  cities: string[];
  categories: string[];
  formats: string[];
}

export interface CatalogFilters {
  search?: string;
  theme?: string;
  region?: string;
  geographicScope?: string;
  category?: string;
  format?: string;
}

// Grupos que dependem das outras seleções. Tema e formato mostram sempre
// todas as opções.
export const FACETS = [
  { filter: "geographicScope", options: "geographicScopes", values: (item: CatalogItem) => [item.geographicScope] },
  { filter: "region", options: "cities", values: (item: CatalogItem) => item.cities },
  { filter: "category", options: "categories", values: (item: CatalogItem) => [item.category] },
] as const;

/** Remove as seleções que deixaram de aparecer nas opções. */
export function pruneFilters(filters: CatalogFilters, options: CatalogCategories): CatalogFilters {
  const stale = FACETS.filter((facet) => {
    const value = filters[facet.filter];
    return value && !options[facet.options].some((option) => option.toLowerCase() === value.toLowerCase());
  });
  if (stale.length === 0) return filters;
  const pruned = { ...filters };
  for (const facet of stale) delete pruned[facet.filter];
  return pruned;
}

/** Busca sem acento: "transito" encontra "trânsito", "niteroi" encontra "Niterói". */
export function fold(value: string): string {
  return value.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
}

export function searchItems(items: CatalogItem[], searchTerm: string): CatalogItem[] {
  if (!searchTerm.trim()) return items;

  const term = fold(searchTerm);
  return items.filter((item) => {
    const haystack = [
      item.title,
      item.description,
      item.region,
      item.theme,
      item.geographicScope,
      item.category,
      ...item.keywords,
      ...item.cities,
    ];
    return haystack.some((value) => fold(value).includes(term));
  });
}

export function filterItems(items: CatalogItem[], filters: CatalogFilters): CatalogItem[] {
  return items.filter((item) => {
    if (filters.theme && item.theme.toLowerCase() !== filters.theme.toLowerCase()) return false;

    // Region options are the city list. Match cities[] so a multi-city
    // card still appears when any of its cities is selected.
    if (
      filters.region &&
      !item.cities.some((city) => city.toLowerCase() === filters.region!.toLowerCase())
    ) {
      return false;
    }

    if (
      filters.geographicScope &&
      item.geographicScope.toLowerCase() !== filters.geographicScope.toLowerCase()
    ) {
      return false;
    }

    if (filters.category && item.category.toLowerCase() !== filters.category.toLowerCase()) {
      return false;
    }

    // format filter uses .some() because cards can have multiple formats
    if (
      filters.format &&
      !item.formats.some((format) => format.toLowerCase() === filters.format!.toLowerCase())
    ) {
      return false;
    }

    return true;
  });
}

/** Opções de cada grupo que ainda retornam algum card, dadas as outras seleções. */
export function facetOptions(
  items: CatalogItem[],
  filters: CatalogFilters,
  base: CatalogCategories,
): CatalogCategories {
  const options = { ...base };
  for (const facet of FACETS) {
    const matching = filterItems(items, { ...filters, [facet.filter]: undefined });
    const present = new Set(matching.flatMap(facet.values).map((value) => value.toLowerCase()));
    options[facet.options] = base[facet.options].filter((value) => present.has(value.toLowerCase()));
  }
  return options;
}

export function sortItems(items: CatalogItem[]): CatalogItem[] {
  return [...items].sort((a, b) => a.title.localeCompare(b.title, "pt-BR", { sensitivity: "base" }));
}
