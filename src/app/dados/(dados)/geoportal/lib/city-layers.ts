export interface CityLayer {
  id: string
  name: string
  description?: string
  tilesetId?: string
  sourceLayer?: string
  layerType?: 'fill' | 'line' | 'circle' | 'symbol'
  hasCustomStyle?: boolean // Indicates if this layer has a custom style defined in layer-styles.ts
}

export interface CityLayersConfig {
  [cityName: string]: CityLayer[]
}

export const cityLayersConfig: CityLayersConfig = {
  "Rio de Janeiro": [
    {
      id: "renda-rio-4ks1k8",
      name: "Renda Média",
      description: "Renda domiciliar média em grid 500x500m (2010, atualizada pelo IPCA para R$ de 2024)",
      tilesetId: "observatorio-nacional.renda-rio-4ks1k8_b62d648f3f01",
      sourceLayer: "renda_rio-4ks1k8",
      layerType: "fill",
      hasCustomStyle: true
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
      name: "Renda Média",
      description: "Renda domiciliar média em grid 500x500m (2010, atualizada pelo IPCA para R$ de 2024)",
      tilesetId: "observatorio-nacional.renda-rec-bcpy1l_cc81c11fd250",
      sourceLayer: "renda_rec-bcpy1l",
      layerType: "fill",
      hasCustomStyle: true
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
      name: "Renda Média",
      description: "Renda domiciliar média em grid 500x500m (2010, atualizada pelo IPCA para R$ de 2024)",
      tilesetId: "observatorio-nacional.renda-42uz5h_d1590f7758b1",
      sourceLayer: "renda-42uz5h",
      layerType: "fill",
      hasCustomStyle: true
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
      tilesetId: "observatorio-nacional.4b3xv5u1",
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
      name: "Renda Média",
      description: "Renda domiciliar média em grid 500x500m (2010, atualizada pelo IPCA para R$ de 2024)",
      tilesetId: "observatorio-nacional.renda_goi-8q2sqk_3826e2eb8f1c",
      sourceLayer: "renda_goi-8q2sqk",
      layerType: "fill",
      hasCustomStyle: true
    },
  ],
  "Fortaleza": [
    {
      id: "frt_income_hh-26qfm4",
      name: "Renda Média",
      description: "Renda domiciliar média em grid 500x500m (2010, atualizada pelo IPCA para R$ de 2024)",
      tilesetId: "observatorio-nacional.frt_income_hh-26qfm_9609984308c6",
      sourceLayer: "frt_income_hh-26qfm4",
      layerType: "fill",
      hasCustomStyle: true
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
      name: "Renda Média",
      description: "Renda domiciliar média em grid 500x500m (2010, atualizada pelo IPCA para R$ de 2024)",
      tilesetId: "observatorio-nacional.renda-987gzt_66f6d664e91c",
      sourceLayer: "renda-987gzt",
      layerType: "fill",
      hasCustomStyle: true
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
      name: "Renda Média",
      description: "Renda domiciliar média em grid 500x500m (2010, atualizada pelo IPCA para R$ de 2024)",
      tilesetId: "observatorio-nacional.renda_sad-a9kjjx_b7a678716cdd",
      sourceLayer: "renda_sad-a9kjjx",
      layerType: "fill",
      hasCustomStyle: true
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
      name: "Renda Média",
      description: "Renda domiciliar média em grid 500x500m (2010, atualizada pelo IPCA para R$ de 2024)",
      tilesetId: "observatorio-nacional.renda_ssa-72km6n_e38f64cefdd9",
      sourceLayer: "renda_ssa-72km6n",
      layerType: "fill",
      hasCustomStyle: true
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
      name: "Renda Média",
      description: "Renda domiciliar média em grid 500x500m (2010, atualizada pelo IPCA para R$ de 2024)",
      tilesetId: "observatorio-nacional.renda-2bxm7u_bdcf817bbced",
      sourceLayer: "renda-2bxm7u",
      layerType: "fill",
      hasCustomStyle: true
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
      name: "Renda Média",
      description: "Renda domiciliar média em grid 500x500m (2010, atualizada pelo IPCA para R$ de 2024)",
      tilesetId: "observatorio-nacional.cur_income_hh-b297w_9fd5da306706",
      sourceLayer: "cur_income_hh-b297ww",
      layerType: "fill",
      hasCustomStyle: true
    },
  ],
  "Porto Alegre": [
    {
      id: "renda_poa-0cq519",
      name: "Renda Média",
      description: "Renda domiciliar média em grid 500x500m (2010, atualizada pelo IPCA para R$ de 2024)",
      tilesetId: "observatorio-nacional.renda_poa-0cq519_4bf5baf1842c",
      sourceLayer: "renda_poa-0cq519",
      layerType: "fill",
      hasCustomStyle: true
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
      name: "Renda Média",
      description: "Renda domiciliar média em grid 500x500m (2010, atualizada pelo IPCA para R$ de 2024)",
      tilesetId: "observatorio-nacional.4gtkl59h",
      sourceLayer: "renda_spo-ddwghj",
      layerType: "fill",
      hasCustomStyle: true
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