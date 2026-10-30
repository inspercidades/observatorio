"use client";

import { useEffect, useState } from "react";
import type { CatalogFilters as FiltersType, CatalogCategories } from "@/lib/catalog";
import { Combobox } from "@/components/combo-box";
import { Checkbox } from "@/components/ui/checkbox";

interface CatalogFiltersProps {
  onFiltersChange: (filters: FiltersType) => void;
  initialFilters?: FiltersType;
  filterOptions?: CatalogCategories;
}

export function CatalogFilters({
  onFiltersChange,
  initialFilters,
  filterOptions: propFilterOptions,
}: CatalogFiltersProps) {
  const [filters, setFilters] = useState<FiltersType>(initialFilters || {});
  const [filterOptions, setFilterOptions] = useState<CatalogCategories>({
    themes: [],
    geographicScopes: [],
    cities: [],
    categories: [],
    formats: [],
  });

  useEffect(() => {
    if (propFilterOptions) {
      setFilterOptions(propFilterOptions);
    } else {
      fetch("/api/catalog")
        .then((res) => res.json())
        .then((data) => setFilterOptions(data.filters))
        .catch(console.error);
    }
  }, [propFilterOptions]);

  // Sync when parent clears all filters
  useEffect(() => {
    setFilters(initialFilters || {});
  }, [initialFilters]);

  const handleFilterChange = (
    type: "theme" | "geographicScope" | "category" | "format",
    value: string,
  ) => {
    const newFilters = { ...filters };
    // Radio-button behaviour: selecting the active value de-selects it
    newFilters[type] = newFilters[type] === value ? undefined : value;
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleRegionChange = (value: string) => {
    const newFilters = { ...filters, region: value || undefined };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const groups: {
    key: "theme" | "geographicScope" | "category" | "format";
    label: string;
    options: string[];
  }[] = [
    { key: "theme", label: "Tema", options: filterOptions.themes },
    {
      key: "geographicScope",
      label: "Abrangência geográfica",
      options: filterOptions.geographicScopes,
    },
    { key: "category", label: "Categoria", options: filterOptions.categories },
    { key: "format", label: "Formato", options: filterOptions.formats },
  ];

  return (
    <div className="bg-background-2 p-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Filtros</h2>
      </div>

      {groups.map((group) => (
        <div key={group.key} className={group.key === "format" ? "" : "mb-6"}>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            {group.label}
          </h3>
          <div className="space-y-2">
            {group.options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`${group.key}-${option}`}
                  checked={filters[group.key] === option}
                  onCheckedChange={() => handleFilterChange(group.key, option)}
                  className="shadow-none rounded-sm w-4 h-4 border-foreground/20"
                />
                <label
                  htmlFor={`${group.key}-${option}`}
                  className="text-sm text-foreground cursor-pointer leading-tight"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
          {group.key === "theme" && (
            <div className="mt-6">
              <label
                htmlFor="filtro-regiao"
                className="text-sm font-medium text-muted-foreground mb-3 block"
              >
                Região
              </label>
              <Combobox
                id="filtro-regiao"
                value={filters.region || "Todas"}
                onValueChange={(value) => handleRegionChange(value === "Todas" ? "" : value)}
                placeholder="Todas"
                searchPlaceholder="Buscar região..."
                emptyMessage="Nenhuma região encontrada."
                className="h-12 rounded-none border border-input shadow-none"
                options={[
                  { value: "Todas", label: "Todas" },
                  ...filterOptions.cities.map((city) => ({ value: city, label: city })),
                ]}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
