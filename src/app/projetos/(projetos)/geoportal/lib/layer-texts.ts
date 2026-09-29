// Single source for layer texts: the (i) tooltip shows the summary; the
// legend shows how to read the colours and, when known, the source.

type LayerTextEntry = {
  summary: string
  reading: string
  source?: string
}

const census2022 = "IBGE, Censo Demográfico 2022 (amostra)"

const layerTexts = {
  share_public: {
    summary: "Participação do transporte público coletivo (ônibus, metrô, trem, vans e embarcações) no deslocamento para o trabalho, por área de ponderação.",
    reading: "Percentual dos trabalhadores que informaram o meio de transporte.",
    source: census2022,
  },
  share_private: {
    summary: "Participação dos veículos particulares (automóvel, motocicleta, táxi e aplicativos) no deslocamento para o trabalho, por área de ponderação.",
    reading: "Percentual dos trabalhadores que informaram o meio de transporte.",
    source: census2022,
  },
  share_active: {
    summary: "Participação dos modos ativos (a pé e bicicleta) no deslocamento para o trabalho, por área de ponderação.",
    reading: "Percentual dos trabalhadores que informaram o meio de transporte.",
    source: census2022,
  },
  mean_minutes: {
    summary: "Tempo médio do deslocamento de casa para o trabalho, por área de ponderação.",
    reading: "Minutos por viagem; respostas acima de 180 minutos contam como 180.",
    source: census2022,
  },
  share_60plus: {
    summary: "Participação dos trabalhadores que levam uma hora ou mais no deslocamento para o trabalho, por área de ponderação.",
    reading: "Percentual dos trabalhadores que informaram o tempo de deslocamento.",
    source: census2022,
  },
  populacao: {
    summary: "População residente em grade de 500 × 500 m.",
    reading: "Moradores por célula da grade.",
    source: "IBGE, Censo Demográfico 2022",
  },
  renda: {
    summary: "Renda domiciliar média em grade de 500 × 500 m.",
    reading: "Renda domiciliar média em grade de 500 × 500 m.",
    source: "IBGE, Censo Demográfico 2010 (valores atualizados pelo IPCA para R$ de 2024)",
  },
  embarques: {
    summary: "Embarques no transporte coletivo em grade de 500 × 500 m.",
    reading: "Embarques por célula da grade em agosto de 2023.",
  },
  rotas_onibus: {
    summary: "Traçado das linhas municipais de ônibus.",
    reading: "Cada linha no mapa é um itinerário.",
  },
  ciclovia: {
    summary: "Traçado da rede cicloviária municipal.",
    reading: "Cada linha no mapa é um trecho de ciclovia ou ciclofaixa.",
  },
  metro: {
    summary: "Linhas de metrô do município.",
    reading: "Cada linha no mapa é uma linha do sistema.",
  },
  sinistros_vitimas: {
    summary: "Densidade de sinistros de trânsito em grade de 250 × 250 m, de 2022 a 2024.",
    reading: "Total de vítimas por célula da grade.",
  },
  sinistros_veiculos: {
    summary: "Densidade de sinistros de trânsito em grade de 250 × 250 m, em 2023.",
    reading: "Percentual dos veículos envolvidos e total de feridos e mortos por célula.",
  },
  atropelamentos: {
    summary: "Local dos atropelamentos de pedestres em 2023, com os veículos envolvidos.",
    reading: "Cada ponto é uma ocorrência.",
  },
  tarifa_zero: {
    summary: "Municípios com tarifa zero integral ou parcial, seja em dias específicos (como domingos e feriados), seja em linhas específicas.",
    reading: "Cada ponto é um município; a cor indica o tipo de tarifa zero. Dados atualizados até outubro de 2025.",
  },
} satisfies Record<string, LayerTextEntry>

export type LayerTextKey = keyof typeof layerTexts

export function layerText(key: LayerTextKey): { description: string; legendNote: string } {
  const { summary, reading, source }: LayerTextEntry = layerTexts[key]
  return {
    description: summary,
    legendNote: source ? `${reading} Fonte: ${source}.` : reading,
  }
}
