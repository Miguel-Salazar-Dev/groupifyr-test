import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'

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
        <body>
          <Providers>
            {children}
          </Providers>
        </body>
    </html>
  )
}
