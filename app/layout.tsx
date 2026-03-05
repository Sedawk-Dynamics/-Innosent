import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import LogoLoader from '@/components/logo-loader'
import './globals.css'
import StartLoader from '@/components/start-loader'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'InnoSent - Advanced Radar Sensors & Traffic Solutions',
  description: 'High-precision radar sensors for traffic monitoring and industrial applications. Innovative sensor solutions for safety and automation.',
  generator: 'v0.app',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'InnoSent - Radar Sensors & Traffic Solutions',
    description: 'Advanced radar technology for traffic monitoring and industrial applications',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <StartLoader />
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
