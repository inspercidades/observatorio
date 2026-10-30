import { AgendaHome } from "@/components/agenda-home"
import { HomePage } from "@/components/home-page"
import { ImpactNumbersSection } from "@/components/impact-numbers-section"
import catalog from "@/lib/data/new-catalog/catalog.json"

// Atualiza a cada hora. O dia da agenda segue America/Sao_Paulo.
export const revalidate = 3600

export default function Home() {
  return (
    <HomePage
      agenda={<AgendaHome />}
      impact={<ImpactNumbersSection datasetCount={catalog.length} />}
    />
  )
}
