import SideBar from '../../components/sidebar/SideBar'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SideBar>{children}</SideBar>
    </>
  )
}

export default Layout
