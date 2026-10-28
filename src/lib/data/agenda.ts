import { StaticImageData } from "next/image";
import { getUpcomingCourses, courses } from "@/lib/data/courses";
import { parseBrDate, startOfToday } from "@/lib/data/dates";
import { eventsData, getUpcomingEvents, type EventData } from "@/lib/data/events";
import type { Course } from "@/lib/types/course";

/** Item da agenda unificada: um evento futuro ou a próxima turma de um curso. */
export interface AgendaItem {
  id: string;
  kind: "evento" | "curso";
  title: string;
  date: Date;
  /** Data em "dd/mm/aaaa", como aparece no site. */
  dateLabel: string;
  location?: string;
  image?: StaticImageData;
  href?: string;
}

/** Eventos e turmas de hoje em diante, do mais próximo para o mais distante. */
export function getAgenda(
  today = startOfToday(),
  events: EventData[] = eventsData,
  courseList: Course[] = courses,
  limit?: number,
): AgendaItem[] {
  const fromEvents: AgendaItem[] = getUpcomingEvents(today, events).map((event) => ({
    id: event.id,
    kind: "evento",
    title: event.title,
    date: parseBrDate(event.date),
    dateLabel: event.date,
    location: event.location,
    image: event.image,
    href: event.href,
  }));

  const fromCourses: AgendaItem[] = getUpcomingCourses(today, courseList).map((course) => ({
    id: course.id,
    kind: "curso",
    title: course.title,
    date: parseBrDate(course.nextClass!),
    dateLabel: course.nextClass!,
    location: course.location,
    image: course.image,
    href: course.href,
  }));

  const items = [...fromEvents, ...fromCourses].sort((a, b) => a.date.getTime() - b.date.getTime());
  return limit === undefined ? items : items.slice(0, limit);
}
