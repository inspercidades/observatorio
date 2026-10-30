"use client";

import { X } from "lucide-react";
import type { CatalogFilters } from "@/lib/catalog";
import { Button } from "@/components/ui/button";

interface SelectedFiltersProps {
  filters: CatalogFilters;
  onRemoveFilter: (filterType: keyof CatalogFilters) => void;
  onClearAll: () => void;
}

export function SelectedFilters({
  filters,
  onRemoveFilter,
  onClearAll,
}: SelectedFiltersProps) {
  const getActiveFilters = () => {
    const active: Array<{
      type: keyof CatalogFilters;
      value: string;
      label: string;
    }> = [];

    if (filters.theme) {
      active.push({ type: "theme", value: filters.theme, label: filters.theme });
    }
    if (filters.region) {
      active.push({ type: "region", value: filters.region, label: filters.region });
    }
    if (filters.geographicScope) {
      active.push({
        type: "geographicScope",
        value: filters.geographicScope,
        label: filters.geographicScope,
      });
    }
    if (filters.category) {
      active.push({ type: "category", value: filters.category, label: filters.category });
    }
    if (filters.format) {
      active.push({ type: "format", value: filters.format, label: filters.format });
    }

    return active;
  };

  const activeFilters = getActiveFilters();

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {activeFilters.map((filter) => (
        <div
          key={`${filter.type}-${filter.value}`}
          className="inline-flex items-center gap-1 px-3 py-2 bg-background-2 text-foreground text-sm"
        >
          <span>{filter.label}</span>
          <button
            type="button"
            onClick={() => onRemoveFilter(filter.type)}
            className="ml-1 hover:bg-foreground/20 rounded-full p-0.5 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}

      <Button
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="text-foreground hover:text-foreground hover:bg-transparent hover:underline font-medium"
      >
        Limpar
      </Button>
    </div>
  );
}
