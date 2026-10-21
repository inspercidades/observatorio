import { Header } from "@/components/header"
import { VideoCard } from "@/components/video-card"

interface VideoData {
  id: number
  youtubeId: string
  title: string
  date: string
  format: string
  href: string
}

const serieVideosData: VideoData[] = [
  {
    id: 1,
    youtubeId: "4EUVQCj2NZ8",
    title: "Teaser",
    date: "26/09/2025",
    format: "Série Insper Cidades na Mobilidade",
    href: "https://www.youtube.com/watch?v=4EUVQCj2NZ8&list=PLw0ygoHfe_jNvLKVkH9sLstXyfChNwx_r&index=13",
  },
  {
    id: 2,
    youtubeId: "TG8uj64SAKo",
    title: "Urbanismo Social",
    date: "26/09/2025",
    format: "Série Insper Cidades na Mobilidade",
    href: "https://www.youtube.com/watch?v=TG8uj64SAKo&list=PLw0ygoHfe_jNvLKVkH9sLstXyfChNwx_r&index=10",
  },
  {
    id: 3,
    youtubeId: "9qGoebNb2pg",
    title: "COP 30",
    date: "10/10/2025",
    format: "Série Insper Cidades na Mobilidade",
    href: "https://www.youtube.com/watch?v=9qGoebNb2pg&list=PLw0ygoHfe_jNvLKVkH9sLstXyfChNwx_r&index=9",
  },
  {
    id: 4,
    youtubeId: "4g8QVsR3bvY",
    title: "Dados",
    date: "24/10/2025",
    format: "Série Insper Cidades na Mobilidade",
    href: "https://www.youtube.com/watch?v=4g8QVsR3bvY&list=PLw0ygoHfe_jNvLKVkH9sLstXyfChNwx_r&index=8",
  },
  {
    id: 5,
    youtubeId: "KjxxS5nkrpg",
    title: "Financiamento do Transporte Público",
    date: "30/10/2025",
    format: "Série Insper Cidades na Mobilidade",
    href: "https://www.youtube.com/watch?v=KjxxS5nkrpg&list=PLw0ygoHfe_jNvLKVkH9sLstXyfChNwx_r&index=7",
  },
  {
    id: 6,
    youtubeId: "TegcEnZHIMc",
    title: "Mobilidade Ativa",
    date: "07/11/2025",
    format: "Série Insper Cidades na Mobilidade",
    href: "https://www.youtube.com/watch?v=TegcEnZHIMc&list=PLw0ygoHfe_jNvLKVkH9sLstXyfChNwx_r&index=6",
  },
  {
    id: 7,
    youtubeId: "0IC1-STZE9k",
    title: "Saúde",
    date: "14/11/2025",
    format: "Série Insper Cidades na Mobilidade",
    href: "https://www.youtube.com/watch?v=0IC1-STZE9k&list=PLw0ygoHfe_jNvLKVkH9sLstXyfChNwx_r&index=5",
  },
  {
    id: 8,
    youtubeId: "F45qQPCDtJk",
    title: "Metropolização",
    date: "18/11/2025",
    format: "Série Insper Cidades na Mobilidade",
    href: "https://www.youtube.com/watch?v=F45qQPCDtJk&list=PLw0ygoHfe_jNvLKVkH9sLstXyfChNwx_r&index=4",
  },
  {
    id: 9,
    youtubeId: "eXuZqX-LdTc",
    title: "Mulheres e Territórios",
    date: "25/11/2025",
    format: "Série Insper Cidades na Mobilidade",
    href: "https://www.youtube.com/watch?v=eXuZqX-LdTc&list=PLw0ygoHfe_jNvLKVkH9sLstXyfChNwx_r&index=3",
  },
  {
    id: 10,
    youtubeId: "ZgZToOsXgs8",
    title: "Habitação",
    date: "09/12/2025",
    format: "Série Insper Cidades na Mobilidade",
    href: "https://www.youtube.com/watch?v=ZgZToOsXgs8&list=PLw0ygoHfe_jNvLKVkH9sLstXyfChNwx_r&index=2",
  },
  {
    id: 11,
    youtubeId: "1lDxZaarXUQ",
    title: "Segurança Viária",
    date: "17/12/2025",
    format: "Série Insper Cidades na Mobilidade",
    href: "https://www.youtube.com/watch?v=1lDxZaarXUQ&list=PLw0ygoHfe_jNvLKVkH9sLstXyfChNwx_r&index=1",
  },
]

