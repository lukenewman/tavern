'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi"

export const useInitialize = () => {
  const account = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!account) {
      window.location.pathname = '/';
    } else if (window.location.pathname === '/') {
      window.location.pathname = '/user';
    }
  }, [account])
}