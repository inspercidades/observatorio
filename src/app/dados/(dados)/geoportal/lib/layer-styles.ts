export interface LayerStyle {
  id: string
  type: 'fill' | 'line' | 'circle' | 'symbol'
  source: string
  'source-layer': string
  paint: Record<string, unknown>
  layout?: Record<string, unknown>
  slot?: string
}

export const layerStyles: Record<string, LayerStyle> = {
  // ================== START SÃO PAULO ==================
  "spo_spo_ciclovias": {
       "type": "line",
    "source": "composite",
    "id": "spo-spo-ciclovias",
    "paint": {
      "line-width": 3,
      "line-color": [
        "match",
        [
          "get",
          "tipo"
        ],
        [
          "Ciclorrota"
        ],
        "#377eb8",
        [
          "Ciclofaixa"
        ],
        "#e41a1c",
        [
          "Ciclovia"
        ],
        "#4daf4a",
        [
          "Ciclopassarela"
        ],
        "#f9e806",
        "#000000"
      ]
    },
    "slot": "",
    "source-layer": "spo_spo_ciclovias",
    "layout": {
      "visibility": "none"
    }
  },
  "renda_spo-ddwghj":{
     "layout": {
      "visibility": "none"
    },
    "type": "fill",
    "source": "composite",
    "id": "renda-spo-ddwghj",
    "paint": {
      "fill-opacity": 0.7,
      "fill-color": [
        "step",
        [
          "get",
          "Renda Domiciliar Média (R$)"
        ],
        "#fff7fb",
        2000,
        "#ece2f0",
        4000,
        "#a6bddb",
        8000,
        "#3690c0",
        20000,
        "#02818a",
        98040,
        "#014636"
      ]
    },
    "slot": "",
    "source-layer": "renda_spo-ddwghj"
  },
  "populacao_spo-94zde5":{
      "layout": {
      "visibility": "none"
    },
    "type": "fill",
    "source": "composite",
    "id": "populacao-spo-94zde5",
    "paint": {
      "fill-opacity": 0.7,
      "fill-color": [
        "step",
        [
          "get",
          "População (2022)"
        ],
        "#f7fcf5",
        100,
        "#e5f5e0",
        1000,
        "#a1d99b",
        2500,
        "#41ab5d",
        5000,
        "#006d2c",
        15000,
        "#00441b"
      ]
    },
    "slot": "",
    "source-layer": "populacao_spo-94zde5"
  },
  "spo_metro-74ojzn":{
     "id": "spo-metro-74ojzn",
    "type": "line",
    "paint": {
      "line-color": [
        "match",
        [
          "get",
          "Linha"
        ],
        [
          "Linha 1 - Azul"
        ],
        "#110df2",
        [
          "Linha 2 - Verde"
        ],
        "#067000",
        [
          "Linha 3 - Vermelha"
        ],
        "#e70808",
        [
          "Linha 4 - Amarela"
        ],
        "#f9e31f",
        [
          "Linha 5 - Lilás"
        ],
        "#ab02e8",
        [
          "Linha 15 - Prata"
        ],
        "rgba(0, 0, 0, 0.5)",
        [
          "interpolate",
          [
            "linear"
          ],
          [
            "id"
          ],
          0,
          "#000000",
          1,
          "#000000"
        ]
      ],
      "line-width": 3
    },
    "source": "composite",
    "source-layer": "spo_metro-74ojzn",
    "slot": ""
  },
  // ================== END SÃO PAULO ==================
  // ================== START RIO DE JANEIRO ==================
  "renda_rio-4ks1k8": {
     "type": "fill",
    "source": "composite",
    "id": "renda_rio-4ks1k8",
    "paint": {
      "fill-opacity": 0.7,
      "fill-color": [
        "step",
        [
          "get",
          "Renda Domiciliar Média (R$)"
        ],
        "#fff7fb",
        1500,
        "#ece2f0",
        6000,
        "#a6bddb",
        13000,
        "#3690c0",
        25000,
        "#02818a",
        95000,
        "#014636"
      ]
    },
    "source-layer": "renda_rio-4ks1k8"
  },
  "rio_rotas_onibus": {
      "type": "line",
    "source": "composite",
    "id": "rio-rotas-onibus",
    "paint": {
      "line-color": "#cb181d"
    },
    "slot": "",
    "source-layer": "rio_rotas_onibus",
    "layout": {
      "visibility": "none"
    }
  },
  "heatmap_bilhetagem_rio-59w42o": {
    "type": "fill",
    "source": "composite",
    "id": "heatmap-bilhetagem-rio-59w42o",
    "paint": {
      "fill-color": [
        "step",
        [
          "get",
          "Número de Passageiros"
        ],
        "#000004",
        5,
        "#420a68",
        25,
        "#932667",
        50,
        "#dd513a",
        100,
        "#fca50a",
        18043,
        "#fcffa4"
      ]
    },
    "source-layer": "heatmap_bilhetagem_rio-59w42o",
    "layout": {
      "visibility": "none"
    }
  },
  "populacao_rio-19sjpd": 
  {
    "layout": {
      "visibility": "none"
    },
    "type": "fill",
    "source": "composite",
    "id": "populacao-rio-19sjpd",
    "paint": {
      "fill-opacity": 0.7,
      "fill-color": [
        "step",
        [
          "get",
          "População (2022)"
        ],
        "#f7fcf5",
        500,
        "#e5f5e0",
        1000,
        "#a1d99b",
        2500,
        "#41ab5d",
        5000,
        "#006d2c",
        12281,
        "#00441b"
      ]
    },
    "source-layer": "populacao_rio-19sjpd"
  },
  // ================== END RIO DE JANEIRO ==================
  // ================== START RECIFE ==================
  "populacao_rec-08mi0e": 
   {
    "layout": {
      "visibility": "none"
    },
    "type": "fill",
    "source": "composite",
    "id": "populacao-rec-08mi0e",
    "paint": {
      "fill-opacity": 0.7,
      "fill-color": [
        "step",
        [
          "get",
          "População (2022)"
        ],
        "#f7fcf5",
        500,
        "#e5f5e0",
        1500,
        "#a1d99b",
        3000,
        "#41ab5d",
        4500,
        "#006d2c",
        6800,
        "#00441b"
      ]
    },
    "source-layer": "populacao_rec-08mi0e"
  },
  "renda_rec-bcpy1l":{
     "layout": {
      "visibility": "none"
    },
    "type": "fill",
    "source": "composite",
    "id": "renda-rec-bcpy1l",
    "paint": {
      "fill-opacity": 0.7,
      "fill-color": [
        "step",
        [
          "get",
          "Renda Domiciliar Média (R$)"
        ],
        "#fff7fb",
        1500,
        "#ece2f0",
        3000,
        "#a6bddb",
        5500,
        "#3690c0",
        12500,
        "#02818a",
        45000,
        "#014636"
      ]
    },
    "source-layer": "renda_rec-bcpy1l"
  },
  "rec_ciclovia_ciclomapas":{
      "type": "line",
    "source": "composite",
    "id": "rec-ciclovia-ciclomapas",
    "slot": "",
    "source-layer": "rec_ciclovia_ciclomapas",
    "paint": {
      "line-color": [
        "match",
        [
          "get",
          "Tipo"
        ],
        [
          "Ciclovia"
        ],
        "#4daf4a",
        [
          "Ciclorrota"
        ],
        "#377eb8",
        [
          "Ciclofaixa"
        ],
        "#e41a1c",
        [
          "Calçada compartilhada"
        ],
        "#f9e806",
        "#000000"
      ],
      "line-width": 3
    },
    "layout": {
      "visibility": "none"
    }
  }
  ,
  // ================== END RECIFE ==================
  // ================== START BELO HORIZONTE ==================
  "populacao-a5w87s":
  {
    "layout": {
      "visibility": "none"
    },
    "type": "fill",
    "source": "composite",
    "id": "populacao-a5w87s",
    "paint": {
      "fill-opacity": 0.7,
      "fill-color": [
        "step",
        [
          "get",
          "População (2022)"
        ],
        "#f7fcf5",
        250,
        "#e5f5e0",
        1000,
        "#a1d99b",
        2000,
        "#41ab5d",
        2500,
        "#006d2c",
        6681,
        "#00441b"
      ]
    },
    "source-layer": "populacao-a5w87s"
  },
  "renda-42uz5h":
   {
    "layout": {
      "visibility": "none"
    },
    "type": "fill",
    "source": "composite",
    "id": "renda-42uz5h",
    "paint": {
      "fill-opacity": 0.7,
      "fill-color": [
        "step",
        [
          "get",
          "Renda Domiciliar Média (R$)"
        ],
        "#fff7fb",
        3000,
        "#ece2f0",
        4000,
        "#a6bddb",
        5500,
        "#3690c0",
        10000,
        "#02818a",
        78299,
        "#014636"
      ]
    },
    "source-layer": "renda-42uz5h"
  },
  "heatmap_embarques-b8mehl":
   {
    "layout": {
      "visibility": "none"
    },
    "type": "fill",
    "source": "composite",
    "id": "heatmap-embarques-b8mehl",
    "paint": {
      "fill-opacity": 0.7,
      "fill-outline-color": "#000000",
      "fill-color": [
        "step",
        [
          "get",
          "Média de Embarques (dia útil)"
        ],
        "#000004",
        150,
        "#420a68",
        250,
        "#932667",
        400,
        "#dd513a",
        700,
        "#fca50a",
        6144,
        "#fcffa4"
      ]
    },
    "slot": "",
    "source-layer": "heatmap_embarques-b8mehl"
  },
  "bhe_ciclovia":
   {
    "layout": {
      "visibility": "none"
    },
    "type": "line",
    "source": "composite",
    "id": "bhe-ciclovia",
    "paint": {
      "line-width": 3,
      "line-color": [
        "match",
        [
          "get",
          "Tipo"
        ],
        [
          "Ciclofaixa"
        ],
        "#e41a1c",
        [
          "Ciclovia"
        ],
        "#4daf4a",
        [
          "Ciclorrua"
        ],
        "#377eb8",
        [
          "Calcada Cp",
          "Compartilh",
          "Cvia Calca"
        ],
        "#ff7f00",
        [
          "Cvia Cante",
          "Zona 30",
          "Cfaix+Z30",
          "Cv+Z30"
        ],
        "#984ea3",
        [
          "Cvia+Cfaix"
        ],
        "#f9e806",
        "#000000"
      ]
    },
    "slot": "",
    "source-layer": "bhe_ciclovia"
  },
  "bhe_rotas_onibus":
   {
    "layout": {
      "visibility": "none"
    },
       "type": "line",
    "source": "composite",
    "id": "bhe-rotas-onibus",
    "paint": {
      "line-color": "#cb181d"
    },
    "slot": "",
    "source-layer": "bhe_rotas_onibus"
  },
   // ================== END BELO HORIZONTE ==================
   // ================== START GOIÂNIA ==================
   "populacao_goi-5r0vfu":
   {
    "layout": {
      "visibility": "none"
    },
    "type": "fill",
    "source": "composite",
    "id": "populacao-goi-5r0vfu",
    "paint": {
      "fill-opacity": 0.7,
      "fill-color": [
        "step",
        [
          "get",
          "População (2022)"
        ],
        "#f7fcf5",
        50,
        "#e5f5e0",
        200,
        "#a1d99b",
        800,
        "#41ab5d",
        1200,
        "#006d2c",
        2000,
        "#00441b"
      ]
    },
    "slot": "",
    "source-layer": "populacao_goi-5r0vfu"
   },
   "renda_goi-8q2sqk":
   {
     "layout": {
      "visibility": "none"
    },
    "type": "fill",
    "source": "composite",
    "id": "renda-goi-8q2sqk",
    "paint": {
      "fill-opacity": 0.7,
      "fill-color": [
        "step",
        [
          "get",
          "Renda Domiciliar Média (R$)"
        ],
        "#fff7fb",
        2000,
        "#ece2f0",
        3500,
        "#a6bddb",
        5000,
        "#3690c0",
        7500,
        "#02818a",
        12000,
        "#014636"
      ]
    },
    "slot": "",
    "source-layer": "renda_goi-8q2sqk"
   },
   // ================== END GOIÂNIA ==================
   // ================== START FORTALEZA ==================
   "frt_income_hh-26qfm4":
   {
     "layout": {
      "visibility": "none"
    },
    "type": "fill",
    "source": "composite",
    "id": "frt-income-hh-26qfm4",
    "paint": {
      "fill-opacity": 0.7,
      "fill-color": [
        "step",
        [
          "get",
          "Renda Domiciliar Média (R$)"
        ],
        "#fff7fb",
        2000,
        "#ece2f0",
        3500,
        "#a6bddb",
        5000,
        "#3690c0",
        7500,
        "#02818a",
        10000,
        "#014636"
      ]
    },
    "slot": "",
    "source-layer": "frt_income_hh-26qfm4"
   },
   "frt_pop-9wsvgo":{
     "layout": {
      "visibility": "none"
    },
    "type": "fill",
    "source": "composite",
    "id": "frt-pop-9wsvgo",
    "paint": {
      "fill-opacity": 0.7,
      "fill-color": [
        "step",
        [
          "get",
          "População (2022)"
        ],
        "#f7fcf5",
        500,
        "#e5f5e0",
        1000,
        "#a1d99b",
        2000,
        "#41ab5d",
        3000,
        "#006d2c",
        5000,
        "#00441b"
      ]
    },
    "slot": "",
    "source-layer": "frt_pop-9wsvgo"
   },
   "frt_ciclovia_ciclomapas":
   {
     "layout": {
      "visibility": "none"
    },
    "type": "line",
    "source": "composite",
    "id": "frt-ciclovia-ciclomapas",
    "paint": {
      "line-width": 3,
      "line-color": [
        "match",
        [
          "get",
          "Tipo"
        ],
        [
          "Ciclofaixa"
        ],
        "#e41a1c",
        [
          "Ciclorrota"
        ],
        "#377eb8",
        [
          "Ciclovia"
        ],
        "#4daf4a",
        [
          "Calçada compartilhada"
        ],
        "#f9e806",
        "#000000"
      ]
    },
    "slot": "",
    "source-layer": "frt_ciclovia_ciclomapas"
   },

   // ================== START NITERÓI ==================
   "renda-987gzt":
   {
    "type": "fill",
    "source": "composite",
    "id": "renda-987gzt",
    "paint": {
      "fill-opacity": 0.7,
      "fill-color": [
        "step",
        [
          "get",
          "Renda Domiciliar Média (R$)"
        ],
        "#ece2f0",
        3400,
        "#a6bddb",
        5400,
        "#3690c0",
        8800,
        "#02818a",
        14960,
        "#014636",
        28550.3109,
        "#014636"
      ]
    },
    "slot": "",
    "source-layer": "renda-987gzt",
    "layout": {
      "visibility": "none"
    }
  },
  "populacao_nit-3oog1f":
  {
    "layout": {
      "visibility": "none"
    },
    "type": "fill",
    "source": "composite",
    "id": "populacao-nit-3oog1f",
    "paint": {
      "fill-opacity": 0.7,
      "fill-color": [
        "step",
        [
          "get",
          "População (2022)"
        ],
        "#f7fcf5",
        500,
        "#e5f5e0",
        1000,
        "#a1d99b",
        3500,
        "#41ab5d",
        7000,
        "#006d2c",
        11250,
        "#00441b"
      ]
    },
    "slot": "",
    "source-layer": "populacao_nit-3oog1f"
  },
  "heatmap-2eyldb":
   {
    "layout": {
      "visibility": "none"
    },
    "type": "fill",
    "source": "composite",
    "id": "heatmap-2eyldb",
    "paint": {
      "fill-opacity": 0.7,
      "fill-outline-color": "#000000",
      "fill-color": [
        "step",
        [
          "get",
          "Passageiros"
        ],
        "#000004",
        30,
        "#420a68",
        150,
        "#932667",
        400,
        "#dd513a",
        900,
        "#fca50a",
        19475,
        "#fcffa4"
      ]
    },
    "slot": "",
    "source-layer": "heatmap-2eyldb"
  },
  "nit_rotas_onibus":
   {
      "type": "line",
    "source": "composite",
    "id": "nit-rotas-onibus",
    "paint": {
      "line-width": 3,
      "line-color": "#cb181d"
    },
    "slot": "",
    "source-layer": "nit_rotas_onibus",
    "layout": {
      "visibility": "none"
    }
  },

   // ================== END NITERÓI ==================

   // ================== START SANTO ANDRÉ ==================
   "sinistros-9fw8gm": {
    "layout": {
      "visibility": "none"
    },
    "type": "fill",
    "source": "composite",
    "id": "sinistros-9fw8gm",
    "paint": {
      "fill-color": [
        "step",
        [
          "get",
          "Total Vítimas (2023)"
        ],
        "#ffeda0",
        5,
        "#feb24c",
        10,
        "#fc4e2a",
        25,
        "#e31a1c",
        96,
        "#800026"
      ]
    },
    "slot": "",
    "source-layer": "sinistros-9fw8gm"
  },
  "sad_rotas_onibus_sad":
   {
    "type": "line",
    "source": "composite",
    "id": "sad-rotas-onibus-sad",
    "paint": {
      "line-width": 2,
      "line-color": "#cb181d"
    },
    "slot": "",
    "source-layer": "sad_rotas_onibus_sad",
    "layout": {
      "visibility": "none"
    }
  },
  "populacao_sad-3il930":
   {
     "type": "fill",
    "source": "composite",
    "id": "populacao-sad-3il930",
    "paint": {
      "fill-opacity": 0.7,
      "fill-color": [
        "step",
        [
          "get",
          "População (2022)"
        ],
        "#f7fcf5",
        100,
        "#e5f5e0",
        1000,
        "#a1d99b",
        2000,
        "#41ab5d",
        3000,
        "#006d2c",
        4000,
        "#00441b"
      ]
    },
    "slot": "",
    "source-layer": "populacao_sad-3il930",
    "layout": {
      "visibility": "none"
    }
   },
   "renda_sad-a9kjjx":
   {
     "type": "fill",
    "source": "composite",
    "id": "renda-sad-a9kjjx",
    "paint": {
      "fill-opacity": 0.7,
      "fill-color": [
        "step",
        [
          "get",
          "Renda Domiciliar Média (R$)"
        ],
        "#fff7fb",
        3000,
        "#ece2f0",
        4500,
        "#a6bddb",
        7000,
        "#3690c0",
        12000,
        "#02818a",
        20000,
        "#014636"
      ]
    },
    "slot": "",
    "source-layer": "renda_sad-a9kjjx",
    "layout": {
      "visibility": "none"
    }
   },

   // ================== END SANTO ANDRÉ ==================

   // ================== START SALVADOR ==================
   "ssa_ciclovia":
    {
    "layout": {
      "visibility": "none"
    },
    "type": "line",
    "source": "composite",
    "id": "ssa-ciclovia",
    "paint": {
      "line-width": 3,
      "line-color": [
        "match",
        [
          "get",
          "Tipo"
        ],
        [
          "Ciclovia",
          "Ciclovia "
        ],
        "#4daf4a",
        [
          "Ciclofaixa"
        ],
        "#e41a1c",
        [
          "Ciclorrota"
        ],
        "#377eb8",
        [
          "Via compartilhada",
          "Via Compartilhada"
        ],
        "#f9e806",
        [
          "Misto"
        ],
        "#984ea3",
        [
          "Ciclovia em canteiro central"
        ],
        "#ff7f00",
        "#000000"
      ]
    },
    "slot": "",
    "source-layer": "ssa_ciclovia"
  },
  "ssa_rotas_onibus_tipo":
   {
     "layout": {
      "visibility": "none"
    },
    "type": "line",
    "source": "composite",
    "id": "ssa-rotas-onibus-tipo",
    "paint": {
      "line-width": 2,
      "line-color": [
        "match",
        [
          "get",
          "Tipo"
        ],
        [
          "BRT"
        ],
        "#377eb8",
        [
          "OTTrans"
        ],
        "#4daf4a",
        [
          "Plataforma"
        ],
        "#f9e806",
        "#000000"
      ]
    },
    "slot": "",
    "source-layer": "ssa_rotas_onibus_tipo"
  },
  "renda_ssa-72km6n":
   {
    "layout": {
      "visibility": "none"
    },
    "type": "fill",
    "source": "composite",
    "id": "renda-ssa-72km6n",
    "paint": {
      "fill-opacity": 0.7,
      "fill-color": [
        "step",
        [
          "get",
          "Renda Domiciliar Média (R$)"
        ],
        "#fff7fb",
        1500,
        "#ece2f0",
        3000,
        "#a6bddb",
        9000,
        "#3690c0",
        15000,
        "#02818a",
        46000,
        "#014636"
      ]
    },
    "slot": "",
    "source-layer": "renda_ssa-72km6n"
  },
  "populacao_ssa-dgk2gr":
   {
    "layout": {
      "visibility": "none"
    },
    "type": "fill",
    "source": "composite",
    "id": "populacao-ssa-dgk2gr",
    "paint": {
      "fill-opacity": 0.7,
      "fill-color": [
        "step",
        [
          "get",
          "População (2022)"
        ],
        "#f7fcf5",
        500,
        "#e5f5e0",
        1000,
        "#a1d99b",
        2500,
        "#41ab5d",
        5000,
        "#006d2c",
        12281,
        "#00441b"
      ]
    },
    "slot": "",
    "source-layer": "populacao_ssa-dgk2gr"
  },


   // ================== END SALVADOR ==================

   // ================== START CAMPINAS ==================
   "populacao_cam-dhn9nh":
    {
    "layout": {
      "visibility": "none"
    },
    "type": "fill",
    "source": "composite",
    "id": "populacao-cam-dhn9nh",
    "paint": {
      "fill-opacity": 0.7,
      "fill-color": [
        "step",
        [
          "get",
          "População (2022)"
        ],
        "#f7fcf5",
        300,
        "#e5f5e0",
        900,
        "#a1d99b",
        1500,
        "#41ab5d",
        2500,
        "#006d2c",
        4471,
        "#00441b"
      ]
    },
    "slot": "",
    "source-layer": "populacao_cam-dhn9nh"
  },
  "renda-2bxm7u":
 {
    "layout": {
      "visibility": "none"
    },
    "type": "fill",
    "source": "composite",
    "id": "renda-2bxm7u",
    "paint": {
      "fill-opacity": 0.7,
      "fill-color": [
        "step",
        [
          "get",
          "Renda Domiciliar Média (R$)"
        ],
        "#fff7fb",
        3500,
        "#ece2f0",
        4500,
        "#a6bddb",
        6000,
        "#3690c0",
        10000,
        "#02818a",
        46000,
        "#014636"
      ]
    },
    "slot": "",
    "source-layer": "renda-2bxm7u"
  },
  "cam_rotas_onibus":
   {
      "type": "line",
    "source": "composite",
    "id": "cam-rotas-onibus",
    "paint": {
      "line-width": 3,
      "line-color": "#cb181d"
    },
    "slot": "",
    "source-layer": "cam_rotas_onibus",
    "layout": {
      "visibility": "none"
    }
  },
   // ================== END CAMPINAS ==================
// ================== START CURITIBA ==================
"cur_pop-ddf53z":
{
    "type": "fill",
    "source": "composite",
    "id": "cur-pop-ddf53z",
    "paint": {
      "fill-opacity": 0.7,
      "fill-color": [
        "step",
        [
          "get",
          "População (2022)"
        ],
        "#f7fcf5",
        250,
        "#e5f5e0",
        500,
        "#a1d99b",
        1000,
        "#41ab5d",
        2500,
        "#006d2c",
        5000,
        "#00441b"
      ]
    },
    "slot": "",
    "source-layer": "cur_pop-ddf53z"
},
"cur_income_hh-b297ww":
{
   "type": "fill",
    "source": "composite",
    "id": "cur-income-hh-b297ww",
    "paint": {
      "fill-opacity": 0.7,
      "fill-color": [
        "step",
        [
          "get",
          "Renda Domiciliar Média (R$)"
        ],
        "#fff7fb",
        2000,
        "#ece2f0",
        4000,
        "#a6bddb",
        6000,
        "#3690c0",
        10000,
        "#02818a",
        15000,
        "#014636"
      ]
    },
    "slot": "",
    "source-layer": "cur_income_hh-b297ww",
    "layout": {
      "visibility": "none"
    }
},
// ================== END CURITIBA ==================


   // ================== START PORTO ALEGRE ==================
   "renda_poa-0cq519":
   {
    "layout": {
      "visibility": "none"
    },
    "type": "fill",
    "source": "composite",
    "id": "renda-poa-0cq519 (1)",
    "paint": {
      "fill-opacity": 0.7,
      "fill-color": [
        "step",
        [
          "get",
          "Renda Domiciliar Média (R$)"
        ],
        "#fff7fb",
        1500,
        "#ece2f0",
        4000,
        "#a6bddb",
        7500,
        "#3690c0",
        15000,
        "#02818a",
        31000,
        "#014636"
      ]
    },
    "slot": "",
    "source-layer": "renda_poa-0cq519"
  },
  "populacao_poa-6gb3pv":
   {
    "layout": {
      "visibility": "none"
    },
    "type": "fill",
    "source": "composite",
    "id": "populacao-poa-6gb3pv",
    "paint": {
      "fill-opacity": 0.7,
      "fill-color": [
        "step",
        [
          "get",
          "População (2022)"
        ],
        "#f7fcf5",
        500,
        "#e5f5e0",
        1000,
        "#a1d99b",
        2000,
        "#41ab5d",
        3000,
        "#006d2c",
        5400,
        "#00441b"
      ]
    },
    "slot": "",
    "source-layer": "populacao_poa-6gb3pv"
  },
  "vitimas_poa-84wkxk":
   {
    "layout": {
      "visibility": "none"
    },
    "type": "circle",
    "source": "composite",
    "id": "vitimas-poa-84wkxk",
    "paint": {
      "circle-color": "#e31a1c",
      "circle-radius": 2
    },
    "slot": "",
    "source-layer": "vitimas_poa-84wkxk"
  },
  "sinistros_poa-8mfstv":
 {
    "layout": {
      "visibility": "none"
    },
    "type": "fill",
    "source": "composite",
    "id": "sinistros-poa-8mfstv",
    "paint": {
      "fill-color": [
        "step",
        [
          "get",
          "Total Feridos"
        ],
        "#ffeda0",
        5,
        "#fed976",
        9,
        "#800026",
        10,
        "#feb24c",
        20,
        "#fc4e2a",
        40,
        "#e31a1c"
      ]
    },
    "slot": "",
    "source-layer": "sinistros_poa-8mfstv"
  },
  "poa_rotas_onibus":
  {
    "layout": {
      "visibility": "none"
    },
    "type": "line",
    "source": "composite",
    "id": "poa-rotas-onibus",
    "paint": {
      "line-width": 2,
      "line-color": "#cb181d"
    },
    "slot": "",
    "source-layer": "poa_rotas_onibus"

    },
    "poa_ciclovia_ciclomapas":{
       "layout": {
      "visibility": "none"
    },
    "type": "line",
    "source": "composite",
    "id": "poa-ciclovia-ciclomapas",
    "paint": {
      "line-width": 3,
      "line-color": [
        "match",
        [
          "get",
          "Tipo"
        ],
        [
          "Ciclofaixa"
        ],
        "#e41a1c",
        [
          "Ciclovia"
        ],
        "#4daf4a",
        [
          "Ciclorrota"
        ],
        "#377eb8",
        [
          "Calçada compartilhada"
        ],
        "#f9e806",
        "#000000"
      ]
    },
    "slot": "",
    "source-layer": "poa_ciclovia_ciclomapas"
    },
   // ================== END PORTO ALEGRE ==================
}

