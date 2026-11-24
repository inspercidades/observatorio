import sextaVideo15 from "@/app/assets/images/sexta_mobilidade_15.jpg"
import sextaVideo14 from "@/app/assets/images/sexta_mobilidade_14.jpg"
import sextaVideo13 from "@/app/assets/images/sexta_mobilidade_13.jpg"
import sextaVideo12 from "@/app/assets/images/sexta_mobilidade_12.jpg"
import sextaVideo11 from "@/app/assets/images/sexta_mobilidade_11.jpg"
import sextaVideo10 from "@/app/assets/images/sexta_mobilidade_10.jpg"
import sextaVideo9 from "@/app/assets/images/sexta_mobilidade_9.jpg"
import sextaVideo8 from "@/app/assets/images/sexta_mobilidade_8.jpg"
import sextaVideo2 from "@/app/assets/images/sexta_mobilidade_2.jpg"
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
import mobifilm2026 from "@/app/assets/images/mobifilm_2026.webp"
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

/** Uma mesa ou painel com participação do Observatório. */
export interface EventSession {
  stage: string
  title: string
  date: string
  time: string
  track?: string
  summary?: string
  /** Quem do Observatório participa e em qual papel. */
  onms: { name: string; role: string }[]
  speakers?: string[]
  moderation?: string
}

