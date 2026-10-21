import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SortDropdown } from "@/components/catalogo/SortDropdown";

describe("SortDropdown", () => {
  it("exibe 'Mais recentes' quando currentSort é newest", () => {
    render(<SortDropdown onSortChange={vi.fn()} currentSort="newest" />);
    expect(screen.getByRole("button", { name: /mais recentes/i })).toBeInTheDocument();
  });

  it("exibe 'Menos recentes' quando currentSort é oldest", () => {
    render(<SortDropdown onSortChange={vi.fn()} currentSort="oldest" />);
    expect(screen.getByRole("button", { name: /menos recentes/i })).toBeInTheDocument();
  });

  it("chama onSortChange com 'oldest' ao clicar estando em newest", async () => {
    const onSortChange = vi.fn();
    const user = userEvent.setup();
    render(<SortDropdown onSortChange={onSortChange} currentSort="newest" />);

    await user.click(screen.getByRole("button"));

    expect(onSortChange).toHaveBeenCalledWith("oldest");
  });

  it("chama onSortChange com 'newest' ao clicar estando em oldest", async () => {
    const onSortChange = vi.fn();
    const user = userEvent.setup();
    render(<SortDropdown onSortChange={onSortChange} currentSort="oldest" />);

    await user.click(screen.getByRole("button"));

    expect(onSortChange).toHaveBeenCalledWith("newest");
  });
});
