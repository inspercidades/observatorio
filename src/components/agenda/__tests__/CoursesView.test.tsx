import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CoursesView } from "@/components/agenda/CoursesView";
import type { Course } from "@/lib/types/course";

const open: Course[] = [
  { id: "gestao", title: "Gestão da Mobilidade", description: "", kind: "aberto", nextClass: "10/03/2027", href: "https://ee.insper.edu.br/gestao" },
  { id: "seguranca", title: "Segurança Viária", description: "", kind: "aberto" },
];

const custom: Course[] = [
  { id: "seinfra", title: "Transporte Metropolitano", description: "", kind: "customizado", client: "SEINFRA-MG", year: 2026 },
  { id: "imersao", title: "Imersão Brasil-Colômbia", description: "", kind: "customizado", year: 2024 },
];

describe("CoursesView", () => {
  it("mostra os grupos de cursos recorrentes e customizados", () => {
    render(<CoursesView upcoming={[]} open={open} custom={custom} />);
    expect(screen.getByRole("heading", { name: /recorrentes/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /customizados/i })).toBeInTheDocument();
  });

  it("esconde 'Na agenda' quando não há turma marcada", () => {
    render(<CoursesView upcoming={[]} open={open} custom={custom} />);
    expect(screen.queryByRole("heading", { name: "Na agenda" })).not.toBeInTheDocument();
  });

  it("mostra 'Na agenda' com as turmas marcadas", () => {
    render(<CoursesView upcoming={[open[0]]} open={open} custom={custom} />);
    expect(screen.getByRole("heading", { name: "Na agenda" })).toBeInTheDocument();
  });

  it("mostra a data da próxima turma ou 'Próxima turma em breve'", () => {
    render(<CoursesView upcoming={[]} open={open} custom={custom} />);
    expect(screen.getByText("Próxima turma: 10/03/2027")).toBeInTheDocument();
    expect(screen.getByText("Próxima turma em breve")).toBeInTheDocument();
  });

  it("liga o card do curso aberto à página da Educação Executiva", () => {
    render(<CoursesView upcoming={[]} open={open} custom={custom} />);
    const link = screen.getAllByRole("link").find((a) => a.getAttribute("href") === "https://ee.insper.edu.br/gestao");
    expect(link).toBeDefined();
  });

  it("mostra a instituição e o ano dos customizados", () => {
    render(<CoursesView upcoming={[]} open={open} custom={custom} />);
    expect(screen.getByText("SEINFRA-MG • 2026")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("oferece contato por e-mail para cursos customizados", () => {
    render(<CoursesView upcoming={[]} open={open} custom={custom} />);
    const cta = screen.getByRole("link", { name: /fale conosco/i });
    expect(cta).toHaveAttribute("href", expect.stringContaining("mailto:mobilidade@insper.edu.br"));
  });
});
