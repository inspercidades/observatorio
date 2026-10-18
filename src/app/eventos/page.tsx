import { Header } from "@/components/header";
import { EventData, getPastEvents, getTransmittedEvents, getUpcomingEvents } from "@/lib/data/events";
import Image from "next/image";

interface EventSectionProps {
  title: string
  subtitle?: string
  events: EventData[]
  layout?: "portrait" | "wide"
}

function EventCard({ event }: { event: EventData }) {
  const image = (
    <div className="relative overflow-hidden h-[380px] w-[320px]">
      {event.image ? (
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          sizes="320px"
        />
      ) : (
        <div className="absolute inset-0 bg-[#e7e4da]" />
      )}
    </div>
  )

  return (
    <div className="flex flex-col items-start text-left w-[320px] group">
      {event.href ? (
        <a
          href={event.href}
          target={event.href.startsWith("http") ? "_blank" : "_self"}
          rel={event.href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="block w-full cursor-pointer"
        >
          {image}
        </a>
      ) : (
        image
      )}
      <h3 className="mt-4 text-sm font-medium">{event.title}</h3>
      <p className="text-xs text-gray-600 mt-2">{event.date} • {event.location}</p>
    </div>
  )
}

function WideEventCard({ event }: { event: EventData }) {
  const image = (
    <div className="relative overflow-hidden w-full aspect-[7/4]">
      {event.image ? (
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      ) : (
        <div className="absolute inset-0 bg-[#e7e4da]" />
      )}
    </div>
  )

  return (
    <div className="flex flex-col items-start text-left group">
      {event.href ? (
        <a
          href={event.href}
          target={event.href.startsWith("http") ? "_blank" : "_self"}
          rel={event.href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="block w-full cursor-pointer"
        >
          {image}
        </a>
      ) : (
        image
      )}
      <h3 className="mt-4 text-sm font-medium line-clamp-2">{event.title}</h3>
      <p className="text-xs text-gray-600 mt-2">{event.date} • {event.location}</p>
    </div>
  )
}

function EventSection({ title, subtitle, events, layout = "portrait" }: EventSectionProps) {
  if (events.length === 0) return null

  return (
    <div className="px-4 2xl:px-16 py-20 pb-30">
      <div className="flex items-end justify-between mb-16">
        <div>
          <h2 className="text-4xl font-medium leading-none">{title}</h2>
          {subtitle ? (
            <p className="text-4xl text-gray-400 leading-none font-medium">{subtitle}</p>
          ) : null}
        </div>
        <div className="hidden md:block h-[1.2px] flex-grow mx-16 bg-gray-300" />
        <div className="hidden md:block w-4 h-4 bg-[#C2181A]" />
      </div>

      {layout === "wide" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <WideEventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center xl:justify-start">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function Eventos() {
  const upcomingEvents = getUpcomingEvents()
  const transmittedEvents = getTransmittedEvents()
  const pastEvents = getPastEvents()

  return (
    <div className="bg-[#f9f9f6]">
      <Header className="bg-[#f9f9f6]" />

      <EventSection title="Na agenda" events={upcomingEvents} />
      <EventSection title="Sexta da" subtitle="Mobilidade" events={transmittedEvents} layout="wide" />
      <EventSection title="Eventos" subtitle="passados" events={pastEvents} />
    </div>
  );
}