// Helper function to get layer style by source layer name
export function getLayerStyle(sourceLayer: string): LayerStyle | null {
  return layerStyles[sourceLayer] || null
}

// Helper function to create a layer configuration with custom style
export function createStyledLayer(layerId: string, sourceLayer: string, _tilesetId: string): LayerStyle | null {
  const style = getLayerStyle(sourceLayer)
  if (!style) return null

  return {
    ...style,
    id: layerId,
    source: layerId, // Use the layerId as source since we're adding it as a vector source
    'source-layer': sourceLayer
  }
}

// Legend item interface
export interface LegendItem {
  color: string
  label: string
  value?: string | number
}

// Extract legend information from layer paint styles
export function extractLegendFromPaint(layerStyle: LayerStyle): LegendItem[] | null {
  if (!layerStyle.paint) return null

  const paint = layerStyle.paint

  // Handle fill layers
  if (layerStyle.type === 'fill' && paint['fill-color']) {
    return extractLegendFromExpression(paint['fill-color'])
  }

  // Handle line layers
  if (layerStyle.type === 'line' && paint['line-color']) {
    return extractLegendFromExpression(paint['line-color'])
  }

  // Handle circle layers
  if (layerStyle.type === 'circle' && paint['circle-color']) {
    return extractLegendFromExpression(paint['circle-color'])
  }

  return null
}

