"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type {
  CatalogFilters as FiltersType,
  CatalogItem,
  CatalogCategories,
} from "@/app/api/catalog/route";
import { useDebounce } from "@/hooks/useDebounce";
import { CardSkeleton } from "./CardSkeleton";
import { CatalogFilters } from "./CatalogFilters";
import { DataCard } from "./DataCard";
import { SearchBar } from "./SearchBar";
import { SelectedFilters } from "./SelectedFilters";
import { SortDropdown } from "./SortDropdown";

interface CatalogResponse {
  data: CatalogItem[];
  total: number;
  filters: CatalogCategories;
}

export function CatalogPage() {
  const searchParams = useSearchParams();
  const openItemId = searchParams.get("item") ?? undefined;
  const initialQuery = searchParams.get("q")?.trim() ?? "";

  const [data, setData] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [filters, setFilters] = useState<FiltersType>({
    sortBy: "newest",
    search: initialQuery || undefined,
  });
  const [filterOptions, setFilterOptions] = useState<CatalogCategories>({
    themes: [],
    cities: [],
    subjects: [],
    formats: [],
  });

  const isFirstRender = useRef(true);

  const fetchData = useCallback(async (currentFilters: FiltersType) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (currentFilters.search) params.append("search", currentFilters.search);
      if (currentFilters.theme) params.append("theme", currentFilters.theme);
      if (currentFilters.city) params.append("city", currentFilters.city);
      if (currentFilters.subject) params.append("subject", currentFilters.subject);
      if (currentFilters.format) params.append("format", currentFilters.format);
      if (currentFilters.sortBy) params.append("sortBy", currentFilters.sortBy);

      const response = await fetch(`/api/catalog?${params.toString()}`);
      const result: CatalogResponse = await response.json();

      setData(result.data);
      setFilterOptions(result.filters);
    } catch (error) {
      console.error("Error fetching catalog data:", error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(filters);
  }, [filters, fetchData]);

  // Debounced search
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setFilters((prev) => ({
      ...prev,
      search: debouncedSearchTerm || undefined,
    }));
  }, [debouncedSearchTerm]);

  const handleSearch = (term: string) => setSearchTerm(term);

  const handleFiltersChange = (newFilters: FiltersType) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleRemoveFilter = (filterType: keyof FiltersType) => {
    setFilters((prev) => ({ ...prev, [filterType]: undefined }));
  };

  const handleClearAllFilters = () => {
    setFilters({ sortBy: "newest" });
  };

  const handleSortChange = (sortBy: "newest" | "oldest") => {
    setFilters((prev) => ({ ...prev, sortBy }));
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen pb-16">
        <div className="mx-auto px-4 md:px-8 lg:px-12 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar skeleton */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <div className="h-12 bg-background-2 rounded-none animate-pulse" />
              </div>
              <div className="bg-background-2 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="h-6 bg-foreground/10 w-20 animate-pulse" />
                </div>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="mb-6 last:mb-0">
                    <div className="h-4 bg-foreground/10 w-24 mb-3 animate-pulse" />
                    <div className="space-y-2">
                      {[1, 2, 3].map((j) => (
                        <div key={j} className="flex items-center space-x-2">
                          <div className="h-4 w-4 bg-foreground/10 rounded animate-pulse" />
                          <div className="h-4 bg-foreground/10 w-28 animate-pulse" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content skeleton */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <div className="h-10 bg-background-2 w-24 animate-pulse" />
                <div className="h-12 bg-background-2 w-40 animate-pulse" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-32">
      <div className="mx-auto px-4 md:px-8 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar: search + filters */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <SearchBar onSearch={handleSearch} initialValue={initialQuery} />
            </div>
            <CatalogFilters
              onFiltersChange={handleFiltersChange}
              initialFilters={filters}
              filterOptions={filterOptions}
            />
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-6">
              <SelectedFilters
                filters={filters}
                onRemoveFilter={handleRemoveFilter}
                onClearAll={handleClearAllFilters}
              />
              <div className="ml-auto">
                <SortDropdown
                  onSortChange={handleSortChange}
                  currentSort={filters.sortBy ?? "newest"}
                />
              </div>
            </div>

            {/* Results count */}
            {!loading && (
              <p className="text-sm text-muted-foreground mb-4">
                {data.length}{" "}
                {data.length === 1 ? "conjunto encontrado" : "conjuntos encontrados"}
              </p>
            )}

            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {loading
                ? [1, 2, 3, 4, 5, 6].map((i) => <CardSkeleton key={i} />)
                : data.map((item) => (
                    <DataCard
                      key={item.id}
                      item={item}
                      initialOpen={openItemId === item.id}
                    />
                  ))}
            </div>

            {/* No results */}
            {!loading && data.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Nenhum resultado encontrado com os filtros selecionados.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
