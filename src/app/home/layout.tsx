'use client'

import Sidebar from "../../components/Sidebar"

const HomeLayout = ({ children }: {children: React.ReactNode}) => {
  return (
    <div className="w-screen h-screen">
      <Sidebar>
        {children}
      </Sidebar>
    </div>
  )
}

export default HomeLayout;