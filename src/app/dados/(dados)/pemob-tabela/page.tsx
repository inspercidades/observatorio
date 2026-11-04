import { Suspense } from "react"
import DashboardContent from "./dashboard-content"

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#f3f3f3] min-h-screen w-full flex items-center justify-center p-4">
          <p className="text-gray-500">Carregando...</p>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  )
}
