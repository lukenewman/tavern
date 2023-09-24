'use client'

import { WalletconnectProvider } from '../providers/walletconnect'
import { XMTPProvider } from '@xmtp/react-sdk';
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Provider from "~/app/_trpc/Provider";
import { Buffer } from "buffer";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tavern',
  description: 'a place to hang with your web3 besties',
}

window.Buffer = window.Buffer ?? Buffer;

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
              <XMTPProvider>
                {children}
              </XMTPProvider>
            </WalletconnectProvider>
          </Provider>
        </body>
      </html>
    );
}
