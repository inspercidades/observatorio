"use client"

import React from "react"
import { CartesianGrid, Cell, Dot, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts"
import { useIsMobile } from "../../hooks/use-is-mobile"
import { getVariableCityFillPercentage, getVariableData } from "../../lib/pemob-data"

interface DistributionChartProps {
  selectedCities: string[]
  selectedVariables: string[]
  year?: number
}

interface ChartDataPoint {
  variable: string
  city: string
  percentage: number
  value: number
  uf: string
  isSelected: boolean
  selectedIndex?: number
  yPosition: number // Add Y position for proper chart rendering
  total: number // Add total for tooltip display
  radius: number // Add radius for point sizing
}

// Custom dot components for different sizes
interface DotProps {
  cx?: number
  cy?: number
  payload?: ChartDataPoint
}

const NonSelectedDot: React.FC<DotProps> = ({ cx, cy }) => {
  return (
    <Dot cx={cx} cy={cy} fill="#d1d5db" r={6} />
  )
}

const SelectedDot: React.FC<DotProps> = ({ cx, cy, payload }) => {
  const getPointColor = (point: ChartDataPoint) => {
    const colors = ["#ef4444", "#10b981", "#3b82f6", "#f59e0b", "#8b5cf6"] // red, green, blue, yellow, purple
    return colors[point.selectedIndex! % colors.length]
  }

  const color = payload ? getPointColor(payload) : "#ef4444"
  
  return (
    <Dot cx={cx} cy={cy} fill={color} r={6} />
  )
}

// Custom tooltip component
interface TooltipProps {
  active?: boolean
  payload?: Array<{
    payload: ChartDataPoint
  }>
  coordinate?: { x: number; y: number }
}

function CustomTooltip({ active, payload, coordinate }: TooltipProps) {
  if (active && payload && payload.length && coordinate) {
    // Get all data points from the payload
    const allPoints = payload.map(p => p.payload)
    
    // If we have multiple points, prioritize selected cities
    let dataToShow = allPoints[0]
    
    // Check if there are selected cities among the points
    const selectedPoints = allPoints.filter(point => point.isSelected)
    if (selectedPoints.length > 0) {
      // Use the first selected city found
      dataToShow = selectedPoints[0]
    }
    
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold">{dataToShow.city}</p>
        <p className="text-sm text-gray-600">UF: {dataToShow.uf}</p>
        <p className="text-sm text-gray-600">Variável: {dataToShow.variable}</p>
        <p className="text-sm text-gray-600">value: {dataToShow.value?.toLocaleString('pt-BR') || 'N/A'}</p>
        <p className="text-sm text-gray-600">Total: {dataToShow.total?.toLocaleString('pt-BR') || 'N/A'}</p>
        <p className="text-sm text-gray-600">Percentual: {dataToShow.percentage.toFixed(2)}%</p>
      </div>
    )
  }
  return null
}

export function DistributionChart({ selectedCities, selectedVariables, year }: DistributionChartProps) {
  const isMobile = useIsMobile()
  
  const chartData = React.useMemo(() => {
    // Sort variables by city fill percentage in descending order
    const sortedVariables = [...selectedVariables].sort((a, b) => {
      const percentageA = getVariableCityFillPercentage(a, year)
      const percentageB = getVariableCityFillPercentage(b, year)
      return percentageB - percentageA
    })

    const data: ChartDataPoint[] = []
    
    sortedVariables.forEach((variable, variableIndex) => {
      const variableData = getVariableData(variable, year)
      
      // Calculate total for percentage calculation
      const total = variableData.reduce((sum, item) => sum + (item.value || 0), 0)
      
      if (total > 0) {
        variableData.forEach((item) => {
          if (item.value !== null && item.value > 0) {
            const percentage = (item.value / total) * 100
            const isSelected = selectedCities.includes(item.municipio)
            const selectedIndex = isSelected ? selectedCities.indexOf(item.municipio) : undefined
            
            data.push({
              variable,
              city: item.municipio,
              percentage,
              value: item.value,
              uf: item.uf,
              isSelected,
              selectedIndex,
              yPosition: variableIndex, // Use array index for Y positioning
              total: total, // Add total to the data point
              radius: isSelected ? 50 : 100 // Set radius based on selection
            })
          }
        })
      }
    })
    
    return data
  }, [selectedCities, selectedVariables, year])

  // Reorganize data so selected cities come last (render and detect on top)
  const nonSelectedData = React.useMemo(() => 
    chartData.filter(point => !point.isSelected), [chartData])
  
  const selectedData = React.useMemo(() => 
    chartData.filter(point => point.isSelected), [chartData])

  if (selectedVariables.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Selecione pelo menos uma variável para visualizar o gráfico
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col">
      <div className="h-[350px] custom-height flex flex-col items-start">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: isMobile ? 10 : 30,
              bottom: 20,
              left: isMobile ? -20 : -50,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis 
              type="number" 
              dataKey="percentage" 
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              label={{ value: 'Percentual (%)', position: 'insideBottom', offset: -10 }}
            />
           <YAxis 
              type="number" 
              dataKey="yPosition"
              domain={[-0.5, selectedVariables.length - 0.5]}
              ticks={Array.from({ length: selectedVariables.length }, (_, i) => i)}
              tickFormatter={(value) => {
                // Use sortedVariables to get the correct variable name for each position
                const sortedVariables = [...selectedVariables].sort((a, b) => {
                  const percentageA = getVariableCityFillPercentage(a, year)
                  const percentageB = getVariableCityFillPercentage(b, year)
                  return percentageB - percentageA
                })
                return sortedVariables[value] || ''
              }}
              tick={{ fontSize: 11 }}
              width={isMobile ? 100 : 200}
              interval={0}
              orientation="left"
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Non-selected cities (smaller points, render first) */}
            <Scatter data={nonSelectedData} shape={<NonSelectedDot />}>
              {nonSelectedData.map((entry, index) => (
                <Cell 
                  key={`non-selected-${index}`} 
                  fill="#d1d5db"
                />
              ))}
            </Scatter>

            {/* Selected cities (bigger points, render last/on top) */}
            <Scatter data={selectedData} shape={<SelectedDot />}>
              {selectedData.map((entry, index) => (
                <Cell 
                  key={`selected-${index}`} 
                  fill="#8884d8"
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap items-start mt-4 gap-2 text-sm flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gray-300"></div>
          <span className="whitespace-nowrap">Cidades não selecionadas</span>
        </div>
        {selectedCities.length > 0 && (
          <>
            {selectedCities.slice(0, 5).map((city, index) => {
              const colors = ["#ef4444", "#10b981", "#3b82f6", "#f59e0b", "#8b5cf6"]
              return (
                <div key={city} className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: colors[index % colors.length] }}
                  ></div>
                  <span className="whitespace-nowrap">{city}</span>
                </div>
              )
            })}
          </>
        )}
      </div>
    </div>
  )
} 