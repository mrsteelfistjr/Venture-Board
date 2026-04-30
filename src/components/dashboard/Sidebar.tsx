"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Building2,
  CreditCard,
  Handshake,
  LayoutDashboard,
  PlusSquare,
  Search,
  User,
  Users,
} from "lucide-react"

import { cn } from "@/lib/utils"

type UserRole = "FOUNDER" | "INVESTOR"
type SubscriptionTier = "FREE" | "PRO" | "LAUNCH"

type SidebarProps = {
  role: UserRole
  tier: SubscriptionTier
}

const sharedNavItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/dashboard/profile", icon: User, label: "Profile" },
  { href: "/dashboard/billing", icon: CreditCard, label: "Billing" },
] as const

const founderNavItems = [
  { href: "/dashboard/listings", icon: Building2, label: "My Listings" },
  { href: "/dashboard/listings/new", icon: PlusSquare, label: "Create Listing" },
  { href: "/dashboard/investors", icon: Users, label: "Investors" },
  { href: "/dashboard/offers", icon: Handshake, label: "Offers" },
] as const

const investorNavItems = [
  { href: "/dashboard/listings", icon: Search, label: "Browse Listings" },
  { href: "/dashboard/investors", icon: Users, label: "Founders" },
  { href: "/dashboard/offers", icon: Handshake, label: "My Offers" },
] as const

function isCurrentPath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function Sidebar({ role, tier }: SidebarProps) {
  const pathname = usePathname()
  const roleLabel = role === "FOUNDER" ? "Founder" : "Investor"
  const roleTone =
    tier === "LAUNCH"
      ? "from-teal-300/25 via-cyan-300/10 to-transparent text-cyan-50"
      : role === "FOUNDER"
      ? "from-cyan-400/20 via-cyan-300/6 to-transparent text-cyan-100"
      : "from-blue-500/20 via-blue-300/6 to-transparent text-blue-100"

  const roleNavItems =
    role === "FOUNDER" ? founderNavItems : investorNavItems

  const allNavItems = [...sharedNavItems.slice(0, 1), ...roleNavItems, ...sharedNavItems.slice(1)]

  return (
    <>
      <aside className="hidden w-60 shrink-0 border-r border-white/8 bg-[#08111f] lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:flex-col">
        <div className="border-b border-white/8 px-6 py-6">
          <Link href="/dashboard" className="block">
            <p className="text-xs uppercase tracking-[0.35em] text-white/40">
              VentureBoard
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-white">Dashboard</h1>
          </Link>
        </div>

        <div className="px-4 py-4">
          <div className={cn("rounded-2xl border border-white/10 bg-linear-to-br p-4", roleTone)}>
            <p className="text-xs uppercase tracking-[0.28em] text-white/55">
              Active Workspace
            </p>
            <p className="mt-2 text-lg font-medium text-white">{roleLabel} View</p>
            <p className="mt-1 text-sm text-white/65">
              {role === "FOUNDER"
                ? "Manage listings, watch investor activity, and track incoming offers."
                : "Browse vetted companies, organize interest, and manage your pipeline."}
            </p>
            <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/8 bg-white/6 px-3 py-2 text-xs text-white/60">
              <span>Plan</span>
              <span className="font-medium text-white">{tier}</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 pb-6">
          <ul className="space-y-1">
            {allNavItems.map((item) => {
              const Icon = item.icon
              const active = isCurrentPath(pathname, item.href)

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition",
                      active
                        ? "bg-white text-navy shadow-[0_8px_30px_rgba(255,255,255,0.08)]"
                        : "text-white/70 hover:bg-white/6 hover:text-white"
                    )}
                  >
                    <Icon className="size-4" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {tier === "LAUNCH" ? (
          <div className="mx-4 mb-5 rounded-3xl border border-cyan-300/16 bg-linear-to-br from-cyan-300/14 via-white/4 to-transparent p-4">
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-50/65">
              Account Manager
            </p>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-white/10 text-sm font-semibold text-white">
                AN
              </div>
              <div>
                <p className="font-medium text-white">Avery North</p>
                <p className="text-sm text-white/45">Launch concierge</p>
              </div>
            </div>
            <a
              href="https://cal.com"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex rounded-full bg-cyan-300 px-4 py-2 text-sm font-medium text-[#08111f]"
            >
              Book a strategy call
            </a>
          </div>
        ) : null}
      </aside>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#08111f]/96 px-2 py-2 backdrop-blur lg:hidden">
        <ul className="grid grid-cols-5 gap-1">
          {allNavItems.slice(0, 5).map((item) => {
            const Icon = item.icon
            const active = isCurrentPath(pathname, item.href)

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-label={item.label}
                  className={cn(
                    "flex flex-col items-center justify-center rounded-2xl px-2 py-2 text-[11px] transition",
                    active
                      ? "bg-white text-navy"
                      : "text-white/60 hover:bg-white/6 hover:text-white"
                  )}
                >
                  <Icon className="mb-1 size-4" />
                  <span className="truncate">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}
