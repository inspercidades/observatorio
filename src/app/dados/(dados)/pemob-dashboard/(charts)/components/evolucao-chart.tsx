"use client"

import React from "react"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { getVariableCityFillPercentage, getVariableData } from "../../lib/pemob-data"

interface EvolucaoChartProps {
  selectedCities: string[]
  selectedVariables: string[]
  year?: number
}

interface ChartDataPoint {
  year: string
  [city: string]: string | number
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    dataKey: string
    value: number
    color: string
    payload: ChartDataPoint
  }>
  label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold mb-2">Ano: {label}</p>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              <span className="font-medium">{entry.dataKey}:</span> {entry.value?.toLocaleString('pt-BR') || 'N/A'}
            </p>
          ))}
        </div>
      </div>
    )
  }
  return null
}

function SingleVariableChart({ 
  variable, 
  selectedCities, 
  cityColors
}: { 
  variable: string
  selectedCities: string[]
  cityColors: string[]
}) {
  const availableYears = [2019, 2020, 2021, 2022, 2023, 2024]
  
  const chartData = React.useMemo(() => {
    // Create data structure for the chart - each year is a data point
    const data: ChartDataPoint[] = availableYears.map(year => {
      const dataPoint: ChartDataPoint = { year: year.toString() }
      
      // For each city, get the value for this specific variable
      selectedCities.forEach(city => {
        const variableData = getVariableData(variable, year)
        const cityData = variableData.find(item => item.municipio === city)
        
        if (cityData && cityData.value !== null) {
          dataPoint[city] = cityData.value
        } else {
          dataPoint[city] = 0
        }
      })
      
      return dataPoint
    })

    return data
  }, [variable, selectedCities])

  return (
    <div className="w-full h-60 mb-10">
      <h3 className="text-lg font-semibold mb-1 text-gray-800 text-center">
        {variable}
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            bottom: 20,
            left: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis 
            dataKey="year" 
            type="category"
            tick={{ fontSize: 11 }}
          />
          <YAxis 
            type="number"
            tick={{ fontSize: 10 }}
            width={40}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          
          {/* Create a line for each city */}
          {selectedCities.map((city, index) => (
            <Line
              key={city}
              type="monotone"
              dataKey={city}
              stroke={cityColors[index % cityColors.length]}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              name={city}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function EvolucaoChart({ selectedCities, selectedVariables, year }: EvolucaoChartProps) {
  // Generate colors for each city
  const cityColors = React.useMemo(() => {
    const colors = ["#ef4444", "#10b981", "#3b82f6", "#f59e0b", "#8b5cf6"] // red, green, blue, yellow, purple
    return selectedCities.map((_, index) => colors[index % colors.length])
  }, [selectedCities])

  // Sort variables by city fill percentage in descending order
  const sortedVariables = React.useMemo(() => {
    return [...selectedVariables].sort((a, b) => {
      const percentageA = getVariableCityFillPercentage(a, year)
      const percentageB = getVariableCityFillPercentage(b, year)
      return percentageB - percentageA
    })
  }, [selectedVariables, year])

  if (selectedVariables.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Selecione pelo menos uma variável para visualizar o gráfico
      </div>
    )
  }

  if (selectedCities.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Selecione pelo menos uma cidade para visualizar o gráfico
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 overflow-y-auto">
        {/* Render one chart for each selected variable in sorted order */}
        {sortedVariables.map((variable, index) => (
          <SingleVariableChart
            key={variable}
            variable={variable}
            selectedCities={selectedCities}
            cityColors={cityColors}
          />
        ))}
      </div>
    </div>
  )
} 