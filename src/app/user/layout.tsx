'use client'

import Sidebar from "../../components/Sidebar"

const UserHome = ({ children }: {children: React.ReactNode}) => {
  return (
    <div className="w-screen h-screen">
      <Sidebar>
        {children}
      </Sidebar>
    </div>
  )
}

export default UserHome