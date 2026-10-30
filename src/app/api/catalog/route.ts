import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import catalogData from "@/lib/data/new-catalog/catalog.json";
import categoriesData from "@/lib/data/new-catalog/categories.json";
import {
  facetOptions,
  filterItems,
  searchItems,
  sortItems,
  type CatalogCategories,
  type CatalogFilters,
  type CatalogItem,
} from "@/lib/catalog";

// Revalida o cache a cada 10 minutos
export const revalidate = 600;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const filters: CatalogFilters = {
      search: searchParams.get("search") || undefined,
      theme: searchParams.get("theme") || undefined,
      region: searchParams.get("region") || undefined,
      geographicScope: searchParams.get("geographicScope") || undefined,
      category: searchParams.get("category") || undefined,
      format: searchParams.get("format") || undefined,
    };

    let filtered = catalogData as CatalogItem[];

    if (filters.search) {
      filtered = searchItems(filtered, filters.search);
    }

    const options = facetOptions(filtered, filters, categoriesData as CatalogCategories);
    filtered = filterItems(filtered, filters);
    filtered = sortItems(filtered);

    return NextResponse.json({
      data: filtered,
      total: filtered.length,
      filters: options,
    });
  } catch (error) {
    console.error("Error fetching catalog data:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
