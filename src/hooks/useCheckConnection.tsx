import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount } from "wagmi";

export const useCheckConnection = () => {
  const router = useRouter();
  const { isConnected } = useAccount();
  useEffect(() => {
    if (isConnected && window.location.pathname === '/') {
      router.push('/home');
    } else if (!isConnected && window.location.pathname !== '/') {
      router.push('/');
    }
  }, [isConnected]);
};