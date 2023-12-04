import Provider from '@/components/providers'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Disgraduation App',
  description: 'The Next Future App for Graduation Photographers.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  )
}
