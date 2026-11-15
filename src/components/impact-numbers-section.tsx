"use client"

import { SlidingNumber } from "@animate-ui/react/primitives/texts/sliding-number"

interface ImpactNumbersSectionProps {
  datasetCount: number
}

function impactNumbers(datasetCount: number) {
  return [
    { number: datasetCount, prefix: "",  thousandSeparator: undefined, label: "conjuntos de dados no catálogo" },
    { number: 22,           prefix: "",  thousandSeparator: undefined, label: "municípios com dados" },
    { number: 205,          prefix: "+", thousandSeparator: undefined, label: "alunos em educação executiva" },
    { number: 47,           prefix: "+", thousandSeparator: undefined, label: "horas de eventos" },
    { number: 1010,         prefix: "+", thousandSeparator: ".",       label: "participantes em eventos" },
  ]
}

export function ImpactNumbersSection({ datasetCount }: ImpactNumbersSectionProps) {
  return (
    <section className="bg-[#f9f9f6] px-4 py-8 2xl:px-16" aria-label="Números do observatório">
      <ul className="lg:grid lg:grid-cols-5 lg:divide-x lg:divide-gray-200 lg:border-y lg:border-gray-200">
        {impactNumbers(datasetCount).map(({ number, prefix, thousandSeparator, label }) => (
          <li
            key={label}
            className="flex items-baseline justify-between gap-4 border-b border-gray-200 py-4 last:border-b-0 lg:flex-col lg:items-start lg:border-b-0 lg:px-4 lg:py-6 lg:first:pl-0"
          >
            <span className="flex items-baseline text-3xl font-semibold text-gray-900">
              {prefix && <span>{prefix}</span>}
              <SlidingNumber
                number={number}
                fromNumber={0}
                inView
                thousandSeparator={thousandSeparator}
              />
            </span>
            <span className="max-w-[14rem] text-right text-sm leading-snug text-gray-600 lg:max-w-none lg:text-left">
              {label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
