'use client'

import Image from 'next/image';
import tavern from './tavern.jpeg';
import { useCheckConnection } from '../hooks/useCheckConnection';
import Link from 'next/link';
import { useAccount } from 'wagmi';

export default function App() {
  const { address } = useAccount();
  useCheckConnection();
  
  return (
    <div className="bg-white w-full h-full">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="font-mono text-4xl text-gray-900">
              Tavern
            </h2>
            <h1 className="mt-24 text-4xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl">
              A place for you and your anon besties to hang
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Create and subscribe to decentralize streams and chatrooms
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <w3m-button balance='hide' />
              {address &&
                <Link href="/home" className="text-sm pl-2 font-semibold leading-6 text-gray-900">
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
