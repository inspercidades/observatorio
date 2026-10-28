import connectedSmartCities from "@/app/assets/images/connected_smart_cities_2026.webp"
import events1 from "@/app/assets/images/events1.png"
import events2 from "@/app/assets/images/events2.png"
import events3 from "@/app/assets/images/events3.png"
import events4 from "@/app/assets/images/events4.png"
import events5 from "@/app/assets/images/events5.png"
import events6 from "@/app/assets/images/events6.png"
import events8 from "@/app/assets/images/events8.png"
import events9 from "@/app/assets/images/events9.png"
import lancamentoAvaliacao from "@/app/assets/images/lancamentoavaliacao.jpg"
import lancamentoOms from "@/app/assets/images/lancamentooms.jpg"
import sextaMobilidadeNovembro2026 from "@/app/assets/images/sexta_da_mobilidade_novembro_2026.webp"
import sextaMobilidadeSegurancaViaria2026 from "@/app/assets/images/sexta_da_mobilidade_seguranca_viaria_2026.webp"
import trilhaMobilidade from "@/app/assets/images/trilha_mobilidade.webp"
import transmitted1 from "@/app/assets/images/transmitted1.png"
import transmitted3 from "@/app/assets/images/transmitted3.png"
import transmitted4 from "@/app/assets/images/transmitted4.png"
import transmitted5 from "@/app/assets/images/transmitted5.png"
import transmitted6 from "@/app/assets/images/transmitted6.png"
import transmitted7 from "@/app/assets/images/transmitted7.png"
import video7 from "@/app/assets/images/video7.png"
import { StaticImageData } from "next/image"
import { parseBrDate, startOfToday } from "@/lib/data/dates"

export interface EventData {
  id: string
  title: string
  description: string
  image?: StaticImageData
  href?: string
  showInHome: boolean
  date: string
  isTransmitted?: boolean
  published?: boolean
  location?: string
}

