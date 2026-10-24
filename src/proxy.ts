import { authMiddleware } from "next-firebase-auth-edge"
import { NextRequest, NextResponse } from "next/server"
import { FIREBASE_AUTH_CONFIG } from "@/lib/firebase-auth-config"

const PROTECTED_PATHS = [
  "/dados/wri-dashboard",
  "/dados/admin",
]

function isProtected(request: NextRequest) {
  return PROTECTED_PATHS.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  )
}

function buildCsp(): string {
  const isDevelopment = process.env.NODE_ENV === "development"

  const scriptSrc = [
    "'self'",
    "'unsafe-inline'",
    // React usa eval() no modo de desenvolvimento (stack traces / Fast Refresh)
    ...(isDevelopment ? ["'unsafe-eval'"] : []),
    "https://*.mapbox.com",
    "https://*.powerbi.com",
    "https://www.googletagmanager.com",
    "https://www.clarity.ms",
    "https://scripts.clarity.ms",
  ].join(" ")

  return `
    default-src 'self' https://*.cloudinary.com https://*.sharepoint.com https://*.mapbox.com/ https://*.powerbi.com/ https://*.outlook.com/;
    script-src ${scriptSrc};
    connect-src 'self' ${isDevelopment ? "ws: wss:" : ""} https://*.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://*.cloudinary.com https://*.sharepoint.com https://*.mapbox.com https://*.powerbi.com https://*.outlook.com https://www.google-analytics.com https://analytics.google.com https://*.clarity.ms;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://www.google-analytics.com https://c.clarity.ms;
    font-src 'self' data: https://storage.googleapis.com;
    media-src 'self' data: blob: https://*.cloudinary.com https://*.sharepoint.com;
    worker-src 'self' blob:;
    frame-src https://*.powerbi.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, " ").trim()
}

function applySecurityHeaders(response: NextResponse): NextResponse {
  const csp = buildCsp()
  response.headers.set("Content-Security-Policy", csp)
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()")
  return response
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === "/noticias" || pathname.startsWith("/noticias/")) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return authMiddleware(request, {
    loginPath: "/api/auth/login",
    logoutPath: "/api/auth/logout",
    ...FIREBASE_AUTH_CONFIG,
    handleValidToken: async (_tokens, headers) => {
      if (request.nextUrl.pathname === "/sign-in") {
        const callbackUrl = request.nextUrl.searchParams.get("callbackUrl")
        const destination =
          callbackUrl && callbackUrl.startsWith("/")
            ? callbackUrl
            : "/dados/wri-dashboard"
        return NextResponse.redirect(new URL(destination, request.url))
      }
      const response = NextResponse.next({ request: { headers } })
      return applySecurityHeaders(response)
    },
    handleInvalidToken: async () => {
      if (isProtected(request)) {
        const signInUrl = new URL("/sign-in", request.url)
        signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname)
        return NextResponse.redirect(signInUrl)
      }
      return applySecurityHeaders(NextResponse.next())
    },
    handleError: async () => {
      if (isProtected(request)) {
        const signInUrl = new URL("/sign-in", request.url)
        signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname)
        return NextResponse.redirect(signInUrl)
      }
      return applySecurityHeaders(NextResponse.next())
    },
  })
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}
