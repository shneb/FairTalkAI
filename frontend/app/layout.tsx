import { AuthProvider } from '@/providers/AuthProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '../components/Layout/Navbar'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FairTalkAI - Django & Next.js Bootstrap Template'
}

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  // const session = await getServerSession(authOptions)

  // if (session === null) {
  //   return redirect('/login')
  // }

  return (
    <html lang="en">
      <body
        className={
          'antialiased bg-gray-50 text-gray-700 text-sm ' + inter.className
        }
      >
        <AuthProvider>
          <div className="px-6">
            <div className="container max-w-6xl my-12 mx-auto">
              <Navbar />
              {children}
              {/* <Footer /> */}
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout
