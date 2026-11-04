import { StaticImageData } from "next/image";

/** "aberto": turmas com inscrição aberta; "customizado": feito sob medida para uma instituição. */
export type CourseKind = "aberto" | "customizado";

export interface Course {
  id: string;
  title: string;
  description: string;
  kind: CourseKind;
  image?: StaticImageData;
  href?: string;
  /** Data da próxima turma, em "dd/mm/aaaa". Sem data, o card mostra "Próxima turma em breve". */
  nextClass?: string;
  /** Último dia da turma, em "dd/mm/aaaa". */
  classEnd?: string;
  /** Prazo de matrícula, em "dd/mm/aaaa". Com prazo, o card mostra "Inscrições abertas". */
  enrollmentUntil?: string;
  /** Modalidade e carga horária, como "Presencial · 23 h". */
  format?: string;
  location?: string;
  /** Instituição que contratou o curso customizado. */
  client?: string;
  year?: number;
  published?: boolean;
}
