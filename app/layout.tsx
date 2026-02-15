import React from "react"
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
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
  metadataBase: new URL('https://djy89.net'),
  title: 'Danny Yanko | Systems Architect & Automation Consultant',
  description: 'Automation for businesses tired of wasting time on work that shouldn\'t exist.',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-dark.png', media: '(prefers-color-scheme: dark)' },
      { url: '/favicon-light.png', media: '(prefers-color-scheme: light)' },
    ],
    apple: '/apple-touch-icon.png',
  },
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
      <head>
        {/* Font Awesome for Mermaid diagrams */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-MYMTSFXK6P"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-MYMTSFXK6P');
            `,
          }}
        />
      </head>
      <body className={`${ubuntu.className} ${ubuntu.variable} ${ubuntuMono.variable} antialiased`}>
        {children}
        <Toaster
          position="bottom-right"
          duration={7000}
          closeButton
          toastOptions={{
            style: {
              background: '#ff5722',
              border: 'none',
              color: '#ffffff',
              borderRadius: '2px',
              padding: '16px 20px',
              fontSize: '14px',
              fontWeight: '500',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            },
            classNames: {
              toast: '[&_svg]:text-white',
              closeButton: '!bg-transparent hover:!bg-white/20 !text-white !border-none !shadow-none',
            },
          }}
        />
        <Analytics />
      </body>
    </html>
  )
}
