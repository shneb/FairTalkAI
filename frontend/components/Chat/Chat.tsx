import { FC } from 'react'
import { ChatInput } from './ChatInput'
import { ChatLoader } from './ChatLoader'
import { ChatMessage } from './ChatMessage'
import { ResetChat } from './ResetChat'
import { Message } from '../../packages/types/api'

interface Props {
  messages: Message[]
  loading: boolean
  onSend?: (message: Message) => void
  onReset: () => void
}

export const Chat: FC<Props> = ({ messages, loading, onSend, onReset }) => {
  return (
    <div className="h-full">
      <div className="flex flex-row justify-between items-center mb-4 sm:mb-8">
        <ResetChat onReset={onReset} />
      </div>

      <div className="h-full flex flex-col justify-end rounded-lg ">
        {messages.map((message, index) => (
          <div key={index} className="my-1 sm:my-1.5">
            <ChatMessage message={message} />
          </div>
        ))}

        {loading && (
          <div className="my-1 sm:my-1.5">
            <ChatLoader />
          </div>
        )}

        <div className="mt-4 sm:mt-8 bottom-[56px] left-0 w-full">
          <ChatInput onSend={onSend} />
        </div>
      </div>
    </div>
  )
}
