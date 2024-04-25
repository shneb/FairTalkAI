import { AuthProvider } from '@/providers/AuthProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '../components/Layout/Navbar'
import ReactQueryProvider from '../providers/ReactQueryProvider'
import SideBar from '../components/sidebar/SideBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FairTalkAI - Django & Next.js Bootstrap Template'
}

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}

export default RootLayout