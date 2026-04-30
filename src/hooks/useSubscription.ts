"use client"

import { useEffect, useState } from "react"

import { createClient } from "@/lib/supabase/client"

type SubscriptionTier = "FREE" | "PRO" | "LAUNCH"

type UseSubscriptionOptions = {
  initialTier?: SubscriptionTier
}

export function useSubscription(options: UseSubscriptionOptions = {}) {
  const [tier, setTier] = useState<SubscriptionTier>(options.initialTier ?? "FREE")

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        return
      }

      const response = await fetch("/api/users/me", {
        credentials: "include",
      })

      if (!response.ok) {
        return
      }

      const user = (await response.json()) as { subscriptionTier?: SubscriptionTier }

      if (user.subscriptionTier) {
        setTier(user.subscriptionTier)
      }
    }

    load()
  }, [])

  return {
    tier,
    isPro: tier !== "FREE",
    isLaunch: tier === "LAUNCH",
  }
}
