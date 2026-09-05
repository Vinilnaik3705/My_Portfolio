import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Vinil Naik — Full Stack Developer & Agentic AI Engineer',
  description:
    'Final Year CS Student at NIT Jamshedpur. I build full-stack products, agentic AI systems, and RAG pipelines that ship.',
  keywords: [
    'Vinil Naik',
    'Full Stack Developer',
    'Agentic AI',
    'RAG Systems',
    'NIT Jamshedpur',
    'Portfolio',
  ],
}

export const viewport: Viewport = {
  themeColor: '#0a0a0b',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`bg-background ${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body className="font-sans">{children}</body>
    </html>
  )
}
