'use client'

import { Fragment, useContext, useEffect, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  XCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PlusIcon, TrashIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { signOut } from 'next-auth/react'
import { Button } from '../ui/button'
import useGetChats from '../../services/qeueries/useChats'
import { useRouter } from 'next/navigation'
import { ChatListRead } from '../../packages/types/api'
import { LoadingSpinner } from '../ui/loadingSpinner'
import { ChatContext } from '../../providers/ChatProvider'

const userNavigation = [
  { name: 'Profile', href: '/profile' },
  { name: 'Change password', href: '/change-password' },
  { name: 'Delete account', href: '/delete-account' },
  {
    name: 'Logout',
    href: () => {
      localStorage.clear()
      signOut()
    }
  }
]

function SideBar({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { setChatId } = useContext(ChatContext)
  const [chats, setChats] = useState<ChatListRead[]>([])

  const router = useRouter()

  const { data: chatsData, isLoading } = useGetChats()

  useEffect(() => {
    if (!chatsData || isLoading) return

    setChats(chatsData)
  }, [chatsData])

  const createChat = () => {
    if (!chats.find((item) => item.id === 9999)) {
      setChats([
        {
          id: 9999,
          title: 'New new chat',
          updated_at: ''
        },
        ...chats
      ])
    }
  }

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
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

            <div className="fixed inset-0 flex w-full">
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
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                      <div className="font-bold text-3xl flex items-center">
                        <a className="ml-2 hover:opacity-50" href="/">
                          FairTalkAI
                        </a>
                      </div>
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <Button onClick={() => createChat()}>New Chat</Button>
                        </li>
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            <li>
                              <Button
                                onClick={() => router.push(`/chat/`)}
                                className={clsx(
                                  // item.current
                                  'bg-gray-50 text-indigo-600',
                                  'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                  'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                )}
                              >
                                <ChatBubbleLeftEllipsisIcon className="h-5 w-7" />
                                New Message
                                <XCircleIcon className="h-5 w-5text-black hover:text-red-700 font-bold" />
                              </Button>
                            </li>
                          </ul>
                        </li>
                        <li className="mt-auto">
                          <a
                            href="#"
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                          >
                            <Cog6ToothIcon
                              className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                              aria-hidden="true"
                            />
                            Settings
                          </a>
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
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col w-full">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <div className="font-bold text-3xl flex items-center">
                <a className="ml-2 hover:opacity-50" href="/">
                  FairTalkAI
                </a>
              </div>
            </div>
            <nav className="flex flex-1 flex-col w-full">
              <ul role="list" className="flex flex-1 flex-col gap-y-7 w-full">
                <li>
                  <Button
                    className="w-full flex justify-between"
                    onClick={() => createChat()}
                  >
                    New Chat <PlusIcon className="h-6 w-6 text-gray-50" />
                  </Button>
                </li>
                <li className="w-full h-full">
                  <ul
                    role="list"
                    className="rounded-lg scroll-shadows flex flex-col gap-3 overflow-y-auto h-[60vh]"
                  >
                    {chats && !isLoading ? (
                      chats.map((item) => (
                        <li className="w-full" key={item.id}>
                          <Button
                            onClick={() => setChatId(item.id.toString())}
                            className="w-full flex justify-between"
                            variant="secondary"
                          >
                            {item.title}
                            <TrashIcon className="h-5 w-5 text-red-700" />
                          </Button>
                        </li>
                      ))
                    ) : (
                      <div className="flex w-full justify-center h-full items-center">
                        <LoadingSpinner />
                      </div>
                    )}
                  </ul>
                </li>
                <li className="mt-auto">
                  <a
                    href="#"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                  >
                    <Cog6ToothIcon
                      className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                      aria-hidden="true"
                    />
                    Settings
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div>
          <div className="sticky top-0 z-40 lg:mx-auto ">
            <div className="flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
              <button
                type="button"
                className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
              {/* Separator */}
              <div
                className="h-6 w-px bg-gray-200 lg:hidden"
                aria-hidden="true"
              />
              <div className="flex justify-end items-end w-full lg:gap-x-6">
                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full bg-gray-50"
                      src="https://media.licdn.com/dms/image/D4E03AQEf8JDG-Kpygg/profile-displayphoto-shrink_800_800/0/1700748042076?e=1719446400&v=beta&t=PBBQGwnWtBB1Wjwe89htaDWmZE2NxwDZi6Ao0YDQ5qk"
                      alt=""
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                        aria-hidden="true"
                      >
                        Shneb
                      </span>
                      <ChevronDownIcon
                        className="ml-2 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2.5 w-36 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) =>
                            typeof item.href === 'function' ? (
                              <button
                                onClick={item.href}
                                className={clsx(
                                  active ? 'bg-gray-50' : '',
                                  'block px-3 py-1 text-sm leading-6  w-full text-left text-red-700'
                                )}
                              >
                                {item.name}
                              </button>
                            ) : (
                              <a
                                href={item.href}
                                className={clsx(
                                  active ? 'bg-gray-50' : '',
                                  'block px-3 py-1 text-sm leading-6 text-gray-900'
                                )}
                              >
                                {item.name}
                              </a>
                            )
                          }
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <main className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:pl-80">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default SideBar
