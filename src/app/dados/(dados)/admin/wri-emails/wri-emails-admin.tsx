"use client"

import { useMemo, useState, type ReactNode } from "react"
import Link from "next/link"
import { toast } from "sonner"
import {
  AlertCircle,
  CheckCircle2,
  FileUp,
  Loader2,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type {
  WriImportApplyResult,
  WriImportPreview,
} from "@/lib/wri-emails/import"

const REASON_LABELS: Record<string, string> = {
  empty_email: "E-mail vazio",
  multiple_or_malformed_email: "Mais de um e-mail / malformado",
  invalid_email_format: "Formato inválido",
  duplicate_in_csv: "Duplicado no CSV",
}

export function WriEmailsAdmin() {
  const [file, setFile] = useState<File | null>(null)
  const [csvText, setCsvText] = useState<string | null>(null)
  const [preview, setPreview] = useState<WriImportPreview | null>(null)
  const [applyResult, setApplyResult] = useState<WriImportApplyResult | null>(
    null
  )
  const [validating, setValidating] = useState(false)
  const [applying, setApplying] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const canImport = Boolean(preview && preview.counts.new > 0 && csvText)

  const invalidReason = useMemo(() => {
    if (!preview) return ""
    return preview.invalid
      .slice(0, 3)
      .map((r) => `L${r.line}`)
      .join(", ")
  }, [preview])

  async function handleFileChange(next: FileList | null) {
    const selected = next?.[0] ?? null
    setFile(selected)
    setPreview(null)
    setApplyResult(null)
    setCsvText(null)

    if (!selected) return

    if (!selected.name.toLowerCase().endsWith(".csv")) {
      toast.error("Selecione um arquivo .csv")
      setFile(null)
      return
    }

    const text = await selected.text()
    setCsvText(text)
  }

  async function handleValidate() {
    if (!csvText) {
      toast.error("Selecione um arquivo CSV primeiro.")
      return
    }

    setValidating(true)
    setApplyResult(null)

    try {
      const res = await fetch("/api/admin/wri-emails/preview", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csv: csvText }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || "Falha ao validar CSV.")
      }
      setPreview(data as WriImportPreview)
      toast.success("CSV validado.")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha ao validar CSV.")
    } finally {
      setValidating(false)
    }
  }

  async function handleApply() {
    if (!csvText) return

    setApplying(true)
    try {
      const res = await fetch("/api/admin/wri-emails/apply", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csv: csvText }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || "Falha ao importar usuários.")
      }

      const result = data as WriImportApplyResult
      setApplyResult(result)
      setPreview(result)
      setConfirmOpen(false)

      if (result.failed.length > 0) {
        toast.warning(
          `Criados ${result.created.length}; falhas: ${result.failed.length}.`
        )
      } else {
        toast.success(
          `${result.created.length} usuário(s) criado(s). E-mails de redefinição enviados.`
        )
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Falha ao importar usuários."
      )
    } finally {
      setApplying(false)
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-16">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">
            <Link
              href="/dados/wri-dashboard"
              className="underline-offset-4 hover:underline"
            >
              Dashboard WRI
            </Link>
            {" / "}
            Gerenciar e-mails
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-gray-900">
            Importar e-mails WRI
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Envie o CSV com colunas <code className="text-xs">nome</code> e{" "}
            <code className="text-xs">e_mail</code>. Apenas e-mails novos são
            criados; existentes não são alterados. Cada novo usuário recebe
            e-mail para definir a senha.
          </p>
        </div>
      </div>

      <Card className="rounded-none shadow-none">
        <CardHeader>
          <CardTitle className="text-lg">1. Upload do CSV</CardTitle>
          <CardDescription>
            Valide antes de importar. Limite: 500 linhas / 1 MB.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <label className="flex flex-1 cursor-pointer flex-col gap-2">
            <span className="text-sm font-medium">Arquivo</span>
            <div className="flex items-center gap-3 rounded-none border border-input bg-background px-3 py-2 text-sm">
              <FileUp className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="truncate text-muted-foreground">
                {file?.name ?? "Nenhum arquivo selecionado"}
              </span>
              <input
                type="file"
                accept=".csv,text/csv"
                className="sr-only"
                onChange={(e) => handleFileChange(e.target.files)}
              />
            </div>
          </label>
          <Button
            type="button"
            className="rounded-none"
            onClick={handleValidate}
            disabled={!csvText || validating}
          >
            {validating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Validando…
              </>
            ) : (
              "Validar CSV"
            )}
          </Button>
        </CardContent>
      </Card>

      {preview && (
        <>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Novos"
              value={preview.counts.new}
              hint="Serão criados"
              accent="text-emerald-700"
            />
            <StatCard
              label="Já existentes"
              value={preview.counts.existing}
              hint="Ignorados"
            />
            <StatCard
              label="Inválidos"
              value={preview.counts.invalid}
              hint={invalidReason || "—"}
              accent={
                preview.counts.invalid > 0 ? "text-amber-700" : undefined
              }
            />
            <StatCard
              label="Duplicados no CSV"
              value={preview.counts.duplicateInCsv}
              hint="Ignorados"
            />
          </div>

          <Card className="rounded-none shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-lg">2. Revisar e importar</CardTitle>
                <CardDescription>
                  {preview.counts.new === 0
                    ? "Nenhum e-mail novo para criar."
                    : `${preview.counts.new} novo(s) receberão e-mail de redefinição de senha.`}
                </CardDescription>
              </div>
              <Button
                type="button"
                className="rounded-none"
                disabled={!canImport || applying}
                onClick={() => setConfirmOpen(true)}
              >
                <Users className="mr-2 h-4 w-4" />
                Importar {preview.counts.new} novo(s)
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <SectionTable
                title="Novos"
                empty="Nenhum novo."
                rows={preview.new}
                columns={["Linha", "Nome", "E-mail"]}
                render={(r) => (
                  <>
                    <TableCell>{r.line}</TableCell>
                    <TableCell>{r.nome}</TableCell>
                    <TableCell>{r.email}</TableCell>
                  </>
                )}
              />
              <SectionTable
                title="Já existentes"
                empty="Nenhum existente na lista."
                rows={preview.existing}
                columns={["Linha", "Nome", "E-mail"]}
                render={(r) => (
                  <>
                    <TableCell>{r.line}</TableCell>
                    <TableCell>{r.nome}</TableCell>
                    <TableCell>{r.email}</TableCell>
                  </>
                )}
              />
              <SectionTable
                title="Inválidos"
                empty="Nenhuma linha inválida."
                rows={preview.invalid}
                columns={["Linha", "Nome", "E-mail", "Motivo"]}
                render={(r) => (
                  <>
                    <TableCell>{r.line}</TableCell>
                    <TableCell>{r.nome}</TableCell>
                    <TableCell>{r.email}</TableCell>
                    <TableCell>
                      {REASON_LABELS[r.reason] ?? r.reason}
                    </TableCell>
                  </>
                )}
              />
            </CardContent>
          </Card>
        </>
      )}

      {applyResult && (
        <Card className="rounded-none shadow-none border-emerald-200 bg-emerald-50/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-emerald-900">
              <CheckCircle2 className="h-5 w-5" />
              Resultado da importação
            </CardTitle>
            <CardDescription>
              Criados: {applyResult.created.length} · Falhas:{" "}
              {applyResult.failed.length}
            </CardDescription>
          </CardHeader>
          {applyResult.failed.length > 0 && (
            <CardContent>
              <SectionTable
                title="Falhas"
                empty=""
                rows={applyResult.failed}
                columns={["E-mail", "Erro"]}
                render={(r) => (
                  <>
                    <TableCell>{r.email}</TableCell>
                    <TableCell className="text-destructive">{r.error}</TableCell>
                  </>
                )}
              />
            </CardContent>
          )}
        </Card>
      )}

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="rounded-none sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar importação</DialogTitle>
            <DialogDescription>
              Serão criados{" "}
              <strong>{preview?.counts.new ?? 0}</strong> usuário(s) no Firebase
              Auth e cada um receberá um e-mail para definir a senha. Contas já
              existentes não serão alteradas.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-start gap-2 rounded-none border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              Cota Spark: até 150 e-mails de reset por dia. Importações grandes
              podem demorar um pouco.
            </p>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              className="rounded-none"
              onClick={() => setConfirmOpen(false)}
              disabled={applying}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              className="rounded-none"
              onClick={handleApply}
              disabled={applying}
            >
              {applying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Importando…
                </>
              ) : (
                "Confirmar"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function StatCard({
  label,
  value,
  hint,
  accent,
}: {
  label: string
  value: number
  hint: string
  accent?: string
}) {
  return (
    <Card className="rounded-none shadow-none">
      <CardHeader className="pb-2">
        <CardDescription>{label}</CardDescription>
        <CardTitle className={`text-3xl tabular-nums ${accent ?? ""}`}>
          {value}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </CardContent>
    </Card>
  )
}

function SectionTable<T>({
  title,
  empty,
  rows,
  columns,
  render,
}: {
  title: string
  empty: string
  rows: T[]
  columns: string[]
  render: (row: T) => ReactNode
}) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-medium text-gray-900">
        {title}{" "}
        <span className="font-normal text-muted-foreground">({rows.length})</span>
      </h3>
      {rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">{empty}</p>
      ) : (
        <div className="max-h-64 overflow-auto rounded-none border">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((col) => (
                  <TableHead key={col}>{col}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.slice(0, 100).map((row, i) => (
                <TableRow key={i}>{render(row)}</TableRow>
              ))}
            </TableBody>
          </Table>
          {rows.length > 100 && (
            <p className="border-t px-3 py-2 text-xs text-muted-foreground">
              Mostrando 100 de {rows.length}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
