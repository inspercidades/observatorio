import { Header } from "@/components/header"
import { formatDateRange } from "@/lib/data/dates"
import { eventsData, getEventById, type EventSession } from "@/lib/data/events"
import { ArrowLeft, Clock, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return eventsData.filter((event) => event.sessions?.length).map((event) => ({ "evento-id": event.id }))
}

function SessionCard({ session }: { session: EventSession }) {
  return (
    <article className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
        <span className="inline-flex items-center gap-1">
          <Clock className="h-4 w-4" /> {session.date} · {session.time}
        </span>
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-4 w-4" /> {session.stage}
        </span>
      </div>
      <h3 className="text-xl font-medium text-gray-900">{session.title}</h3>
      {session.track ? <p className="text-xs font-medium text-[#C2181A]">Trilha: {session.track}</p> : null}
      {session.summary ? <p className="text-sm text-gray-700">{session.summary}</p> : null}

      <div className="flex flex-wrap gap-2">
        {session.onms.map((person) => (
          <span key={person.name} className="rounded-full bg-[#2F2C2C] px-3 py-1 text-xs font-medium text-white">
            {person.name} · {person.role}
          </span>
        ))}
      </div>

      {session.speakers?.length || session.moderation ? (
        <details className="text-sm text-gray-700">
          <summary className="cursor-pointer font-medium text-gray-900">Composição da mesa</summary>
          <ul className="mt-3 flex list-disc flex-col gap-1 pl-5">
            {session.speakers?.map((speaker) => <li key={speaker}>{speaker}</li>)}
          </ul>
          {session.moderation ? <p className="mt-3">Moderação: {session.moderation}</p> : null}
        </details>
      ) : null}
    </article>
  )
}

export default async function EventoId({ params }: { params: Promise<{ "evento-id": string }> }) {
  const { "evento-id": id } = await params
  const event = getEventById(id)
  if (!event) notFound()

  const dates = formatDateRange(event.date, event.endDate)

  return (
    <div className="min-h-screen bg-[#f9f9f6]">
      <Header className="bg-[#f9f9f6]" />

      <section className="px-4 py-12 2xl:px-16">
        <Link href="/eventos" className="mb-8 inline-flex items-center gap-1 text-sm text-gray-600 hover:underline">
          <ArrowLeft className="h-4 w-4" /> Eventos
        </Link>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[3fr_2fr]">
          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-600">{[dates, event.location].filter(Boolean).join(" • ")}</p>
            <h1 className="text-3xl font-medium text-gray-900 md:text-4xl">{event.title}</h1>
            {event.about ? <p className="max-w-2xl text-lg text-gray-700">{event.about}</p> : null}
            {event.href ? (
              <a
                href={event.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
              >
                Site do evento
              </a>
            ) : null}
          </div>
          {event.image ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image src={event.image} alt={event.title} fill sizes="40vw" className="object-cover" />
            </div>
          ) : null}
        </div>
      </section>

      {event.sessions?.length ? (
        <section className="px-4 pb-12 2xl:px-16">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-medium text-gray-900">Onde o Observatório estará</h2>
            <div className="mx-16 hidden h-[1.2px] flex-grow bg-gray-300 md:block" />
            <div className="hidden h-4 w-4 bg-[#C2181A] md:block" />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {event.sessions.map((session) => (
              <SessionCard key={session.title} session={session} />
            ))}
          </div>
        </section>
      ) : null}

      {event.attendees?.length ? (
        <section className="px-4 pb-20 2xl:px-16">
          <h2 className="mb-4 text-lg font-medium text-gray-900">Também presentes</h2>
          <ul className="flex flex-wrap gap-3">
            {event.attendees.map((person) => (
              <li key={person.name} className="rounded-lg border border-dashed border-gray-300 bg-white px-4 py-3 text-sm">
                <span className="font-medium text-gray-900">{person.name}</span>
                {person.note ? <span className="block text-xs text-gray-500">{person.note}</span> : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  )
}
