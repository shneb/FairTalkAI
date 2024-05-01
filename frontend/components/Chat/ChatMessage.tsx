import { FC } from 'react'
import { Message } from '../../packages/types/api'

interface Props {
  message: Message
}

export const ChatMessage: FC<Props> = ({ message }) => {
  return (
    <div
      className={`flex flex-col ${message.role === 'assistant' ? 'items-start' : 'items-end'}`}
    >
      <div
        className={`flex items-center ${message.role === 'assistant' ? 'bg-white dark:bg-gray-800 text-neutral-900' : 'bg-blue-500 text-white'}  rounded-lg p-4 flex flex-col gap-4`}
        style={{ overflowWrap: 'anywhere' }}
      >
        {message.content}
      </div>
    </div>
  )
}
