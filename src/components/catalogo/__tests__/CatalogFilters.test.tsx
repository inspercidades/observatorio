import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CatalogFilters } from "@/components/catalogo/CatalogFilters";
import { mockCategories } from "@/test/fixtures";

describe("CatalogFilters", () => {
  const defaultProps = {
    onFiltersChange: vi.fn(),
    filterOptions: mockCategories,
  };

  it("renderiza os 4 grupos de filtros", () => {
    render(<CatalogFilters {...defaultProps} />);
    expect(screen.getByText("Tema")).toBeInTheDocument();
    expect(screen.getByText("Cidade")).toBeInTheDocument();
    expect(screen.getByText("Assunto")).toBeInTheDocument();
    expect(screen.getByText("Formato")).toBeInTheDocument();
  });

  it("renderiza todas as opções de tema", () => {
    render(<CatalogFilters {...defaultProps} />);
    for (const theme of mockCategories.themes) {
      expect(screen.getByLabelText(theme)).toBeInTheDocument();
    }
  });

  it("renderiza todas as cidades", () => {
    render(<CatalogFilters {...defaultProps} />);
    for (const city of mockCategories.cities) {
      expect(screen.getByLabelText(city)).toBeInTheDocument();
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

  it("marcar uma cidade chama onFiltersChange com { city: valor }", async () => {
    const onFiltersChange = vi.fn();
    const user = userEvent.setup();
    render(
      <CatalogFilters
        {...defaultProps}
        onFiltersChange={onFiltersChange}
      />,
    );

    await user.click(screen.getByLabelText("Fortaleza"));

    expect(onFiltersChange).toHaveBeenCalledWith(
      expect.objectContaining({ city: "Fortaleza" }),
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
        initialFilters={{ theme: undefined, city: undefined }}
      />,
    );

    const checkboxes = screen.getAllByRole("checkbox");
    for (const cb of checkboxes) {
      expect(cb).not.toBeChecked();
    }
  });
});
