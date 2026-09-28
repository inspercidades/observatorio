import regionManifest from "./region-manifest.json" with { type: "json" }
import modalMap from "./modal-map.json" with { type: "json" }
import { layerText } from "./layer-texts.ts"
import type { ModalMetric } from "./modal-style.ts"

export interface CityLayer {
  id: string
  name: string
  description?: string
  legendNote?: string
  tilesetId?: string
  sourceLayer?: string
  layerType?: 'fill' | 'line' | 'circle' | 'symbol'
  hasCustomStyle?: boolean
  category?: 'modal' | 'commute' | 'context'
  municipalityId?: string
  metric?: ModalMetric
}

export interface CityLayersConfig {
  [regionId: string]: CityLayer[]
}

const contextLayers: CityLayersConfig = {
  "Brasil": [
    {
      category: "context",
      id: "tarifa_zero",
      name: "Tarifa Zero",
      ...layerText("tarifa_zero"),
      tilesetId: "observatorio-nacional.0bzbtkfg",
      sourceLayer: "insper_tarifa_zero_municipios-dwws9i",
      layerType: "circle",
      hasCustomStyle: true
    },
  ],
  "04801": [
    {
      municipalityId: "3304557",
      category: "context",
      id: "renda-rio-4ks1k8",
      name: "Renda Média (2010)",
      ...layerText("renda"),
      tilesetId: "observatorio-nacional.3pcgkauc",
      sourceLayer: "renda_rio-4ks1k8",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      municipalityId: "3304557",
      category: "context",
      id: "rio_rotas_onibus",
      name: "Rotas de Ônibus",
      ...layerText("rotas_onibus"),
      tilesetId: "observatorio-nacional.28tgojsu",
      sourceLayer: "rio_rotas_onibus",
      layerType: "line",
      hasCustomStyle: true
    },
    {
      municipalityId: "3304557",
      category: "context",
      id: "heatmap-bilhetagem",
      name: "Heatmap Embarques",
      ...layerText("embarques"),
      tilesetId: "observatorio-nacional.6mbl4ycd",
      sourceLayer: "heatmap_bilhetagem_rio-59w42o",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      municipalityId: "3304557",
      category: "context",
      id: "populacao_rio-19sjpd",
      name: "Densidade Populacional",
      ...layerText("populacao"),
      tilesetId: "observatorio-nacional.4sg21k6q",
      sourceLayer: "populacao_rio-19sjpd",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      municipalityId: "3303302",
      category: "context",
      id: "renda-987gzt",
      name: "Renda Média (2010)",
      ...layerText("renda"),
      tilesetId: "observatorio-nacional.5gkcci9a",
      sourceLayer: "renda-987gzt",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      municipalityId: "3303302",
      category: "context",
      id: "populacao_nit-3oog1f",
      name: "Densidade Populacional",
      ...layerText("populacao"),
      tilesetId: "observatorio-nacional.cfffhdz0",
      sourceLayer: "populacao_nit-3oog1f",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      municipalityId: "3303302",
      category: "context",
      id: "heatmap-2eyldb",
      name: "Heatmap Embarques",
      ...layerText("embarques"),
      tilesetId: "observatorio-nacional.1h9a91is",
      sourceLayer: "heatmap-2eyldb",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      municipalityId: "3303302",
      category: "context",
      id: "nit_rotas_onibus",
      name: "Rotas de Ônibus",
      ...layerText("rotas_onibus"),
      tilesetId: "observatorio-nacional.72n238zt",
      sourceLayer: "nit_rotas_onibus",
      layerType: "line",
      hasCustomStyle: true
    },
  ],
  "03001": [
    {
      municipalityId: "2611606",
      category: "context",
      id: "populacao-rec-08mi0e",
      name: "Densidade Populacional",
      ...layerText("populacao"),
      tilesetId: "observatorio-nacional.5f7qyfuo",
      sourceLayer: "populacao_rec-08mi0e",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      municipalityId: "2611606",
      category: "context",
      id: "renda-rec-bcpy1l",
      name: "Renda Média (2010)",
      ...layerText("renda"),
      tilesetId: "observatorio-nacional.8kla8qks",
      sourceLayer: "renda_rec-bcpy1l",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      municipalityId: "2611606",
      category: "context",
      id: "rec_ciclovia_ciclomapas",
      name: "Ciclovia",
      ...layerText("ciclovia"),
      tilesetId: "observatorio-nacional.a4t3w6aw",
      sourceLayer: "rec_ciclovia_ciclomapas",
      layerType: "line",
      hasCustomStyle: true
    },
  ],
  "04501": [
    {
      municipalityId: "3106200",
      category: "context",
      id: "populacao-a5w87s",
      name: "Densidade Populacional",
      ...layerText("populacao"),
      tilesetId: "observatorio-nacional.a9leemjp",
      sourceLayer: "populacao-a5w87s",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      municipalityId: "3106200",
      category: "context",
      id: "renda-42uz5h",
      name: "Renda Média (2010)",
      ...layerText("renda"),
      tilesetId: "observatorio-nacional.64v29dp1",
      sourceLayer: "renda-42uz5h",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      municipalityId: "3106200",
      category: "context",
      id: "heatmap_embarques-b8mehl",
      name: "Heatmap Embarques",
      ...layerText("embarques"),
      tilesetId: "observatorio-nacional.be236ew7",
      sourceLayer: "heatmap_embarques-b8mehl",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      municipalityId: "3106200",
      category: "context",
      id: "bhe_ciclovia",
      name: "Ciclovia",
      ...layerText("ciclovia"),
      tilesetId: "observatorio-nacional.4b3xv5u1",
      sourceLayer: "bhe_ciclovia",
      layerType: "line",
      hasCustomStyle: true
    },
    {
      municipalityId: "3106200",
      category: "context",
      id: "bhe_rotas_onibus", name: "Rotas de Ônibus",
      ...layerText("rotas_onibus"),
      tilesetId: "observatorio-nacional.6tx22262",
      sourceLayer: "bhe_rotas_onibus",
      layerType: "line",
      hasCustomStyle: true
    },
  ],
  "07701": [
    {
      municipalityId: "5208707",
      category: "context",
      id: "populacao_goi-5r0vfu",
      name: "Densidade Populacional",
      ...layerText("populacao"),
      tilesetId: "observatorio-nacional.0359v92t",
      sourceLayer: "populacao_goi-5r0vfu",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      municipalityId: "5208707",
      category: "context",
      id: "renda_goi-8q2sqk",
      name: "Renda Média (2010)",
      ...layerText("renda"),
      tilesetId: "observatorio-nacional.0gzs6kdr",
      sourceLayer: "renda_goi-8q2sqk",
      layerType: "fill",
      hasCustomStyle: true
    },
  ],
  "01401": [
    {
      municipalityId: "2304400",
      category: "context",
      id: "frt_income_hh-26qfm4",
      name: "Renda Média (2010)",
      ...layerText("renda"),
      tilesetId: "observatorio-nacional.d0fxoy3e",
      sourceLayer: "frt_income_hh-26qfm4",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      municipalityId: "2304400",
      category: "context",
      id: "frt_pop-9wsvgo",
      name: "Densidade Populacional",
      ...layerText("populacao"),
      tilesetId: "observatorio-nacional.8p48v3df",
      sourceLayer: "frt_pop-9wsvgo",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      municipalityId: "2304400",
      category: "context",
      id: "frt_ciclovia_ciclomapas",
      name: "Ciclovia",
      ...layerText("ciclovia"),
      tilesetId: "observatorio-nacional.6yi62vyd",
      sourceLayer: "frt_ciclovia_ciclomapas",
      layerType: "line",
      hasCustomStyle: true
    },
  ],
  "04901": [
    {
      municipalityId: "3547809",
      category: "context",
      id: "sinistros-9fw8gm",
      name: "Sinistros de trânsito",
      ...layerText("sinistros_vitimas"),
      tilesetId: "observatorio-nacional.4d7kb4n8",
      sourceLayer: "sinistros-9fw8gm",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      municipalityId: "3547809",
      category: "context",
      id: "sad_rotas_onibus_sad",
      name: "Rotas de Ônibus",
      ...layerText("rotas_onibus"),
      tilesetId: "observatorio-nacional.6zw64vh7",
      sourceLayer: "sad_rotas_onibus_sad",
      layerType: "line",
      hasCustomStyle: true
    },
    {
      municipalityId: "3547809",
      category: "context",
      id: "populacao_sad-3il930",
      name: "Densidade Populacional",
      ...layerText("populacao"),
      tilesetId: "observatorio-nacional.6qfgdjkf",
      sourceLayer: "populacao_sad-3il930",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      municipalityId: "3547809",
      category: "context",
      id: "renda_sad-a9kjjx",
      name: "Renda Média (2010)",
      ...layerText("renda"),
      tilesetId: "observatorio-nacional.86a15ap9",
      sourceLayer: "renda_sad-a9kjjx",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      municipalityId: "3550308",
      category: "context",
      id: "spo_spo_ciclovias",
      name: "Ciclovia",
      ...layerText("ciclovia"),
      tilesetId: "observatorio-nacional.c19gombg",
      sourceLayer: "spo_spo_ciclovias",
      layerType: "line",
      hasCustomStyle: true
    },
    {
      municipalityId: "3550308",
      category: "context",
      id: "spo_metro-74ojzn",
      name: "Linhas de metrô",
      ...layerText("metro"),
      tilesetId: "observatorio-nacional.75bso5it",
      sourceLayer: "spo_metro-74ojzn",
      layerType: "line",
      hasCustomStyle: true
    },
    {
      municipalityId: "3550308",
      category: "context",
      id: "renda_spo-ddwghj",
      name: "Renda Média (2010)",
      ...layerText("renda"),
      tilesetId: "observatorio-nacional.4gtkl59h",
      sourceLayer: "renda_spo-ddwghj",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      municipalityId: "3550308",
      category: "context",
      id: "populacao_spo-94zde5",
      name: "Densidade Populacional",
      ...layerText("populacao"),
      tilesetId: "observatorio-nacional.8ttkr2wm",
      sourceLayer: "populacao_spo-94zde5",
      layerType: "fill",
      hasCustomStyle: true
    },
  ],
  "04201": [
    {
      municipalityId: "2927408",
      category: "context",
      id: "ssa_ciclovia",
      name: "Ciclovia",
      ...layerText("ciclovia"),
      tilesetId: "observatorio-nacional.dnhoztpu",
      sourceLayer: "ssa_ciclovia",
      layerType: "line",
      hasCustomStyle: true
    },
    {
      municipalityId: "2927408",
      category: "context",
      id: "ssa_rotas_onibus_tipo",
      name: "Rotas de Ônibus",
      ...layerText("rotas_onibus"),
      tilesetId: "observatorio-nacional.1y9z3zyw",
      sourceLayer: "ssa_rotas_onibus_tipo",
      layerType: "line",
      hasCustomStyle: true
    },
    {
      municipalityId: "2927408",
      category: "context",
      id: "renda_ssa-72km6n",
      name: "Renda Média (2010)",
      ...layerText("renda"),
      tilesetId: "observatorio-nacional.8e78qgxw",
      sourceLayer: "renda_ssa-72km6n",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      municipalityId: "2927408",
      category: "context",
      id: "populacao_ssa-dgk2gr",
      name: "Densidade Populacional",
      ...layerText("populacao"),
      tilesetId: "observatorio-nacional.9zwcybiu",
      sourceLayer: "populacao_ssa-dgk2gr",
      layerType: "fill",
      hasCustomStyle: true
    },
  ],
  "05101": [
    {
      municipalityId: "3509502",
      category: "context",
      id: "populacao_cam-dhn9nh",
      name: "Densidade Populacional",
      ...layerText("populacao"),
      tilesetId: "observatorio-nacional.cv6id9vn",
      sourceLayer: "populacao_cam-dhn9nh",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      municipalityId: "3509502",
      category: "context",
      id: "renda-2bxm7u",
      name: "Renda Média (2010)",
      ...layerText("renda"),
      tilesetId: "observatorio-nacional.5eawzxg0",
      sourceLayer: "renda-2bxm7u",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      municipalityId: "3509502",
      category: "context",
      id: "cam_rotas_onibus",
      name: "Rotas de Ônibus",
      ...layerText("rotas_onibus"),
      tilesetId: "observatorio-nacional.b5gy4hyf",
      sourceLayer: "cam_rotas_onibus",
      layerType: "line",
      hasCustomStyle: true
    },
  ],
  "05501": [
    {
      municipalityId: "4106902",
      category: "context",
      id: "cur_pop-ddf53z",
      name: "Densidade Populacional",
      ...layerText("populacao"),
      tilesetId: "observatorio-nacional.d5c4yfux",
      sourceLayer: "cur_pop-ddf53z",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      municipalityId: "4106902",
      category: "context",
      id: "cur_income_hh-b297ww",
      name: "Renda Média (2010)",
      ...layerText("renda"),
      tilesetId: "observatorio-nacional.dnfgnx3h",
      sourceLayer: "cur_income_hh-b297ww",
      layerType: "fill",
      hasCustomStyle: true
    },
  ],
  "07401": [
    {
      municipalityId: "4314902",
      category: "context",
      id: "renda_poa-0cq519",
      name: "Renda Média (2010)",
      ...layerText("renda"),
      tilesetId: "observatorio-nacional.6nhij7jq",
      sourceLayer: "renda_poa-0cq519",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      municipalityId: "4314902",
      category: "context",
      id: "populacao_poa-6gb3pv",
      name: "Densidade Populacional",
      ...layerText("populacao"),
      tilesetId: "observatorio-nacional.cvh9drji",
      sourceLayer: "populacao_poa-6gb3pv",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      municipalityId: "4314902",
      category: "context",
      id: "vitimas_poa-84wkxk",
      name: "Vítimas de sinistros de trânsito",
      ...layerText("atropelamentos"),
      tilesetId: "observatorio-nacional.2fbdewky",
      sourceLayer: "vitimas_poa-84wkxk",
      layerType: "circle",
      hasCustomStyle: true
    },
    {
      municipalityId: "4314902",
      category: "context",
      id: "sinistros_poa-8mfstv",
      name: "Sinistros de trânsito",
      ...layerText("sinistros_veiculos"),
      tilesetId: "observatorio-nacional.a7e3m719",
      sourceLayer: "sinistros_poa-8mfstv",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      municipalityId: "4314902",
      category: "context",
      id: "poa_rotas_onibus",
      name: "Rotas de Ônibus",
      ...layerText("rotas_onibus"),
      tilesetId: "observatorio-nacional.87rz20bn",
      sourceLayer: "poa_rotas_onibus",
      layerType: "line",
      hasCustomStyle: true
    },
    {
      municipalityId: "4314902",
      category: "context",
      id: "poa_ciclovia_ciclomapas",
      name: "Ciclovia",
      ...layerText("ciclovia"),
      tilesetId: "observatorio-nacional.cynb7d49",
      sourceLayer: "poa_ciclovia_ciclomapas",
      layerType: "line",
      hasCustomStyle: true
    },
  ],
}

const modalMetrics = Object.entries(modalMap.metrics) as [ModalMetric, { label: string }][]

export const cityLayersConfig: CityLayersConfig = {
  ...contextLayers,
  ...Object.fromEntries(regionManifest.regions.map((region) => [
    region.id,
    [
      ...modalMetrics.map(([metric, config]): CityLayer => ({
        id: `modal-${metric}-${region.id}`,
        name: config.label,
        ...layerText(metric),
        tilesetId: "observatorio-nacional.onms_divisao_modal_2022",
        sourceLayer: "areas",
        layerType: "fill",
        category: metric === "mean_minutes" || metric === "share_60plus" ? "commute" : "modal",
        metric,
      })),
      ...(contextLayers[region.id] ?? []),
    ],
  ])),
}

export function getAvailableLayers(regionId: string, municipalityId?: string): CityLayer[] {
  const layers = cityLayersConfig[regionId || "Brasil"] ?? []
  return municipalityId
    ? layers.filter((layer) => !layer.municipalityId || layer.municipalityId === municipalityId)
    : layers
}
