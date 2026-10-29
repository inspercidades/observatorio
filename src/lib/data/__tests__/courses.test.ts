import { describe, expect, it } from "vitest";
import { getCustomCourses, getOpenCourses, getUpcomingCourses } from "@/lib/data/courses";
import type { Course } from "@/lib/types/course";

const today = new Date(2026, 9, 27);

const mockCourses: Course[] = [
  { id: "gestao", title: "Gestão", description: "", kind: "aberto", nextClass: "10/03/2027" },
  { id: "financiamento", title: "Financiamento", description: "", kind: "aberto" },
  { id: "seguranca", title: "Segurança viária", description: "", kind: "aberto", nextClass: "05/11/2026" },
  { id: "antigo", title: "Turma passada", description: "", kind: "aberto", nextClass: "01/09/2026" },
  { id: "rascunho", title: "Rascunho", description: "", kind: "aberto", nextClass: "01/12/2026", published: false },
  { id: "bid", title: "BID", description: "", kind: "customizado", year: 2025 },
  { id: "imersao", title: "Imersão", description: "", kind: "customizado", year: 2024 },
  { id: "seinfra", title: "SEINFRA", description: "", kind: "customizado", year: 2026 },
];

describe("getUpcomingCourses", () => {
  it("devolve só turmas publicadas a partir de hoje, da mais próxima para a mais distante", () => {
    const ids = getUpcomingCourses(today, mockCourses).map((c) => c.id);
    expect(ids).toEqual(["seguranca", "gestao"]);
  });

  it("inclui turmas que começam hoje", () => {
    const ids = getUpcomingCourses(new Date(2026, 10, 5), mockCourses).map((c) => c.id);
    expect(ids).toContain("seguranca");
  });
});

describe("getOpenCourses", () => {
  it("devolve os cursos abertos publicados, na ordem do cadastro", () => {
    const ids = getOpenCourses(mockCourses).map((c) => c.id);
    expect(ids).toEqual(["gestao", "financiamento", "seguranca", "antigo"]);
  });
});

describe("getCustomCourses", () => {
  it("devolve os customizados do mais recente para o mais antigo", () => {
    const ids = getCustomCourses(mockCourses).map((c) => c.id);
    expect(ids).toEqual(["seinfra", "bid", "imersao"]);
  });
});