// Extract legend from Mapbox expression
function extractLegendFromExpression(expression: unknown): LegendItem[] | null {
  if (!Array.isArray(expression)) {
    // Simple color value
    if (typeof expression === 'string') {
      return [{ color: expression, label: 'Dados disponíveis' }]
    }
    return null
  }

  const [expressionType] = expression

  if (expressionType === 'step') {
    return extractFromStepExpression(expression)
  }

  if (expressionType === 'interpolate') {
    return extractFromInterpolateExpression(expression)
  }

  if (expressionType === 'case') {
    return extractFromCaseExpression(expression)
  }

  if (expressionType === 'match') {
    return extractFromMatchExpression(expression)
  }

  return null
}

// Extract legend from match expression
function extractFromMatchExpression(expression: unknown[]): LegendItem[] {
  const legendItems: LegendItem[] = []
  // Match expression format: ["match", ["get", "property"], value1, output1, value2, output2, ..., fallback]
  
  if (expression.length < 4) return legendItems
  
  // Process pairs of (value, output) starting from index 2
  // The last item is the fallback/default value
  for (let i = 2; i < expression.length - 1; i += 2) {
    const matchValue = expression[i]
    const output = expression[i + 1]
    
    // Handle arrays of values (multiple values mapping to same output)
    if (Array.isArray(matchValue)) {
      matchValue.forEach((val) => {
        if (typeof output === 'string') {
          legendItems.push({
            color: output,
            label: String(val),
            value: String(val)
          })
        }
      })
    } else {
      // Single value
      if (typeof output === 'string') {
        legendItems.push({
          color: output,
          label: String(matchValue),
          value: String(matchValue)
        })
      }
    }
  }
  
  // Add fallback/default color if it exists and no items were added
  const fallbackColor = expression[expression.length - 1]
  if (legendItems.length === 0 && typeof fallbackColor === 'string') {
    legendItems.push({
      color: fallbackColor,
      label: 'Outros',
      value: 'Default'
    })
  }
  
  return legendItems
}

