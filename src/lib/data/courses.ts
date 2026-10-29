import curso1 from "@/app/assets/images/curso1.png";
import curso2 from "@/app/assets/images/curso2.png";
import curso3 from "@/app/assets/images/curso3.png";
import curso4 from "@/app/assets/images/curso4.png";
import cursoSegurancaViaria from "@/app/assets/images/curso_seguranca_viaria.webp";
import { parseBrDate, startOfToday } from "@/lib/data/dates";
import { Course } from "@/lib/types/course";

export const CUSTOM_COURSES_EMAIL = "mobilidade@insper.edu.br";

export const courses: Course[] = [
  // Cursos abertos (recorrentes)
  {
    id: "cidades-inteligentes",
    title: "Gestão da Mobilidade Urbana: Uma via para Cidades Inteligentes e Sustentáveis",
    description: "Como avançar com soluções inovadoras alinhadas a diferentes contextos urbanos?",
    kind: "aberto",
    image: curso1,
    href: "https://ee.insper.edu.br/cursos/cidades/gestao-da-mobilidade-urbana-uma-via-para-cidades-inteligentes-e-sustentaveis/",
  },
  {
    id: "financiamento-transporte",
    title: "Gestão da Mobilidade Urbana: Financiamento do Transporte Público",
    description: "Como usar a economia do transporte para recuperar a qualidade e a demanda no transporte público.",
    kind: "aberto",
    image: curso2,
    href: "https://ee.insper.edu.br/cursos/cidades/gestao-da-mobilidade-urbana-financiamento-do-transporte-publico/",
  },
  {
    id: "seguranca-viaria",
    title: "Gestão da Mobilidade Urbana: Segurança Viária",
    description: "Segurança viária e visão zero: uma via para cidades mais seguras.",
    kind: "aberto",
    image: cursoSegurancaViaria,
    href: "https://ee.insper.edu.br/cursos/cidades/gestao-da-mobilidade-urbana-seguranca-viaria/",
  },

  // Cursos customizados
  {
    id: "seinfra-mg-transporte-metropolitano",
    title: "Planejamento, Gestão Estratégica e Regulação de Sistemas de Transporte Metropolitano",
    description: "Curso híbrido para a equipe técnica da SEINFRA-MG.",
    kind: "customizado",
    client: "SEINFRA-MG",
    year: 2026,
  },
  {
    id: "descarbonizacao-transporte",
    title: "A descarbonização do transporte no Brasil: caminhos futuros para um plano nacional",
    description: "Curso executivo customizado para o BID.",
    kind: "customizado",
    client: "BID",
    year: 2025,
    image: curso3,
  },
  {
    id: "imersao-brasil-colombia",
    title: "Imersão Brasil-Colômbia",
    description: "O que aprender da experiência de urbanismo social da Colômbia: uma jornada a partir da mobilidade urbana.",
    kind: "customizado",
    year: 2024,
    image: curso4,
  },
];

function getPublishedCourses(list: Course[]) {
  return list.filter((course) => course.published !== false);
}

/** Turmas de hoje em diante, da mais próxima para a mais distante. */
export function getUpcomingCourses(today = startOfToday(), list: Course[] = courses): Course[] {
  return getPublishedCourses(list)
    .filter((course) => course.nextClass && parseBrDate(course.nextClass) >= today)
    .sort((a, b) => parseBrDate(a.nextClass!).getTime() - parseBrDate(b.nextClass!).getTime());
}

export function getOpenCourses(list: Course[] = courses): Course[] {
  return getPublishedCourses(list).filter((course) => course.kind === "aberto");
}

/** Cursos customizados, do mais recente para o mais antigo. */
export function getCustomCourses(list: Course[] = courses): Course[] {
  return getPublishedCourses(list)
    .filter((course) => course.kind === "customizado")
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
}
