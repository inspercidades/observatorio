"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const cities = [
  {
    value: "São Paulo",
    label: "São Paulo",
  },
  {
    value: "Rio de Janeiro",
    label: "Rio de Janeiro",
  },
  {
    value: "Recife",
    label: "Recife",
  },
  {
    value: "Belo Horizonte",
    label: "Belo Horizonte",
  },
  {
    value: "Goiânia",
    label: "Goiânia",
  },
  {
    value: "Fortaleza",
    label: "Fortaleza",
  },
  {
    value: "Curitiba",
    label: "Curitiba",
  },
  {
    value: "Niteroi",
    label: "Niterói",
  },
  {
    value: "Santo André",
    label: "Santo André",
  },
  {
    value: "Salvador",
    label: "Salvador",
  },
  {
    value: "Campinas",
    label: "Campinas",
  },
  {
    value: "Porto Alegre",
    label: "Porto Alegre",
  },
]

interface CityComboboxProps {
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
}

export function CityCombobox({ value, onValueChange, placeholder = "Selecionar cidade..." }: CityComboboxProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full h-12 justify-between bg-white">
          {value ? cities.find((city) => city.value === value)?.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <CommandInput placeholder="Buscar cidade..." className="h-12" />
          <CommandList>
            <CommandEmpty>Nenhuma cidade encontrada.</CommandEmpty>
            <CommandGroup>
              {cities.map((city) => (
                <CommandItem
                  key={city.value}
                  value={city.value}
                  onSelect={(currentValue) => {
                    // Allow deselecting by clicking the same city again
                    const newValue = currentValue.toLowerCase() === value.toLowerCase() ? "" : currentValue
                    onValueChange(newValue)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value.toLowerCase() === city.value.toLowerCase() ? "opacity-100" : "opacity-0")} />
                  {city.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
