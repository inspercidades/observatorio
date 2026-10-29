import { CoursesView } from "@/components/agenda/CoursesView";
import { Header } from "@/components/header";
import { getCustomCourses, getOpenCourses, getUpcomingCourses } from "@/lib/data/courses";

// Regera a página uma vez por dia para mover itens de "Na agenda" conforme a data.
export const revalidate = 86400;

export default function Cursos() {
  return (
    <div className="bg-[#f9f9f6]">
      <Header className="bg-[#f9f9f6]" />
      <CoursesView upcoming={getUpcomingCourses()} open={getOpenCourses()} custom={getCustomCourses()} />
    </div>
  );
}
