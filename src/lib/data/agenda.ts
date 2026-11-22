import { StaticImageData } from "next/image";
import { courses, enrollmentLabel, getUpcomingCourses } from "@/lib/data/courses";
import { formatDateRange, parseBrDate, startOfToday } from "@/lib/data/dates";
import { eventsData, getEventHref, getPastEvents, getUpcomingEvents, type EventData } from "@/lib/data/events";
import type { Course } from "@/lib/types/course";

/** Item da agenda unificada: um evento futuro ou a próxima turma de um curso. */
export interface AgendaItem {
  id: string;
  kind: "evento" | "curso";
  title: string;
  date: Date;
  /** Último dia, para eventos e turmas de vários dias. */
  endDate?: Date;
  /** Data ou intervalo, como "30/10/2026" ou "17 a 19/11/2026". */
  dateLabel: string;
  location?: string;
  image?: StaticImageData;
  href?: string;
  description?: string;
  /** Evento já realizado, mostrado como "Realizado". */
  isPast?: boolean;
  /** Há detalhes da participação do Observatório. */
  hasSessions?: boolean;
  /** Prazo de inscrição de um curso, como "Inscrições abertas até 05/11/2026". */
  badge?: string;
}

export interface AgendaOptions {
  /** Inclui eventos realizados nos últimos N dias. */
  recentPastDays?: number;
}

function toAgendaItem(event: EventData, isPast = false): AgendaItem {
  return {
    id: event.id,
    kind: "evento",
    title: event.title,
    date: parseBrDate(event.date),
    endDate: event.endDate ? parseBrDate(event.endDate) : undefined,
    dateLabel: formatDateRange(event.date, event.endDate),
    location: event.location,
    image: event.image,
    href: getEventHref(event),
    description: event.about,
    isPast,
    hasSessions: Boolean(event.sessions?.length),
  };
}

/** Eventos e turmas de hoje em diante, do mais próximo para o mais distante. */
export function getAgenda(
  today = startOfToday(),
  events: EventData[] = eventsData,
  courseList: Course[] = courses,
  limit?: number,
  options: AgendaOptions = {},
): AgendaItem[] {
  const fromEvents: AgendaItem[] = getUpcomingEvents(today, events).map((event) => toAgendaItem(event));

  const fromCourses: AgendaItem[] = getUpcomingCourses(today, courseList).map((course) => ({
    id: course.id,
    kind: "curso",
    title: course.title,
    date: parseBrDate(course.nextClass!),
    endDate: course.classEnd ? parseBrDate(course.classEnd) : undefined,
    dateLabel: formatDateRange(course.nextClass!, course.classEnd),
    location: course.location,
    image: course.image,
    href: course.href,
    description: course.description,
    badge: enrollmentLabel(course, today),
  }));

  const upcoming = [...fromEvents, ...fromCourses].sort((a, b) => a.date.getTime() - b.date.getTime());
  const limited = limit === undefined ? upcoming : upcoming.slice(0, limit);
  if (!options.recentPastDays) return limited;

  const cutoff = new Date(today);
  cutoff.setDate(cutoff.getDate() - options.recentPastDays);
  const recentPast = getPastEvents(today, events)
    .filter((event) => /^\d{2}\/\d{2}\/\d{4}$/.test(event.date) && parseBrDate(event.date) >= cutoff)
    .map((event) => toAgendaItem(event, true));
  return [...limited, ...recentPast];
}

export interface HomeAgenda {
  featured?: AgendaItem;
  upcoming: AgendaItem[];
  past: AgendaItem[];
}

const DATED = /^\d{2}\/\d{2}\/\d{4}$/;

/**
 * Agenda da home: o próximo item em destaque, até três seguintes e até dois
 * realizados nos últimos 60 dias. Sem nada pela frente, o último evento
 * realizado ocupa o destaque, para a seção nunca ficar vazia.
 */
export function getHomeAgenda(
  today = startOfToday(),
  events: EventData[] = eventsData,
  courseList: Course[] = courses,
): HomeAgenda {
  const items = getAgenda(today, events, courseList, undefined, { recentPastDays: 60 });
  const [featured, ...rest] = items.filter((item) => !item.isPast);

  if (featured) {
    return {
      featured,
      upcoming: rest.slice(0, 3),
      past: items.filter((item) => item.isPast).slice(0, 2),
    };
  }

  const past = getPastEvents(today, events)
    .filter((event) => DATED.test(event.date))
    .map((event) => toAgendaItem(event, true));
  return { featured: past[0], upcoming: [], past: past.slice(1, 3) };
}
