// Transport data structure
export interface TransportData {
  id: string
  municipio: string
  unidadeFederativa: string
  value: number | string | null // Allow null values
  label_pergunta?: string // Add question field for tooltip

}

// PEMOB (Pesquisa Nacional de Mobilidade Urbana) data structure - Updated for new format
export interface PEMOBDataItem {
  label: string | null
  value: number | null
  is_dashboard?: boolean
  label_pergunta: string
  year?: number | null | string
}

export interface PEMOBCityData {
  "CÓDIGO": string | number
  "UF": string
  "Município": string
  "data": PEMOBDataItem[]
}

// Processed PEMOB data for the dashboard
export interface DashboardData {
  codigo: string
  municipio: string
  uf: string
  variavel: string
  value: number | null
  is_dashboard?: boolean
}

// Filter structure types
export interface SubcategoryData {
  icon: string // Changed from LucideIcon to string for SVG paths
  options: string[]
}

export interface CategoryData {
  [subcategoryKey: string]: SubcategoryData
}

export interface FilterCategoriesType {
  [categoryKey: string]: CategoryData
}

// Table state types (using React Table types)
export interface TableState {
  sorting: {
    id: string
    desc: boolean
  }[]
  columnFilters: {
    id: string
    value: unknown
  }[]
  columnVisibility: Record<string, boolean>
  globalFilter: string
}

// Table data structure for PEMOB dashboard
export interface TableDataItem {
  municipio: string
  uf: string
  value: number | null
  codigo: string
  label_pergunta: string
}

// Municipality data for mock generation
export interface Municipality {
  nome: string
  uf: string
} 