import DashboardOverview from "@/components/dashboard/DashboardOverview"
import { prisma } from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"

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
          subscriptionTier: true,
          listings: {
            select: {
              id: true,
              title: true,
              tagline: true,
              stage: true,
              interestCount: true,
              status: true,
            },
            orderBy: {
              createdAt: "desc",
            },
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

  const role = user?.role === "INVESTOR" ? "INVESTOR" : "FOUNDER"
  const tier = user?.subscriptionTier ?? "FREE"
  const listingsCount = user?.listings.length ?? 0
  const offersReceivedCount = user?.offersReceived.length ?? 0
  const offersSentCount = user?.offersSent.length ?? 0

  return (
    <DashboardOverview
      initialTier={tier}
      role={role}
      listings={
        user?.listings.map((listing) => ({
          id: listing.id,
          title: listing.title,
          tagline: listing.tagline,
          stage: listing.stage,
          interestCount: listing.interestCount,
          status: listing.status,
        })) ?? []
      }
      offersReceivedCount={offersReceivedCount}
      offersSentCount={offersSentCount}
    />
  )
}
