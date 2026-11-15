import { getFirebaseAdminFirestore } from "@/lib/firebase-admin"

export interface LiveStreamData {
  url: string
  title?: string
  description?: string
}

/**
 * Busca o documento `site-config/live-stream` no Firestore.
 * Retorna os dados se o campo `url` estiver preenchido, ou `null` caso contrário.
 *
 * Para ativar a seção na home:
 *   Firebase Console → Firestore → site-config → live-stream → campo `url`
 *
 * Para desativar:
 *   Remova o documento ou esvazie o campo `url`.
 */
export async function getLiveStream(): Promise<LiveStreamData | null> {
  try {
    const db = getFirebaseAdminFirestore()
    const doc = await db.collection("site-config").doc("live-stream").get()

    if (!doc.exists) return null

    const data = doc.data() as Partial<LiveStreamData>
    if (!data?.url || typeof data.url !== "string" || !data.url.trim()) return null

    return {
      url: data.url.trim(),
      title: data.title ?? "Sexta da Mobilidade",
      description: data.description,
    }
  } catch (err) {
    console.error("[live-stream] Erro ao buscar documento no Firestore:", err)
    return null
  }
}
