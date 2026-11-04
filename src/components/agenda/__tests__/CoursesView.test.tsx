import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CoursesView } from "@/components/agenda/CoursesView";
import type { Course } from "@/lib/types/course";

const open: Course[] = [
  {
    id: "gestao",
    title: "Gestão da Mobilidade",
    description: "",
    kind: "aberto",
    nextClass: "10/03/2027",
    enrollmentUntil: "08/03/2027",
    href: "https://ee.insper.edu.br/gestao",
  },
  { id: "seguranca", title: "Segurança Viária", description: "", kind: "aberto" },
];

const custom: Course[] = [
  {
    id: "seinfra",
    title: "Transporte Metropolitano",
    description: "Planejamento e regulação de sistemas metropolitanos.",
    kind: "customizado",
    client: "SEINFRA-MG",
    year: 2026,
    format: "Híbrido · 40 h",
  },
  { id: "imersao", title: "Imersão Brasil-Colômbia", description: "", kind: "customizado", year: 2024 },
];

describe("CoursesView", () => {
  it("mostra os grupos de cursos abertos, sob demanda e realizados", () => {
    render(<CoursesView upcoming={[]} open={open} custom={custom} />);
    expect(screen.getByRole("heading", { name: /abertos/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /sob demanda/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /realizados/i })).toBeInTheDocument();
  });

  it("esconde 'Inscrições abertas' quando não há turma marcada", () => {
    render(<CoursesView upcoming={[]} open={open} custom={custom} />);
    expect(screen.queryByRole("heading", { name: /inscrições abertas/i })).not.toBeInTheDocument();
  });

  it("mostra 'Inscrições abertas' com as turmas marcadas", () => {
    render(<CoursesView upcoming={[open[0]]} open={open} custom={custom} />);
    expect(screen.getByRole("heading", { name: /inscrições abertas/i })).toBeInTheDocument();
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

  it("mostra o formato e a descrição dos customizados", () => {
    render(<CoursesView upcoming={[]} open={open} custom={custom} />);
    expect(screen.getByText("Híbrido · 40 h")).toBeInTheDocument();
    expect(screen.getByText("Planejamento e regulação de sistemas metropolitanos.")).toBeInTheDocument();
  });

  it("oferece contato por e-mail para cursos customizados", () => {
    render(<CoursesView upcoming={[]} open={open} custom={custom} />);
    const cta = screen.getByRole("link", { name: /fale conosco/i });
    expect(cta).toHaveAttribute("href", expect.stringContaining("mailto:mobilidade@insper.edu.br"));
  });

  it("destaca o curso com inscrições abertas e o prazo", () => {
    render(<CoursesView upcoming={[open[0]]} open={open} custom={custom} />);
    expect(screen.getByRole("heading", { name: /inscrições abertas/i })).toBeInTheDocument();
    expect(screen.getAllByText("Inscrições abertas até 08/03/2027").length).toBeGreaterThan(0);
  });

  it("não marca como aberto o curso sem prazo de inscrição", () => {
    render(<CoursesView upcoming={[]} open={[open[1]]} custom={custom} />);
    expect(screen.queryByText(/Inscrições abertas até/)).not.toBeInTheDocument();
  });
});
