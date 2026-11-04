import { describe, expect, it } from "vitest";
import { formatDateRange, parseBrDate, startOfToday } from "@/lib/data/dates";

describe("formatDateRange", () => {
  it("mostra só a data quando o evento tem um dia", () => {
    expect(formatDateRange("30/10/2026")).toBe("30/10/2026");
  });

  it("junta dias do mesmo mês", () => {
    expect(formatDateRange("17/11/2026", "19/11/2026")).toBe("17 a 19/11/2026");
  });

  it("mostra os dois meses quando o evento atravessa o mês", () => {
    expect(formatDateRange("30/10/2026", "02/11/2026")).toBe("30/10 a 02/11/2026");
  });

  it("mostra os dois anos quando o evento atravessa o ano", () => {
    expect(formatDateRange("30/12/2026", "02/01/2027")).toBe("30/12/2026 a 02/01/2027");
  });
});

describe("parseBrDate", () => {
  it("converte dd/mm/aaaa para o calendário local", () => {
    const date = parseBrDate("30/10/2026");
    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(9);
    expect(date.getDate()).toBe(30);
  });

  it("recusa ano solto e dia inexistente", () => {
    expect(() => parseBrDate("2025")).toThrow(/Data inválida/);
    expect(() => parseBrDate("31/02/2026")).toThrow(/Data inválida/);
  });
});

describe("startOfToday", () => {
  it("usa o calendário de São Paulo", () => {
    const today = startOfToday();
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Sao_Paulo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(new Date());
    const read = (type: Intl.DateTimeFormatPartTypes) =>
      Number(parts.find((part) => part.type === type)?.value);

    expect(today.getFullYear()).toBe(read("year"));
    expect(today.getMonth()).toBe(read("month") - 1);
    expect(today.getDate()).toBe(read("day"));
  });
});
