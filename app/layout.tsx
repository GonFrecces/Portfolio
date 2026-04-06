import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Claudio Vargas — Full Stack Developer',
  description: 'Portfolio of Claudio Vargas, Full Stack Developer specializing in Python, React, TypeScript, microservices and cloud architecture.',
  keywords: ['Full Stack Developer', 'React', 'TypeScript', 'Python', 'FastAPI', 'Django', 'Next.js'],
  authors: [{ name: 'Claudio Vargas' }],
  openGraph: {
    title: 'Claudio Vargas — Full Stack Developer',
    description: 'Portfolio of Claudio Vargas, Full Stack Developer.',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
    shortcut: '/icon.svg',
  },
  creator: 'Claudio Vargas',
}

export const viewport = {
  themeColor: '#0c0c0c',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${jetbrainsMono.variable} font-mono antialiased`}>
        {children}
      </body>
    </html>
  )
}
