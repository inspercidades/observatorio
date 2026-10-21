"use client";

import { Search } from "lucide-react";
import { useCallback, useState } from "react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  initialValue?: string;
}

export function SearchBar({
  onSearch,
  placeholder = "Pesquisar por palavra-chave",
  initialValue = "",
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  const handleSearch = useCallback(
    (value: string) => {
      setSearchTerm(value);
      onSearch(value);
    },
    [onSearch],
  );

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        className="pl-6 bg-background-2 border-none rounded-none h-12 text-foreground placeholder:text-foreground/50"
      />
      <Search className="absolute right-6 top-1/2 transform -translate-y-1/2 text-foreground h-4 w-4" />
    </div>
  );
}
