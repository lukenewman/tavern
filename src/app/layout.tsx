'use client'

import { WalletconnectProvider } from '../providers/walletconnect'
import './globals.css'
// import type { Metadata } from 'next'
import { api } from "~/utils/api";
import { Inter } from 'next/font/google'
import Provider from "~/app/_trpc/Provider";

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Tavern',
//   description: 'a place to hang with your web3 besties',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    return (
      <html lang="en">
        <body className={inter.className + 'h-screen w-screen'}>
          <Provider>
            <WalletconnectProvider>
              {children}
            </WalletconnectProvider>
          </Provider>
        </body>
      </html>
    )
}
