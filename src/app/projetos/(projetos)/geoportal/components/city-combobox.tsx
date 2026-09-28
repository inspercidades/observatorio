"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import regionManifest from "../lib/region-manifest.json"

interface CityComboboxProps {
  value: string
  municipalityId?: string
  onValueChange: (regionId: string, municipalityId?: string) => void
  placeholder?: string
}

export function CityCombobox({ value, municipalityId, onValueChange, placeholder = "Selecionar região..." }: CityComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const region = regionManifest.regions.find((item) => item.id === value)
  const municipality = region?.municipalities.find((item) => item.id === municipalityId)

  const select = (regionId: string, cityId?: string) => {
    onValueChange(regionId, cityId)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full h-12 justify-between bg-white">
          {region ? `${region.name}${municipality ? ` · ${municipality.name}` : ""}` : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <CommandInput placeholder="Buscar região ou município..." className="h-12" />
          <CommandList>
            <CommandEmpty>Nenhuma região ou município encontrado.</CommandEmpty>
            <CommandItem value="Brasil" onSelect={() => select("")}>Brasil</CommandItem>
            {regionManifest.regions.map((item) => (
              <CommandGroup key={item.id} heading={item.name}>
                <CommandItem value={`${item.name} ${item.id}`} onSelect={() => select(item.id)}>
                  <Check className={cn("mr-2 h-4 w-4", value === item.id && !municipalityId ? "opacity-100" : "opacity-0")} />
                  Toda a região
                </CommandItem>
                {item.municipalities.map((city) => (
                  <CommandItem key={city.id} value={`${item.name} ${city.name} ${city.id}`} onSelect={() => select(item.id, city.id)}>
                    <Check className={cn("mr-2 h-4 w-4", municipalityId === city.id ? "opacity-100" : "opacity-0")} />
                    {city.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
