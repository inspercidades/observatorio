import { getLiveStream } from "@/lib/live-stream"
import { NextResponse } from "next/server"

// Nunca usa cache: retorna sempre o valor atual do Firestore
export const dynamic = "force-dynamic"

export async function GET() {
  const data = await getLiveStream()

  // Diagnóstico: inclui info de env vars (apenas presença, nunca o valor)
  if (!data) {
    return NextResponse.json({
      _debug: {
        FIREBASE_PROJECT_ID: !!process.env.FIREBASE_PROJECT_ID,
        FIREBASE_CLIENT_EMAIL: !!process.env.FIREBASE_CLIENT_EMAIL,
        FIREBASE_PRIVATE_KEY: !!process.env.FIREBASE_PRIVATE_KEY,
      },
    })
  }

  return NextResponse.json(data)
}
