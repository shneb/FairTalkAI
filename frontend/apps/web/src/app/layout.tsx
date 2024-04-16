import { AuthProvider } from '@/providers/AuthProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { twMerge } from 'tailwind-merge'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FairTalkAI - Django & Next.js Bootstrap Template'
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={twMerge(
          'antialiased bg-gray-50 text-gray-700 text-sm',
          inter.className
        )}
      >
        <AuthProvider>
          <div className="px-6">
            <div className="container max-w-6xl my-12 mx-auto">{children}</div>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout
