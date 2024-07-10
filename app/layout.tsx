import type { Metadata } from 'next'
import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
