import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import catalogData from "@/lib/data/new-catalog/catalog.json";
import categoriesData from "@/lib/data/new-catalog/categories.json";

// Revalida o cache a cada 10 minutos
export const revalidate = 600;

export interface CatalogItem {
  id: string;
  title: string;
  description: string;
  theme: string;
  subject: string;
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
  cities: string[];
  subjects: string[];
  formats: string[];
}

export interface CatalogFilters {
  search?: string;
  theme?: string;
  city?: string;
  subject?: string;
  format?: string;
  sortBy?: "newest" | "oldest";
}

function searchItems(items: CatalogItem[], searchTerm: string): CatalogItem[] {
  if (!searchTerm.trim()) return items;

  const term = searchTerm.toLowerCase();
  return items.filter(
    (item) =>
      item.title.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term) ||
      item.keywords.some((kw) => kw.toLowerCase().includes(term)),
  );
}

function filterItems(
  items: CatalogItem[],
  filters: CatalogFilters,
): CatalogItem[] {
  return items.filter((item) => {
    if (
      filters.theme &&
      item.theme.toLowerCase() !== filters.theme.toLowerCase()
    )
      return false;

    // city filter uses .some() because cards can belong to multiple cities
    if (
      filters.city &&
      !item.cities.some(
        (c) => c.toLowerCase() === filters.city!.toLowerCase(),
      )
    )
      return false;

    if (
      filters.subject &&
      item.subject.toLowerCase() !== filters.subject.toLowerCase()
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

function sortItems(
  items: CatalogItem[],
  sortBy: string,
): CatalogItem[] {
  return [...items].sort((a, b) => {
    const dateA = new Date(a.updatedAt);
    const dateB = new Date(b.updatedAt);
    return sortBy === "newest"
      ? dateB.getTime() - dateA.getTime()
      : dateA.getTime() - dateB.getTime();
  });
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const filters: CatalogFilters = {
      search: searchParams.get("search") || undefined,
      theme: searchParams.get("theme") || undefined,
      city: searchParams.get("city") || undefined,
      subject: searchParams.get("subject") || undefined,
      format: searchParams.get("format") || undefined,
      sortBy: (searchParams.get("sortBy") as "newest" | "oldest") || "newest",
    };

    let filtered = catalogData as CatalogItem[];

    if (filters.search) {
      filtered = searchItems(filtered, filters.search);
    }

    filtered = filterItems(filtered, filters);
    filtered = sortItems(filtered, filters.sortBy || "newest");

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
