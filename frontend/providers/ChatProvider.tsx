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

interface IChatContextProvider {
  children: ReactNode
}

export interface ChatInterface {
  chatId: string | undefined
  setChatId: Dispatch<SetStateAction<string | undefined>>
}
export const ChatContext = createContext<ChatInterface>({} as ChatInterface)

export const ChatContextProvider: FC<IChatContextProvider> = ({ children }) => {
  const [chatId, setChatId] = useState<ChatInterface['chatId']>()

  useEffect(() => {
    const local = localStorage.getItem('chatId')
    if (!local) return
    setChatId(JSON.parse(local))
  }, [])

  useEffect(() => {
    if (!chatId) return
    localStorage.setItem('chatId', chatId)
  }, [chatId])

  const ChatContextValue = useMemo(
    () => ({
      chatId,
      setChatId
    }),
    [chatId]
  )
  return (
    <ChatContext.Provider value={ChatContextValue}>
      {children}
    </ChatContext.Provider>
  )
}
