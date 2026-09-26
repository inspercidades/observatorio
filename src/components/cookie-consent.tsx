"use client"

import { CookieConsent as CookieConsentCard } from "@/components/blocks/cookie-consent"
import { AnalyticsScripts, denyAnalyticsConsent } from "@/components/analytics-scripts"
import {
  openCookiePreferences,
  readCookieConsent,
  writeCookieConsent,
  type CookieConsentChoice,
} from "@/lib/cookie-consent"
import { useEffect, useState } from "react"

export function CookiePreferencesLink({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openCookiePreferences} className={className}>
      Preferências de cookies
    </button>
  )
}

export function CookieConsent() {
  const [choice, setChoice] = useState<CookieConsentChoice | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setChoice(readCookieConsent())
    setIsReady(true)
  }, [])

  function applyChoice(next: CookieConsentChoice) {
    const previous = readCookieConsent()
    writeCookieConsent(next)
    setChoice(next)

    if (previous === next) return

    if (previous !== null) {
      if (next === "denied") denyAnalyticsConsent()
      window.location.reload()
    }
  }

  return (
    <>
      {isReady && choice === "granted" ? <AnalyticsScripts /> : null}
      <CookieConsentCard
        className="z-[60]"
        title="Cookies neste site"
        description="Usamos cookies estritamente necessários para o site funcionar. Com a sua autorização, também usamos o Google Analytics e o Microsoft Clarity para medir a audiência e entender como as páginas são usadas, inclusive com gravação de sessão. Você pode recusar esses cookies e continuar navegando."
        acceptHint='Ao clicar em "Aceitar", você autoriza os cookies de audiência e a gravação de sessão.'
        acceptLabel="Aceitar"
        declineLabel="Recusar"
        learnMoreLabel="Política de privacidade"
        learnMoreHref="/privacidade"
        onAcceptCallback={() => applyChoice("granted")}
        onDeclineCallback={() => applyChoice("denied")}
      />
    </>
  )
}
