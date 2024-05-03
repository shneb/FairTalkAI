import SideBar from '../../components/sidebar/SideBar'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../../lib/auth'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions)

  if (session === null) {
    return redirect('/login')
  }
  return (
    <>
      <SideBar>{children}</SideBar>
    </>
  )
}

export default Layout
