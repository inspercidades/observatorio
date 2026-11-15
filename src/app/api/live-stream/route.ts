import { getFirebaseAdminFirestore } from "@/lib/firebase-admin"
import { getLiveStream } from "@/lib/live-stream"
import { NextResponse } from "next/server"

// Nunca usa cache: retorna sempre o valor atual do Firestore
export const dynamic = "force-dynamic"

export async function GET() {
  // Diagnóstico direto: testa Firestore e captura o erro real
  try {
    const db = getFirebaseAdminFirestore()
    const doc = await db.collection("site-config").doc("live-stream").get()
    const data = await getLiveStream()
    return NextResponse.json({
      docExists: doc.exists,
      docData: doc.exists ? doc.data() : null,
      parsedResult: data,
    })
  } catch (err) {
    return NextResponse.json({
      error: String(err),
      message: err instanceof Error ? err.message : "unknown",
      stack: err instanceof Error ? err.stack?.split("\n").slice(0, 5) : null,
    }, { status: 500 })
  }
}
