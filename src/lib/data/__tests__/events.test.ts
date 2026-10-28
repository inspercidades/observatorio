import { describe, expect, it } from "vitest";
import { getUpcomingEvents, type EventData } from "@/lib/data/events";

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
