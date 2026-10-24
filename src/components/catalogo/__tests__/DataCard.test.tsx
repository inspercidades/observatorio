import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DataCard } from "@/components/catalogo/DataCard";
import { mockItems } from "@/test/fixtures";

// Usa o card de sinistros: tem sourceLink, period, 2 formatos e 1 dataset
const item = mockItems[0];
// Usa o card motiva: multi-cidade, sem period, múltiplos datasets
const multiCityItem = mockItems[1];

describe("DataCard – card fechado", () => {
  it("renderiza o título do card", () => {
    render(<DataCard item={item} />);
    expect(screen.getByText(item.title)).toBeInTheDocument();
  });

  it("renderiza a descrição truncada (line-clamp)", () => {
    render(<DataCard item={item} />);
    expect(screen.getByText(item.description)).toBeInTheDocument();
  });

  it("renderiza a tag de tema", () => {
    render(<DataCard item={item} />);
    // A tag aparece no botão do card
    expect(screen.getByText("Segurança Viária")).toBeInTheDocument();
  });

  it("não mostra tag de cidade nem de formato", () => {
    render(<DataCard item={item} />);
    expect(screen.queryByText("São Paulo")).not.toBeInTheDocument();
    expect(screen.queryByText("Tabela")).not.toBeInTheDocument();
    expect(screen.queryByText("Georreferenciado")).not.toBeInTheDocument();
  });

  it("não mostra a região composta no card", () => {
    render(<DataCard item={multiCityItem} />);
    expect(
      screen.queryByText("Salvador, São Paulo e Rio de Janeiro"),
    ).not.toBeInTheDocument();
  });

  it("renderiza a tag de categoria", () => {
    render(<DataCard item={item} />);
    expect(screen.getByText("Sinistros de trânsito")).toBeInTheDocument();
  });

  it("mostra período e formatos no rodapé", () => {
    render(<DataCard item={item} />);
    expect(
      screen.getByText("2022–2025 · Tabela, Georreferenciado"),
    ).toBeInTheDocument();
  });

  it("limita a descrição a 3 linhas", () => {
    render(<DataCard item={item} />);
    expect(screen.getByText(item.description)).toHaveClass("line-clamp-3");
  });

  it("modal não está visível antes de clicar no card", () => {
    render(<DataCard item={item} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("DataCard – modal aberto", () => {
  it("abre o modal ao clicar no card", async () => {
    const user = userEvent.setup();
    render(<DataCard item={item} />);

    await user.click(screen.getByRole("button"));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("modal exibe o título do conjunto", async () => {
    const user = userEvent.setup();
    render(<DataCard item={item} />);
    await user.click(screen.getByRole("button"));

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveTextContent(item.title);
  });

  it("modal exibe a descrição completa", async () => {
    const user = userEvent.setup();
    render(<DataCard item={item} />);
    await user.click(screen.getByRole("button"));

    expect(screen.getByRole("dialog")).toHaveTextContent(item.description);
  });

  it("modal exibe as palavras-chave", async () => {
    const user = userEvent.setup();
    render(<DataCard item={item} />);
    await user.click(screen.getByRole("button"));

    const dialog = screen.getByRole("dialog");
    for (const kw of item.keywords) {
      expect(dialog).toHaveTextContent(kw);
    }
  });

  it("modal exibe o período quando presente", async () => {
    const user = userEvent.setup();
    render(<DataCard item={item} />);
    await user.click(screen.getByRole("button"));

    expect(screen.getByRole("dialog")).toHaveTextContent(item.period!);
  });

  it("modal exibe o nome da fonte com link quando sourceLink existe", async () => {
    const user = userEvent.setup();
    render(<DataCard item={item} />);
    await user.click(screen.getByRole("button"));

    expect(screen.getByRole("dialog")).toHaveTextContent("Fonte original dos dados");
    expect(screen.getByRole("dialog")).toHaveTextContent("Categoria");
    expect(screen.queryByText("Segurança Viária • São Paulo")).not.toBeInTheDocument();

    const link = screen.getByRole("link", { name: /INFOSIGA SP/i });
    expect(link).toHaveAttribute("href", item.sourceLink);
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("modal exibe o título e o botão Acessar para cada dataset", async () => {
    const user = userEvent.setup();
    render(<DataCard item={item} />);
    await user.click(screen.getByRole("button"));

    for (const ds of item.dataset_info) {
      expect(screen.getByText(ds.dataset_title)).toBeInTheDocument();
    }
    expect(screen.getAllByRole("button", { name: /acessar/i })).toHaveLength(
      item.dataset_info.length,
    );
  });

  it("botão Acessar abre o link do dataset em nova aba", async () => {
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    const user = userEvent.setup();
    render(<DataCard item={item} />);
    await user.click(screen.getByRole("button"));

    await user.click(screen.getByRole("button", { name: /acessar/i }));

    expect(open).toHaveBeenCalledWith(
      item.dataset_info[0].dataset_link,
      "_blank",
      "noopener,noreferrer",
    );
    open.mockRestore();
  });

  it("modal abre imediatamente quando initialOpen=true", () => {
    render(<DataCard item={item} initialOpen={true} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("modal fecha ao pressionar Escape", async () => {
    const user = userEvent.setup();
    render(<DataCard item={item} />);
    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});
