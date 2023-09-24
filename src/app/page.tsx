'use client'

import { useAccount } from 'wagmi';
import Link from 'next/link'
import Image from 'next/image';
import tavern from './tavern.jpeg';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function App() {
  const router = useRouter();
  const account = useAccount();
  useEffect(() => {
    router.push(account ? '/home' : '/');
  }, [account]);
  
  return (
    <div className="bg-white w-full h-full">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="font-mono text-4xl text-gray-900">
              Tavern
            </h2>
            <div className="hidden sm:mt-32 sm:flex lg:mt-16">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20 gap-1">
                Utilizing the latest in web3 tech
                <a href="https://docs.walletconnect.com/2.0/api/chat/about" className="whitespace-nowrap font-semibold pl-2 text-indigo-600">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Read more <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
            <h1 className="mt-24 text-4xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl">
              A place for you and your anon besties to hang
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
              fugiat veniam occaecat fugiat aliqua.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <w3m-button balance='hide' />
              {account.address &&
                <Link href="/user" className="text-sm pl-2 font-semibold leading-6 text-gray-900">
                  Go home <span aria-hidden="true">→</span>
                </Link>
              }
            </div>
          </div>
        </div>
        <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
          <Image
            className="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
            src={tavern}
            alt="A cozy place"
          />
        </div>
      </div>
    </div>
  )
}
