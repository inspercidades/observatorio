interface ImpactNumbersSectionProps {
  datasetCount: number
}

function impactNumbers(datasetCount: number) {
  return [
    { value: String(datasetCount), label: "conjuntos de dados no catálogo" },
    { value: "22", label: "municípios com dados" },
    { value: "+205", label: "alunos em educação executiva" },
    { value: "+47", label: "horas de eventos" },
    { value: "+1.010", label: "participantes em eventos" },
  ]
}

export function ImpactNumbersSection({ datasetCount }: ImpactNumbersSectionProps) {
  return (
    <section className="bg-[#f9f9f6] px-4 py-8 2xl:px-16" aria-label="Números do observatório">
      <ul className="lg:grid lg:grid-cols-5 lg:divide-x lg:divide-gray-200 lg:border-y lg:border-gray-200">
        {impactNumbers(datasetCount).map(({ value, label }) => (
          <li
            key={label}
            className="flex items-baseline justify-between gap-4 border-b border-gray-200 py-4 last:border-b-0 lg:flex-col lg:items-start lg:border-b-0 lg:px-4 lg:py-6 lg:first:pl-0"
          >
            <span className="text-3xl font-semibold text-gray-900">{value}</span>
            <span className="max-w-[14rem] text-right text-sm leading-snug text-gray-600 lg:max-w-none lg:text-left">
              {label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
