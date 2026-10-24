import React from "react"
import { filterCategories } from "../lib/filter-categories"
import { CategoryData, FilterCategoriesType } from "../lib/types"

export function useFilterCategories(searchFilter: string) {
  // Filter options based on search
  const filteredCategories = React.useMemo(() => {
    if (!searchFilter) return filterCategories

    const filtered: FilterCategoriesType = {}
    
    Object.entries(filterCategories).forEach(([categoria, subcategorias]) => {
      const filteredSubcategorias: CategoryData = {}
      
      Object.entries(subcategorias).forEach(([subcategoria, data]) => {
        const filteredOptions = data.options.filter(option =>
          option.toLowerCase().includes(searchFilter.toLowerCase())
        )
        
        if (filteredOptions.length > 0) {
          filteredSubcategorias[subcategoria] = {
            ...data,
            options: filteredOptions
          }
        }
      })
      
      if (Object.keys(filteredSubcategorias).length > 0) {
        filtered[categoria] = filteredSubcategorias
      }
    })
    
    return filtered
  }, [searchFilter])

  const hasResults = Object.keys(filteredCategories).length > 0

  return { filteredCategories, hasResults }
} 