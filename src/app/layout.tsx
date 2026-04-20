import type { Metadata } from "next"
import { Syne, DM_Sans } from "next/font/google"
import "./globals.css"

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "VentureBoard — Connective Equity",
    template: "%s | VentureBoard",
  },
  description:
    "The curated equity marketplace connecting serious founders with verified investors.",
  openGraph: {
    title: "VentureBoard — Connective Equity",
    description: "Curated. Anonymous. Complete.",
    images: ["/og-image.png"],
    url: "https://ventureboard.io",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@ventureboard",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="bg-navy text-text font-body antialiased">
        {children}
      </body>
    </html>
  )
}