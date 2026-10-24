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

  it("encontra sem acento no título e na descrição", () => {
    const result = searchItems(mockItems, "transito");
    expect(result.map((item) => item.id)).toContain("sinistros-sao-paulo");
    expect(searchItems(mockItems, "sao paulo").map((item) => item.id)).toContain(
      "sinistros-sao-paulo",
    );
  });

  it("encontra niteroi sem acento pelo nome da cidade", () => {
    const items = [
      {
        ...mockItems[0],
        id: "niteroi",
        title: "Passageiros – Niterói",
        region: "Niterói",
        cities: ["Niterói"],
      },
    ];
    expect(searchItems(items, "niteroi")).toHaveLength(1);
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

  // Região – usa .some() em cities[] porque cards podem ter múltiplas cidades
  it("filtra por região com match em cidade única", () => {
    const result = filterItems(mockItems, { region: "Fortaleza" });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("gtfs-fortaleza");
  });

  it("filtra por região e encontra card multi-cidade (motiva)", () => {
    const resultSalvador = filterItems(mockItems, { region: "Salvador" });
    const resultSP = filterItems(mockItems, { region: "São Paulo" });
    const resultRJ = filterItems(mockItems, { region: "Rio de Janeiro" });

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

  it("retorna vazio quando nenhum card tem a região", () => {
    expect(filterItems(mockItems, { region: "Manaus" })).toHaveLength(0);
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
      region: "São Paulo",
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("sinistros-sao-paulo");
  });

  it("retorna vazio quando filtros combinados não batem em nenhum card", () => {
    const result = filterItems(mockItems, {
      theme: "Mobilidade por Bicicleta",
      region: "São Paulo",
    });
    expect(result).toHaveLength(0);
  });
});

// ─── sortItems ────────────────────────────────────────────────────────────────

describe("sortItems", () => {
  it("ordena os títulos em ordem alfabética (pt-BR)", () => {
    const sorted = sortItems(mockItems);
    expect(sorted.map((item) => item.id)).toEqual([
      "motiva-trem-metro",
      "gtfs-fortaleza",
      "ciclovias-belo-horizonte",
      "sinistros-sao-paulo",
    ]);
  });

  it("não muta o array original", () => {
    const original = [...mockItems];
    sortItems(mockItems);
    expect(mockItems.map((i) => i.id)).toEqual(original.map((i) => i.id));
  });
});
