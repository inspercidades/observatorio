"use client"

import { FormEvent, useEffect, useState } from "react"
import {
  EmailAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  signOut,
  updatePassword,
  type User,
} from "firebase/auth"
import { firebaseAuth } from "@/lib/firebase-client"
import {
  Eye,
  EyeOff,
  KeyRound,
  LogOut,
  Mail,
  User as UserIcon,
} from "lucide-react"
import Link from "next/link"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const MIN_PASSWORD_LENGTH = 8

function getChangePasswordErrorMessage(code: string | undefined): string {
  switch (code) {
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Senha atual incorreta."
    case "auth/weak-password":
      return `A nova senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`
    case "auth/requires-recent-login":
      return "Por segurança, saia e entre novamente antes de trocar a senha."
    case "auth/too-many-requests":
      return "Muitas tentativas. Aguarde um momento e tente de novo."
    default:
      return "Não foi possível alterar a senha. Tente novamente."
  }
}

export function UserBar() {
  const [user, setUser] = useState<User | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [changePasswordOpen, setChangePasswordOpen] = useState(false)

  useEffect(() => {
    return onAuthStateChanged(firebaseAuth, (nextUser) => {
      setUser(nextUser)
      setLoaded(true)
    })
  }, [])

  useEffect(() => {
    if (!user) {
      setIsAdmin(false)
      return
    }

    let cancelled = false
    fetch("/api/admin/me", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : { isAdmin: false }))
      .then((data: { isAdmin?: boolean }) => {
        if (!cancelled) setIsAdmin(Boolean(data.isAdmin))
      })
      .catch(() => {
        if (!cancelled) setIsAdmin(false)
      })

    return () => {
      cancelled = true
    }
  }, [user])

  if (!loaded || !user) return null

  const displayName = user.displayName ?? user.email ?? null
  if (!displayName) return null

  const handleSignOut = async () => {
    await signOut(firebaseAuth)
    await fetch("/api/auth/logout", { method: "POST" })
    window.location.href = "/sign-in"
  }

  const firstName = displayName.split(" ")[0]

  return (
    <div className="flex items-center justify-end pb-6">
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="p-3 cursor-pointer transition-colors rounded-full bg-gray-100  text-gray-500 hover:text-black/50"
            aria-label="Menu do usuário"
          >
            <UserIcon className="h-5 w-5" />
          </button>
        </PopoverTrigger>

        <PopoverContent align="end" className="w-56 p-0 overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
            <p className="text-sm text-gray-700">
              Olá, <span className="font-semibold text-gray-900">{firstName}</span>!
            </p>
          </div>

          {isAdmin && (
            <Link
              href="/dados/admin/wri-emails"
              className="flex items-center gap-2.5 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Mail className="h-4 w-4" />
              Gerenciar e-mails WRI
            </Link>
          )}

          <button
            type="button"
            onClick={() => setChangePasswordOpen(true)}
            className="flex items-center gap-2.5 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <KeyRound className="h-4 w-4" />
            Trocar senha
          </button>

          <button
            type="button"
            onClick={handleSignOut}
            className="flex items-center gap-2.5 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </PopoverContent>
      </Popover>

      <ChangePasswordDialog
        open={changePasswordOpen}
        onOpenChange={setChangePasswordOpen}
        user={user}
      />
    </div>
  )
}

interface ChangePasswordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: User
}

function ChangePasswordDialog({ open, onOpenChange, user }: ChangePasswordDialogProps) {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  function resetForm() {
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setShowCurrent(false)
    setShowNew(false)
    setError(null)
    setSuccess(false)
    setLoading(false)
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) resetForm()
    onOpenChange(nextOpen)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!user.email) {
      setError("Conta sem e-mail associado. Não é possível trocar a senha por aqui.")
      return
    }

    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      setError(`A nova senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`)
      return
    }

    if (newPassword !== confirmPassword) {
      setError("A confirmação não coincide com a nova senha.")
      return
    }

    if (newPassword === currentPassword) {
      setError("A nova senha deve ser diferente da senha atual.")
      return
    }

    setLoading(true)

    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword)
      await reauthenticateWithCredential(user, credential)
      await updatePassword(user, newPassword)
      setSuccess(true)
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (err) {
      const code =
        typeof err === "object" && err !== null && "code" in err
          ? String((err as { code: string }).code)
          : undefined
      setError(getChangePasswordErrorMessage(code))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md rounded-none">
        <DialogHeader>
          <DialogTitle>Trocar senha</DialogTitle>
          <DialogDescription>
            Informe a senha atual e escolha uma nova senha para sua conta.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-emerald-700">Senha alterada com sucesso.</p>
            <DialogFooter>
              <Button
                type="button"
                className="rounded-none"
                onClick={() => handleOpenChange(false)}
              >
                Fechar
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <PasswordField
              id="current-password"
              label="Senha atual"
              autoComplete="current-password"
              value={currentPassword}
              onChange={setCurrentPassword}
              show={showCurrent}
              onToggleShow={() => setShowCurrent((v) => !v)}
            />
            <PasswordField
              id="new-password"
              label="Nova senha"
              autoComplete="new-password"
              value={newPassword}
              onChange={setNewPassword}
              show={showNew}
              onToggleShow={() => setShowNew((v) => !v)}
            />
            <div className="flex flex-col gap-2">
              <label htmlFor="confirm-password" className="text-sm font-medium leading-none">
                Confirmar nova senha
              </label>
              <Input
                id="confirm-password"
                type={showNew ? "text" : "password"}
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="rounded-none"
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                className="rounded-none"
                onClick={() => handleOpenChange(false)}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button type="submit" className="rounded-none" disabled={loading}>
                {loading ? "Salvando..." : "Salvar senha"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

interface PasswordFieldProps {
  id: string
  label: string
  autoComplete: string
  value: string
  onChange: (value: string) => void
  show: boolean
  onToggleShow: () => void
}

function PasswordField({
  id,
  label,
  autoComplete,
  value,
  onChange,
  show,
  onToggleShow,
}: PasswordFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium leading-none">
        {label}
      </label>
      <div className="relative">
        <Input
          id={id}
          type={show ? "text" : "password"}
          autoComplete={autoComplete}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="rounded-none pr-10"
        />
        <button
          type="button"
          onClick={onToggleShow}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={show ? "Ocultar senha" : "Mostrar senha"}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  )
}
