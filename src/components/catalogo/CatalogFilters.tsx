"use client";

import { useEffect, useState } from "react";
import type { CatalogFilters as FiltersType, CatalogCategories } from "@/app/api/catalog/route";
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
    cities: [],
    subjects: [],
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
    type: "theme" | "city" | "subject" | "format",
    value: string,
  ) => {
    const newFilters = { ...filters };
    // Radio-button behaviour: selecting the active value de-selects it
    newFilters[type] = newFilters[type] === value ? undefined : value;
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const groups: {
    key: "theme" | "city" | "subject" | "format";
    label: string;
    options: string[];
  }[] = [
    { key: "theme", label: "Tema", options: filterOptions.themes },
    { key: "city", label: "Cidade", options: filterOptions.cities },
    { key: "subject", label: "Assunto", options: filterOptions.subjects },
    { key: "format", label: "Formato", options: filterOptions.formats },
  ];

  return (
    <div className="bg-background-2 p-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Filtros</h2>
      </div>

      {groups.map((group, idx) => (
        <div key={group.key} className={idx < groups.length - 1 ? "mb-6" : ""}>
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
        </div>
      ))}
    </div>
  );
}