export interface EventData {
  id: string
  title: string
  description: string
  image?: StaticImageData
  href?: string
  showInHome: boolean
  date: string
  isTransmitted?: boolean
  series?: "sexta-da-mobilidade"
  /** URL da gravação; href mantém a página original do evento. */
  videoUrl?: string
  published?: boolean
  location?: string
  /** Data final, em "dd/mm/aaaa", para eventos de mais de um dia. */
  endDate?: string
  /** Texto mais longo para a página do evento. */
  about?: string
  /** Participação do Observatório. Com sessões, o card leva à página do evento. */
  sessions?: EventSession[]
  /** Pessoas do Observatório confirmadas, com sessão ainda a definir. */
  attendees?: { name: string; note?: string }[]
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
    href: "https://abxtrilhamobilidadeurbana.framer.website/",
    showInHome: false,
    date: "01/10/2026",
    location: "São Paulo",
  },
  {
    id: "connected-smart-cities-2026",
    title: "Connected Smart Cities 2026: Parque da Mobilidade Urbana",
    description: "16/11/2026 • Expo Center Norte",
    image: connectedSmartCities,
    href: "https://evento.connectedsmartcities.com.br",
    showInHome: false,
    date: "16/11/2026",
    location: "Expo Center Norte, São Paulo",
    endDate: "18/11/2026",
    about:
      "O Observatório participa do Connected Smart Cities 2026 no Parque da Mobilidade Urbana, com mesas sobre o novo marco do transporte público, mobilidade inclusiva, gestão do trânsito e uso de dados no governo.",
    sessions: [
      {
        stage: "Palco PMU 13 · Mobilidade que Inclui",
        title: "Inovação e modernização da gestão da mobilidade urbana: do novo marco à transformação do setor",
        date: "17/11/2026",
        time: "10h30 às 11h30",
        track: "Mobilidade Inclusiva",
        summary:
          "O novo Marco Legal do Transporte Público Coletivo Urbano amplia a agenda de transparência, planejamento e gestão de dados e reforça o papel do SIMU. O painel debate como estados e municípios podem transformar essas diretrizes em capacidade de gestão, projetos estruturados e melhores serviços.",
        onms: [{ name: "Sérgio Avelleda", role: "Palestrante" }],
        speakers: [
          "Maína Celidonio, Secretária Municipal de Transportes, Prefeitura do Rio de Janeiro",
          "Leiner Bastos, Gerente de Soluções, Banco do Brasil",
          "João Lucas Albuquerque, Gerente de Mobilidade, FNP",
          "Marcos Daniel Souza dos Santos, Secretário Nacional de Mobilidade Urbana, Ministério das Cidades",
        ],
      },
      {
        stage: "Palco PMU 13 · Mobilidade que Inclui",
        title: "Mobilidade como política pública",
        date: "17/11/2026",
        time: "11h45 às 12h45",
        track: "Mobilidade Inclusiva",
        summary:
          "A organização do transporte urbano exige articulação entre municípios, estados e União para viabilizar sistemas integrados.",
        onms: [{ name: "Vinicius Oike", role: "Palestrante" }],
        speakers: [
          "Ricardo Silva, Prefeito, Prefeitura de Ribeirão Preto",
          "Bruna Pengo, Coordenadora de Projetos, Instituto Cidades Responsivas",
          "Andrei Cossetin, Prefeito, Prefeitura de Ijuí",
          "Jocelia Marcimiano Gorla, Gerente de Planejamento de Trânsito e Urbanização, Prefeitura de Londrina",
        ],
        moderation: "Ana Nassar, Diretora de Programas, ITDP",
      },
      {
        stage: "Palco PMU 14 · Mobilidade no Tempo Real",
        title: "Tecnologia para gestão do trânsito nas cidades",
        date: "17/11/2026",
        time: "16h30 às 17h30",
        track: "Tecnologia",
        summary:
          "Como semáforos inteligentes, monitoramento e análise de dados estão sendo usados para reduzir congestionamentos e melhorar a fluidez urbana.",
        onms: [{ name: "Vinicius Oike", role: "Moderador" }],
        speakers: [
          "Ana Carolina Carvalho, Arquiteta Urbanista, Metrics Mobilidade",
          "Rafael Rueda Muhlmann, Secretário de Inovação, Modernização e Transformação Digital, Prefeitura de São José dos Pinhais",
          "Emanuele Cassimiro, Diretora de Relacionamento e Estratégia, Primova",
          "Milton Roberto Persoli, Diretor-Presidente, CET",
        ],
      },
      {
        stage: "Palco PMU 16 · Mobilidade que Descarboniza",
        title: "Políticas públicas para mobilidade sustentável",
        date: "17/11/2026",
        time: "16h30 às 17h30",
        summary: "Como estruturar políticas de longo prazo para redução de emissões.",
        onms: [{ name: "Suzana Nogueira", role: "Participante" }],
        speakers: ["Letícia Sabino, Diretora Presidente, Instituto Caminhabilidade"],
      },
      {
        stage: "Palco GOV 2 · Governo Orientado por Dados",
        title: "Uso avançado de dados: analytics e predição na gestão pública",
        date: "18/11/2026",
        time: "15h15 às 16h15",
        track: "Ética e Governança de Dados",
        summary: "Como dados podem antecipar demandas e melhorar decisões.",
        onms: [{ name: "Vinicius Oike", role: "Moderador" }],
        speakers: [
          "Ricardo Marinho Soares Braz, Coordenador do Escritório de Dados, Prefeitura de Niterói",
          "Sérvio Túlio Teixeira e Silva, Secretário Executivo da Presidência, TCE-GO",
          "Marcos Monteiro, Secretário Municipal de Infraestrutura Urbana e Obras, Prefeitura de São Paulo",
        ],
      },
    ],
  },
  {
    id: "sexta-da-mobilidade-seguranca-viaria-2026",
    series: "sexta-da-mobilidade",
    title: "Sexta da Mobilidade: dados e estratégias de segurança viária",
    description: "30/10/2026 • Sexta da Mobilidade",
    image: sextaMobilidadeSegurancaViaria2026,
    href: "https://www.insper.edu.br/pt/eventos/2026/10/sexta-da-mobilidade-dados-e-estrategias-de-seguranca-viaria",
    showInHome: false,
    date: "30/10/2026",
    location: "Sexta da Mobilidade",
  },
  {
    id: "mobifilm-2026",
    title: "Mobifilm 2026: VI Festival Brasileiro de Filmes sobre Mobilidade Urbana",
    description: "12/11/2026 • Insper",
    image: mobifilm2026,
    href: "https://www.mobifilm.com.br/",
    showInHome: false,
    date: "12/11/2026",
    endDate: "14/11/2026",
    location: "Insper",
    about:
      "O festival reúne 37 filmes em sete categorias, nove sessões de cinema, dois seminários e a cerimônia de premiação, com apresentação de Leona Cavalli. Entrada gratuita, com transmissão no YouTube do Mobifilm.",
    sessions: [
      {
        stage: "Abertura",
        title: "Abertura oficial do festival",
        date: "12/11/2026",
        time: "9h30",
        onms: [{ name: "Tomás Alvim", role: "Abertura" }],
      },
      {
        stage: "Seminário 1",
        title: "Os rumos do transporte público no Brasil",
        date: "12/11/2026",
        time: "10h às 12h",
        onms: [{ name: "Suzana Nogueira", role: "Palestrante" }],
        speakers: [
          "João Ronco Jr., Prodata Mobility Brasil",
          "Maurício Biazotto, Hitachi Rail",
          "Renata Ruggiero, Motiva",
        ],
        moderation: "Alexandre Pelegi, ANTP, Diário do Transporte e Podcast do Transporte",
      },
      {
        stage: "Seminário 2",
        title: "Violência de trânsito no Brasil: o que está mudando?",
        date: "13/11/2026",
        time: "10h às 12h",
        onms: [
          { name: "Sérgio Avelleda", role: "Moderador" },
          { name: "Adriano Borges", role: "Palestrante" },
        ],
        speakers: [
          "Luiz Carlos Néspoli, ANTP",
          "Ana Beatriz Monteiro Figueiredo, BID",
          "José Montal, ABRAMET",
        ],
      },
      {
        stage: "Premiação",
        title: "Cerimônia de premiação e encerramento",
        date: "14/11/2026",
        time: "14h às 17h",
        summary: "Júri formado por Eliane Caffé, Leonardo Kehdi e Sérgio Kieling.",
        onms: [{ name: "Sérgio Avelleda", role: "Entrega o prêmio principal" }],
      },
    ],
  },
  {
    id: "sexta-da-mobilidade-novembro-2026",
    series: "sexta-da-mobilidade",
    title: "Sexta da Mobilidade: Coalizão pela Transição Climática - Atualização e avanços no setor dos Transportes",
    description: "27/11/2026 • Sexta da Mobilidade",
    image: sextaMobilidadeNovembro2026,
    href: "https://www.insper.edu.br/pt/eventos/2026/11/sexta-da-mobilidade-coalizacao-pela-transicao-climatica-atualizacao-e-avancos-no-setor-dos-transportes",
    showInHome: false,
    date: "27/11/2026",
    location: "Sexta da Mobilidade",
    about: "O evento contará com a participação de Renata Ruggiero (Motiva), Daniela Mignani (CEDBS), Erica Vieira Marcos (CNT) e Thais Esteves (BCG), com mediação de Suzana Nogueira e Sergio Avelleda. Sexta-feira, 27 de novembro, das 12h às 14h. Local: Rua Quatá, 67 - sala 521 (ou online, via Zoom).",
  },

  // Sexta da Mobilidade
  // Fontes e datas dos encontros: src/lib/data/__tests__/fixtures/sexta-da-mobilidade-2026-11-02.json.
  {
    id: "transmitted1",
    isTransmitted: true,
    title: "Soluções baseadas na natureza e mobilidade urbana",
    description: "Sexta da Mobilidade",
    image: transmitted1,
    showInHome: false,
    date: "30/08/2024",
    location: "Sexta da Mobilidade",
    href: "https://youtu.be/IfodUOjixfk",
  },
  {
    id: "transmitted2",
    isTransmitted: true,
    title: "Dados e mobilidade urbana",
    description: "Sexta da Mobilidade",
    image: sextaVideo2,
    showInHome: false,
    date: "25/10/2024",
    location: "Sexta da Mobilidade",
    href: "https://youtu.be/81MLQuaW0aY",
  },
  {
    id: "transmitted3",
    isTransmitted: true,
    title: "Soluções brasileiras para o futuro da mobilidade: o caso do Aeromóvel",
    description: "Sexta da Mobilidade",
    image: transmitted3,
    showInHome: false,
    date: "29/11/2024",
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
    date: "21/02/2025",
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
    date: "21/03/2025",
    location: "Sexta da Mobilidade",
    href: "https://youtu.be/z8mLOna5ry4",
  },
  {
    id: "transmitted6",
    isTransmitted: true,
    title: "Segurança viária e Visão Zero: como eliminar mortes e feridos graves na cidade",
    description: "Sexta da Mobilidade",
    image: transmitted6,
    showInHome: false,
    date: "30/05/2025",
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
    date: "27/06/2025",
    location: "Sexta da Mobilidade",
    href: "https://www.youtube.com/watch?v=-J_Ol823NFc&list=PLw0ygoHfe_jMvdGpI8WhU1-CIVEWm1-k-&index=8",
  },
  {
    id: "transmitted8",
    isTransmitted: true,
    title: "Como acelerar a expansão de metrô/trens metropolitanos nas cidades do Brasil?",
    description: "Sexta da Mobilidade",
    image: sextaVideo8,
    showInHome: false,
    date: "29/08/2025",
    location: "Sexta da Mobilidade",
    href: "https://youtu.be/uhPqjkp7DKo",
  },
  {
    id: "transmitted9",
    isTransmitted: true,
    title: "Urbanismo social e teleférico – soluções latino-americanas + Insper Cidades",
    description: "Sexta da Mobilidade",
    image: sextaVideo9,
    showInHome: false,
    date: "26/09/2025",
    location: "Sexta da Mobilidade",
    href: "https://youtu.be/_5J9ZKNlcCI",
  },
  {
    id: "transmitted10",
    isTransmitted: true,
    title: "A mobilidade urbana liderada por mulheres",
    description: "Sexta da Mobilidade",
    image: sextaVideo10,
    showInHome: false,
    date: "31/10/2025",
    location: "Sexta da Mobilidade",
    href: "https://youtu.be/KC3H6yN_wvQ",
  },
  {
    id: "transmitted11",
    isTransmitted: true,
    title: "Uso de dados em favor da segurança viária",
    description: "Sexta da Mobilidade",
    image: sextaVideo11,
    showInHome: false,
    date: "28/11/2025",
    location: "Sexta da Mobilidade",
    href: "https://youtu.be/z-SlSZB8umQ",
  },
  {
    id: "transmitted12",
    isTransmitted: true,
    title: "Tarifa zero: o avanço dos subsídios e da tarifa zero nas cidades brasileiras",
    description: "Sexta da Mobilidade",
    image: sextaVideo12,
    showInHome: false,
    date: "27/02/2026",
    location: "Sexta da Mobilidade",
    href: "https://youtu.be/OsVRaGqENIc",
  },
  {
    id: "transmitted13",
    isTransmitted: true,
    title: "Eleições 26: pautas estratégicas para a agenda federal da mobilidade urbana",
    description: "Sexta da Mobilidade",
    image: sextaVideo13,
    showInHome: false,
    date: "24/04/2026",
    location: "Sexta da Mobilidade",
    href: "https://youtu.be/-qAvQx0YvJA",
  },
  {
    id: "transmitted14",
    isTransmitted: true,
    title: "Mobilidade nas eleições 2026: segurança viária",
    description: "Sexta da Mobilidade",
    image: sextaVideo14,
    showInHome: false,
    date: "29/05/2026",
    location: "Sexta da Mobilidade",
    href: "https://youtu.be/D0EivrvXzj0",
  },
  {
    id: "transmitted15",
    isTransmitted: true,
    title: "Mobilidade nas eleições 2026: descarbonização do transporte",
    description: "Sexta da Mobilidade",
    image: sextaVideo15,
    showInHome: false,
    date: "26/06/2026",
    location: "Sexta da Mobilidade",
    href: "https://youtu.be/NDYDMJvKzbw",
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
/** Último dia do evento; para eventos de um dia, a própria data. */
function lastDay(event: EventData): Date {
  return parseBrDate(event.endDate ?? event.date)
}

export function getUpcomingEvents(today = startOfToday(), events: EventData[] = eventsData): EventData[] {
  return getPublishedEvents(events)
    .filter((event) => lastDay(event) >= today)
    .sort(byDateAscending)
}

export function getPastEvents(today = startOfToday(), events: EventData[] = eventsData): EventData[] {
  return getPublishedEvents(events)
    .filter((event) => lastDay(event) < today)
    .sort(byDateDescending)
}

/** Seções exclusivas da página de eventos; a agenda da home preserva os realizados recentes. */
export function getEventSections(today = startOfToday(), events: EventData[] = eventsData) {
  const past = getPastEvents(today, events)
  const sexta = [
    ...past.filter((event) => event.series === "sexta-da-mobilidade"),
    ...events.filter((event) => event.isTransmitted && event.published !== false),
  ].sort(byDateDescending)
  return {
    upcoming: getUpcomingEvents(today, events),
    sexta,
    past: past.filter((event) => event.series !== "sexta-da-mobilidade"),
  }
}

export function isVideoPending(event: EventData): boolean {
  return event.series === "sexta-da-mobilidade" && !event.videoUrl && !event.isTransmitted
}

export function getEventsForHome(): EventData[] {
  return eventsData
    .filter((event) => event.showInHome && event.published !== false)
    .sort(byDateDescending)
}

export function getAllEvents(): EventData[] {
  return eventsData
}

export function getEventById(id: string, events: EventData[] = eventsData): EventData | undefined {
  return getPublishedEvents(events).find((event) => event.id === id)
}

/** Link do card: página interna quando há detalhes da participação, senão o link externo. */
export function getEventHref(event: EventData): string | undefined {
  return event.sessions?.length || event.attendees?.length ? `/eventos/${event.id}` : event.href
}
