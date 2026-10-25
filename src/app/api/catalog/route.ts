import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import catalogData from "@/lib/data/new-catalog/catalog.json";
import categoriesData from "@/lib/data/new-catalog/categories.json";

export const dynamic = "force-dynamic";

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
  geographicScope?: string;
  region?: string;
  category?: string;
  format?: string;
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

export function filterItems(
  items: CatalogItem[],
  filters: CatalogFilters,
): CatalogItem[] {
  return items.filter((item) => {
    if (
      filters.theme &&
      item.theme.toLowerCase() !== filters.theme.toLowerCase()
    )
      return false;

    if (
      filters.geographicScope &&
      item.geographicScope.toLowerCase() !== filters.geographicScope.toLowerCase()
    )
      return false;

    // Region options are the city list. Match cities[] so a multi-city
    // card still appears when any of its cities is selected.
    if (
      filters.region &&
      !item.cities.some(
        (c) => c.toLowerCase() === filters.region!.toLowerCase(),
      )
    )
      return false;

    if (
      filters.category &&
      item.category.toLowerCase() !== filters.category.toLowerCase()
    )
      return false;

    // format filter uses .some() because cards can have multiple formats
    if (
      filters.format &&
      !item.formats.some(
        (f) => f.toLowerCase() === filters.format!.toLowerCase(),
      )
    )
      return false;

    return true;
  });
}

export function sortItems(items: CatalogItem[]): CatalogItem[] {
  return [...items].sort((a, b) =>
    a.title.localeCompare(b.title, "pt-BR", { sensitivity: "base" }),
  );
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const filters: CatalogFilters = {
      search: searchParams.get("search") || undefined,
      theme: searchParams.get("theme") || undefined,
      geographicScope: searchParams.get("geographicScope") || undefined,
      region: searchParams.get("region") || undefined,
      category: searchParams.get("category") || undefined,
      format: searchParams.get("format") || undefined,
    };

    let filtered = catalogData as CatalogItem[];

    if (filters.search) {
      filtered = searchItems(filtered, filters.search);
    }

    filtered = filterItems(filtered, filters);
    filtered = sortItems(filtered);

    return NextResponse.json({
      data: filtered,
      total: filtered.length,
      filters: categoriesData as CatalogCategories,
    });
  } catch (error) {
    console.error("Error fetching catalog data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
