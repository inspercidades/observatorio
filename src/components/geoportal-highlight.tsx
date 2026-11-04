import { ArrowRight } from "lucide-react"
import Link from "next/link"

const FEATURES = ["Rotas de ônibus, metrô, ciclovias e embarques", "Sinistros de trânsito, densidade e renda (Censo 2022)"]

export function GeoPortalHighlight() {
  return (
    <section className="bg-[#2F2C2C] px-4 py-16 text-white 2xl:px-16">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[2fr_3fr]">
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-medium md:text-5xl">GeoPortal</h2>
          <p className="max-w-xl text-lg text-white/80">
            Mapa interativo com dados de mobilidade urbana de 12 cidades.
          </p>
          <ul className="flex flex-col gap-2 text-white/80">
            {FEATURES.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <span className="h-2 w-2 bg-[#C2181A]" />
                {feature}
              </li>
            ))}
          </ul>
          <Link
            href="/dados/geoportal"
            className="inline-flex w-fit items-center gap-2 bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-gray-200"
          >
            Explorar o GeoPortal <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <Link href="/dados/geoportal" className="block overflow-hidden rounded-lg shadow-2xl ring-1 ring-white/10">
          <video
            className="aspect-[16/9] w-full object-cover"
            src="/videos/geoportal.mp4"
            poster="/videos/geoportal-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            aria-label="Demonstração do GeoPortal"
          />
        </Link>
      </div>
    </section>
  )
}
