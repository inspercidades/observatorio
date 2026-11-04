import { render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Eventos from "../page";

vi.mock("@/components/header", () => ({ Header: () => null }));

afterEach(() => vi.useRealTimers());

describe("Eventos", () => {
  it("mostra a Sexta realizada na série, com aviso e link do evento enquanto aguarda o vídeo", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 10, 2));
    render(<Eventos />);
    const title = screen.getByRole("heading", { name: "Sexta da Mobilidade: Dados e estratégias de segurança viária" });
    const card = title.parentElement!;
    expect(within(card).getByText("Vídeo em breve")).toBeInTheDocument();
    expect(card).toHaveAttribute("href", "https://www.insper.edu.br/pt/eventos/2026/10/sexta-da-mobilidade-dados-e-estrategias-de-seguranca-viaria");
    expect(card.closest("section")).toHaveTextContent("Sexta daMobilidade");
  });
});
