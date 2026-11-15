import { getLiveStream } from "@/lib/live-stream"
import { NextResponse } from "next/server"

// Nunca usa cache: retorna sempre o valor atual do Firestore
export const dynamic = "force-dynamic"

export async function GET() {
  // Diagnóstico temporário: mostra formato da chave sem expor o conteúdo
  const rawKey = process.env.FIREBASE_PRIVATE_KEY ?? ""
  const processed = rawKey.replace(/\\n/g, "\n")
  const keyDiag = {
    rawLength: rawKey.length,
    startsWithQuote: rawKey.startsWith('"') || rawKey.startsWith("'"),
    endsWithQuote: rawKey.endsWith('"') || rawKey.endsWith("'"),
    rawStartsWith: rawKey.slice(0, 40),
    rawEndsWith: rawKey.slice(-30),
    processedStartsWith: processed.startsWith("-----BEGIN"),
    processedEndsWithDashes: processed.trimEnd().endsWith("-----"),
    newlineCount: (processed.match(/\n/g) ?? []).length,
  }

  try {
    const data = await getLiveStream()
    return NextResponse.json({ data, keyDiag })
  } catch (err) {
    return NextResponse.json({ error: String(err), keyDiag }, { status: 500 })
  }
}
