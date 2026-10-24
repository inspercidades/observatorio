import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CatalogFilters } from "@/components/catalogo/CatalogFilters";
import { mockCategories } from "@/test/fixtures";

describe("CatalogFilters", () => {
  const defaultProps = {
    onFiltersChange: vi.fn(),
    filterOptions: mockCategories,
  };

  it("renderiza os grupos de filtros", () => {
    render(<CatalogFilters {...defaultProps} />);
    expect(screen.getByText("Tema")).toBeInTheDocument();
    expect(screen.getByText("Região")).toBeInTheDocument();
    expect(screen.getByText("Categoria")).toBeInTheDocument();
    expect(screen.getByText("Formato")).toBeInTheDocument();
  });

  it("renderiza todas as opções de tema", () => {
    render(<CatalogFilters {...defaultProps} />);
    for (const theme of mockCategories.themes) {
      expect(screen.getByLabelText(theme)).toBeInTheDocument();
    }
  });

  it("renderiza todas as regiões no menu", async () => {
    const user = userEvent.setup();
    render(<CatalogFilters {...defaultProps} />);

    await user.click(screen.getByRole("combobox", { name: /região/i }));

    for (const city of mockCategories.cities) {
      expect(screen.getByRole("option", { name: city })).toBeInTheDocument();
    }
  });

  it("nenhum checkbox está marcado por padrão", () => {
    render(<CatalogFilters {...defaultProps} />);
    const checkboxes = screen.getAllByRole("checkbox");
    for (const cb of checkboxes) {
      expect(cb).not.toBeChecked();
    }
  });

  it("marcar um tema chama onFiltersChange com { theme: valor }", async () => {
    const onFiltersChange = vi.fn();
    const user = userEvent.setup();
    render(
      <CatalogFilters
        {...defaultProps}
        onFiltersChange={onFiltersChange}
      />,
    );

    await user.click(screen.getByLabelText("Segurança Viária"));

    expect(onFiltersChange).toHaveBeenCalledWith(
      expect.objectContaining({ theme: "Segurança Viária" }),
    );
  });

  it("clicar no mesmo tema duas vezes deseleciona (toggle)", async () => {
    const onFiltersChange = vi.fn();
    const user = userEvent.setup();
    render(
      <CatalogFilters
        {...defaultProps}
        onFiltersChange={onFiltersChange}
      />,
    );

    await user.click(screen.getByLabelText("Segurança Viária"));
    await user.click(screen.getByLabelText("Segurança Viária"));

    // segunda chamada deve limpar o tema
    expect(onFiltersChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ theme: undefined }),
    );
  });

  it("escolher uma região chama onFiltersChange com { region: valor }", async () => {
    const onFiltersChange = vi.fn();
    const user = userEvent.setup();
    render(
      <CatalogFilters
        {...defaultProps}
        onFiltersChange={onFiltersChange}
      />,
    );

    await user.click(screen.getByRole("combobox", { name: /região/i }));
    await user.click(screen.getByRole("option", { name: "Fortaleza" }));

    expect(onFiltersChange).toHaveBeenCalledWith(
      expect.objectContaining({ region: "Fortaleza" }),
    );
  });

  it("quando initialFilters é atualizado externamente, sincroniza o estado", () => {
    const { rerender } = render(
      <CatalogFilters {...defaultProps} initialFilters={{}} />,
    );

    // Simula limpeza de filtros pelo pai
    rerender(
      <CatalogFilters
        {...defaultProps}
        initialFilters={{ theme: undefined, region: undefined }}
      />,
    );

    const checkboxes = screen.getAllByRole("checkbox");
    for (const cb of checkboxes) {
      expect(cb).not.toBeChecked();
    }
  });
});
