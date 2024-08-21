import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import StoreProvider from './store-provider'

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
      <StoreProvider>
        <body>
          <Providers>
            {children}
          </Providers>
        </body>
      </StoreProvider>
    </html>
  )
}
