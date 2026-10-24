import { PowerBiEmbed } from "@/components/power-bi-embed"
import { UserBar } from "@/components/user-bar"
import { getTokens } from "next-firebase-auth-edge"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { FIREBASE_AUTH_CONFIG } from "@/lib/firebase-auth-config"

// URL do relatório Power BI (variável privada, só disponível no servidor). Ver README.md da pasta.
const POWER_BI_DASHBOARD_URL = process.env.POWER_BI_DASHBOARD_URL

export default async function DashboardWriBrasilPage() {
  const tokens = await getTokens(await cookies(), FIREBASE_AUTH_CONFIG)

  if (!tokens) {
    redirect("/sign-in")
  }

  if (!POWER_BI_DASHBOARD_URL) {
    throw new Error("POWER_BI_DASHBOARD_URL não está definida em .env.local")
  }

  return (
    <div className="min-h-screen bg-[#eaedf5]">
      <div className="px-4 2xl:px-16 pt-6">
        <UserBar />
        <PowerBiEmbed
          embedUrl={POWER_BI_DASHBOARD_URL}
          title="Dashboard QualiÔnibus - WRI Brasil"
          className="w-full"
        />
      </div>
    </div>
  )
}
