import { AgendaSection } from "@/components/agenda/AgendaSection";
import { PortraitCard, PortraitGrid, WideCard, WideGrid } from "@/components/agenda/AgendaCards";
import { Header } from "@/components/header";
import { formatDateRange } from "@/lib/data/dates";
import { EventData, getEventHref, getPastEvents, getTransmittedEvents, getUpcomingEvents } from "@/lib/data/events";

const ACCENT = "#C2181A";

function eventMeta(event: EventData) {
  return `${formatDateRange(event.date, event.endDate)} • ${event.location}`;
}

// Atualiza a cada hora. O dia da agenda segue America/Sao_Paulo.
export const revalidate = 3600;

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
              <PortraitCard key={event.id} title={event.title} meta={eventMeta(event)} image={event.image} href={getEventHref(event)} />
            ))}
          </PortraitGrid>
        </AgendaSection>
      ) : null}

      {transmittedEvents.length > 0 ? (
        <AgendaSection title="Sexta da" subtitle="Mobilidade" accentColor={ACCENT}>
          <WideGrid>
            {transmittedEvents.map((event) => (
              <WideCard key={event.id} title={event.title} meta={eventMeta(event)} image={event.image} href={getEventHref(event)} />
            ))}
          </WideGrid>
        </AgendaSection>
      ) : null}

      {pastEvents.length > 0 ? (
        <AgendaSection title="Eventos" subtitle="passados" accentColor={ACCENT}>
          <PortraitGrid>
            {pastEvents.map((event) => (
              <PortraitCard key={event.id} title={event.title} meta={eventMeta(event)} image={event.image} href={getEventHref(event)} />
            ))}
          </PortraitGrid>
        </AgendaSection>
      ) : null}
    </div>
  );
}
