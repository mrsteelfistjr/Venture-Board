import { redirect } from "next/navigation"

import Sidebar from "@/components/dashboard/Sidebar"
import { prisma } from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"

type DashboardLayoutProps = {
  children: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session?.user) {
    redirect("/login")
  }

  const prismaUser = await prisma.user.findUnique({
    where: {
      supabaseId: session.user.id,
    },
    select: {
      role: true,
      email: true,
      subscriptionTier: true,
    },
  })

  const sessionRole = session.user.user_metadata?.role
  const role =
    sessionRole === "FOUNDER" || sessionRole === "INVESTOR"
      ? sessionRole
      : prismaUser?.role === "FOUNDER" || prismaUser?.role === "INVESTOR"
        ? prismaUser.role
        : "FOUNDER"
  const tier = prismaUser?.subscriptionTier ?? "FREE"
  const layoutTone =
    tier === "LAUNCH"
      ? "bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.18),_transparent_32%),linear-gradient(180deg,_#04141a,_#031018_72%)]"
      : "bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.14),_transparent_30%),linear-gradient(180deg,_#07101d,_#02060d_70%)]"

  return (
    <div className={`min-h-screen text-white ${layoutTone}`}>
      <Sidebar role={role} tier={tier} />

      <main className="min-h-screen pb-24 lg:ml-60 lg:pb-10">
        <div className={`border-b px-6 py-5 lg:px-10 ${tier === "LAUNCH" ? "border-cyan-300/14 bg-linear-to-r from-cyan-300/14 via-transparent to-transparent" : "border-white/8"}`}>
          <p className="text-xs uppercase tracking-[0.32em] text-white/40">
            VentureBoard Control Room
          </p>
          <div className="mt-2 flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-semibold">
                {role === "FOUNDER" ? "Founder dashboard" : "Investor dashboard"}
              </h1>
              <p className="mt-1 text-sm text-white/60">
                Signed in as {prismaUser?.email ?? session.user.email}
              </p>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
              {tier === "LAUNCH"
                ? "Launch tier active: unlimited listings, AI feedback, and concierge support."
                : role === "FOUNDER"
                  ? "Listings, interest, and investor outreach in one place."
                  : "Track deal flow, founders, and active offer conversations."}
            </div>
          </div>
        </div>

        <div className="px-6 py-6 lg:px-10">{children}</div>
      </main>
    </div>
  )
}
