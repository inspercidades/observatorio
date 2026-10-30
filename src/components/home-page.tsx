"use client"

import { HomeContent } from "@/components/home-content"
import { HomeLoading } from "@/components/home-loading"
import { useHomeLoading } from "@/hooks/use-home-loading"
import { Suspense, type ReactNode } from "react"

interface HomePageProps {
  agenda: ReactNode
  impact: ReactNode
}

export function HomePage({ agenda, impact }: HomePageProps) {
  const { shouldShowLoading, isLoading, handleLoadingComplete } = useHomeLoading()

  return (
    <>
      {/* Always render content in background to allow preloading */}
      <div className={shouldShowLoading || isLoading ? "hidden" : "block"}>
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
          <HomeContent agenda={agenda} impact={impact} />
        </Suspense>
      </div>

      {/* Show loading screen when needed */}
      {(shouldShowLoading || isLoading) && (
        <HomeLoading onLoadingComplete={handleLoadingComplete} />
      )}
    </>
  )
}