// Extract legend from step expression
function extractFromStepExpression(expression: unknown[]): LegendItem[] {
  const legendItems: LegendItem[] = []
  const [, input, fallback, ...stops] = expression

  // Add first item with fallback color
  if (typeof fallback === 'string') {
    legendItems.push({
      color: fallback,
      label: getReadableLabel(input, null),
      value: `< ${stops[0]}`
    })
  }

  // Process stops (value, color pairs)
  for (let i = 0; i < stops.length; i += 2) {
    const value = stops[i]
    const color = stops[i + 1]
    const nextValue = stops[i + 2]

    if (typeof color === 'string') {
      legendItems.push({
        color,
        label: getReadableLabel(input, value),
        value: nextValue ? `${value} - ${nextValue}` : `${value}+`
      })
    }
  }

  return legendItems
}

// Extract legend from interpolate expression
function extractFromInterpolateExpression(expression: unknown[]): LegendItem[] {
  const legendItems: LegendItem[] = []
  const [, , input, ...stops] = expression

  // Process stops (value, color pairs)
  for (let i = 0; i < stops.length; i += 2) {
    const value = stops[i]
    const color = stops[i + 1]

    if (typeof color === 'string') {
      legendItems.push({
        color,
        label: getReadableLabel(input, value),
        value: typeof value === 'string' || typeof value === 'number' ? value : String(value)
      })
    }
  }

  return legendItems
}

