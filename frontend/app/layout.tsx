import { AuthProvider } from '@/providers/AuthProvider'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import ReactQueryProvider from '../providers/ReactQueryProvider'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900']
})

export const metadata: Metadata = {
  title: 'FairTalkAI'
}

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ReactQueryProvider>
          <Analytics />
          <SpeedInsights />
          <AuthProvider>{children}</AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}

export default RootLayout
