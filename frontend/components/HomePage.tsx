'use client'

import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { Chat } from '@/components/Chat/Chat'
import { Message } from '../packages/types/api'

const HomePage: React.FC = () => {
  // const response = use(getReponse())

  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // const handleSend = async (message: Message) => {
  //   const updatedMessages = [...messages, message]

  //   setMessages(updatedMessages)
  //   setLoading(true)

  //   const response = await fetch('/api/chat', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       messages: updatedMessages
  //     })
  //   })

  //   if (!response.ok) {
  //     setLoading(false)
  //     throw new Error(response.statusText)
  //   }

  //   const data = response.body

  //   if (!data) {
  //     return
  //   }

  //   setLoading(false)

  //   const reader = data.getReader()
  //   const decoder = new TextDecoder()
  //   let done = false
  //   let isFirst = true

  //   while (!done) {
  //     const { value, done: doneReading } = await reader.read()
  //     done = doneReading
  //     const chunkValue = decoder.decode(value)

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

  const handleReset = () => {
    // setMessages([
    //   {
    //     timestamp: 'gg',
    //     id: '',
    //     chat: '',
    //     role: RoleEnum.ASSISTANT,
    //     content: `Hi there! I'm Chatbot UI, an AI assistant. I can help you with things like answering questions, providing information, and helping with tasks. How can I help you?`
    //   }
    // ])
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // useEffect(() => {
  //   if (!response || loading) return

  //   if (response.length < 1) {
  //     setMessages([
  //       {
  //         timestamp: 'gg',
  //         id: '',
  //         chat: '',
  //         role: RoleEnum.ASSISTANT,
  //         content: `Hi there! I'm Chatbot UI, an AI assistant. I can help you with things like answering questions, providing information, and helping with tasks. How can I help you?`
  //       }
  //     ])
  //     return
  //   }
  //   setMessages(response)
  // }, [response])

  return (
    <div className="h-[80vh] flex-1 ">
      <div className="h-full max-w-full mx-auto">
        <Chat messages={messages} loading={loading} onReset={handleReset} />
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}

export default HomePage
