'use client'

import { useEffect, useState } from 'react';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { goerli } from 'viem/chains';
import { WagmiConfig } from 'wagmi'

export const WalletconnectProvider = ({children}:{children: React.ReactNode}) => {
  const [wagmiConfig, setWagmiConfig] = useState<any>();

  useEffect(() => {
    // 1. Get projectId
    const projectId = '464039f4008f1acbb628fa56f6fd5f6b'

    // 2. Create wagmiConfig
    const chains = [goerli];
    const config = defaultWagmiConfig({ chains, projectId, appName: 'Web3Modal' })

    // 3. Create modal
    createWeb3Modal({ wagmiConfig: config, projectId, chains })

    setWagmiConfig(config);
  }, []);

  if (!wagmiConfig) {
    return null; // or a loading spinner, etc.
  }

  return (
    <WagmiConfig config={wagmiConfig}>
      {children}
    </WagmiConfig>
  )
}