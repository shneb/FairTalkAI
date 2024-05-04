'use client'

import React, { useContext, useState } from 'react'
import { useEffect, useRef } from 'react'
import { Chat } from '@/components/Chat/Chat'
import useGetMessages from '../services/qeueries/useMessages'
import { ChatContext } from '../providers/ChatProvider'
import { MessageRead } from '../packages/types/api'
import useSendMessage from '../services/qeueries/useSendMessage'

const HomePage: React.FC = () => {
  const { chatId } = useContext(ChatContext)

  const [messages, setMessages] = useState<MessageRead[]>([])

  const { data: messagesData, isLoading: isMessagesLoading } = useGetMessages(
    Number(chatId) || 9999
  )
  const { mutate, isPending } = useSendMessage()

  useEffect(() => {
    if (!messagesData || isMessagesLoading) return

    setMessages(messagesData)
  }, [])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSend = async (message: MessageRead) => {
    setMessages([...messages, message])
    const data = mutate(
      {
        chatId: Number(chatId),
        message
      },
      {
        onSuccess: (res) => {
          setMessages([...messages, res.data[1]])
        }
      }
    )

    console.log(data)
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

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="h-[80vh] flex-1 ">
      <div className="h-full max-w-full mx-auto">
        <Chat
          messages={messagesData}
          loading={isMessagesLoading}
          onSend={handleSend}
        />
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}

export default HomePage
