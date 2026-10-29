import catalog from "@/lib/data/new-catalog/catalog.json"
import { Clock, Database, GraduationCap, MapPin, Users, type LucideIcon } from "lucide-react"

interface ImpactNumber {
  value: string
  label: string
  icon: LucideIcon
}

const impactNumbers: ImpactNumber[] = [
  { value: String(catalog.length), label: "conjuntos de dados no catálogo", icon: Database },
  { value: "22", label: "municípios com dados", icon: MapPin },
  { value: "+205", label: "alunos em educação executiva", icon: GraduationCap },
  { value: "+47", label: "horas de eventos", icon: Clock },
  { value: "+1.010", label: "participantes em eventos", icon: Users },
]

export function ImpactNumbersSection() {
  return (
    <section className="bg-[#f9f9f6] px-4 py-8 2xl:px-16">
      <div className="grid grid-cols-2 gap-y-6 rounded-xl bg-[#2F2C2C] px-6 py-6 md:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-white/20">
        {impactNumbers.map(({ value, label, icon: Icon }) => (
          <div key={label} className="flex items-center gap-4 lg:justify-center lg:px-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white">
              <Icon className="h-6 w-6 text-[#2F2C2C]" />
            </div>
            <div className="text-white">
              <div className="text-2xl font-semibold leading-none">{value}</div>
              <div className="mt-1 text-sm leading-tight text-white/80">{label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
