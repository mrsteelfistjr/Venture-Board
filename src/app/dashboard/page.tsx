import { prisma } from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"

function statCard(title: string, value: string, subtitle: string) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_60px_rgba(1,7,16,0.35)]">
      <p className="text-sm text-white/55">{title}</p>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm text-white/45">{subtitle}</p>
    </div>
  )
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const user = session?.user
    ? await prisma.user.findUnique({
        where: {
          supabaseId: session.user.id,
        },
        select: {
          role: true,
          listings: {
            select: { id: true },
          },
          offersReceived: {
            select: { id: true },
          },
          offersSent: {
            select: { id: true },
          },
        },
      })
    : null

  const role = user?.role ?? "FOUNDER"
  const listingsCount = user?.listings.length ?? 0
  const offersReceivedCount = user?.offersReceived.length ?? 0
  const offersSentCount = user?.offersSent.length ?? 0

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        {statCard(
          role === "FOUNDER" ? "Active listings" : "Saved opportunities",
          String(listingsCount),
          role === "FOUNDER"
            ? "Your current founder-facing pipeline."
            : "A quick snapshot of listing engagement."
        )}
        {statCard(
          role === "FOUNDER" ? "Offers received" : "Offers sent",
          String(role === "FOUNDER" ? offersReceivedCount : offersSentCount),
          role === "FOUNDER"
            ? "Investor conversations waiting on you."
            : "Live offers currently in market."
        )}
        {statCard(
          "Account role",
          role === "FOUNDER" ? "Founder" : "Investor",
          "Navigation and actions are tailored to this workspace."
        )}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.3fr_0.9fr]">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-white/35">
            Focus
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            {role === "FOUNDER"
              ? "Keep your listing momentum visible."
              : "Stay close to the highest-signal deals."}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">
            {role === "FOUNDER"
              ? "Use the left navigation to create a listing, monitor incoming interest, and move investor conversations forward without bouncing between pages."
              : "Use the role-specific navigation to browse listings, revisit founders, and keep your active offers organized from one mobile-friendly dashboard."}
          </p>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-[#0c1a30]/90 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-100/55">
            Next Step
          </p>
          <h3 className="mt-3 text-xl font-semibold text-white">
            {role === "FOUNDER" ? "Create your first listing" : "Start browsing listings"}
          </h3>
          <p className="mt-2 text-sm leading-6 text-white/60">
            {role === "FOUNDER"
              ? "Your sidebar now includes dedicated founder actions for listings, investors, and offers."
              : "Your sidebar now prioritizes browsing listings and tracking offers instead of founder-only tools."}
          </p>
        </div>
      </section>
    </div>
  )
}
