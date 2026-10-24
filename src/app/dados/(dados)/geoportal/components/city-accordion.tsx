"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Switch } from "@/components/ui/switch"
import { useEffect, useState } from "react"

const cities = [
  { value: "São Paulo", label: "São Paulo" },
  { value: "Rio de Janeiro", label: "Rio de Janeiro" },
  { value: "Recife", label: "Recife" },
  { value: "Belo Horizonte", label: "Belo Horizonte" },
  { value: "Goiânia", label: "Goiânia" },
  { value: "Fortaleza", label: "Fortaleza" },
  { value: "Curitiba", label: "Curitiba" },
  { value: "Niteroi", label: "Niterói" },
  { value: "Santo André", label: "Santo André" },
  { value: "Salvador", label: "Salvador" },
  { value: "Campinas", label: "Campinas" },
  { value: "Porto Alegre", label: "Porto Alegre" },
]

interface CityAccordionProps {
  selectedCity: string
  onCityChange: (city: string) => void
}

export function CityAccordion({ selectedCity, onCityChange }: CityAccordionProps) {
  const [accordionValue, setAccordionValue] = useState<string>(selectedCity ? "" : "city")

  const handleCityToggle = (cityValue: string, checked: boolean) => {
    if (checked) {
      onCityChange(cityValue)
      // Collapse the accordion when a city is selected
      setAccordionValue("")
    } else if (selectedCity === cityValue) {
      onCityChange("")
      // Open the accordion when deselecting
      setAccordionValue("city")
    }
  }

  // Sync accordion state when selectedCity changes externally (e.g., when switching modes)
  useEffect(() => {
    if (selectedCity) {
      setAccordionValue("")
    }
  }, [selectedCity])

  const selectedCityLabel = selectedCity 
    ? cities.find(city => city.value === selectedCity)?.label || "Cidades"
    : "Cidades"

  return (
    <Accordion type="single" collapsible className="w-full" value={accordionValue} onValueChange={setAccordionValue}>
      <AccordionItem value="city" className="border-none!">
        <AccordionTrigger className="text-left cursor-pointer px-4 font-semibold py-3 hover:no-underline text-base">
          {selectedCityLabel}
        </AccordionTrigger>
        {/* <div className="h-[0.5px] w-full bg-gray-300"/> */}
        <AccordionContent className="pb-0">
          <div className="space-y-0">
            {cities.map((city, index) => {
              const isSelected = selectedCity === city.value
              
              return (
                <div key={`city-${city.value}`}>
                  <div className={`px-4 gap-4 flex items-center justify-between py-3 transition-colors ${
                    isSelected 
                      ? 'bg-blue-50 border-l-4 border-l-blue-500' 
                      : 'hover:bg-gray-50'
                  }`}>
                    <div className="flex-1 min-w-0">
                      <label
                        htmlFor={`city-${city.value}`}
                        className="text-sm flex flex-row items-center gap-2 cursor-pointer text-black leading-relaxed"
                        style={{ color: '#000000' }}
                      >
                        <span className={`block truncate ${isSelected ? 'font-semibold' : 'font-medium'}`} style={{ color: '#000000' }}>
                          {city.label}
                        </span>
                      </label>
                    </div>
                    <Switch
                      className="cursor-pointer flex-shrink-0 ml-2"
                      id={`city-${city.value}`}
                      checked={isSelected}
                      onCheckedChange={(checked) => handleCityToggle(city.value, checked)}
                    />
                  </div>
                  {index !== cities.length - 1 && (
                    <div className="h-[0.5px] w-full bg-gray-300"/>
                  )}
                </div>
              )
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

