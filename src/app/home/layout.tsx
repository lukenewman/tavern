'use client'

import { useCheckConnection } from "~/hooks/useCheckConnection"
import Sidebar from "../../components/Sidebar"

const HomeLayout = ({ children }: {children: React.ReactNode}) => {
  useCheckConnection();

  return (
    <div className="w-screen h-screen">
      <Sidebar>
        {children}
      </Sidebar>
    </div>
  )
}

export default HomeLayout;