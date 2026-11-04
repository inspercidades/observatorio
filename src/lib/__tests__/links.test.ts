import { describe, expect, it } from "vitest";
import { classifyHref } from "@/lib/links";

describe("classifyHref", () => {
  it("trata caminho do site como interno", () => {
    expect(classifyHref("/eventos/csc")).toEqual({ kind: "internal", href: "/eventos/csc" });
  });

  it("trata http e https como externos", () => {
    expect(classifyHref("https://ee.insper.edu.br/gestao")?.kind).toBe("external");
    expect(classifyHref("http://example.com")?.kind).toBe("external");
  });

  it("recusa javascript e protocolo relativo", () => {
    expect(classifyHref("javascript:alert(1)")).toBeNull();
    expect(classifyHref("//evil.example")).toBeNull();
  });
});
