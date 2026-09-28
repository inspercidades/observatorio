"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import demographicMap from "../lib/demographic-map.json"
import modalMap from "../lib/modal-map.json"
import regionManifest from "../lib/region-manifest.json"
import { formatModalValue, formatProfileMetricValue, type ModalMetric } from "../lib/modal-style"

type ProfileRow = { race?: string; sex?: string; income?: string; schooling?: string; sample_n: number } & Partial<Record<ModalMetric, number | null>>
type Profile = {
  code_region: string
  income: { mean_household_reais: number | null; mean_per_capita_reais: number | null }
  race_sex: ProfileRow[]
  income_schooling: ProfileRow[]
}

const incomeLabels = new Map(demographicMap.dimensions.income.map((group) => [group.id, group.label]))
const raceLabels = new Map(demographicMap.dimensions.race.map((group) => [group.id, group.label]))
const sexLabels = new Map(demographicMap.dimensions.sex.map((group) => [group.id, group.label]))
const schoolingLabels = new Map(demographicMap.dimensions.schooling.map((group) => [group.id, group.label]))
const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

function CrossChart({ title, rows, metric, label }: { title: string; rows: ProfileRow[]; metric: ModalMetric; label: (row: ProfileRow) => string }) {
  const data = rows.map((row) => ({
    name: label(row),
    value: row.sample_n >= demographicMap.minimum_sample && typeof row[metric] === 'number' ? row[metric] : null,
  }))

  return (
    <section className="space-y-2">
      <h3 className="font-semibold">{title}</h3>
      {rows.length === 0 && <p className="text-sm text-gray-600">Sem dados para este cruzamento.</p>}
      {data.some((row) => row.value !== null) && (
        <div className="h-52" role="img" aria-label={`${title}: ${modalMap.metrics[metric].label}`}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ left: 8, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" hide />
              <YAxis tickFormatter={(value: number) => formatModalValue(metric, value)} width={65} />
              <Tooltip formatter={(value: number) => formatModalValue(metric, value)} />
              <Bar dataKey="value" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      <div className="max-h-52 overflow-y-auto text-sm">
        {rows.map((row, index) => (
          <div key={`${label(row)}-${index}`} className="flex justify-between gap-3 border-b py-1">
            <span>{label(row)}</span>
            <span className="shrink-0">{formatProfileMetricValue(metric, row[metric], row.sample_n)}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export function RegionProfile({ selectedRegion }: { selectedRegion: string }) {
  const [metric, setMetric] = useState<ModalMetric>('share_public')
  const [profiles, setProfiles] = useState<Profile[] | null>(null)
  const region = regionManifest.regions.find((item) => item.id === selectedRegion)
  const profile = profiles?.find((item) => item.code_region === selectedRegion)

  // The profiles file is large, so it loads only when the dialog first opens.
  const loadProfiles = (open: boolean) => {
    if (!open || profiles) return
    fetch('/geoportal/region-profiles.json')
      .then((response) => (response.ok ? response.json() : []))
      .then(setProfiles)
      .catch(() => setProfiles([]))
  }

  return (
    <Dialog onOpenChange={loadProfiles}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-white shadow-lg" disabled={!region}>Perfil da região</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Perfil da região — {region?.name}</DialogTitle>
          <DialogDescription>Divisão modal e deslocamento dos trabalhadores ocupados no Censo 2022. Células com menos de {demographicMap.minimum_sample} respondentes não são exibidas.</DialogDescription>
        </DialogHeader>
        {!profiles ? (
          <p className="text-sm text-gray-600">Carregando perfil…</p>
        ) : !profile ? (
          <p className="text-sm text-gray-600">Perfil ainda não disponível para esta região.</p>
        ) : (
          <div className="space-y-5">
            <section className="space-y-1 text-sm">
              <h3 className="font-semibold">Renda em 2022 — todos os domicílios particulares ocupados</h3>
              <p>Renda domiciliar média (ponderação por domicílios): {typeof profile.income.mean_household_reais === 'number' ? money.format(profile.income.mean_household_reais) : 'Sem dados'}</p>
              <p>Renda domiciliar per capita média (ponderação por pessoas): {typeof profile.income.mean_per_capita_reais === 'number' ? money.format(profile.income.mean_per_capita_reais) : 'Sem dados'}</p>
            </section>
            <label className="block text-sm font-medium">
              Indicador
              <select className="mt-1 block w-full rounded border border-gray-300 p-2" value={metric} onChange={(event) => setMetric(event.target.value as ModalMetric)}>
                {(Object.entries(modalMap.metrics) as [ModalMetric, { label: string }][]).map(([id, config]) => <option key={id} value={id}>{config.label}</option>)}
              </select>
            </label>
            <CrossChart title="Cor ou raça × sexo (Censo 2022)" rows={profile.race_sex} metric={metric} label={(row) => `${raceLabels.get(row.race ?? '') ?? row.race} · ${sexLabels.get(row.sex ?? '') ?? row.sex}`} />
            <CrossChart title="Renda domiciliar per capita × escolaridade dos trabalhadores" rows={profile.income_schooling} metric={metric} label={(row) => `${incomeLabels.get(row.income ?? '') ?? row.income} · ${schoolingLabels.get(row.schooling ?? '') ?? row.schooling}`} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
