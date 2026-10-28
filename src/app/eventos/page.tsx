import { AgendaSection } from "@/components/agenda/AgendaSection";
import { PortraitCard, PortraitGrid, WideCard, WideGrid } from "@/components/agenda/AgendaCards";
import { Header } from "@/components/header";
import { EventData, getPastEvents, getTransmittedEvents, getUpcomingEvents } from "@/lib/data/events";

const ACCENT = "#C2181A";

function eventMeta(event: EventData) {
  return `${event.date} • ${event.location}`;
}

// Regera a página uma vez por dia para mover itens de "Na agenda" conforme a data.
export const revalidate = 86400;

export default function Eventos() {
  const upcomingEvents = getUpcomingEvents();
  const transmittedEvents = getTransmittedEvents();
  const pastEvents = getPastEvents();

  return (
    <div className="bg-[#f9f9f6]">
      <Header className="bg-[#f9f9f6]" />

      {upcomingEvents.length > 0 ? (
        <AgendaSection title="Na agenda" accentColor={ACCENT}>
          <PortraitGrid>
            {upcomingEvents.map((event) => (
              <PortraitCard key={event.id} title={event.title} meta={eventMeta(event)} image={event.image} href={event.href} />
            ))}
          </PortraitGrid>
        </AgendaSection>
      ) : null}

      {transmittedEvents.length > 0 ? (
        <AgendaSection title="Sexta da" subtitle="Mobilidade" accentColor={ACCENT}>
          <WideGrid>
            {transmittedEvents.map((event) => (
              <WideCard key={event.id} title={event.title} meta={eventMeta(event)} image={event.image} href={event.href} />
            ))}
          </WideGrid>
        </AgendaSection>
      ) : null}

      {pastEvents.length > 0 ? (
        <AgendaSection title="Eventos" subtitle="passados" accentColor={ACCENT}>
          <PortraitGrid>
            {pastEvents.map((event) => (
              <PortraitCard key={event.id} title={event.title} meta={eventMeta(event)} image={event.image} href={event.href} />
            ))}
          </PortraitGrid>
        </AgendaSection>
      ) : null}
    </div>
  );
}