export const eventsData: EventData[] = [
  {
    id: "semana-sem-carro",
    title: "Semana sem Carro",
    description: "15/09/2023 • Insper",
    image: events6,
    href: "https://www.insper.edu.br/pt/agenda-de-eventos/dia-mundial-sem-carro",
    showInHome: true,
    date: "15/09/2023",
    location: "Insper",
  },
  {
    id: "lancamento-onms",
    title: "Lançamento do Observatório Nacional de Mobilidade Sustentável",
    description: "19/09/2023 • Insper",
    image: events1,
    href: "https://www.insper.edu.br/pt/noticias/2023/9/insper-e-ccr-lancam-observatorio-nacional-de-mobilidade-sustenta",
    showInHome: false,
    published: false,
    date: "19/09/2023",
    location: "Insper",
  },
  {
    id: "seminario-climate-resiliency",
    title: "Climate Resiliency and Low-carbon Accessibility Seminar",
    description: "17/10/2023 • Insper",
    image: events2,
    href: "https://www.insper.edu.br/content/insper-portal/pt/agenda-de-eventos/international-seminar.html",
    showInHome: true,
    date: "17/10/2023",
    location: "Insper",
  },
  {
    id: "apresentacao-rio-de-janeiro",
    title: "Apresentação do Observatório para a comunidade do Rio de Janeiro",
    description: "31/12/2023 • Museu do Amanhã",
    image: events4,
    showInHome: true,
    date: "31/12/2023",
    location: "Museu do Amanhã",
  },
  {
    id: "gestao-metropolitana",
    title: "Gestão metropolitana: desafios e oportunidades",
    description: "02/05/2024 • Insper",
    image: events5,
    href: "https://www.insper.edu.br/content/insper-portal/pt/noticias/2024/5/como-integrar-os-sistemas-de-transporte-das-regioes-metropolitan.html",
    showInHome: true,
    date: "02/05/2024",
    location: "Insper",
  },
  {
    id: "observatorio-latino-americano",
    title: "Observatório Latino-Americano de Mobilidade",
    description: "01/06/2024 • Medellín",
    image: events3,
    showInHome: true,
    date: "01/06/2024",
    location: "Medellín",
  },
  {
    id: "lancamento-guia-eletromobilidade",
    title: "Lançamento do Guia de Eletromobilidade",
    description: "20/09/2024 • Insper",
    image: video7,
    href: "https://www.insper.edu.br/content/insper-portal/pt/eventos/2024/09/mobilidade-sustentavel-na-agenda-da-cop-30-impactos-no-meio-ambiente-e-mudanca-climatica.html",
    showInHome: false,
    date: "20/09/2024",
    location: "Insper",
  },
  {
    id: "apresentacao-coalizao-cop30",
    title: "Apresentação Coalizão pela Descarbonização – COP30",
    description: "26/11/2024 • Brasília",
    image: events9,
    href: "https://www.cnt.org.br/agencia-cnt/coalizo-pela-descarbonizao-do-setor-de-transporte-para-a-cop30--lanada-em-evento-na-cnt",
    showInHome: false,
    date: "26/11/2024",
    location: "Brasília",
  },
  {
    id: "lancamento-rede-de-cidades",
    title: "Lançamento da Rede de Cidades do Observatório Nacional de Mobilidade Sustentável",
    description: "01/04/2025 • Insper",
    image: lancamentoOms,
    href: "https://www.insper.edu.br/content/insper-portal/pt/eventos/2025/04/lancamento-da-rede-de-cidades-do-observatorio-nacional-de-mobilidade-sustentavel-do-insper-cidades.html",
    showInHome: false,
    date: "01/04/2025",
    location: "Insper",
  },
  {
    id: "lancamento-faixa-azul",
    title: "Lançamento: “Avaliação do impacto da Faixa Azul nos sinistros e mortes no trânsito em São Paulo”",
    description: "02/09/2025 • São Paulo",
    image: lancamentoAvaliacao,
    href: "https://www.insper.edu.br/pt/eventos/2025/09/lancamento-da-pesquisa-avaliacao-do-impacto-da-faixa-azul-nos-sinistros-e-mortes-no-transito-em-sao-paulo",
    showInHome: false,
    date: "02/09/2025",
    location: "São Paulo",
  },
  {
    id: "lancamento-coalizao-cop30",
    title: "Lançamento da Coalizão COP30",
    description: "11/11/2025 • Brasília",
    image: events8,
    href: "https://www.cnnbrasil.com.br/nacional/brasil/na-cop30-coalizao-pela-descarbonizacao-dos-transportes-tem-121-adesoes/",
    showInHome: false,
    date: "11/11/2025",
    location: "Brasília",
  },
  {
    id: "trilha-mobilidade-abx-26",
    title: "Trilha da Mobilidade Urbana: ABX 26",
    description: "01/10/2026 • São Paulo",
    image: trilhaMobilidade,
    href: "http://archive.today/2026.10.03-202500/https://abxtrilhamobilidadeurbana.framer.website/",
    showInHome: false,
    date: "01/10/2026",
    location: "São Paulo",
  },
  {
    id: "connected-smart-cities-2026",
    title: "Connected Smart Cities 2026: Parque da Mobilidade Urbana",
    description: "17/11/2026 • São Paulo",
    image: connectedSmartCities,
    href: "https://evento.connectedsmartcities.com.br",
    showInHome: false,
    date: "17/11/2026",
    location: "São Paulo",
  },
  {
    id: "sexta-da-mobilidade-seguranca-viaria-2026",
    title: "Sexta da Mobilidade: Dados e estratégias de segurança viária",
    description: "30/10/2026 • Sexta da Mobilidade",
    image: sextaMobilidadeSegurancaViaria2026,
    href: "https://www.insper.edu.br/pt/eventos/2026/10/sexta-da-mobilidade-dados-e-estrategias-de-seguranca-viaria",
    showInHome: false,
    date: "30/10/2026",
    location: "Sexta da Mobilidade",
  },
  {
    id: "sexta-da-mobilidade-novembro-2026",
    title: "Sexta da Mobilidade: última edição do ano de 2026",
    description: "27/11/2026 • Sexta da Mobilidade",
    image: sextaMobilidadeNovembro2026,
    showInHome: false,
    date: "27/11/2026",
    location: "Sexta da Mobilidade",
  },

  // Sexta da Mobilidade
  {
    id: "transmitted1",
    isTransmitted: true,
    title: "Soluções baseadas na natureza e mobilidade urbana",
    description: "Sexta da Mobilidade",
    image: transmitted1,
    showInHome: false,
    date: "2025",
    location: "Sexta da Mobilidade",
    href: "https://youtu.be/IfodUOjixfk",
  },
  {
    id: "transmitted2",
    isTransmitted: true,
    title: "Dados e Mobilidade Urbana",
    description: "Sexta da Mobilidade",
    image: transmitted1,
    showInHome: false,
    date: "2025",
    location: "Sexta da Mobilidade",
    href: "https://youtu.be/81MLQuaW0aY",
  },
  {
    id: "transmitted3",
    isTransmitted: true,
    title: "Soluções brasileiras para o futuro da Mobilidade, o caso do Aeromóvel",
    description: "Sexta da Mobilidade",
    image: transmitted3,
    showInHome: false,
    date: "2025",
    location: "Sexta da Mobilidade",
    href: "https://youtu.be/rAv5NNZWByQ",
  },
  {
    id: "transmitted4",
    isTransmitted: true,
    title: "COP 30: o que precisamos para descarbonizar a mobilidade urbana",
    description: "Sexta da Mobilidade",
    image: transmitted4,
    showInHome: false,
    date: "2025",
    location: "Sexta da Mobilidade",
    href: "https://youtu.be/wWF66SLgErs",
  },
  {
    id: "transmitted5",
    isTransmitted: true,
    title: "Como São Paulo se locomove: debates dos principais resultados da pesquisa Origem e Destino da Região Metropolitana de São Paulo (RMSP)",
    description: "Sexta da Mobilidade",
    image: transmitted5,
    showInHome: false,
    date: "2025",
    location: "Sexta da Mobilidade",
    href: "https://youtu.be/z8mLOna5ry4",
  },
  {
    id: "transmitted6",
    isTransmitted: true,
    title: "Segurança viária e visão 0 - Como eliminar mortes/feridos graves na cidade",
    description: "Sexta da Mobilidade",
    image: transmitted6,
    showInHome: false,
    date: "2025",
    location: "Sexta da Mobilidade",
    href: "https://www.youtube.com/watch?v=yk3ffu7kuys&list=PLw0ygoHfe_jMvdGpI8WhU1-CIVEWm1-k-&index=7",
  },
  {
    id: "transmitted7",
    isTransmitted: true,
    title: "Combustíveis alternativos e a descarbonização",
    description: "Sexta da Mobilidade",
    image: transmitted7,
    showInHome: false,
    date: "2025",
    location: "Sexta da Mobilidade",
    href: "https://www.youtube.com/watch?v=-J_Ol823NFc&list=PLw0ygoHfe_jMvdGpI8WhU1-CIVEWm1-k-&index=8",
  },
]

function getPublishedEvents(events: EventData[] = eventsData) {
  return events.filter((event) => event.published !== false && !event.isTransmitted)
}

function byDateAscending(a: EventData, b: EventData) {
  return parseBrDate(a.date).getTime() - parseBrDate(b.date).getTime()
}

function byDateDescending(a: EventData, b: EventData) {
  return byDateAscending(b, a)
}

/** Eventos de hoje em diante, do mais próximo para o mais distante. */
export function getUpcomingEvents(today = startOfToday(), events: EventData[] = eventsData): EventData[] {
  return getPublishedEvents(events)
    .filter((event) => parseBrDate(event.date) >= today)
    .sort(byDateAscending)
}

export function getPastEvents(): EventData[] {
  const today = startOfToday()
  return getPublishedEvents()
    .filter((event) => parseBrDate(event.date) < today)
    .sort(byDateDescending)
}

export function getTransmittedEvents(): EventData[] {
  return eventsData.filter((event) => event.isTransmitted).reverse()
}

export function getEventsForHome(): EventData[] {
  return eventsData
    .filter((event) => event.showInHome && event.published !== false)
    .sort(byDateDescending)
}

export function getAllEvents(): EventData[] {
  return eventsData
}
