const incomeLabel = 'Rendimento médio mensal do responsável com rendimento (Censo 2022, R$ nominais)'

const missingLabels: Record<string, string> = {
  sigilo: 'Dado protegido por sigilo estatístico',
  sem_informacao: 'Dado indisponível no arquivo do IBGE',
  sem_linha: 'Setor sem linha no arquivo de rendimento',
}

const currency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function income2022PopupFields(properties: Record<string, unknown>): Array<{ label: string; value: string }> {
  const fields: Array<{ label: string; value: string }> = []
  const sector = properties.code_tract
  if (typeof sector === 'string' && /^[0-9]{15}$/.test(sector)) {
    fields.push({ label: 'Setor censitário', value: sector })
  }

  const amount = properties.renda_media_responsavel_2022
  const status = properties.rendimento_status
  if (status === 'observado' && typeof amount === 'number' && Number.isFinite(amount)) {
    fields.push({ label: incomeLabel, value: currency.format(amount) })
  } else {
    fields.push({
      label: incomeLabel,
      value: typeof status === 'string' ? (missingLabels[status] ?? 'Dado indisponível') : 'Dado indisponível',
    })
  }

  return fields
}
