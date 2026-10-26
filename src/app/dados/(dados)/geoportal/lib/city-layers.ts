export interface CityLayer {
  id: string
  name: string
  description?: string
  tilesetId?: string
  sourceLayer?: string
  layerType?: 'fill' | 'line' | 'circle' | 'symbol'
  hasCustomStyle?: boolean // Indicates if this layer has a custom style defined in layer-styles.ts
  attribution?: string
}

export interface CityLayersConfig {
  [cityName: string]: CityLayer[]
}

export const cityLayersConfig: CityLayersConfig = {
  "Rio de Janeiro": [
    {
      id: "renda-rio-4ks1k8",
      name: "Rendimento médio do responsável com rendimento",
      description: "Média mensal do rendimento das pessoas responsáveis com rendimento, por setor censitário (Censo 2022, R$ nominais). Sem valor divulgado em cinza. Fonte: IBGE.",
      tilesetId: "observatorio-nacional.renda-rio-4ks1k8_4099a14c9ddb",
      sourceLayer: "renda_responsavel_2022_rio",
      layerType: "fill",
      hasCustomStyle: true,
      attribution: "Fonte: IBGE, Censo Demográfico 2022"
    },
    {
      id: "rio_rotas_onibus",
      name: "Rotas de Ônibus",
      description: "Traçado das linhas de ônibus municipais.",
      tilesetId: "observatorio-nacional.28tgojsu",
      sourceLayer: "rio_rotas_onibus",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      id: "heatmap-bilhetagem",
      name: "Heatmap Embarques",
      description: "Contagem de embarques em grid 500x500m (agosto/2023).",
      tilesetId: "observatorio-nacional.6mbl4ycd",
      sourceLayer: "heatmap_bilhetagem_rio-59w42o",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      id: "populacao_rio-19sjpd",
      name: "Densidade Populacional",
      description: "Contagem da população em grid 500x500m (2022).",
      tilesetId: "observatorio-nacional.4sg21k6q",
      sourceLayer: "populacao_rio-19sjpd",
      layerType: "fill",
      hasCustomStyle: true
    },
  ],
  "Recife": [
    {
      id: "populacao-rec-08mi0e",
      name: "Densidade Populacional",
      description: "Contagem da população em grid 500x500m (2022).",
      tilesetId: "observatorio-nacional.5f7qyfuo",
      sourceLayer: "populacao_rec-08mi0e",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      id: "renda-rec-bcpy1l",
      name: "Rendimento médio do responsável com rendimento",
      description: "Média mensal do rendimento das pessoas responsáveis com rendimento, por setor censitário (Censo 2022, R$ nominais). Sem valor divulgado em cinza. Fonte: IBGE.",
      tilesetId: "observatorio-nacional.renda-rec-bcpy1l_b0626bf30b64",
      sourceLayer: "renda_responsavel_2022_rec",
      layerType: "fill",
      hasCustomStyle: true,
      attribution: "Fonte: IBGE, Censo Demográfico 2022"
    },
    {
      id: "rec_ciclovia_ciclomapas",
      name: "Ciclovia",
      description: "Traçado das ciclovias municipais.",
      tilesetId: "observatorio-nacional.a4t3w6aw",
      sourceLayer: "rec_ciclovia_ciclomapas",
      layerType: "line",
      hasCustomStyle: true
    },
  ],
  "Belo Horizonte": [
    {
      id: "populacao-a5w87s",
      name: "Densidade Populacional",
      description: "Contagem da população em grid 500x500m (2022).",
      tilesetId: "observatorio-nacional.a9leemjp",
      sourceLayer: "populacao-a5w87s",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      id: "renda-42uz5h",
      name: "Rendimento médio do responsável com rendimento",
      description: "Média mensal do rendimento das pessoas responsáveis com rendimento, por setor censitário (Censo 2022, R$ nominais). Sem valor divulgado em cinza. Fonte: IBGE.",
      tilesetId: "observatorio-nacional.renda-42uz5h_fcbe5b1cf6ce",
      sourceLayer: "renda_responsavel_2022_bhe",
      layerType: "fill",
      hasCustomStyle: true,
      attribution: "Fonte: IBGE, Censo Demográfico 2022"
    },
    {
      id: "heatmap_embarques-b8mehl",
      name: "Heatmap Embarques",
      description: "Contagem de embarques em grid 500x500m (agosto/2023).",
      tilesetId: "observatorio-nacional.be236ew7",
      sourceLayer: "heatmap_embarques-b8mehl",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      id: "bhe_ciclovia",
      name: "Ciclovia",
      description: "Traçado das ciclovias municipais.",
      tilesetId: "observatorio-nacional.4b3xv5u1",
      sourceLayer: "bhe_ciclovia",
      layerType: "line",
      hasCustomStyle: true
    },
    {
      id: "bhe_rotas_onibus", name: "Rotas de Ônibus",
      description: "Traçado das linhas de ônibus municipais.",
      tilesetId: "observatorio-nacional.6tx22262",
      sourceLayer: "bhe_rotas_onibus",
      layerType: "line",
      hasCustomStyle: true
    },
  ],
  "Goiânia": [
    {
      id: "populacao_goi-5r0vfu",
      name: "Densidade Populacional",
      description: "Contagem da população em grid 500x500m (2022).",
      tilesetId: "observatorio-nacional.0359v92t",
      sourceLayer: "populacao_goi-5r0vfu",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      id: "renda_goi-8q2sqk",
      name: "Rendimento médio do responsável com rendimento",
      description: "Média mensal do rendimento das pessoas responsáveis com rendimento, por setor censitário (Censo 2022, R$ nominais). Sem valor divulgado em cinza. Fonte: IBGE.",
      tilesetId: "observatorio-nacional.renda_goi-8q2sqk_bcc655ad37eb",
      sourceLayer: "renda_responsavel_2022_goi",
      layerType: "fill",
      hasCustomStyle: true,
      attribution: "Fonte: IBGE, Censo Demográfico 2022"
    },
  ],
  "Fortaleza": [
    {
      id: "frt_income_hh-26qfm4",
      name: "Rendimento médio do responsável com rendimento",
      description: "Média mensal do rendimento das pessoas responsáveis com rendimento, por setor censitário (Censo 2022, R$ nominais). Sem valor divulgado em cinza. Fonte: IBGE.",
      tilesetId: "observatorio-nacional.frt_income_hh-26qfm_3d28286a526c",
      sourceLayer: "renda_responsavel_2022_frt",
      layerType: "fill",
      hasCustomStyle: true,
      attribution: "Fonte: IBGE, Censo Demográfico 2022"
    },
    {
      id: "frt_pop-9wsvgo",
      name: "Densidade Populacional",
      description: "Contagem da população em grid 500x500m (2022).",
      tilesetId: "observatorio-nacional.8p48v3df",
      sourceLayer: "frt_pop-9wsvgo",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      id: "frt_ciclovia_ciclomapas",
      name: "Ciclovia",
      description: "Traçado das ciclovias municipais.",
      tilesetId: "observatorio-nacional.6yi62vyd",
      sourceLayer: "frt_ciclovia_ciclomapas",
      layerType: "line",
      hasCustomStyle: true
    },
  ],
  "Niteroi": [
    {
      id: "renda-987gzt",
      name: "Rendimento médio do responsável com rendimento",
      description: "Média mensal do rendimento das pessoas responsáveis com rendimento, por setor censitário (Censo 2022, R$ nominais). Sem valor divulgado em cinza. Fonte: IBGE.",
      tilesetId: "observatorio-nacional.renda-987gzt_1b8b7f3e6d15",
      sourceLayer: "renda_responsavel_2022_nit",
      layerType: "fill",
      hasCustomStyle: true,
      attribution: "Fonte: IBGE, Censo Demográfico 2022"
    },
    {
      id: "populacao_nit-3oog1f",
      name: "Densidade Populacional",
      description: "Contagem da população em grid 500x500m (2022).",
      tilesetId: "observatorio-nacional.cfffhdz0",
      sourceLayer: "populacao_nit-3oog1f",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      id: "heatmap-2eyldb",
      name: "Heatmap Embarques",
      description: "Contagem de embarques em grid 500x500m (agosto/2023).",
      tilesetId: "observatorio-nacional.1h9a91is",
      sourceLayer: "heatmap-2eyldb",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      id: "nit_rotas_onibus",
      name: "Rotas de Ônibus",
      description: "Traçado das linhas de ônibus municipais.",
      tilesetId: "observatorio-nacional.72n238zt",
      sourceLayer: "nit_rotas_onibus",
      layerType: "line",
      hasCustomStyle: true
    },
  ],
  "Santo André": [
    {
      id: "sinistros-9fw8gm",
      name: "Sinistros de trânsito",
      description: "Densidade de sinistros de trânsito em grid 250×250m (2022-24). Número total de vítimas.",
      tilesetId: "observatorio-nacional.4d7kb4n8",
      sourceLayer: "sinistros-9fw8gm",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      id: "sad_rotas_onibus_sad",
      name: "Rotas de Ônibus",
      description: "Traçado das linhas de ônibus municipais.",
      tilesetId: "observatorio-nacional.6zw64vh7",
      sourceLayer: "sad_rotas_onibus_sad",
      layerType: "line",
      hasCustomStyle: true
    },
    {
      id: "populacao_sad-3il930",
      name: "Densidade Populacional",
      description: "Contagem da população em grid 500x500m (2022).",
      tilesetId: "observatorio-nacional.6qfgdjkf",
      sourceLayer: "populacao_sad-3il930",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      id: "renda_sad-a9kjjx",
      name: "Rendimento médio do responsável com rendimento",
      description: "Média mensal do rendimento das pessoas responsáveis com rendimento, por setor censitário (Censo 2022, R$ nominais). Sem valor divulgado em cinza. Fonte: IBGE.",
      tilesetId: "observatorio-nacional.renda_sad-a9kjjx_5f24b768cc1f",
      sourceLayer: "renda_responsavel_2022_sad",
      layerType: "fill",
      hasCustomStyle: true,
      attribution: "Fonte: IBGE, Censo Demográfico 2022"
    }
  ],
  "Salvador": [
    {
      id: "ssa_ciclovia",
      name: "Ciclovia",
      description: "Traçado das ciclovias municipais.",
      tilesetId: "observatorio-nacional.dnhoztpu",
      sourceLayer: "ssa_ciclovia",
      layerType: "line",
      hasCustomStyle: true
    },
    {
      id: "ssa_rotas_onibus_tipo",
      name: "Rotas de Ônibus",
      description: "Traçado das linhas de ônibus municipais.",
      tilesetId: "observatorio-nacional.1y9z3zyw",
      sourceLayer: "ssa_rotas_onibus_tipo",
      layerType: "line",
      hasCustomStyle: true
    },
    {
      id: "renda_ssa-72km6n",
      name: "Rendimento médio do responsável com rendimento",
      description: "Média mensal do rendimento das pessoas responsáveis com rendimento, por setor censitário (Censo 2022, R$ nominais). Sem valor divulgado em cinza. Fonte: IBGE.",
      tilesetId: "observatorio-nacional.renda_ssa-72km6n_d1d281574275",
      sourceLayer: "renda_responsavel_2022_ssa",
      layerType: "fill",
      hasCustomStyle: true,
      attribution: "Fonte: IBGE, Censo Demográfico 2022"
    },
    {
      id: "populacao_ssa-dgk2gr",
      name: "Densidade Populacional",
      description: "Contagem da população em grid 500x500m (2022).",
      tilesetId: "observatorio-nacional.9zwcybiu",
      sourceLayer: "populacao_ssa-dgk2gr",
      layerType: "fill",
      hasCustomStyle: true
    },
  ],
  "Campinas": [
    {
      id: "populacao_cam-dhn9nh",
      name: "Densidade Populacional",
      description: "Contagem da população em grid 500x500m (2022).",
      tilesetId: "observatorio-nacional.cv6id9vn",
      sourceLayer: "populacao_cam-dhn9nh",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      id: "renda-2bxm7u",
      name: "Rendimento médio do responsável com rendimento",
      description: "Média mensal do rendimento das pessoas responsáveis com rendimento, por setor censitário (Censo 2022, R$ nominais). Sem valor divulgado em cinza. Fonte: IBGE.",
      tilesetId: "observatorio-nacional.renda-2bxm7u_3be93a09e319",
      sourceLayer: "renda_responsavel_2022_cam",
      layerType: "fill",
      hasCustomStyle: true,
      attribution: "Fonte: IBGE, Censo Demográfico 2022"
    },
    {
      id: "cam_rotas_onibus",
      name: "Rotas de Ônibus",
      description: "Traçado das linhas de ônibus municipais.",
      tilesetId: "observatorio-nacional.b5gy4hyf",
      sourceLayer: "cam_rotas_onibus",
      layerType: "line",
      hasCustomStyle: true
    },
  ],
  "Curitiba": [
    {
      id: "cur_pop-ddf53z",
      name: "Densidade Populacional",
      description: "Contagem da população em grid 500x500m (2022).",
      tilesetId: "observatorio-nacional.d5c4yfux",
      sourceLayer: "cur_pop-ddf53z",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      id: "cur_income_hh-b297ww",
      name: "Rendimento médio do responsável com rendimento",
      description: "Média mensal do rendimento das pessoas responsáveis com rendimento, por setor censitário (Censo 2022, R$ nominais). Sem valor divulgado em cinza. Fonte: IBGE.",
      tilesetId: "observatorio-nacional.cur_income_hh-b297w_865cc8df6f62",
      sourceLayer: "renda_responsavel_2022_cur",
      layerType: "fill",
      hasCustomStyle: true,
      attribution: "Fonte: IBGE, Censo Demográfico 2022"
    },
  ],
  "Porto Alegre": [
    {
      id: "renda_poa-0cq519",
      name: "Rendimento médio do responsável com rendimento",
      description: "Média mensal do rendimento das pessoas responsáveis com rendimento, por setor censitário (Censo 2022, R$ nominais). Sem valor divulgado em cinza. Fonte: IBGE.",
      tilesetId: "observatorio-nacional.renda_poa-0cq519_717ba22c22f4",
      sourceLayer: "renda_responsavel_2022_poa",
      layerType: "fill",
      hasCustomStyle: true,
      attribution: "Fonte: IBGE, Censo Demográfico 2022"
    },
    {
      id: "populacao_poa-6gb3pv",
      name: "Densidade Populacional",
      description: "Contagem da população em grid 500x500m (2022).",
      tilesetId: "observatorio-nacional.cvh9drji",
      sourceLayer: "populacao_poa-6gb3pv",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      id: "vitimas_poa-84wkxk",
      name: "Vítimas de sinistros de trânsito",
      description: "Localização de atropelamentos de pedestres e veículos envolvidos no sinistro (2023).",
      tilesetId: "observatorio-nacional.2fbdewky",
      sourceLayer: "vitimas_poa-84wkxk",
      layerType: "circle",
      hasCustomStyle: true
    },
    {
      id: "sinistros_poa-8mfstv",
      name: "Sinistros de trânsito",
      description: "Densidade de sinistros de trânsito em grid 250×250m (2023). Percentual do total de veículos envolvidos e total de feridos e mortos.",
      tilesetId: "observatorio-nacional.a7e3m719",
      sourceLayer: "sinistros_poa-8mfstv",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      id: "poa_rotas_onibus",
      name: "Rotas de Ônibus",
      description: "Traçado das linhas de ônibus municipais.",
      tilesetId: "observatorio-nacional.87rz20bn",
      sourceLayer: "poa_rotas_onibus",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      id: "poa_ciclovia_ciclomapas",
      name: "Ciclovia",
      description: "Traçado das ciclovias municipais.",
      tilesetId: "observatorio-nacional.cynb7d49",
      sourceLayer: "poa_ciclovia_ciclomapas",
      layerType: "line",
      hasCustomStyle: true
    },
  ],
  "São Paulo": [
    {
      id: "spo_spo_ciclovias",
      name: "Ciclovia",
      description: "Traçado das ciclovias municipais.",
      tilesetId: "observatorio-nacional.c19gombg",
      sourceLayer: "spo_spo_ciclovias",
      layerType: "line",
      hasCustomStyle: true
    },
    {
      id: "spo_metro-74ojzn",
      name: "Linhas de metrô",
      description: "Linhas de metrô do município.",
      tilesetId: "observatorio-nacional.75bso5it",
      sourceLayer: "spo_metro-74ojzn",
      layerType: "line",
      hasCustomStyle: true
    },
    {
      id: "renda_spo-ddwghj",
      name: "Rendimento médio do responsável com rendimento",
      description: "Média mensal do rendimento das pessoas responsáveis com rendimento, por setor censitário (Censo 2022, R$ nominais). Sem valor divulgado em cinza. Fonte: IBGE.",
      tilesetId: "observatorio-nacional.renda_spo-ddwghj_6f59518608a2",
      sourceLayer: "renda_responsavel_2022_spo",
      layerType: "fill",
      hasCustomStyle: true,
      attribution: "Fonte: IBGE, Censo Demográfico 2022"
    },
    {
      id: "populacao_spo-94zde5",
      name: "Densidade Populacional",
      description: "Contagem da população em grid 500x500m (2022).",
      tilesetId: "observatorio-nacional.8ttkr2wm",
      sourceLayer: "populacao_spo-94zde5",
      layerType: "fill",
      hasCustomStyle: true
    },
  ],
}
