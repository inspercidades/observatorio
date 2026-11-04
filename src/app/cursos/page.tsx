import { CoursesView } from "@/components/agenda/CoursesView";
import { Header } from "@/components/header";
import { getCustomCourses, getOpenCourses, getUpcomingCourses } from "@/lib/data/courses";

// Atualiza a cada hora. O dia da agenda segue America/Sao_Paulo.
export const revalidate = 3600;

export default function Cursos() {
  return (
    <div className="bg-[#f9f9f6]">
      <Header className="bg-[#f9f9f6]" />
      <CoursesView upcoming={getUpcomingCourses()} open={getOpenCourses()} custom={getCustomCourses()} />
    </div>
  );
}
