import { FC } from 'react'
import { ChatInput } from './ChatInput'
import { ChatLoader } from './ChatLoader'
import { ChatMessage } from './ChatMessage'
import { ResetChat } from './ResetChat'
import { Message, RoleEnum } from '../../packages/types/api'

interface Props {
  messages: Message[]
  loading: boolean
  onSend?: (message: Message) => void
  onReset: () => void
}

export const Chat: FC<Props> = ({ messages, loading, onSend, onReset }) => {
  const mockMessages: Message[] = [
    {
      id: '550e8400-e29b-41d4-a716-446655440000',
      bias: {
        description:
          'The analysis indicated a higher negative sentiment when referencing certain age groups.',
        id: '550e8400-e29b-41d4-a716-446655440001',
        score: '65',
        type: 'age'
      },
      chat: '550e8400-e29b-41d4-a716-446655440002 this is the chat ID',
      content:
        'It seems like younger people are less responsible with finances.',
      created_at: '2024-04-25T12:00:00Z',
      role: RoleEnum.ASSISTANT,
      updated_at: '2024-04-25T12:05:00Z'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440003',
      bias: {
        description:
          'The content subtly implies stereotypes about gender roles.',
        id: '550e8400-e29b-41d4-a716-446655440004',
        score: '80',
        type: 'gender'
      },
      chat: '550e8400-e29b-41d4-a716-446655440005 this is the chat ID',
      content: 'Typically, women are more concerned with household chores.',
      created_at: '2024-04-24T11:30:00Z',
      role: RoleEnum.USER,
      updated_at: '2024-04-24T11:35:00Z'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440006',
      bias: {
        description:
          'The message contains racial stereotypes that are harmful.',
        id: '550e8400-e29b-41d4-a716-446655440007',
        score: '90',
        type: 'racial'
      },
      chat: '550e8400-e29b-41d4-a716-446655440008 this is the chat ID',
      content: 'This type of music is most popular among Asian communities.',
      created_at: '2024-04-24T15:45:00Z',
      role: RoleEnum.ASSISTANT,
      updated_at: '2024-04-24T15:50:00Z'
    }
  ]

  return (
    <div className="h-full">
      <div className="flex flex-row justify-between items-center mb-4 sm:mb-8">
        <ResetChat onReset={onReset} />
      </div>

      <div className="h-full flex flex-col justify-end rounded-lg ">
        {mockMessages.map((message, index) => (
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
