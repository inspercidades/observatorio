import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SelectedFilters } from "@/components/catalogo/SelectedFilters";

describe("SelectedFilters", () => {
  it("não renderiza nada quando nenhum filtro está ativo", () => {
    const { container } = render(
      <SelectedFilters filters={{}} onRemoveFilter={vi.fn()} onClearAll={vi.fn()} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("exibe chip para filtro de tema ativo", () => {
    render(
      <SelectedFilters
        filters={{ theme: "Segurança Viária" }}
        onRemoveFilter={vi.fn()}
        onClearAll={vi.fn()}
      />,
    );
    expect(screen.getByText("Segurança Viária")).toBeInTheDocument();
  });

  it("exibe chips para todos os filtros ativos simultaneamente", () => {
    render(
      <SelectedFilters
        filters={{
          theme: "Mobilidade por Bicicleta",
          region: "Belo Horizonte",
          subject: "Infraestrutura cicloviária",
          format: "Georreferenciado",
        }}
        onRemoveFilter={vi.fn()}
        onClearAll={vi.fn()}
      />,
    );
    expect(screen.getByText("Mobilidade por Bicicleta")).toBeInTheDocument();
    expect(screen.getByText("Belo Horizonte")).toBeInTheDocument();
    expect(screen.getByText("Infraestrutura cicloviária")).toBeInTheDocument();
    expect(screen.getByText("Georreferenciado")).toBeInTheDocument();
  });

  it("chama onRemoveFilter com o tipo correto ao clicar no X do chip", async () => {
    const onRemoveFilter = vi.fn();
    const user = userEvent.setup();
    render(
      <SelectedFilters
        filters={{ theme: "Segurança Viária" }}
        onRemoveFilter={onRemoveFilter}
        onClearAll={vi.fn()}
      />,
    );

    // O chip de tema tem um botão × dentro dele
    const removeBtn = screen.getByRole("button", { name: "" }); // botão com ícone X
    await user.click(removeBtn);

    expect(onRemoveFilter).toHaveBeenCalledWith("theme");
  });

  it("chama onClearAll ao clicar em Limpar", async () => {
    const onClearAll = vi.fn();
    const user = userEvent.setup();
    render(
      <SelectedFilters
        filters={{ region: "São Paulo" }}
        onRemoveFilter={vi.fn()}
        onClearAll={onClearAll}
      />,
    );

    await user.click(screen.getByRole("button", { name: /limpar/i }));

    expect(onClearAll).toHaveBeenCalledOnce();
  });
});
