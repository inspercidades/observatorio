import { AgendaSection } from "@/components/agenda/AgendaSection";
import { WideCard, WideGrid } from "@/components/agenda/AgendaCards";
import { CUSTOM_COURSES_EMAIL } from "@/lib/data/courses";
import type { Course } from "@/lib/types/course";

const ACCENT = "#F7A703";

interface CoursesViewProps {
  upcoming: Course[];
  open: Course[];
  custom: Course[];
}

function nextClassLabel(course: Course) {
  return course.nextClass ? `Próxima turma: ${course.nextClass}` : "Próxima turma em breve";
}

function customLabel(course: Course) {
  return [course.client, course.year].filter(Boolean).join(" • ");
}

export function CoursesView({ upcoming, open, custom }: CoursesViewProps) {
  return (
    <>
      {upcoming.length > 0 ? (
        <AgendaSection title="Na agenda" accentColor={ACCENT}>
          <WideGrid>
            {upcoming.map((course) => (
              <WideCard
                key={course.id}
                title={course.title}
                meta={[course.nextClass, course.location].filter(Boolean).join(" • ")}
                image={course.image}
                href={course.href}
              />
            ))}
          </WideGrid>
        </AgendaSection>
      ) : null}

      <AgendaSection title="Cursos" subtitle="recorrentes" accentColor={ACCENT}>
        <WideGrid>
          {open.map((course) => (
            <WideCard
              key={course.id}
              title={course.title}
              meta={nextClassLabel(course)}
              image={course.image}
              href={course.href}
            />
          ))}
        </WideGrid>
      </AgendaSection>

      <AgendaSection title="Cursos" subtitle="customizados" accentColor={ACCENT}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <p className="max-w-2xl text-gray-700">
            Desenhamos cursos sob medida para governos, agências e instituições, com conteúdo baseado nos
            dados e nas pesquisas do Observatório.
          </p>
          <a
            href={`mailto:${CUSTOM_COURSES_EMAIL}?subject=${encodeURIComponent("Curso customizado")}`}
            className="inline-block shrink-0 bg-black text-white text-sm font-medium px-6 py-3 hover:bg-gray-800 transition-colors"
          >
            Fale conosco
          </a>
        </div>
        <WideGrid>
          {custom.map((course) => (
            <WideCard
              key={course.id}
              title={course.title}
              meta={customLabel(course)}
              image={course.image}
            />
          ))}
        </WideGrid>
      </AgendaSection>
    </>
  );
}
