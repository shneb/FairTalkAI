'use client'

import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState
} from 'react'
import { ChatListRead } from '../packages/types/api'

interface IChatContextProvider {
  children: ReactNode
}

export interface ChatInterface {
  currentChat: ChatListRead | undefined
  setCurrentChat: Dispatch<SetStateAction<ChatListRead | undefined>>
}
export const ChatContext = createContext<ChatInterface>({} as ChatInterface)

export const ChatContextProvider: FC<IChatContextProvider> = ({ children }) => {
  const [currentChat, setCurrentChat] = useState<ChatInterface['currentChat']>()

  useEffect(() => {
    const local = localStorage.getItem('currentChat')
    if (!local) return
    setCurrentChat(JSON.parse(local))
  }, [])

  useEffect(() => {
    if (!currentChat) return
    localStorage.setItem('currentChat', JSON.stringify(currentChat))
  }, [currentChat])

  const ChatContextValue = useMemo(
    () => ({
      currentChat,
      setCurrentChat
    }),
    [currentChat]
  )
  return (
    <ChatContext.Provider value={ChatContextValue}>
      {children}
    </ChatContext.Provider>
  )
}
