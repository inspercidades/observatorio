import { getFirebaseAdminFirestore } from "@/lib/firebase-admin"

export interface LiveStreamData {
  url: string
  title?: string
  description?: string
  /** Início e fim em ISO 8601, para o selo "Ao vivo" e para esconder a faixa depois do evento. */
  startsAt?: string
  endsAt?: string
}

/** Aceita Timestamp do Firestore ou texto ISO. */
function toIso(value: unknown): string | undefined {
  if (typeof value === "string" && value.trim()) return value.trim()
  if (value && typeof (value as { toDate?: unknown }).toDate === "function") {
    return (value as { toDate: () => Date }).toDate().toISOString()
  }
  return undefined
}

/**
 * Busca o documento `site-config/live-stream` no Firestore.
 * Retorna os dados se o campo `url` estiver preenchido, ou `null` caso contrário.
 *
 * Para ativar a seção na home:
 *   Firebase Console → Firestore → site-config → live-stream → campo `url`
 *   Campos opcionais: `startsAt` e `endsAt` (timestamp). Sem eles, a faixa
 *   aparece como "Ao vivo" enquanto o `url` estiver preenchido.
 *
 * Para desativar:
 *   Remova o documento ou esvazie o campo `url`.
 */
export async function getLiveStream(): Promise<LiveStreamData | null> {
  try {
    const db = getFirebaseAdminFirestore()
    const doc = await db.collection("site-config").doc("live-stream").get()

    if (!doc.exists) return null

    const data = doc.data() as Partial<Record<keyof LiveStreamData, unknown>>
    if (!data?.url || typeof data.url !== "string" || !data.url.trim()) return null

    return {
      url: data.url.trim(),
      title: typeof data.title === "string" ? data.title : "Sexta da Mobilidade",
      description: typeof data.description === "string" ? data.description : undefined,
      startsAt: toIso(data.startsAt),
      endsAt: toIso(data.endsAt),
    }
  } catch {
    // Falha silenciosa: a home não deve quebrar por erro de leitura no Firestore
    return null
  }
}
