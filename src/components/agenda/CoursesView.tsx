import { AgendaSection } from "@/components/agenda/AgendaSection";
import { FeaturedCourseCard, WideCard, WideGrid } from "@/components/agenda/AgendaCards";
import { CUSTOM_COURSES_EMAIL, enrollmentLabel } from "@/lib/data/courses";
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
        <AgendaSection title="Inscrições abertas" accentColor={ACCENT}>
          <div className="flex flex-col gap-8">
            {upcoming.map((course) => (
              <FeaturedCourseCard
                key={course.id}
                title={course.title}
                description={course.description}
                details={[
                  course.classEnd ? `Aulas de ${course.nextClass} a ${course.classEnd}` : `Início em ${course.nextClass}`,
                  [course.format, course.location].filter(Boolean).join(" · "),
                ].filter(Boolean)}
                image={course.image}
                href={course.href}
                badge={enrollmentLabel(course)}
              />
            ))}
          </div>
        </AgendaSection>
      ) : null}

      <AgendaSection title="Cursos" subtitle="abertos" accentColor={ACCENT}>
        <WideGrid>
          {open.map((course) => (
            <WideCard
              key={course.id}
              title={course.title}
              meta={nextClassLabel(course)}
              image={course.image}
              href={course.href}
              badge={enrollmentLabel(course)}
            />
          ))}
        </WideGrid>
      </AgendaSection>

      <AgendaSection title="Cursos" subtitle="sob demanda" accentColor={ACCENT} compact>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <p className="max-w-2xl text-gray-700">
            Desenhamos cursos sob medida para governos, agências e instituições, com conteúdo baseado nos
            dados e nas pesquisas do Observatório. Conte o tema, o público e o formato (presencial, híbrido
            ou online), e montamos a proposta com a equipe.
          </p>
          <a
            href={`mailto:${CUSTOM_COURSES_EMAIL}?subject=${encodeURIComponent("Curso customizado")}`}
            className="inline-block shrink-0 bg-black text-white text-sm font-medium px-6 py-3 hover:bg-gray-800 transition-colors"
          >
            Fale conosco
          </a>
        </div>
      </AgendaSection>

      <AgendaSection title="Cursos" subtitle="realizados" accentColor={ACCENT}>
        <WideGrid>
          {custom.map((course) => (
            <WideCard
              key={course.id}
              title={course.title}
              meta={customLabel(course)}
              details={course.format}
              description={course.description}
              image={course.image}
            />
          ))}
        </WideGrid>
      </AgendaSection>
    </>
  );
}