// Extract legend from case expression (for categorical data)
function extractFromCaseExpression(expression: unknown[]): LegendItem[] {
  const legendItems: LegendItem[] = []

  // Case expressions are more complex, we'll handle specific patterns
  // This is a simplified version for the ciclovia_tipo layer pattern
  const caseConditions = expression.slice(1, -1) // Remove 'case' and fallback

  // Look for match conditions with colors
  for (let i = 0; i < caseConditions.length; i += 2) {
    const condition = caseConditions[i]
    const color = caseConditions[i + 1]

    if (Array.isArray(condition) && condition[0] === 'match' && typeof color === 'string') {
      const matchValues = condition[3] // The array of values to match
      if (Array.isArray(matchValues) && matchValues.length > 0) {
        legendItems.push({
          color,
          label: String(matchValues[0]), // Use the first value as label
          value: matchValues.map(String).join(', ')
        })
      }
    }
  }

  // Add fallback color if present
  const fallback = expression[expression.length - 1]
  if (typeof fallback === 'string' && fallback.startsWith('#')) {
    legendItems.push({
      color: fallback,
      label: 'Outros',
      value: 'Outros'
    })
  }

  return legendItems
}

// Generate readable labels based on property names
function getReadableLabel(input: unknown, value: unknown): string {
  if (!Array.isArray(input) || input[0] !== 'get') {
    return value ? `${value}` : 'Valor'
  }

  const property = input[1]

  // Map property names to readable labels
  const propertyLabels: Record<string, string> = {
    'densidade_residencial': 'Densidade Residencial',
    'GeoSES': 'Índice GeoSES',
    'Renda Domiciliar Média (R$)': 'Renda Domiciliar',
    'População (2022)': 'População',
    'Número de Passageiros': 'Passageiros',
    'Média de Embarques (dia útil)': 'Embarques',
    'Total Vítimas (2023)': 'Vítimas',
    'Total Feridos': 'Feridos',
    'tipo': 'Tipo'
  }

  const baseLabel = propertyLabels[property] || property

  if (value === null || value === undefined) {
    return baseLabel
  }

  // Format value ranges
  if (typeof value === 'number') {
    if (property.includes('Renda')) {
      return `${baseLabel}`
    }
    if (property.includes('População')) {
      return `${baseLabel}`
    }
    return `${baseLabel}`
  }

  return baseLabel
}

// Get legend for a specific layer
export function getLayerLegend(layerId: string): LegendItem[] | null {
  const layerStyle = getLayerStyle(layerId)
  if (!layerStyle) return null

  return extractLegendFromPaint(layerStyle)
}
