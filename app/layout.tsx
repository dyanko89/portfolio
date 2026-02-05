import React from "react"
import type { Metadata, Viewport } from 'next'
import { Ubuntu, Ubuntu_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import './globals.css'

const ubuntu = Ubuntu({
  subsets: ["latin"],
  variable: '--font-ubuntu-sans',
  weight: ['300', '400', '500', '700'],
  display: 'swap',
})

const ubuntuMono = Ubuntu_Mono({
  subsets: ["latin"],
  variable: '--font-ubuntu-sans-mono',
  weight: ['400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Dyanko89 | From Chaos to Clarity',
  description: 'Systems Architect & AI Consultant crafting digital experiences that transform complexity into elegant solutions.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0a0f12',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${ubuntu.className} ${ubuntu.variable} ${ubuntuMono.variable} antialiased`}>
        {children}
        <Toaster
          position="bottom-right"
          duration={7000}
          closeButton
          toastOptions={{
            style: {
              background: '#111a1f',
              border: '1px solid #2a3942',
              color: '#e8edef',
              borderRadius: '2px',
            },
            classNames: {
              closeButton: 'bg-surface hover:bg-border-hover',
            },
          }}
        />
        <Analytics />
      </body>
    </html>
  )
}
