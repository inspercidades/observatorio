import { InputWithIcon } from "@/components/ui/input"
import { Search } from "lucide-react"

interface FilterSearchProps {
  searchFilter: string
  placeholder: string
  onSearchChange: (value: string) => void
}

export function FilterSearch({ searchFilter, placeholder, onSearchChange }: FilterSearchProps) {
  return (
    <div className="px-4 mb-[3px]">
    <InputWithIcon
      placeholder={placeholder}
      value={searchFilter}
      onChange={(e) => onSearchChange(e.target.value)}
      className="h-14 p-0 text-sm placeholder:text-gray-600 border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-black"
      icon={<Search className="h-5 w-5 -mr-2.5 text-gray-400 " />}
      iconPosition="right"
    />
    </div>
  )
} 