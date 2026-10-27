import { describe, expect, it } from 'vitest'
import { income2022PopupFields } from './income-2022-popup'

describe('2022 responsible-person income popup', () => {
  it('labels a published mean in nominal census-year reais', () => {
    expect(income2022PopupFields({
      code_tract: '355030801000001',
      renda_media_responsavel_2022: 2453.03,
      rendimento_status: 'observado',
    })).toEqual([
      { label: 'Setor censitário', value: '355030801000001' },
      {
        label: 'Rendimento médio mensal do responsável com rendimento (Censo 2022, R$ nominais)',
        value: 'R$ 2.453,03',
      },
    ])
  })

  it.each([
    ['sigilo', 'Dado protegido por sigilo estatístico'],
    ['sem_informacao', 'Dado indisponível no arquivo do IBGE'],
    ['sem_linha', 'Setor sem linha no arquivo de rendimento'],
  ])('keeps %s missing without showing zero', (status, label) => {
    expect(income2022PopupFields({
      code_tract: '355030801000001',
      rendimento_status: status,
    })).toEqual([
      { label: 'Setor censitário', value: '355030801000001' },
      { label: 'Rendimento médio mensal do responsável com rendimento (Censo 2022, R$ nominais)', value: label },
    ])
  })

  it('retains an observed zero', () => {
    expect(income2022PopupFields({
      code_tract: '355030801000001',
      renda_media_responsavel_2022: 0,
      rendimento_status: 'observado',
    })[1].value).toBe('R$ 0,00')
  })
})
