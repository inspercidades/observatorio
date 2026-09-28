"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useState } from "react"
import regionManifest from "../lib/region-manifest.json"
import { getVisibleRegions } from "../lib/region-selector"

interface CityAccordionProps {
  selectedRegion: string
  selectedMunicipality?: string
  onSelectionChange: (regionId: string, municipalityId?: string) => void
}

export function CityAccordion({ selectedRegion, selectedMunicipality, onSelectionChange }: CityAccordionProps) {
  const [open, setOpen] = useState("")
  const [search, setSearch] = useState("")
  const region = regionManifest.regions.find((item) => item.id === selectedRegion)
  const municipality = region?.municipalities.find((item) => item.id === selectedMunicipality)
  const visibleRegions = getVisibleRegions(search, selectedRegion)
  const select = (regionId: string, municipalityId?: string) => {
    onSelectionChange(regionId, municipalityId)
    setOpen("")
    setSearch("")
  }

  return (
    <Accordion type="single" collapsible className="w-full" value={open} onValueChange={setOpen}>
      <AccordionItem value="regions" className="border-none!">
        <AccordionTrigger className="text-left cursor-pointer px-4 font-semibold py-3 hover:no-underline text-base">
          {municipality ? `${region?.name} · ${municipality.name}` : region?.name ?? "RMs e RIDEs"}
        </AccordionTrigger>
        <AccordionContent className="max-h-96 overflow-y-auto pb-0">
          <div className="px-4 py-2">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar RM ou município"
              aria-label="Buscar RM ou município"
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <button type="button" className="w-full px-4 py-3 text-left hover:bg-gray-50" onClick={() => select("")}>
            Brasil
          </button>
          {visibleRegions.length === 0 && (
            <p className="px-4 py-3 text-sm text-gray-500">Nenhuma região ou município encontrado.</p>
          )}
          {visibleRegions.map((item) => (
            <details key={`${item.id}-${Boolean(search)}`} open={Boolean(search) || item.id === selectedRegion} className="border-b border-gray-200">
              <summary className="cursor-pointer px-4 py-3 font-medium hover:bg-gray-50">
                {item.name}
              </summary>
              <div className="pl-4">
                <button
                  type="button"
                  className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${selectedRegion === item.id && !selectedMunicipality ? "bg-blue-50 font-semibold" : ""}`}
                  aria-pressed={selectedRegion === item.id && !selectedMunicipality}
                  onClick={() => select(item.id)}
                >
                  Toda a região
                </button>
                {item.municipalities.map((city) => (
                  <button
                    key={city.id}
                    type="button"
                    className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${selectedMunicipality === city.id ? "bg-blue-50 font-semibold" : ""}`}
                    aria-pressed={selectedRegion === item.id && selectedMunicipality === city.id}
                    onClick={() => select(item.id, city.id)}
                  >
                    {city.name}
                  </button>
                ))}
              </div>
            </details>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
