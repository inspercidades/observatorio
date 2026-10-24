"use client"

import React from "react"
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts'
import { getVariableCityFillPercentage, getVariableData } from "../../lib/pemob-data"

interface RadarChartProps {
  selectedCities: string[]
  selectedVariables: string[]
  year?: number
}

interface RadarChartDataPoint {
  variable: string
  [cityName: string]: string | number
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    dataKey: string
    value: number
    color: string
  }>
  label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 max-w-[350px] border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold mb-2 text-sm leading-tight break-words">{label}</p>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <p key={index} className="text-xs leading-tight" style={{ color: entry.color }}>
              <span className="font-medium">{entry.dataKey}:</span> {entry.value.toFixed(1)}%
            </p>
          ))}
        </div>
      </div>
    )
  }
  return null
}

export function ChartRadarMultiple({ selectedCities, selectedVariables, year }: RadarChartProps) {
  const chartData = React.useMemo(() => {
    if (selectedVariables.length === 0 || selectedCities.length === 0) {
      return []
    }

    // Sort variables by city fill percentage in descending order
    const sortedVariables = [...selectedVariables].sort((a, b) => {
      const percentageA = getVariableCityFillPercentage(a, year)
      const percentageB = getVariableCityFillPercentage(b, year)
      return percentageB - percentageA
    })

    // Create radar chart data structure with sorted variables
    const data: RadarChartDataPoint[] = sortedVariables.map(variable => {
      const dataPoint: RadarChartDataPoint = { variable }
      
      const variableData = getVariableData(variable, year)
      
      // Calculate the sum of ALL cities' values for this variable (not just selected)
      const totalSum = variableData.reduce((sum, item) => {
        return sum + (item.value !== null ? item.value : 0)
      }, 0)
      
      // Calculate proportional percentage for each city
      selectedCities.forEach(city => {
        const cityData = variableData.find(item => item.municipio === city)
        if (cityData && cityData.value !== null && totalSum > 0) {
          // Calculate percentage as (city_value / total_sum) * 100
          const percentage = (cityData.value / totalSum) * 100
          dataPoint[city] = Math.max(0, percentage)
        } else {
          dataPoint[city] = 0 // Default to 0 if no data or total sum is 0
        }
      })
      
      return dataPoint
    })

    return data
  }, [selectedCities, selectedVariables, year])

  // Calculate dynamic domain for better readability
  const maxValue = React.useMemo(() => {
    if (chartData.length === 0) return 100
    
    let max = 0
    chartData.forEach(dataPoint => {
      selectedCities.forEach(city => {
        const value = dataPoint[city] as number
        if (value > max) max = value
      })
    })
    
    // Use the actual maximum value as the scale top
    return Math.ceil(max)
  }, [chartData, selectedCities])

  // Dynamic tick count based on scale
  const tickCount = React.useMemo(() => {
    if (maxValue <= 10) return 6     // Good spacing for small scales
    if (maxValue <= 30) return 7     // Slightly more ticks for medium scales
    return 6                         // Default for larger scales
  }, [maxValue])

  const colors = ["#ef4444", "#10b981", "#3b82f6", "#f59e0b", "#8b5cf6"] // red, green, blue, yellow, purple

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
    <div className="w-full flex flex-col">
      <div className="h-[300px] custom-height flex flex-col items-start">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={chartData} margin={{  right: 100,top:0, bottom: 0, left: 100 }}>
            <PolarGrid gridType="circle" />
            <PolarRadiusAxis 
              domain={[0, maxValue]} 
              tick={{ fontSize: 10, fill: '#666' }}
              tickCount={tickCount}
              tickFormatter={(value) => `${value}%`}
              angle={90}
            />
            <PolarAngleAxis 
              dataKey="variable" 
              tick={{ fontSize: 12 }}
              className="text-xs"
              tickFormatter={(value) => {
                // Truncate long variable names
                if (value.length > 25) {
                  return value.substring(0, 30) + '...'
                }
                return value
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {selectedCities.slice(0, 5).map((city, index) => (
              <Radar
                key={city}
                name={city}
                dataKey={city}
                stroke={colors[index % colors.length]}
                fill={colors[index % colors.length]}
                fillOpacity={0.15}
                strokeWidth={3}
                dot={{ fill: colors[index % colors.length], strokeWidth: 1, r: 4 }}
              />
            ))}
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
{/* Scale indicator */}
        <div className="text-xs text-gray-500 font-medium">
          Escala: 0-{maxValue.toFixed(1)}%
        </div>
      <div className="flex flex-wrap items-start mt-4 gap-2 text-sm flex-shrink-0">
        
        
        {selectedCities.slice(0, 5).map((city, index) => (
          <div key={city} className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded-full flex-shrink-0 aspect-square" 
              style={{ backgroundColor: colors[index % colors.length] }}
            ></div>
            <span>{city}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
