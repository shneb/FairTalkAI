import SideBar from '../../components/sidebar/SideBar'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../../lib/auth'
import { ChatContextProvider } from '../../providers/ChatProvider'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions)

  if (session === null) {
    return redirect('/login')
  }

  return (
    <>
      <ChatContextProvider>
        <SideBar>{children}</SideBar>
      </ChatContextProvider>
    </>
  )
}

export default Layout
