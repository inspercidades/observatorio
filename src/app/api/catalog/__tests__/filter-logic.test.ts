import { describe, expect, it } from "vitest";
import {
  filterItems,
  searchItems,
  sortItems,
} from "@/app/api/catalog/route";
import { mockItems } from "@/test/fixtures";

// ─── searchItems ─────────────────────────────────────────────────────────────

describe("searchItems", () => {
  it("retorna todos os itens quando o termo está vazio", () => {
    expect(searchItems(mockItems, "")).toHaveLength(mockItems.length);
  });

  it("retorna todos os itens quando o termo é só espaços", () => {
    expect(searchItems(mockItems, "   ")).toHaveLength(mockItems.length);
  });

  it("encontra pelo título (case-insensitive)", () => {
    const result = searchItems(mockItems, "sinistros");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("sinistros-sao-paulo");
  });

  it("encontra pela descrição", () => {
    const result = searchItems(mockItems, "shapefile");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("ciclovias-belo-horizonte");
  });

  it("encontra por palavra-chave do array keywords", () => {
    const result = searchItems(mockItems, "VLT");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("motiva-trem-metro");
  });

  it("busca é case-insensitive", () => {
    expect(searchItems(mockItems, "GTFS")).toHaveLength(
      searchItems(mockItems, "gtfs").length,
    );
  });

  it("retorna array vazio quando nenhum item bate", () => {
    expect(searchItems(mockItems, "xyzzy-inexistente")).toHaveLength(0);
  });
});

// ─── filterItems ─────────────────────────────────────────────────────────────

describe("filterItems", () => {
  it("retorna todos quando nenhum filtro está ativo", () => {
    expect(filterItems(mockItems, {})).toHaveLength(mockItems.length);
  });

  // Tema
  it("filtra por tema com match exato", () => {
    const result = filterItems(mockItems, { theme: "Segurança Viária" });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("sinistros-sao-paulo");
  });

  it("filtra por tema de forma case-insensitive", () => {
    const upper = filterItems(mockItems, { theme: "SEGURANÇA VIÁRIA" });
    const normal = filterItems(mockItems, { theme: "Segurança Viária" });
    expect(upper).toHaveLength(normal.length);
  });

  it("retorna vazio quando nenhum card tem o tema", () => {
    expect(filterItems(mockItems, { theme: "Saúde" })).toHaveLength(0);
  });

  // Cidade – usa .some() porque cards podem ter múltiplas cidades
  it("filtra por cidade com match em cidade única", () => {
    const result = filterItems(mockItems, { city: "Fortaleza" });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("gtfs-fortaleza");
  });

  it("filtra por cidade e encontra card multi-cidade (motiva)", () => {
    const resultSalvador = filterItems(mockItems, { city: "Salvador" });
    const resultSP = filterItems(mockItems, { city: "São Paulo" });
    const resultRJ = filterItems(mockItems, { city: "Rio de Janeiro" });

    // motiva-trem-metro tem cities: ["Salvador", "São Paulo", "Rio de Janeiro"]
    // sinistros-sao-paulo tem cities: ["São Paulo"]
    expect(resultSalvador.map((i) => i.id)).toContain("motiva-trem-metro");
    expect(resultSP.map((i) => i.id)).toContain("motiva-trem-metro");
    expect(resultSP.map((i) => i.id)).toContain("sinistros-sao-paulo");
    expect(resultRJ.map((i) => i.id)).toContain("motiva-trem-metro");

    // O campo region composto ("Salvador, São Paulo e Rio de Janeiro") não deve
    // ser usado para filtrar – apenas cities[]
    expect(resultSalvador.find((i) => i.id === "sinistros-sao-paulo")).toBeUndefined();
  });

  it("retorna vazio quando nenhum card tem a cidade", () => {
    expect(filterItems(mockItems, { city: "Manaus" })).toHaveLength(0);
  });

  // Assunto
  it("filtra por assunto com match exato", () => {
    const result = filterItems(mockItems, { subject: "Trem e metrô" });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("motiva-trem-metro");
  });

  // Formato – usa .some() porque cards podem ter múltiplos formatos
  it("filtra por formato único (GTFS)", () => {
    const result = filterItems(mockItems, { format: "GTFS" });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("gtfs-fortaleza");
  });

  it("filtra por formato e encontra card multi-formato (Tabela)", () => {
    const result = filterItems(mockItems, { format: "Tabela" });
    const ids = result.map((i) => i.id);
    // sinistros-sao-paulo tem ["Tabela", "Georreferenciado"]
    // motiva-trem-metro tem ["Tabela"]
    expect(ids).toContain("sinistros-sao-paulo");
    expect(ids).toContain("motiva-trem-metro");
    expect(ids).not.toContain("ciclovias-belo-horizonte"); // só Georreferenciado
  });

  it("filtra por formato Georreferenciado – inclui card multi-formato", () => {
    const result = filterItems(mockItems, { format: "Georreferenciado" });
    const ids = result.map((i) => i.id);
    expect(ids).toContain("sinistros-sao-paulo"); // tem Tabela + Georreferenciado
    expect(ids).toContain("ciclovias-belo-horizonte");
    expect(ids).not.toContain("gtfs-fortaleza");
  });

  // Filtros combinados (AND)
  it("combina dois filtros com lógica AND", () => {
    // Só sinistros-sao-paulo é Segurança Viária E São Paulo
    const result = filterItems(mockItems, {
      theme: "Segurança Viária",
      city: "São Paulo",
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("sinistros-sao-paulo");
  });

  it("retorna vazio quando filtros combinados não batem em nenhum card", () => {
    const result = filterItems(mockItems, {
      theme: "Mobilidade por Bicicleta",
      city: "São Paulo",
    });
    expect(result).toHaveLength(0);
  });
});

// ─── sortItems ────────────────────────────────────────────────────────────────

describe("sortItems", () => {
  it("ordena do mais recente para o mais antigo (newest)", () => {
    const sorted = sortItems(mockItems, "newest");
    const dates = sorted.map((i) => new Date(i.updatedAt).getTime());
    for (let i = 1; i < dates.length; i++) {
      expect(dates[i - 1]).toBeGreaterThanOrEqual(dates[i]);
    }
  });

  it("ordena do mais antigo para o mais recente (oldest)", () => {
    const sorted = sortItems(mockItems, "oldest");
    const dates = sorted.map((i) => new Date(i.updatedAt).getTime());
    for (let i = 1; i < dates.length; i++) {
      expect(dates[i - 1]).toBeLessThanOrEqual(dates[i]);
    }
  });

  it("newest coloca sinistros-sao-paulo (2026-08-13) em primeiro", () => {
    const sorted = sortItems(mockItems, "newest");
    expect(sorted[0].id).toBe("sinistros-sao-paulo");
  });

  it("oldest coloca gtfs-fortaleza (2025-09-15) em primeiro", () => {
    const sorted = sortItems(mockItems, "oldest");
    expect(sorted[0].id).toBe("gtfs-fortaleza");
  });

  it("não muta o array original", () => {
    const original = [...mockItems];
    sortItems(mockItems, "newest");
    expect(mockItems.map((i) => i.id)).toEqual(original.map((i) => i.id));
  });
});
