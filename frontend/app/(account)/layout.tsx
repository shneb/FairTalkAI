import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const AccountLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions)

  if (session === null) {
    return redirect('/')
  }

  return (
    <div className="flex-grow h-screen flex items-center justify-center -my-12 w-full">
      <div className="w-96">{children}</div>
    </div>
  )
}

export default AccountLayout