const videosData: VideoData[] = [
  {
    id: 1,
    youtubeId: "THjcpBcWXVc",
    title: "Transporte público com Rodrigo Tortoriello",
    date: "07/08/2024",
    format: "Aula",
    href: "https://www.youtube.com/watch?v=THjcpBcWXVc&list=PLw0ygoHfe_jMnF_9uHlZTxwOpOpl1Mfvb&index=15",
  },
  {
    id: 2,
    youtubeId: "xJjdg5mv4LA",
    title: "Explorando a mobilidade ativa com Helena Coelho",
    date: "07/08/2024",
    format: "Aula",
    href: "https://www.youtube.com/watch?v=xJjdg5mv4LA&list=PLw0ygoHfe_jMnF_9uHlZTxwOpOpl1Mfvb&index=16",
  },
  {
    id: 3,
    youtubeId: "r-KXgkDMwMs",
    title: "Economia de transportes com Flávio Chevis",
    date: "07/08/2024",
    format: "Aula",
    href: "https://www.youtube.com/watch?v=r-KXgkDMwMs&list=PLw0ygoHfe_jMnF_9uHlZTxwOpOpl1Mfvb&index=17",
  },
  {
    id: 4,
    youtubeId: "rCcztslulJY",
    title: "Logística urbana com Fernando Picasso",
    date: "07/08/2024",
    format: "Aula",
    href: "https://www.youtube.com/watch?v=rCcztslulJY&list=PLw0ygoHfe_jMnF_9uHlZTxwOpOpl1Mfvb&index=18",
  },
]

const webinarsData: VideoData[] = [
  {
    id: 1,
    youtubeId: "7K_IlBFW6e4",
    title: "Mobilidade Humana: reflexões para uma mobilidade segura, sustentável e inclusiva",
    date: "29/02/2024",
    format: "Webinário",
    href: "https://www.youtube.com/watch?v=7K_IlBFW6e4&list=PLw0ygoHfe_jMnF_9uHlZTxwOpOpl1Mfvb&index=7",
  },
  {
    id: 2,
    youtubeId: "z0glTzGCCBA",
    title: "Segurança viária: como reduzir mortes e feridos",
    date: "08/05/2024",
    format: "Webinário",
    href: "https://www.youtube.com/watch?v=z0glTzGCCBA&list=PLw0ygoHfe_jMnF_9uHlZTxwOpOpl1Mfvb&index=8",
  },
  {
    id: 3,
    youtubeId: "Tw_h9wtDW4Q",
    title: "Descarbonização: a transição da mobilidade para além dos carros elétricos",
    date: "15/05/2024",
    format: "Webinário",
    href: "https://www.youtube.com/watch?v=Tw_h9wtDW4Q&list=PLw0ygoHfe_jMnF_9uHlZTxwOpOpl1Mfvb&index=9",
  },
  {
    id: 4,
    youtubeId: "GGbVzxv-dc0",
    title: "Como fomentar uma melhor governança para as integrações física, tarifárias e operacionais da mobilidade urbana?",
    date: "22/05/2024",
    format: "Webinário",
    href: "https://www.youtube.com/watch?v=GGbVzxv-dc0&list=PLw0ygoHfe_jMnF_9uHlZTxwOpOpl1Mfvb&index=10",
  },
]

interface VideoSectionProps {
  title: string
  subtitle?: string
  videos: VideoData[]
  className?: string
}

function VideoSection({ title, subtitle, videos, className }: VideoSectionProps) {
  return (
    <div className={className}>
      <div className="flex items-end justify-between mb-16">
        <div>
          <h2 className="text-4xl font-medium leading-none">{title}</h2>
          {subtitle ? (
            <p className="text-4xl text-gray-400 leading-none font-medium">{subtitle}</p>
          ) : null}
        </div>
        <div className="hidden md:block h-[1.2px] flex-grow mx-16 bg-gray-300" />
        <div className="hidden md:block w-4 h-4 bg-[#C2181A]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            youtubeId={video.youtubeId}
            title={video.title}
            date={video.date}
            format={video.format}
            href={video.href}
          />
        ))}
      </div>
    </div>
  )
}

export default function Videos() {
  return (
    <div className="bg-[#f9f9f6]">
      <Header className="bg-[#f9f9f6]" />

      <div className="px-4 2xl:px-16 py-20 pb-30">
        <VideoSection
          title="Série: Insper Cidades"
          subtitle="na Mobilidade"
          videos={serieVideosData}
        />
        <VideoSection
          className="mt-32"
          title="Vídeos aulas"
          subtitle="Assíncronas"
          videos={videosData}
        />
        <VideoSection
          className="mt-32"
          title="Webinários"
          videos={webinarsData}
        />
      </div>
    </div>
  )
}
