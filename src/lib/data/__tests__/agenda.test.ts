import { describe, expect, it } from "vitest";
import { getAgenda } from "@/lib/data/agenda";
import type { EventData } from "@/lib/data/events";
import type { Course } from "@/lib/types/course";

const today = new Date(2026, 9, 27);

const mockEvents: EventData[] = [
  { id: "sexta-nov", title: "Sexta de novembro", description: "", showInHome: false, date: "27/11/2026", location: "Insper" },
  { id: "sexta-out", title: "Sexta de outubro", description: "", showInHome: false, date: "30/10/2026", location: "Insper" },
  { id: "passado", title: "Evento passado", description: "", showInHome: false, date: "10/09/2026" },
  { id: "oculto", title: "Oculto", description: "", showInHome: false, date: "01/12/2026", published: false },
  { id: "gravado", title: "Gravado", description: "", showInHome: false, date: "2025", isTransmitted: true },
];

const mockCourses: Course[] = [
  { id: "seguranca", title: "Segurança viária", description: "", kind: "aberto", nextClass: "05/11/2026", location: "Insper" },
  { id: "sem-data", title: "Sem data", description: "", kind: "aberto" },
  { id: "bid", title: "BID", description: "", kind: "customizado", year: 2025 },
];

describe("getAgenda", () => {
  it("junta eventos e turmas futuras, do mais próximo para o mais distante", () => {
    const items = getAgenda(today, mockEvents, mockCourses);
    expect(items.map((i) => i.id)).toEqual(["sexta-out", "seguranca", "sexta-nov"]);
  });

  it("marca o tipo de cada item", () => {
    const items = getAgenda(today, mockEvents, mockCourses);
    expect(items.map((i) => i.kind)).toEqual(["evento", "curso", "evento"]);
  });

  it("guarda a data no formato do site", () => {
    const [first] = getAgenda(today, mockEvents, mockCourses);
    expect(first.dateLabel).toBe("30/10/2026");
    expect(first.location).toBe("Insper");
  });

  it("limita o número de itens quando pedido", () => {
    expect(getAgenda(today, mockEvents, mockCourses, 2)).toHaveLength(2);
  });
});
