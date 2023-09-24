import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount } from "wagmi";

export const useCheckConnection = () => {
  const router = useRouter();
  const { isConnected } = useAccount();
  console.log('isConnected', isConnected);
  console.log('window.location.pathname', window.location.pathname);
  useEffect(() => {
    if (isConnected && window.location.pathname === '/') {
      router.push('/home');
    } else if (!isConnected && window.location.pathname !== '/') {
      router.push('/');
    }
  }, [isConnected]);
};