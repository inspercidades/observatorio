import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AgendaHome } from "../agenda-home";

afterEach(() => vi.useRealTimers());

describe("AgendaHome", () => {
  it("sem eventos futuros, destaca o último evento como realizado", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2027, 1, 15));
    render(<AgendaHome />);

    expect(screen.getAllByText("Realizado").length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { level: 3, name: /última edição do ano de 2026/ })).toBeInTheDocument();
  });
});
