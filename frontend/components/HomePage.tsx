'use client'

import React, { useContext, useState, useEffect, useRef } from 'react'
import { Chat } from '@/components/Chat/Chat'
import { ChatContext } from '../providers/ChatProvider'
import { MessageRead } from '../packages/types/api'
import useGetMessages from '../services/qeueries/useMessages'
import useSendMessage from '../services/qeueries/useSendMessage'

const HomePage: React.FC = () => {
  const { chatId } = useContext(ChatContext)
  const [messages, setMessages] = useState<MessageRead[]>([])
  const { data: messagesData, isLoading: isMessagesLoading } = useGetMessages(
    Number(chatId) || 9999
  )
  const { mutateAsync, isPending: isMutating } = useSendMessage()

  useEffect(() => {
    if (!messagesData || isMessagesLoading) return
    setMessages(messagesData)
  }, [messagesData, isMessagesLoading])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  useEffect(() => {
    scrollToBottom() // Scroll to bottom whenever messages change
  }, [messages])

  const handleSend = async (message: MessageRead) => {
    setMessages((currentMessages) => [...currentMessages, message]) // Show user message immediately
    scrollToBottom()
    try {
      const response = await mutateAsync({ chatId: Number(chatId), message })
    } catch (error) {
      console.error('Error sending message:', error)
      // Handle errors here, such as displaying an error message or retry option
    }
  }
  // const reader = data
  // const decoder = new TextDecoder()
  // let done = false
  // let isFirst = true

  // while (!done) {
  //   const { value, done: doneReading } = await reader.read()
  //   done = doneReading
  //   const chunkValue = decoder.decode(value)

  //     if (isFirst) {
  //       isFirst = false
  //       setMessages((messages) => [
  //         ...messages,
  //         {
  //           role: 'assistant',
  //           content: chunkValue
  //         }
  //       ])
  //     } else {
  //       setMessages((messages) => {
  //         const lastMessage = messages[messages.length - 1]
  //         const updatedMessage = {
  //           ...lastMessage,
  //           content: lastMessage.content + chunkValue
  //         }
  //         return [...messages.slice(0, -1), updatedMessage]
  //       })
  //     }
  //   }
  // }

  return (
    <div className="h-[80vh] flex-1">
      <div className="h-full max-w-full mx-auto">
        <Chat
          messages={messages}
          loading={isMutating} // Show loader when sending a message
          onSend={handleSend}
          messagesEndRef={messagesEndRef}
        />
      </div>
    </div>
  )
}

export default HomePage
