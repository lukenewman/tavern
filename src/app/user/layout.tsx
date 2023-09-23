'use client'

import Sidebar from "../../components/Sidebar"
import { useAccount } from "wagmi";

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