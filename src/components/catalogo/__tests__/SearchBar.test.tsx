import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SearchBar } from "@/components/catalogo/SearchBar";

describe("SearchBar", () => {
  it("renderiza o campo de busca com placeholder padrão", () => {
    render(<SearchBar onSearch={vi.fn()} />);
    expect(
      screen.getByPlaceholderText("Pesquisar por palavra-chave"),
    ).toBeInTheDocument();
  });

  it("aceita placeholder customizado", () => {
    render(<SearchBar onSearch={vi.fn()} placeholder="Buscar datasets" />);
    expect(screen.getByPlaceholderText("Buscar datasets")).toBeInTheDocument();
  });

  it("exibe o valor inicial quando fornecido", () => {
    render(<SearchBar onSearch={vi.fn()} initialValue="GTFS" />);
    expect(screen.getByDisplayValue("GTFS")).toBeInTheDocument();
  });

  it("chama onSearch a cada caractere digitado", async () => {
    const onSearch = vi.fn();
    const user = userEvent.setup();
    render(<SearchBar onSearch={onSearch} />);

    await user.type(screen.getByRole("textbox"), "bilhet");

    expect(onSearch).toHaveBeenCalledTimes(6); // uma chamada por caractere
    expect(onSearch).toHaveBeenLastCalledWith("bilhet");
  });

  it("chama onSearch com string vazia ao limpar o campo", async () => {
    const onSearch = vi.fn();
    const user = userEvent.setup();
    render(<SearchBar onSearch={onSearch} initialValue="abc" />);

    await user.clear(screen.getByRole("textbox"));

    expect(onSearch).toHaveBeenLastCalledWith("");
  });
});
