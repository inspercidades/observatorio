import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import React from "react"
import { TransportData } from "../lib/types"

interface UseTableStateProps {
  data: TransportData[]
  columns: ColumnDef<TransportData>[]
  globalFilter: string
  setGlobalFilter: (value: string) => void
}

export function useTableState({ data, columns, globalFilter, setGlobalFilter }: UseTableStateProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    globalFilterFn: (row, columnId, filterValue) => {
      const municipio = row.getValue("municipio") as string
      const uf = row.getValue("unidadeFederativa") as string
      const search = filterValue.toLowerCase()
      return municipio.toLowerCase().includes(search) || uf.toLowerCase().includes(search)
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  })

  return {
    table,
  }
} 