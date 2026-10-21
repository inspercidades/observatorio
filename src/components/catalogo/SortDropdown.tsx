"use client";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SortDropdownProps {
  onSortChange: (sortBy: "newest" | "oldest") => void;
  currentSort: "newest" | "oldest";
}

export function SortDropdown({ onSortChange, currentSort }: SortDropdownProps) {
  const sortOptions = [
    { value: "newest" as const, label: "Mais recentes" },
    { value: "oldest" as const, label: "Menos recentes" },
  ];

  const currentOption = sortOptions.find((o) => o.value === currentSort);

  const handleToggle = () => {
    onSortChange(currentSort === "newest" ? "oldest" : "newest");
  };

  return (
    <Button
      variant="default"
      onClick={handleToggle}
      className="flex items-center gap-2 h-12 rounded-none bg-background-2 text-foreground hover:bg-background-2 hover:cursor-pointer"
    >
      {currentOption?.label ?? "Mais recentes"}
      <ArrowUpDown className="h-4 w-4" />
    </Button>
  );
}
