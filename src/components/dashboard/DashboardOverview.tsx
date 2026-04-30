"use client"

import { ArrowRight, BarChart3, Crown, Lock, MessageSquare, Plus, Sparkles } from "lucide-react"

import { useSubscription } from "@/hooks/useSubscription"

type UserRole = "FOUNDER" | "INVESTOR"
type SubscriptionTier = "FREE" | "PRO" | "LAUNCH"

type ListingSummary = {
  id: string
  title: string
  tagline: string
  stage: string
  interestCount: number
  status: string
}

type DashboardOverviewProps = {
  initialTier: SubscriptionTier
  role: UserRole
  listings: ListingSummary[]
  offersReceivedCount: number
  offersSentCount: number
}

function sectionCard(children: React.ReactNode, className = "") {
  return (
    <section
      className={`rounded-[30px] border border-white/10 bg-white/[0.045] p-6 shadow-[0_20px_70px_rgba(2,8,18,0.35)] ${className}`}
    >
      {children}
    </section>
  )
}

function ListingCard({ listing }: { listing: ListingSummary }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#0d1829] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-white/35">{listing.stage}</p>
          <h3 className="mt-2 text-xl font-semibold text-white">{listing.title}</h3>
          <p className="mt-2 text-sm leading-6 text-white/55">{listing.tagline}</p>
        </div>
        <span className="rounded-full border border-cyan-300/15 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100">
          {listing.status.toLowerCase()}
        </span>
      </div>
      <div className="mt-5 flex items-center justify-between text-sm text-white/45">
        <span>{listing.interestCount} investor signals</span>
        <span>Open profile</span>
      </div>
    </div>
  )
}

function EmptySlot({ label }: { label: string }) {
  return (
    <div className="flex min-h-52 flex-col items-center justify-center rounded-3xl border border-dashed border-white/20 bg-white/[0.02] px-6 text-center">
      <div className="rounded-full border border-white/12 bg-white/6 p-3">
        <Plus className="size-5 text-white/75" />
      </div>
      <p className="mt-4 text-lg font-medium text-white">{label}</p>
      <p className="mt-2 max-w-xs text-sm leading-6 text-white/45">
        Add another listing slot to keep your pipeline visible and investor-ready.
      </p>
    </div>
  )
}

function AnalyticsPreviewLocked() {
  return sectionCard(
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-amber-100/60">Analytics Dashboard</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">Upgrade to Pro</h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-white/55">
            Unlock listing views, interest trends, match quality, and momentum tracking across your
            investor funnel.
          </p>
        </div>
        <div className="rounded-full border border-amber-300/20 bg-amber-300/10 p-3">
          <Lock className="size-5 text-amber-100" />
        </div>
      </div>

      <div className="relative mt-6 overflow-hidden rounded-[26px] border border-white/8 bg-[#0c1626] p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
            <div className="h-24 rounded-xl bg-linear-to-r from-cyan-400/20 via-cyan-300/8 to-transparent" />
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
            <div className="flex h-24 items-end gap-2">
              {[38, 52, 44, 67, 72, 58].map((height) => (
                <div key={height} className="flex-1 rounded-t-xl bg-cyan-300/20" style={{ height: `${height}%` }} />
              ))}
            </div>
          </div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[rgba(4,8,14,0.45)] backdrop-blur-[6px]">
          <p className="text-base font-medium text-white">Analytics are waiting behind Pro</p>
          <button className="mt-4 rounded-full bg-amber-300 px-5 py-2 text-sm font-medium text-[#08111f]">
            Upgrade to Pro
          </button>
        </div>
      </div>
    </>
  )
}

