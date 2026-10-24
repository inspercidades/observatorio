import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import React from "react"
import { toast } from "sonner"
import { FilterSearch } from "../../components/filter-search"
import { getCityVariableFillPercentage, getPEMOBCities, searchPEMOBCities } from "../../lib/pemob-data"

interface CitiesFilterProps {
  selectedCities: string[]
  onCitiesChange: (cities: string[]) => void
  year?: number
}

export function CitiesFilter({ selectedCities, onCitiesChange, year }: CitiesFilterProps) {
  const [searchFilter, setSearchFilter] = React.useState("")
  const [availableCities, setAvailableCities] = React.useState<string[]>([])

  // Load cities data
  React.useEffect(() => {
    const cities = getPEMOBCities(year)
    setAvailableCities(cities)
  }, [year])

  // Filter cities based on search
  const filteredCities = React.useMemo(() => {
    if (!searchFilter.trim()) {
      // Get all cities and sort them alphabetically
      const sortedCities = availableCities.sort((a, b) => a.localeCompare(b, 'pt-BR'))
      
      // Separate selected and unselected cities
      const selectedCitiesList = sortedCities.filter(c => selectedCities.includes(c))
      const unselectedCities = sortedCities.filter(c => !selectedCities.includes(c))
      
      // Return selected cities first (sorted alphabetically), then unselected cities (sorted alphabetically)
      return [...selectedCitiesList, ...unselectedCities]
    }
    
    // When there's a search filter, apply the same logic to filtered results
    const searchResults = searchPEMOBCities(searchFilter, year)
    
    // Sort filtered results alphabetically
    const sortedSearchResults = searchResults.sort((a, b) => a.localeCompare(b, 'pt-BR'))
    
    // Separate selected and unselected cities from filtered results
    const selectedCitiesList = sortedSearchResults.filter(c => selectedCities.includes(c))
    const unselectedCities = sortedSearchResults.filter(c => !selectedCities.includes(c))
    
    // Return selected cities first (sorted alphabetically), then unselected cities (sorted alphabetically)
    return [...selectedCitiesList, ...unselectedCities]
  }, [searchFilter, availableCities, year, selectedCities])

  const handleCityToggle = (cityName: string, checked: boolean) => {
    if (checked) {
      // Add city if we haven't reached the limit (max 5)
      if (selectedCities.length < 5) {
        onCitiesChange([...selectedCities, cityName])
      } else {
        // Show toast and scroll to top when trying to select a 6th city
        toast.warning("Limite atingido! É permitido selecionar de 3 a 5 cidades. Remova uma para continuar.", {
          // description: "Remova uma cidade para selecionar outra."
        })
        
        // Scroll to top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } else {
      // Prevent removing the last city (minimum 1 required)
      if (selectedCities.length > 1) {
        onCitiesChange(selectedCities.filter(city => city !== cityName))
      }
    }
  }

  return (
    <aside className="w-full">
      <div className="space-y-3">
        {/* Header */}
        <div className=" pb-3 p-4">
          <h2 className="text-xl font-bold text-gray-900">Selecione as cidades</h2>
          <p className="text-md text-gray-600">Escolha entre 1 e 5 cidades</p>
        </div>

        {/* Search */}
        <FilterSearch
          searchFilter={searchFilter}
          placeholder="Buscar por cidade ..."
          onSearchChange={setSearchFilter}
        />
        
        <div className="h-[0.5px] w-full bg-gray-300"/>

        {/* Cities List */}
        <div className="w-full -mt-2">
          {filteredCities.length === 0 && searchFilter ? (
            <div className="px-4 py-8 text-center">
              <p className="text-gray-500 text-md">Nenhum resultado encontrado</p>
            </div>
          ) : (
            filteredCities.map((city, index) => {
              const fillPercentage = getCityVariableFillPercentage(city, year)
              const isSelected = selectedCities.includes(city)
              const isLastSelected = isSelected && selectedCities.length === 1
              
              return (
                <React.Fragment key={city}>
                  <div className="px-4 gap-4 flex items-center justify-between py-5">
                    <label
                      htmlFor={`city-${city}`}
                      className="text-sm cursor-pointer text-black flex-1 leading-relaxed"
                    >
                      {city}
                      <Badge variant="secondary" className="ml-2 rounded-full text-xs">
                        <Tooltip>
                          <TooltipTrigger>
                            {fillPercentage}%
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            <div className="flex items-center">
                              {/* <InfoIcon className="w-4 h-4" /> */}
                              <p>Porcentagem de variáveis <br/> preenchidas por esta cidade</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </Badge>
                    </label>
                    <Switch
                      className={`cursor-pointer ${isLastSelected ? 'opacity-60' : ''}`}
                      id={`city-${city}`}
                      checked={isSelected}
                      onCheckedChange={(checked) => handleCityToggle(city, checked)}
                      disabled={isLastSelected}
                    />
                  </div>
                  {index !== filteredCities.length - 1 && (
                    <div className="h-[0.5px] w-full bg-gray-300"/>
                  )}
                </React.Fragment>
              )
            })
          )}
        </div>
      </div>
    </aside>
  )
} 