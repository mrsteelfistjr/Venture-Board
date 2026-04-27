"use client"

import { useRouter } from "next/navigation"

export default function Navbar() {
  const router = useRouter()

  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center bg-navy text-white border-b border-white/10">
      <h1 className="text-xl font-semibold">VentureBoard</h1>

      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/login")}
          className="text-sm opacity-80 hover:opacity-100 transition"
        >
          Login
        </button>

        <button
          onClick={() => router.push("/signup")}
          className="bg-blue px-4 py-2 rounded-lg text-sm hover:bg-blue-2 transition"
        >
          Join Now
        </button>
      </div>
    </nav>
  )
}
