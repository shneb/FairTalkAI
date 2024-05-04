import { FC } from 'react'
import { ChatInput } from './ChatInput'
import { ChatLoader } from './ChatLoader'
import { ChatMessage } from './ChatMessage'
import { MessageRead } from '../../packages/types/api'

interface Props {
  messages?: MessageRead[]
  loading: boolean
  onSend: (message: MessageRead) => void
}

export const Chat: FC<Props> = ({ messages, loading, onSend }) => {
  return (
    <div className="h-full flex flex-col justify-end rounded-lg">
      <div className="flex-col justify-end mb-8  overflow-y-auto h-[100vh] pb-10 scroll-m-10 scroll-width">
        {messages &&
          !loading &&
          messages.map((message, index) => (
            <div key={index} className="my-1 sm:my-4">
              <ChatMessage message={message} />
            </div>
          ))}

        {loading && (
          <div className="my-1 sm:my-1.5">
            <ChatLoader />
          </div>
        )}
      </div>

      <div className="">
        <ChatInput onSend={onSend} />
      </div>
    </div>
  )
}
