import type { CatalogItem, CatalogCategories } from "@/lib/catalog";

/** Conjunto mínimo de cards cobrindo os casos-limite dos filtros */
export const mockItems: CatalogItem[] = [
  {
    id: "sinistros-sao-paulo",
    title: "Sinistros de trânsito – São Paulo",
    description: "Sinistros de trânsito em São Paulo de 2022 a 2025, compatibilizados a partir do InfoSiga.",
    theme: "Segurança Viária",
    geographicScope: "Municipal",
    category: "Vigilância, Saúde e Atendimento às Vítimas",
    formats: ["Tabela", "Georreferenciado"], // multi-formato
    region: "São Paulo",
    cities: ["São Paulo"],
    source: "INFOSIGA SP",
    sourceLink: "https://dadosabertos.sp.gov.br",
    keywords: ["Sinistros", "Mobilidade Urbana", "Série histórica"],
    period: "2022–2025",
    updatedAt: "2026-08-13", // o mais recente
    tags: ["Segurança Viária", "Vigilância, Saúde e Atendimento às Vítimas"],
    dataset_info: [
      {
        dataset_title: "Sinistros de Trânsito – São Paulo [2022-2025]",
        dataset_description: "Dados individuais de sinistros.",
        dataset_link: "https://dataverse.example.com/1",
        dataset_period: "2022–2025",
        dataset_format: "Tabela",
      },
    ],
  },
  {
    // Card multi-cidade: deve aparecer ao filtrar por Salvador, SP ou RJ
    id: "motiva-trem-metro",
    title: "Embarques nas estações de trem e metrô da Motiva",
    description: "Embarques por estação nos sistemas operados pela Motiva.",
    theme: "Transporte Público Coletivo",
    geographicScope: "Metropolitana",
    category: "Demanda",
    formats: ["Tabela"],
    region: "Salvador, São Paulo e Rio de Janeiro", // string composta – NÃO está na lista de filtros
    cities: ["Salvador", "São Paulo", "Rio de Janeiro"],
    source: "Motiva",
    sourceLink: "https://www.motiva.com.br",
    keywords: ["Metrô", "VLT", "Transporte público", "Série histórica"],
    period: "2012–2025",
    updatedAt: "2026-07-30",
    tags: ["Transporte Público Coletivo", "Demanda"],
    dataset_info: [
      {
        dataset_title: "Embarques diários Motiva",
        dataset_description: "Embarques diários por estação.",
        dataset_link: "https://dataverse.example.com/2",
        dataset_format: "Tabela",
      },
    ],
  },
  {
    id: "ciclovias-belo-horizonte",
    title: "Rede cicloviária – Belo Horizonte",
    description: "Shapefile da rede cicloviária do município de Belo Horizonte.",
    theme: "Mobilidade por Bicicleta",
    geographicScope: "Municipal",
    category: "Infraestrutura viária",
    formats: ["Georreferenciado"],
    region: "Belo Horizonte",
    cities: ["Belo Horizonte"],
    source: "Prefeitura de Belo Horizonte",
    sourceLink: "https://dados.pbh.gov.br",
    keywords: ["Ciclovia", "Mobilidade ativa"],
    period: "2003–2025",
    updatedAt: "2025-11-09",
    tags: ["Mobilidade por Bicicleta", "Infraestrutura viária"],
    dataset_info: [
      {
        dataset_title: "Rede de Ciclovias – Belo Horizonte",
        dataset_description: "Shapefile da rede cicloviária.",
        dataset_link: "https://dataverse.example.com/3",
        dataset_format: "Georreferenciado",
      },
    ],
  },
  {
    id: "gtfs-fortaleza",
    title: "GTFS dos ônibus – Fortaleza",
    description: "Dados de oferta de transporte público de Fortaleza em formato GTFS.",
    theme: "Transporte Público Coletivo",
    geographicScope: "Municipal",
    category: "Operação e ITS",
    formats: ["GTFS"],
    region: "Fortaleza",
    cities: ["Fortaleza"],
    source: "Prefeitura de Fortaleza / ETUFOR",
    sourceLink: "https://dados.fortaleza.ce.gov.br",
    keywords: ["GTFS", "Ônibus", "Frequência de ônibus"],
    updatedAt: "2025-09-15", // o mais antigo do conjunto
    tags: ["Transporte Público Coletivo", "Operação e ITS"],
    dataset_info: [
      {
        dataset_title: "GTFS – Fortaleza",
        dataset_description: "GTFS completo de Fortaleza.",
        dataset_link: "https://dataverse.example.com/4",
        dataset_format: "GTFS",
      },
    ],
  },
];

export const mockCategories: CatalogCategories = {
  themes: [
    "Transporte Público Coletivo",
    "Mobilidade a Pé",
    "Mobilidade por Bicicleta",
    "Segurança Viária",
    "Logística Urbana Sustentável",
    "Socioeconômico",
    "Clima e Meio Ambiente",
    "Transversal",
  ],
  geographicScopes: ["Municipal", "Metropolitana", "Estadual", "Federal"],
  cities: ["Belo Horizonte", "Fortaleza", "Rio de Janeiro", "Salvador", "São Paulo"],
  categories: [
    "Governança e gestão",
    "Operação e ITS",
    "Infraestrutura viária",
    "Demanda",
    "Desenho Viário",
    "Vigilância, Saúde e Atendimento às Vítimas",
  ],
  formats: ["Tabela", "Georreferenciado", "GTFS"],
};
