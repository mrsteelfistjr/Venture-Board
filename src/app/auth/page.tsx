import Link from "next/link"

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy px-6 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
        <h2 className="mb-3 text-2xl font-semibold">Welcome to VentureBoard</h2>
        <p className="mb-6 text-sm text-white/65">
          Choose how you want to get started.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/login"
            className="rounded-lg border border-white/10 bg-black/20 px-4 py-3 transition hover:bg-white/10"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-accent px-4 py-3 font-medium text-navy transition hover:opacity-90"
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  )
}
