import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Chatroom, ChatroomUser } from '@prisma/client'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const liveStreams: Chatroom[] = [
  { createdAt: new Date(), creator: 'Panda', id: 1, privateKey: '1', updatedAt: new Date(), youtubeURL: 'https://www.youtube.com/watch?v=MIA8AKVZ0Yk', live: true },
  { createdAt: new Date(), creator: 'Otter', id: 2, privateKey: '2', updatedAt: new Date(), youtubeURL: 'https://www.youtube.com/watch?v=WrKZzs-CB_8', live: true},
  { createdAt: new Date(), creator: 'Jelly', id: 3, privateKey: '3', updatedAt: new Date(), youtubeURL: 'https://www.youtube.com/watch?v=OMlf71t2oV0', live: false },
  { createdAt: new Date(), creator: 'Baboon', id: 4, privateKey: '4', updatedAt: new Date(), youtubeURL: 'https://www.youtube.com/watch?v=-Xf6iHaOOck', live: true },
]
export const yourSubs: ChatroomUser[] = [
  { address: '1234', chatroomId: 1, createdAt: new Date(), updatedAt: new Date(), id: 1 },
  { address: '1234', chatroomId: 2, createdAt: new Date(), updatedAt: new Date(), id: 2 }
];

export default function Sidebar({children}: {children: React.ReactNode}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isWatchPath = window.location.pathname.startsWith('/user/watch');
  const roomId = isWatchPath ? Number(window.location.pathname.split('/')[3]) : -1;

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-2">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=white"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <div className="text-xs font-semibold leading-6 text-indigo-200">Live Streams</div>
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {liveStreams.map((item: Chatroom, ix) => (
                              <li key={ix}>
                                <Link
                                  key={ix}
                                  href={`/user/watch/${item.id}`}
                                  className={classNames(
                                    roomId === item.id
                                      ? 'bg-indigo-700 text-white'
                                      : 'text-indigo-200 hover:text-white hover:bg-indigo-700',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                {item.creator} 
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                      <div className="text-xs font-semibold leading-6 text-indigo-200">Your Subscriptions</div>
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {yourSubs.map((item: ChatroomUser, ix) => (
                              <li key={ix}>
                                <Link
                                  key={ix}
                                  href={`/user/watch/${item.chatroomId}`}
                                  className={classNames(
                                    roomId === item.id
                                      ? 'bg-indigo-700 text-white'
                                      : 'text-indigo-200 hover:text-white hover:bg-indigo-700',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                {item.chatroomId}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=white"
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
                      <div className="text-xs font-semibold leading-6 text-indigo-200">Live Streams</div>
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {liveStreams.map((item: Chatroom, ix) => (
                              <li key={ix}>
                                <Link
                                  key={ix}
                                  href={`/user/watch/${item.id}`}
                                  className={classNames(
                                    'text-indigo-200 hover:text-white hover:bg-indigo-700',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                {item.creator} 
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                      <div className="text-xs font-semibold leading-6 text-indigo-200">Your Subscriptions</div>
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {yourSubs.map((item: ChatroomUser, ix) => (
                              <li key={ix}>
                                <Link
                                  key={ix}
                                  href={`/user/watch/${item.chatroomId}`}
                                  className={classNames(
                                    'text-indigo-200 hover:text-white hover:bg-indigo-700',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                {item.chatroomId}
                                </Link>
                              </li>
                            ))}
                          </ul>
                  </li>
                <li className="-mx-6 mt-auto">
                  <w3m-button balance='hide' />
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-indigo-600 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button type="button" className="-m-2.5 p-2.5 text-indigo-200 lg:hidden" onClick={() => setSidebarOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-white">Dashboard</div>
          <w3m-button balance='hide' />
        </div>
        <main className="py-10 lg:pl-72">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  )
}
