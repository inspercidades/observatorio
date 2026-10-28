import type { ReactNode } from "react";

interface AgendaSectionProps {
  title: string;
  subtitle?: string;
  /** Cor do quadrado ao fim da linha: vermelho em Eventos, amarelo em Cursos. */
  accentColor: string;
  children: ReactNode;
}

/** Seção das páginas de Eventos e Cursos: título, linha e quadrado colorido. */
export function AgendaSection({ title, subtitle, accentColor, children }: AgendaSectionProps) {
  return (
    <section className="px-4 2xl:px-16 py-20 pb-30">
      <div className="flex items-end justify-between mb-16">
        <h2 className="text-4xl font-medium leading-none">
          {title}
          {subtitle ? (
            <span className="block text-gray-400">{subtitle}</span>
          ) : null}
        </h2>
        <div className="hidden md:block h-[1.2px] flex-grow mx-16 bg-gray-300" />
        <div className="hidden md:block w-4 h-4" style={{ backgroundColor: accentColor }} />
      </div>
      {children}
    </section>
  );
}
