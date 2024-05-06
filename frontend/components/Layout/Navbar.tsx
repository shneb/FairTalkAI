'use client'

import { FC } from 'react'
import { IconUser } from '@tabler/icons-react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'

import { signIn, signOut, useSession } from 'next-auth/react'

const SignInLink: React.FC = () => {
  return <button onClick={() => signIn()}>Login</button>
}

const SignOutLink: React.FC = () => {
  return (
    <button
      onClick={() => signOut()}
      className="cursor-pointer text-purple-600 underline"
    >
      Logout
    </button>
  )
}

export const Navbar: FC = () => {
  const session = useSession()

  return (
    <div className="flex h-[50px] sm:h-[60px] border-b border-neutral-300 py-2 px-2 sm:px-8 items-center justify-between">
      <div className="font-bold text-3xl flex items-center">
        <a className="ml-2 hover:opacity-50" href="/">
          FairTalkAI
        </a>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <IconUser />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          {session.status === 'authenticated' && (
            <>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            {session.status === 'authenticated' ? (
              <SignOutLink />
            ) : (
              <SignInLink />
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
