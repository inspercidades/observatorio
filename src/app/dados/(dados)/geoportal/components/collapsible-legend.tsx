"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ChevronUp, LayoutList, Moon, Sun } from "lucide-react"
import { useState } from "react"
import { MapLegend } from "./map-legend"

interface CollapsibleLegendProps {
  selectedLayers: string[]
  selectedCity: string
  cityLayersConfig: Record<string, Array<{
    id: string
    name: string
    description?: string
    layerType?: 'fill' | 'line' | 'circle' | 'symbol'
    sourceLayer?: string
  }>>
  mapTheme: 'dark' | 'light'
  onThemeToggle: () => void
}

export function CollapsibleLegend({ selectedLayers, selectedCity, cityLayersConfig, mapTheme, onThemeToggle }: CollapsibleLegendProps) {
  const [isCollapsed, setIsCollapsed] = useState(true)

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const hasLayers = selectedLayers.length > 0

  return (
    <div className="top-17 right-4 absolute z-10 flex flex-col gap-2">
      {isCollapsed ? (
        // Collapsed state - just the buttons
        <>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={hasLayers ? toggleCollapse : undefined}
                disabled={!hasLayers}
                className={`p-3 rounded-md outline-none border-gray-200 ${
                  hasLayers
                    ? "bg-white hover:bg-gray-50 cursor-pointer"
                    : "bg-gray-100 cursor-not-allowed opacity-50"
                }`}
              >
                <LayoutList className="w-5 h-5"/>
              </button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>{hasLayers ? "Legenda" : "Legenda / Selecione uma camada"}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onThemeToggle}
                className="p-3 rounded-md outline-none border-gray-200 bg-white hover:bg-gray-50 cursor-pointer"
              >
                {mapTheme === 'dark' ? <Sun className="w-5 h-5"/> : <Moon className="w-5 h-5"/>}
              </button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>{mapTheme === 'dark' ? 'Tema Claro' : 'Tema Escuro'}</p>
            </TooltipContent>
          </Tooltip>
        </>
      ) : (
         // Expanded state - full legend box and theme button
         <>
           <div className="h-auto max-h-[calc(100vh-100px)] overflow-y-auto w-60 bg-white rounded-lg shadow-xl p-4">
             <div className="flex items-center justify-between mb-4">
               <h3
                 className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-gray-700 transition-colors"
                 onClick={hasLayers ? toggleCollapse : undefined}
               >
                 Legenda
               </h3>
               <Button
                 onClick={hasLayers ? toggleCollapse : undefined}
                 variant="ghost"
                 size="sm"
                 className="h-8 w-8 p-0 hover:bg-gray-100"
                 disabled={!hasLayers}
               >
                 <ChevronUp className="w-4 h-4" />
               </Button>
             </div>
            {hasLayers ? (
              <MapLegend
                selectedLayers={selectedLayers}
                selectedCity={selectedCity}
                cityLayersConfig={cityLayersConfig}
              />
            ) : (
              <div className="text-center text-gray-500 py-8">
                <LayoutList className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Selecione uma camada para ver a legenda</p>
              </div>
            )}
          </div>

          {/* <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onThemeToggle}
                className="p-3 rounded-md outline-none border-gray-200 bg-white hover:bg-gray-50 cursor-pointer"
              >
                {mapTheme === 'dark' ? <Sun className="w-5 h-5"/> : <Moon className="w-5 h-5"/>}
              </button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>{mapTheme === 'dark' ? 'Tema Claro' : 'Tema Escuro'}</p>
            </TooltipContent>
          </Tooltip> */}
        </>
      )}
    </div>
  )
}
