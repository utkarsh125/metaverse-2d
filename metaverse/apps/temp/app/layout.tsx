import './globals.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '://orbit-one',
  description: 'the future of remote work',
  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