function AnalyticsLive({ listings, offersReceivedCount, offersSentCount, role }: DashboardOverviewProps) {
  const weeklyViews = listings.length * 94 + 118
  const interestCount = role === "FOUNDER" ? offersReceivedCount + listings.length * 3 : offersSentCount + 7
  const matchScore = Math.min(98, 72 + listings.length * 4)
  const daysSinceListing = listings.length > 0 ? 9 : 0

  const stats = [
    { label: "Views this week", value: String(weeklyViews) },
    { label: "Interest count", value: String(interestCount) },
    { label: "Match score", value: `${matchScore}%` },
    { label: "Days since listing", value: String(daysSinceListing) },
  ]

  return sectionCard(
    <>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-cyan-100/55">Analytics</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">Performance dashboard</h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-white/55">
            A premium view into listing momentum, engagement, and investor fit across your active
            pipeline.
          </p>
        </div>
        <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 p-3">
          <BarChart3 className="size-5 text-cyan-100" />
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-white/8 bg-[#0c1626] p-4">
            <p className="text-sm text-white/45">{stat.label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{stat.value}</p>
          </div>
        ))}
      </div>
    </>
  )
}

function InvestorAccess({ tier }: { tier: SubscriptionTier }) {
  const locked = tier === "FREE"

  return sectionCard(
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-white/35">Investor Profiles</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">Browse available investors</h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-white/55">
            {locked
              ? "Upgrade to message investors directly and unlock proactive deal conversations."
              : "Direct messaging is enabled, so you can start meaningful investor conversations from the moment a match feels right."}
          </p>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 p-3">
          <MessageSquare className="size-5 text-white/75" />
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[
          { name: "Aria Capital", focus: "Pre-seed SaaS and marketplaces" },
          { name: "Northline Ventures", focus: "Fintech, B2B infrastructure" },
          { name: "Sable Angels", focus: "Operator-led syndicate for early traction" },
        ].map((investor) => (
          <div key={investor.name} className="rounded-3xl border border-white/10 bg-[#0d1829] p-5">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-300/35 to-blue-400/18 text-sm font-semibold text-white">
                {investor.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-white">{investor.name}</p>
                <p className="text-sm text-white/45">{investor.focus}</p>
              </div>
            </div>
            <button
              className={`mt-5 w-full rounded-full px-4 py-2.5 text-sm font-medium ${
                locked
                  ? "border border-white/10 bg-white/5 text-white/45"
                  : "bg-cyan-300 text-[#08111f]"
              }`}
            >
              {locked ? "Upgrade to message" : "Send Message"}
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

function LaunchAiPanel() {
  return sectionCard(
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-cyan-100/55">AI Pitch Feedback</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">Refine your pitch with AI</h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-white/55">
            Paste your current pitch draft below and get AI-assisted clarity notes, investor framing,
            and sharper traction storytelling.
          </p>
        </div>
        <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 p-3">
          <Sparkles className="size-5 text-cyan-100" />
        </div>
      </div>

      <textarea
        className="mt-6 min-h-40 w-full rounded-[24px] border border-white/10 bg-[#0c1626] px-5 py-4 text-sm text-white outline-none placeholder:text-white/30"
        placeholder="Paste your pitch here. Example: We help independent clinics reduce patient no-shows by 41% with predictive scheduling and automated outreach..."
      />
      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-sm text-white/45">This will eventually call your backend AI feedback endpoint.</p>
        <button className="rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-medium text-[#08111f]">
          Get AI Feedback
        </button>
      </div>
    </>
  )
}

export default function DashboardOverview({
  initialTier,
  role,
  listings,
  offersReceivedCount,
  offersSentCount,
}: DashboardOverviewProps) {
  const { tier, isPro, isLaunch } = useSubscription({ initialTier })

  const listingLimit = tier === "FREE" ? 1 : tier === "PRO" ? 3 : Infinity
  const visibleListings = listingLimit === Infinity ? listings : listings.slice(0, listingLimit)
  const emptySlots =
    listingLimit === Infinity ? 0 : Math.max(0, listingLimit - visibleListings.length)

  const freeBanner =
    role === "FOUNDER" && tier === "FREE" ? (
      <div className="rounded-[26px] border border-amber-300/18 bg-linear-to-r from-amber-300/16 via-amber-200/6 to-transparent px-5 py-4 text-sm text-amber-50">
        You&apos;re on the Free plan. Upgrade to Pro for 3 listings, analytics, and direct messaging.
      </div>
    ) : null

  const launchBand =
    role === "FOUNDER" && isLaunch ? (
      <div className="rounded-[28px] border border-cyan-300/20 bg-linear-to-r from-cyan-300/22 via-teal-300/10 to-transparent px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="rounded-full border border-cyan-100/20 bg-cyan-100/12 p-2">
            <Crown className="size-5 text-cyan-50" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-50/70">Launch Tier</p>
            <p className="mt-1 text-lg font-medium text-white">
              You have unlimited listings, AI pitch feedback, and concierge-style support.
            </p>
          </div>
        </div>
      </div>
    ) : null

  const founderListingsTitle =
    tier === "FREE"
      ? "Your single listing slot"
      : tier === "PRO"
        ? "Your three listing slots"
        : "All active listings"

  if (role === "INVESTOR") {
    return (
      <div className="space-y-6">
        {tier === "FREE" ? (
          <div className="rounded-[26px] border border-amber-300/18 bg-linear-to-r from-amber-300/16 via-amber-200/6 to-transparent px-5 py-4 text-sm text-amber-50">
            You&apos;re on the Free plan. Upgrade to Pro for messaging access, analytics, and more deal-flow tools.
          </div>
        ) : null}

        {isLaunch ? launchBand : null}

        {sectionCard(
          <>
            <p className="text-xs uppercase tracking-[0.28em] text-white/35">Investor View</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Your pipeline changes with your plan</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55">
              This investor dashboard is ready for deeper opportunity tracking. For now it reflects the
              same tier-aware access model: Free keeps messaging gated, Pro unlocks active outreach,
              and Launch adds premium support treatment.
            </p>
          </>
        )}

        {isPro ? (
          <AnalyticsLive
            initialTier={tier}
            role={role}
            listings={listings}
            offersReceivedCount={offersReceivedCount}
            offersSentCount={offersSentCount}
          />
        ) : (
          <AnalyticsPreviewLocked />
        )}

        <InvestorAccess tier={tier} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {freeBanner}
      {launchBand}

      {sectionCard(
        <>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/35">Listings</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">{founderListingsTitle}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">
                {tier === "FREE"
                  ? "Free founders get one prominent listing slot to establish their presence."
                  : tier === "PRO"
                    ? "Pro founders can manage up to three listings and keep empty slots ready for expansion."
                    : "Launch founders can publish and manage as many active listings as they need."}
              </p>
            </div>
            {tier === "LAUNCH" ? (
              <button className="rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-medium text-[#08111f]">
                Add New Listing
              </button>
            ) : null}
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {visibleListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}

            {visibleListings.length === 0 && tier === "FREE" ? (
              <div className="lg:col-span-3">
                <EmptySlot label="Create Your First Listing" />
              </div>
            ) : null}

            {Array.from({ length: emptySlots }).map((_, index) => (
              <EmptySlot key={index} label="Add Listing" />
            ))}
          </div>
        </>
      )}

      {isPro ? (
        <AnalyticsLive
          initialTier={tier}
          role={role}
          listings={listings}
          offersReceivedCount={offersReceivedCount}
          offersSentCount={offersSentCount}
        />
      ) : (
        <AnalyticsPreviewLocked />
      )}

      <InvestorAccess tier={tier} />

      {isLaunch ? <LaunchAiPanel /> : null}

      {sectionCard(
        <>
          <p className="text-xs uppercase tracking-[0.28em] text-white/35">Momentum</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">
            {tier === "FREE"
              ? "A sharper first impression starts here."
              : tier === "PRO"
                ? "Your premium workflow is unlocked."
                : "Launch is built for rapid iteration and concierge support."}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55">
            {tier === "FREE"
              ? "You already have the essential listing surface. The rest of the dashboard now previews what Pro will unlock."
              : tier === "PRO"
                ? "Your analytics, multi-listing workspace, and investor messaging tools are live and ready to use."
                : "You now have the widest founder workspace in the product, plus AI feedback and a tier-specific support presence in the sidebar."}
          </p>
          <div className="mt-5 inline-flex items-center gap-2 text-sm text-cyan-100">
            Continue building your pipeline <ArrowRight className="size-4" />
          </div>
        </>
      )}
    </div>
  )
}
