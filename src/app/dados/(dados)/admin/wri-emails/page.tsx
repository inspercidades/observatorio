import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getTokens } from "next-firebase-auth-edge"
import { UserBar } from "@/components/user-bar"
import { isAdminEmail } from "@/lib/admin"
import { FIREBASE_AUTH_CONFIG } from "@/lib/firebase-auth-config"
import { WriEmailsAdmin } from "./wri-emails-admin"

export default async function AdminWriEmailsPage() {
  const tokens = await getTokens(await cookies(), FIREBASE_AUTH_CONFIG)

  if (!tokens) {
    redirect("/sign-in?callbackUrl=/dados/admin/wri-emails")
  }

  const email =
    typeof tokens.decodedToken.email === "string"
      ? tokens.decodedToken.email
      : null

  if (!isAdminEmail(email)) {
    redirect("/dados/wri-dashboard")
  }

  return (
    <div className="min-h-screen bg-[#eaedf5]">
      <div className="px-4 2xl:px-16 pt-6">
        <UserBar />
        <WriEmailsAdmin />
      </div>
    </div>
  )
}
