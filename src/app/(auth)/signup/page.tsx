'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

import { createClient } from "@/lib/supabase/client"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"FOUNDER" | "INVESTOR">("FOUNDER")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  async function handleSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role },
      },
    })

    if (authError || !authData.user) {
      setError(authError?.message ?? "Unable to create your account.")
      setLoading(false)
      return
    }

    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        supabaseId: authData.user.id,
        email,
        role,
      }),
    })

    if (!response.ok) {
      const result = await response.json().catch(() => null)
      setError(result?.error ?? "Your account was created, but profile setup failed.")
      setLoading(false)
      return
    }

    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-navy px-6 py-12 text-white">
      <div className="mx-auto flex min-h-[80vh] w-full max-w-md items-center justify-center">
        <form
          onSubmit={handleSignup}
          className="w-full rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur"
        >
          <div className="mb-6 space-y-2 text-center">
            <h1 className="text-3xl font-semibold">Create your account</h1>
            <p className="text-sm text-white/65">
              Join VentureBoard as a founder or investor.
            </p>
          </div>

          <div className="space-y-4">
            <input
              className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <input
              className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={8}
            />

            <select
              className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
              value={role}
              onChange={(event) =>
                setRole(event.target.value as "FOUNDER" | "INVESTOR")
              }
            >
              <option value="FOUNDER">Founder</option>
              <option value="INVESTOR">Investor</option>
            </select>
          </div>

          {error ? (
            <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-accent px-4 py-3 font-medium text-navy transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  )
}
