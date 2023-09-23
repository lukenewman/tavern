'use client'

import { useEffect } from "react";
import { useAccount } from "wagmi"

export const useInitialize = () => {
  const account = useAccount();

  useEffect(() => {
    if (!account) {
      window.location.pathname = '/';
    } else if (window.location.pathname === '/') {
      window.location.pathname = '/user';
    }
  }, [account])
}