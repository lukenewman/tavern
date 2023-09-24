'use client'

import { useClient } from "@xmtp/react-sdk";
import { useCallback, useEffect } from "react";
import { goerli } from "viem/chains";
import { useAccount, useWalletClient } from "wagmi"
import { walletClientToSigner } from "~/utils/walletClient";

export const useInitializeXmtp = () => {
  const account = useAccount();

  const { data: walletClient } = useWalletClient({ chainId: goerli.id });

  const { initialize } = useClient();

  const handleConnect = useCallback(async () => {
    if (!walletClient) return;
    const signer = walletClientToSigner(walletClient);
    await initialize({ signer });
  }, [initialize, walletClient]);

  useEffect(() => {
    if (account && walletClient) {
      handleConnect();
    }
  }, [account])
}