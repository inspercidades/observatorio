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
  location?: string;
  /** Instituição que contratou o curso customizado. */
  client?: string;
  year?: number;
  published?: boolean;
}
