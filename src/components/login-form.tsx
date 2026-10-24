"use client"

import { useState, FormEvent } from "react"
import { Eye, EyeOff, FileText } from "lucide-react"
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth"
import { firebaseAuth } from "@/lib/firebase-client"
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from "next/image"

type AuthView = "login" | "forgot"

const RESET_SUCCESS_MESSAGE =
  "Se este e-mail estiver cadastrado, enviamos um link para redefinir a senha. Verifique sua caixa de entrada e spam."

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [view, setView] = useState<AuthView>("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const searchParams = useSearchParams()

  function switchView(next: AuthView) {
    setView(next)
    setError(null)
    setSuccess(null)
    setPassword("")
  }

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      const credential = await signInWithEmailAndPassword(firebaseAuth, email, password)
      const idToken = await credential.user.getIdToken()

      const res = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { Authorization: `Bearer ${idToken}` },
      })

      if (!res.ok) throw new Error()

      const callbackUrl = searchParams.get("callbackUrl")
      const destination =
        callbackUrl && callbackUrl.startsWith("/") ? callbackUrl : "/projetos/dashboard-wri-brasil"
      window.location.assign(destination)
    } catch {
      setError("Email ou senha incorretos. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      firebaseAuth.languageCode = "pt-BR"
      await sendPasswordResetEmail(firebaseAuth, email.trim(), {
        url: `${window.location.origin}/sign-in`,
        handleCodeInApp: false,
      })
      setSuccess(RESET_SUCCESS_MESSAGE)
    } catch {
      // Mensagem genérica também em erro (anti-enumeração / rate limit)
      setSuccess(RESET_SUCCESS_MESSAGE)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 rounded-none">
        <CardContent className="grid p-0 md:grid-cols-2">
          {view === "login" ? (
            <form onSubmit={handleLogin} className="p-8 md:p-12">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">Painel QualiÔnibus</h1>
                  <p className="text-sm text-muted-foreground text-balance">
                  Acesso exclusivo para equipes das cidades participantes do programa QualiÔnibus.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium leading-none">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-none"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <label htmlFor="password" className="text-sm font-medium leading-none">
                        Senha
                      </label>
                      <button
                        type="button"
                        onClick={() => switchView("forgot")}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      >
                        Esqueci a senha
                      </button>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="rounded-none pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <p className="text-sm text-destructive text-center">{error}</p>
                  )}

                  <Button type="submit" className="w-full rounded-none cursor-pointer" disabled={loading}>
                    {loading ? "Entrando..." : "Entrar"}
                  </Button>

                  <a
                    href="/Manual_de_Acesso_ao_Painel_QualiOnibus.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors text-center"
                  >
                    <FileText className="h-4 w-4" />
                    Manual de Acesso ao Painel QualiÔnibus
                  </a>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleForgotPassword} className="p-8 md:p-12">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">Redefinir senha</h1>
                  <p className="text-sm text-muted-foreground text-balance">
                    Informe seu e-mail para receber um link de redefinição
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="reset-email" className="text-sm font-medium leading-none">
                      Email
                    </label>
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="seu@email.com"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-none"
                      disabled={!!success}
                    />
                  </div>

                  {success && (
                    <p className="text-sm text-center text-emerald-700">{success}</p>
                  )}

                  {error && (
                    <p className="text-sm text-destructive text-center">{error}</p>
                  )}

                  {!success ? (
                    <Button type="submit" className="w-full rounded-none" disabled={loading}>
                      {loading ? "Enviando..." : "Enviar link"}
                    </Button>
                  ) : null}

                  <button
                    type="button"
                    onClick={() => switchView("login")}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    Voltar ao login
                  </button>
                </div>
              </div>
            </form>
          )}

          <div className="relative hidden md:flex flex-col items-center justify-center gap-6 bg-[#1a2340] p-12 min-h-[480px]">
            <Image
              src="/logo-branco.png"
              alt="Logo"
              width={360}
              height={120}
              className="object-contain"
            />
            <p className="text-white/80 text-sm text-left leading-relaxed max-w-xs">
            Painel de monitoramento e análise de dados de ônibus das cidades participantes do QualiÔnibus.<br/><br/> O Relatório de Indicadores QualiÔnibus 2026 é aberto ao público e está disponível <a href="/2026_relatorio_qualionibus.pdf" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-colors underline! font-bold!">aqui</a>.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
