import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import { Providers } from './providers'
import Alert from './components/alert'

export const metadata: Metadata = {
  title: 'Groupifyr - Test',
  description: 'Test App for Groupifyr Development'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
        <body className="container">
          <Alert />
          <Providers >
            <main className="flex-container mx-auto flex-col full-height min-h-screen overflow-auto items-center justify-between bg-gray-600 text-black dark:bg-zinc-900 dark:text-white">
              {children}
            </main>
            <Analytics />
            <SpeedInsights/>
          </Providers>
        </body>
    </html>
  )
}
