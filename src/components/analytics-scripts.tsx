"use client"

import Clarity from "@microsoft/clarity"
import { useEffect } from "react"

const GA_ID_PATTERN = /^G-[A-Z0-9]+$/
const CLARITY_ID_PATTERN = /^[a-z0-9]+$/i

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    clarity?: (command: string, ...args: unknown[]) => void
  }
}

function startGoogleAnalytics(gaId: string) {
  if (!GA_ID_PATTERN.test(gaId)) return
  if (document.getElementById("ga-script")) return

  const debugConfig =
    process.env.NODE_ENV === "development" ? ", { debug_mode: true }" : ""
  const inline = document.createElement("script")
  inline.id = "ga-consent-update"
  inline.text = `
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag(){window.dataLayer.push(arguments);};
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    window.gtag('js', new Date());
    window.gtag('config', '${gaId}'${debugConfig});
  `
  document.head.appendChild(inline)

  const script = document.createElement("script")
  script.id = "ga-script"
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
  document.head.appendChild(script)
}

function startClarity(clarityId: string) {
  if (!CLARITY_ID_PATTERN.test(clarityId)) return
  if (document.getElementById("clarity-script")) return

  Clarity.init(clarityId)
  Clarity.consentV2({ ad_Storage: "denied", analytics_Storage: "granted" })
}

export function denyAnalyticsConsent() {
  window.gtag?.("consent", "update", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  })

  if (typeof window.clarity === "function") {
    window.clarity("consentv2", {
      ad_Storage: "denied",
      analytics_Storage: "denied",
    })
  }
}

export function AnalyticsScripts() {
  useEffect(() => {
    const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
    const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID

    if (gaId) startGoogleAnalytics(gaId)
    if (clarityId) startClarity(clarityId)
  }, [])

  return null
}
