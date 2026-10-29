import { describe, expect, it } from "vitest";
import { formatDateRange } from "@/lib/data/dates";

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
