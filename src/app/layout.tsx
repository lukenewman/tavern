'use client'

import { WalletconnectProvider } from '../providers/walletconnect'
import { XMTPProvider } from '@xmtp/react-sdk';
import './globals.css'
import { Inter } from 'next/font/google'
import Provider from "~/app/_trpc/Provider";

const inter = Inter({ subsets: ['latin'] });

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
