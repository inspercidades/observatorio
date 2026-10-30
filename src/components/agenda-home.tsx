import { getAgenda, type AgendaItem } from "@/lib/data/agenda"
import { classifyHref } from "@/lib/links"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"

const MONTHS = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"]

const KIND_COLOR: Record<AgendaItem["kind"], string> = {
  evento: "#C2181A",
  curso: "#F7A703",
}

function kindLabel(item: AgendaItem) {
  if (item.isPast) return "Realizado"
  return item.kind === "curso" ? "Curso" : "Evento"
}

function ItemLink({ href, className, children }: { href?: string; className?: string; children: ReactNode }) {
  const target = href ? classifyHref(href) : null
  if (!target) return <div className={className}>{children}</div>
  if (target.kind === "external") {
    return (
      <a href={target.href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    )
  }
  return (
    <Link href={target.href} className={className}>
      {children}
    </Link>
  )
}

function pad(day: number) {
  return String(day).padStart(2, "0")
}

/** Dia ou intervalo ("17 – 19") e mês ou meses ("OUT – NOV"). */
function dateBlockText(item: AgendaItem) {
  const start = item.date
  const end = item.endDate
  if (!end || end.getTime() === start.getTime()) {
    return { days: pad(start.getDate()), months: MONTHS[start.getMonth()] }
  }
  const months =
    start.getMonth() === end.getMonth()
      ? MONTHS[start.getMonth()]
      : `${MONTHS[start.getMonth()]} – ${MONTHS[end.getMonth()]}`
  return { days: `${pad(start.getDate())} – ${pad(end.getDate())}`, months }
}

function DateBlock({ item }: { item: AgendaItem }) {
  const color = item.isPast ? "#9ca3af" : KIND_COLOR[item.kind]
  const { days, months } = dateBlockText(item)
  const isRange = Boolean(item.endDate)
  return (
    <div className="w-[96px] shrink-0 overflow-hidden rounded-md border border-gray-200 bg-white text-center shadow-sm">
      <div className="py-1.5 text-white" style={{ backgroundColor: color }}>
        <div className={`${isRange ? "text-lg" : "text-2xl"} whitespace-nowrap font-semibold leading-none`}>{days}</div>
        <div className="mt-1 whitespace-nowrap text-[11px] font-medium tracking-wide">{months}</div>
      </div>
      <div className="py-1 text-xs text-gray-600">{item.date.getFullYear()}</div>
    </div>
  )
}

function FeaturedCard({ item }: { item: AgendaItem }) {
  return (
    <ItemLink
      href={item.href}
      className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#e7e4da]">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="flex flex-col gap-3 p-6">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span className="font-medium" style={{ color: KIND_COLOR[item.kind] }}>
            {kindLabel(item)}
          </span>
          <span>{[item.dateLabel, item.location].filter(Boolean).join(" • ")}</span>
        </div>
        <h3 className="text-xl font-medium text-gray-900 group-hover:underline">{item.title}</h3>
        {item.description ? <p className="line-clamp-3 text-sm text-gray-600">{item.description}</p> : null}
        {item.badge ? (
          <span className="w-fit bg-[#F7A703] px-3 py-1 text-xs font-semibold text-black">{item.badge}</span>
        ) : null}
        {item.hasSessions ? (
          <span className="text-sm font-medium text-gray-900">Veja onde o Observatório estará →</span>
        ) : null}
      </div>
    </ItemLink>
  )
}

function ListItem({ item }: { item: AgendaItem }) {
  return (
    <ItemLink href={item.href} className={`group flex items-start gap-5 ${item.isPast ? "opacity-70" : ""}`}>
      <DateBlock item={item} />
      <div className="pt-1">
        <span className="text-xs font-medium" style={{ color: item.isPast ? "#6b7280" : KIND_COLOR[item.kind] }}>
          {kindLabel(item)}
        </span>
        <h4 className="mt-1 text-base font-medium leading-snug text-gray-900 group-hover:underline">{item.title}</h4>
        {item.location ? <p className="mt-1 text-sm text-gray-600">{item.location}</p> : null}
        {item.badge ? (
          <span className="mt-2 inline-block bg-[#F7A703] px-2 py-0.5 text-xs font-semibold text-black">{item.badge}</span>
        ) : null}
        {item.hasSessions ? (
          <p className="mt-1 text-xs text-gray-500">Com participação do Observatório</p>
        ) : null}
      </div>
    </ItemLink>
  )
}

export function AgendaHome() {
  const items = getAgenda(undefined, undefined, undefined, undefined, { recentPastDays: 60 })
  const upcoming = items.filter((item) => !item.isPast)
  const past = items.filter((item) => item.isPast).slice(0, 2)
  const [featured, ...rest] = upcoming

  return (
    <section className="bg-[#f9f9f6] px-4 py-16 2xl:px-16">
      <div className="mb-10 flex items-end justify-between">
        <h2 className="text-3xl font-medium text-gray-900 md:text-4xl">Agenda</h2>
        <div className="mx-16 hidden h-[1.2px] flex-grow bg-gray-300 md:block" />
        <div className="flex shrink-0 gap-6 text-sm font-medium text-gray-900">
          <Link href="/eventos" className="inline-flex items-center gap-1 hover:underline">
            Todos os eventos <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/cursos" className="inline-flex items-center gap-1 hover:underline">
            Todos os cursos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {featured ? <FeaturedCard item={featured} /> : null}

        <div className="flex flex-col gap-8">
          {rest.slice(0, 3).map((item) => (
            <ListItem key={item.id} item={item} />
          ))}

          {past.length > 0 ? (
            <div className="flex flex-col gap-6 border-t border-gray-200 pt-6">
              <h3 className="text-sm font-medium text-gray-500">Realizados recentemente</h3>
              {past.map((item) => (
                <ListItem key={item.id} item={item} />
              ))}
            </div>
          ) : null}
        </div>
      </div>

    </section>
  )
}
