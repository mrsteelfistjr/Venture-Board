"use client"

import { useRouter } from "next/navigation"

export default function Hero() {
  const router = useRouter()

  return (
    <section className="flex flex-col items-center justify-center text-center min-h-[80vh] bg-navy text-white px-6">
      <h1 className="text-5xl font-bold mb-4">
        Pitch. Connect. Get Funded.
      </h1>

      <p className="text-lg text-gray-300 max-w-xl mb-8">
        VentureBoard is where founders meet investors and ideas turn into real businesses.
      </p>

      <button
        onClick={() => router.push("/signup")}
        className="bg-accent px-6 py-3 rounded-xl text-lg font-semibold hover:scale-105 transition"
      >
        Join Now
      </button>
    </section>
  )
}
