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
      tilesetId: "observatorio-nacional.heatmap-bilhetagem_d3cf031cbe24",
      sourceLayer: "heatmap_bilhetagem_rio-59w42o",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      id: "populacao_rio-19sjpd",
      name: "Densidade Populacional",
      description: "Contagem da população em grid 500x500m (2022).",
      tilesetId: "observatorio-nacional.populacao_rio-19sjp_f80fbf4bc346",
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
      tilesetId: "observatorio-nacional.populacao-rec-08mi0_1028d65bbc02",
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
      tilesetId: "observatorio-nacional.rec_ciclovia_ciclom_020117d943c1",
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
      tilesetId: "observatorio-nacional.populacao-a5w87s_cb4b0d09136b",
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
      tilesetId: "observatorio-nacional.heatmap_embarques-b_9b68b2f34882",
      sourceLayer: "heatmap_embarques-b8mehl",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      id: "bhe_ciclovia",
      name: "Ciclovia",
      description: "Traçado das ciclovias municipais.",
      tilesetId: "observatorio-nacional.bhe_ciclovia_29f49d9c7ce0",
      sourceLayer: "bhe_ciclovia",
      layerType: "line",
      hasCustomStyle: true
    },
    {
      id: "bhe_rotas_onibus", name: "Rotas de Ônibus",
      description: "Traçado das linhas de ônibus municipais.",
      tilesetId: "observatorio-nacional.bhe_rotas_onibus_97b8a12d0bb2",
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
      tilesetId: "observatorio-nacional.populacao_goi-5r0vf_9c98bdf98351",
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
      tilesetId: "observatorio-nacional.frt_pop-9wsvgo_d5a7ba86027a",
      sourceLayer: "frt_pop-9wsvgo",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      id: "frt_ciclovia_ciclomapas",
      name: "Ciclovia",
      description: "Traçado das ciclovias municipais.",
      tilesetId: "observatorio-nacional.frt_ciclovia_ciclom_36705d31d4b5",
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
      tilesetId: "observatorio-nacional.populacao_nit-3oog1_523c0319f99b",
      sourceLayer: "populacao_nit-3oog1f",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      id: "heatmap-2eyldb",
      name: "Heatmap Embarques",
      description: "Contagem de embarques em grid 500x500m (agosto/2023).",
      tilesetId: "observatorio-nacional.heatmap-2eyldb_211c60f63c0b",
      sourceLayer: "heatmap-2eyldb",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      id: "nit_rotas_onibus",
      name: "Rotas de Ônibus",
      description: "Traçado das linhas de ônibus municipais.",
      tilesetId: "observatorio-nacional.nit_rotas_onibus_78c5cec9159c",
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
      tilesetId: "observatorio-nacional.sinistros-9fw8gm_e90cc6e2875b",
      sourceLayer: "sinistros-9fw8gm",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      id: "sad_rotas_onibus_sad",
      name: "Rotas de Ônibus",
      description: "Traçado das linhas de ônibus municipais.",
      tilesetId: "observatorio-nacional.sad_rotas_onibus_sa_aca38e9e57dc",
      sourceLayer: "sad_rotas_onibus_sad",
      layerType: "line",
      hasCustomStyle: true
    },
    {
      id: "populacao_sad-3il930",
      name: "Densidade Populacional",
      description: "Contagem da população em grid 500x500m (2022).",
      tilesetId: "observatorio-nacional.populacao_sad-3il93_a70b6eb01e6a",
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
      tilesetId: "observatorio-nacional.ssa_ciclovia_28c0ca3ee600",
      sourceLayer: "ssa_ciclovia",
      layerType: "line",
      hasCustomStyle: true
    },
    {
      id: "ssa_rotas_onibus_tipo",
      name: "Rotas de Ônibus",
      description: "Traçado das linhas de ônibus municipais.",
      tilesetId: "observatorio-nacional.ssa_rotas_onibus_ti_a7e6f3339849",
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
      tilesetId: "observatorio-nacional.populacao_ssa-dgk2g_a23bc3e92e28",
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
      tilesetId: "observatorio-nacional.populacao_cam-dhn9n_fa806dc46d2b",
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
      tilesetId: "observatorio-nacional.cam_rotas_onibus_9a7d6425addf",
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
      tilesetId: "observatorio-nacional.cur_pop-ddf53z_96cffdb51ec4",
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
      tilesetId: "observatorio-nacional.populacao_poa-6gb3p_1ea006ebcf45",
      sourceLayer: "populacao_poa-6gb3pv",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      id: "vitimas_poa-84wkxk",
      name: "Vítimas de sinistros de trânsito",
      description: "Localização de atropelamentos de pedestres e veículos envolvidos no sinistro (2023).",
      tilesetId: "observatorio-nacional.vitimas_poa-84wkxk_93e47b1f5c4d",
      sourceLayer: "vitimas_poa-84wkxk",
      layerType: "circle",
      hasCustomStyle: true
    },
    {
      id: "sinistros_poa-8mfstv",
      name: "Sinistros de trânsito",
      description: "Densidade de sinistros de trânsito em grid 250×250m (2023). Percentual do total de veículos envolvidos e total de feridos e mortos.",
      tilesetId: "observatorio-nacional.sinistros_poa-8mfst_4505b3a8a638",
      sourceLayer: "sinistros_poa-8mfstv",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      id: "poa_rotas_onibus",
      name: "Rotas de Ônibus",
      description: "Traçado das linhas de ônibus municipais.",
      tilesetId: "observatorio-nacional.poa_rotas_onibus_9aecdd7c949b",
      sourceLayer: "poa_rotas_onibus",
      layerType: "fill",
      hasCustomStyle: true
    },
    {
      id: "poa_ciclovia_ciclomapas",
      name: "Ciclovia",
      description: "Traçado das ciclovias municipais.",
      tilesetId: "observatorio-nacional.poa_ciclovia_ciclom_f206f9c15ae4",
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
      tilesetId: "observatorio-nacional.spo_spo_ciclovias_9a8a91a20c0d",
      sourceLayer: "spo_spo_ciclovias",
      layerType: "line",
      hasCustomStyle: true
    },
    {
      id: "spo_metro-74ojzn",
      name: "Linhas de metrô",
      description: "Linhas de metrô do município.",
      tilesetId: "observatorio-nacional.spo_metro-74ojzn_4e4db52e3dc6",
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
      tilesetId: "observatorio-nacional.populacao_spo-94zde_afe1ec2c6c58",
      sourceLayer: "populacao_spo-94zde5",
      layerType: "fill",
      hasCustomStyle: true
    },
  ],
}