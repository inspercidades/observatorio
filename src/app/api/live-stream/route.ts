import { getLiveStream } from "@/lib/live-stream"
import { NextResponse } from "next/server"

// Nunca usa cache: retorna sempre o valor atual do Firestore
export const dynamic = "force-dynamic"

export async function GET() {
  const data = await getLiveStream()
  return NextResponse.json(data ?? {})
}
