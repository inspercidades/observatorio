import type { CatalogCategories, CatalogFilters, CatalogItem } from "@/app/api/catalog/route";

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
    return value && !options[facet.options].some((v) => v.toLowerCase() === value.toLowerCase());
  });
  if (stale.length === 0) return filters;
  const pruned = { ...filters };
  for (const facet of stale) delete pruned[facet.filter];
  return pruned;
}
