import { describe, expect, it } from "vitest";
import { getEventById, getUpcomingEvents, type EventData } from "@/lib/data/events";

const mockEvents: EventData[] = [
  { id: "dezembro", title: "Dezembro", description: "", showInHome: false, date: "05/12/2026" },
  { id: "novembro", title: "Novembro", description: "", showInHome: false, date: "27/11/2026" },
  { id: "setembro", title: "Setembro", description: "", showInHome: false, date: "10/09/2026" },
];

describe("getUpcomingEvents", () => {
  it("mostra primeiro o evento mais próximo", () => {
    const ids = getUpcomingEvents(new Date(2026, 9, 27), mockEvents).map((e) => e.id);
    expect(ids).toEqual(["novembro", "dezembro"]);
  });
});

describe("getEventById", () => {
  it("encontra o evento publicado pelo id", () => {
    expect(getEventById("novembro", mockEvents)?.title).toBe("Novembro");
  });

  it("devolve undefined para id inexistente ou não publicado", () => {
    const hidden: EventData[] = [{ ...mockEvents[0], published: false }];
    expect(getEventById("dezembro", hidden)).toBeUndefined();
    expect(getEventById("nada", mockEvents)).toBeUndefined();
  });
});

describe("getUpcomingEvents com eventos de vários dias", () => {
  it("mantém na agenda o evento que já começou e ainda não terminou", () => {
    const multi: EventData[] = [
      { id: "festival", title: "Festival", description: "", showInHome: false, date: "25/10/2026", endDate: "28/10/2026" },
    ];
    expect(getUpcomingEvents(new Date(2026, 9, 27), multi).map((e) => e.id)).toEqual(["festival"]);
    expect(getUpcomingEvents(new Date(2026, 9, 29), multi)).toHaveLength(0);
  });
});
