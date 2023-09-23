import { WalletconnectProvider } from '../providers/walletconnect'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GangGang',
  description: 'a place to hang with your gang',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + 'h-screen w-screen'}>
        <WalletconnectProvider >
          {children}
        </WalletconnectProvider>
      </body>
    </html>
  )
}
