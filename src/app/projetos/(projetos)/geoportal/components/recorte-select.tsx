import demographicMap from "../lib/demographic-map.json"

const labels = {
  sex: "Sexo (Censo 2022)",
  race: "Cor ou raça",
  schooling: "Escolaridade",
  income: "Renda domiciliar per capita (salários mínimos de 2022)",
}

interface RecorteSelectProps {
  id: string
  value: string
  onChange: (value: string) => void
}

export function RecorteSelect({ id, value, onChange }: RecorteSelectProps) {
  return (
    <label htmlFor={id} className="block text-xs font-medium text-gray-600">
      Recorte
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 block w-full rounded border border-gray-300 bg-white p-2 text-sm text-gray-900"
      >
        <option value="">Todos os trabalhadores</option>
        {Object.entries(demographicMap.dimensions).map(([dimension, groups]) => (
          <optgroup key={dimension} label={labels[dimension as keyof typeof labels]}>
            {groups.map((group) => (
              <option key={group.id} value={`${dimension}:${group.id}`}>{group.label}</option>
            ))}
          </optgroup>
        ))}
      </select>
    </label>
  )
}
